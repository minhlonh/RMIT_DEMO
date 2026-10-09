require('dotenv').config();
const express = require('express'), cors = require('cors'), path = require('path');
const D = require('./data');
const app = express();
app.use(cors()); app.use(express.json({ limit: '200kb' }));

// Chỉ phục vụ 3 file giao diện (không để lộ .env / server.js)
const sendF = f => (_q, res) => res.sendFile(path.join(__dirname, f));
app.get('/', sendF('rmit.html')); app.get('/main.css', sendF('main.css')); app.get('/main.js', sendF('main.js'));

const FREE_CREDITS = 5;
const LN = { en: 'English', vi: 'Vietnamese', ja: 'Japanese', es: 'Spanish' };
const lang = l => (LN[l] ? l : 'en');
const users = new Map(); // in-memory demo store; replace with a database in production

app.use((req, _res, next) => {
  const id = req.get('x-client-id') || req.ip;
  if (!users.has(id)) users.set(id, { credits: FREE_CREDITS, plan: 'free' });
  req.u = users.get(id); next();
});
const meta = u => ({ credits: u.credits, plan: u.plan });

// Freemium gate: free plan spends 1 credit per AI request, 402 when empty
function charge(req, res, next) {
  const u = req.u;
  if (u.plan === 'free') {
    if (u.credits <= 0) return res.status(402).json({ error: 'paywall', ...meta(u) });
    u.credits--;
  }
  req.charged = true; next();
}

async function gemini(prompt) {
  const key = process.env.GEMINI_API_KEY; if (!key) return null;
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const j = await r.json();
    return j.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch { return null; }
}

app.get('/api/me', (req, res) => res.json(meta(req.u)));
app.get('/api/glossary', (_req, res) => res.json(D.SL));

app.post('/api/slang', charge, async (req, res) => {
  const w = String(req.body.word || '').toLowerCase().slice(0, 40), L = lang(req.body.lang);
  const ai = await gemini(`You explain Gen-Z/Alpha slang to grandparents. Slang: "${w}". Reply in ${LN[L]}: the meaning, why young people use it, and an empathetic tip for joining the conversation without judging or controlling. Be warm and concise.`);
  const reply = ai || (D.SL[w]
    ? `${D.SL[w][L]}\n\n💡 ${D.LBL[L][0]}: ${D.WHY[L]}\n\n🤝 ${D.LBL[L][1]}: ${D.TIP[L]}`
    : D.UNK[L]);
  res.json({ reply, charged: true, ...meta(req.u) });
});

app.post('/api/legacy', charge, async (req, res) => {
  const L = lang(req.body.lang), q = String(req.body.question || '').slice(0, 500);
  const stories = (Array.isArray(req.body.stories) ? req.body.stories : []).slice(0, 50).map(s => String(s).slice(0, 1000));
  const ai = await gemini(`You are "Grandma Lan", a loving grandmother. Answer ONLY using these saved memories: ${stories.join(' | ')}. Reply in ${LN[L]}, warm and short. Grandchild asks: ${q}`);
  let best = stories[Math.floor(Math.random() * stories.length)] || '', top = 0;
  const ws = q.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  stories.forEach(s => { const n = ws.filter(w => s.toLowerCase().includes(w)).length; if (n > top) { top = n; best = s; } });
  res.json({ reply: ai || D.LEG[L] + best + ' ❤️', charged: true, ...meta(req.u) });
});

app.post('/api/mediate', charge, async (req, res) => {
  const L = lang(req.body.lang), text = String(req.body.text || '').slice(0, 1000);
  const aggressive = D.BAD.test(text);
  let suggestion = '';
  if (aggressive) suggestion = (await gemini(`Rewrite this family message to be gentler and kind, keep the meaning, in ${LN[L]}. Return only the message: "${text}"`)) || D.SOFT[L];
  res.json({ aggressive, suggestion, charged: true, ...meta(req.u) });
});

app.post('/api/scan', (req, res) => { // scam scanning stays free
  const text = String(req.body.text || '').slice(0, 5000);
  const flags = (text.match(D.SCAM) || []).length;
  res.json({ flags, level: flags ? 'danger' : 'safe', ...meta(req.u) });
});

app.post('/api/upgrade', (req, res) => { // mock checkout, no real payment
  const plan = ['free', 'plus', 'pro'].includes(req.body.plan) ? req.body.plan : null;
  if (!plan) return res.status(400).json({ error: 'bad plan' });
  req.u.plan = plan; res.json(meta(req.u));
});

app.listen(process.env.PORT || 3000, () => console.log('GenLink on http://localhost:' + (process.env.PORT || 3000)));