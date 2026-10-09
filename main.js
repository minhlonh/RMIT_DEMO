const API=window.GENLINK_API||(location.protocol==='file:'?'http://localhost:3000':'');
let CID=localStorage.getItem('genlink_cid');if(!CID){CID=(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2));localStorage.setItem('genlink_cid',CID)}
let SUG='';
const TAGS=['flex','slay','rizz','brainrot','esports','skibidi'];let SL={};
async function api(p,b){try{const r=await fetch(API+p,{method:b?'POST':'GET',headers:{'Content-Type':'application/json','x-client-id':CID},body:b?JSON.stringify(b):undefined});const j=await r.json();
 if(r.status===402){S.credits=0;save();head();openPay();return null}
 if(j.credits!=null){S.credits=j.credits;S.plan=j.plan}if(j.charged)S.points+=5;save();head();return j}catch(e){toast('Server offline - run the backend (npm start)');return null}}

const I={
en:{home:"Home",slang:"Slang Decoder",legacy:"Legacy AI",capsule:"Time Capsule",mail:"Love Mailbox",shield:"Scam Shield",senior:"Senior",youth:"Youth",admin:"Parent",cr:"Free Trial: {n}/5 Credits Left",unl:"Unlimited · {p}",pts:"Family Points",
sT:"Gen-Z / Alpha Slang Decoder",sS:"Tap a word or type your own",ph:"Type a word, e.g. rizz…",ask:"Decode",why:"Why they say it",tip:"How to join in",unk:"I don't know that word yet — try one of the tags. Ask them to explain it; curiosity is a gift.",
lT:"Legacy AI · Grandma",lS:"Answers are based on the memories she saved",lPh:"Ask Grandma anything…",cT:"Family Time Capsule",cPh:"Write a story, advice or voice-note transcript…",sv:"Save memory",st:"Storage",
mT:"Love Mailbox",mPh:"Write a message to the family…",send:"Send",gentle:"This may sound harsh. Gentler version:",use:"Use this",any:"Send anyway",
hT:"Scam & Content Shield",hPh:"Paste a text message or call transcript…",scan:"Scan",safe:"SAFE",danger:"DANGER",hSafe:"No scam patterns found. Still, never share OTP codes.",hBad:"Red flags found: {n}. Do NOT reply, click or transfer money. Call a family member.",
pT:"Unlock unlimited family connection",pS:"You've used all 5 free AI requests.",cur:"Current",sim:"Simulate Upgrade / Checkout",paid:"Payment successful — welcome to {p}!",close:"Close",speak:"Listen",mic:"Dictate",
f1:"5 AI requests / month, basic features",f2:"Unlimited Slang Decoding",f3:"10GB Time Capsule",f4:"Voice Assistant",f5:"Unlimited Legacy AI cloning",f6:"Scam Shield protection",f7:"Memory Book export discount",
bond:"Bonding score",msgs:"Messages this week",alerts:"Security alerts",quest:"Today's quests",q1:"Decode a slang word (+5)",q2:"Ask Grandma a question (+5)",welcome:"Welcome home, family!"},
vi:{home:"Trang chủ",slang:"Giải mã tiếng lóng",legacy:"AI Di sản",capsule:"Hộp ký ức",mail:"Hộp thư yêu thương",shield:"Lá chắn lừa đảo",senior:"Cao niên",youth:"Thiếu niên",admin:"Phụ huynh",cr:"Dùng thử: còn {n}/5 lượt",unl:"Không giới hạn · {p}",pts:"Điểm gia đình",
sT:"Giải mã tiếng lóng Gen-Z / Alpha",sS:"Chạm vào một từ hoặc tự nhập",ph:"Nhập từ, ví dụ: rizz…",ask:"Giải mã",why:"Vì sao các bạn trẻ nói vậy",tip:"Cách hòa nhập",unk:"Mình chưa biết từ này — hãy thử các thẻ gợi ý. Hãy nhờ các cháu giải thích, sự tò mò là món quà.",
lT:"AI Di sản · Bà ",lS:"Câu trả lời dựa trên ký ức bà đã lưu",lPh:"Hỏi bà bất cứ điều gì…",cT:"Hộp ký ức gia đình",cPh:"Viết câu chuyện, lời khuyên hoặc ghi chú giọng nói…",sv:"Lưu ký ức",st:"Dung lượng",
mT:"Hộp thư yêu thương",mPh:"Viết lời nhắn cho gia đình…",send:"Gửi",gentle:"Tin nhắn có thể hơi gay gắt. Gợi ý nhẹ nhàng hơn:",use:"Dùng câu này",any:"Vẫn gửi",
hT:"Lá chắn lừa đảo & nội dung",hPh:"Dán tin nhắn hoặc nội dung cuộc gọi…",scan:"Quét",safe:"AN TOÀN",danger:"NGUY HIỂM",hSafe:"Không thấy dấu hiệu lừa đảo. Vẫn tuyệt đối không chia sẻ mã OTP.",hBad:"Phát hiện {n} dấu hiệu đáng ngờ. KHÔNG trả lời, bấm link hay chuyển tiền. Hãy gọi người thân.",
pT:"Mở khóa kết nối gia đình không giới hạn",pS:"Bạn đã dùng hết 5 lượt AI miễn phí.",cur:"Hiện tại",sim:"Mô phỏng nâng cấp / Thanh toán",paid:"Thanh toán thành công — chào mừng đến {p}!",close:"Đóng",speak:"Nghe",mic:"Đọc để nhập",
f1:"5 lượt AI / tháng, tính năng cơ bản",f2:"Giải mã ngôn ngữ GENZ không giới hạn",f3:"Hộp ký ức 10GB",f4:"Trợ lý giọng nói",f5:"Nhân bản AI Di sản không giới hạn",f6:"Bảo vệ chống lừa đảo",f7:"Giảm giá xuất sách ký ức",
bond:"Điểm gắn kết",msgs:"Tin nhắn tuần này",alerts:"Cảnh báo bảo mật",quest:"Nhiệm vụ hôm nay",q1:"Giải mã một từ lóng (+5)",q2:"Hỏi bà một câu (+5)",welcome:"Chào mừng cả nhà!"},
ja:{home:"ホーム",slang:"スラング解読",legacy:"レガシーAI",capsule:"タイムカプセル",mail:"ラブメール",shield:"詐欺シールド",senior:"シニア",youth:"ユース",admin:"保護者",cr:"お試し：残り{n}/5回",unl:"無制限 · {p}",pts:"ファミリーポイント",
sT:"Z世代・α世代スラング解読",sS:"言葉をタップまたは入力",ph:"例：rizz…",ask:"解読",why:"なぜ使うの？",tip:"会話に加わるコツ",unk:"その言葉はまだ知りません。タグを試してみてください。孫に教えてもらうのも素敵です。",
lT:"レガシーAI・ランおばあちゃん",lS:"保存された思い出に基づいて答えます",lPh:"おばあちゃんに聞いてみよう…",cT:"家族タイムカプセル",cPh:"思い出話やアドバイスを書く…",sv:"思い出を保存",st:"容量",
mT:"ラブメール",mPh:"家族へのメッセージ…",send:"送信",gentle:"少しきつい表現かもしれません。やさしい案：",use:"これを使う",any:"そのまま送る",
hT:"詐欺・コンテンツシールド",hPh:"メッセージや通話内容を貼り付け…",scan:"スキャン",safe:"安全",danger:"危険",hSafe:"詐欺の兆候はありません。ただしOTPは絶対に教えないで。",hBad:"怪しい点が{n}件。返信・クリック・送金はしないで、家族に電話を。",
pT:"家族のつながりを無制限に",pS:"無料のAI回数5回を使い切りました。",cur:"現在",sim:"アップグレード／決済をシミュレート",paid:"お支払い完了 — {p}へようこそ！",close:"閉じる",speak:"聞く",mic:"音声入力",
f1:"月5回のAI、基本機能",f2:"スラング解読無制限",f3:"10GBタイムカプセル",f4:"音声アシスタント",f5:"レガシーAI無制限",f6:"詐欺シールド",f7:"思い出ブック割引",
bond:"絆スコア",msgs:"今週のメッセージ",alerts:"セキュリティ警告",quest:"今日のクエスト",q1:"スラングを解読 (+5)",q2:"おばあちゃんに質問 (+5)",welcome:"おかえり、家族のみんな！"},
es:{home:"Inicio",slang:"Decodificador",legacy:"IA Legado",capsule:"Cápsula del tiempo",mail:"Buzón de amor",shield:"Escudo antiestafas",senior:"Mayor",youth:"Joven",admin:"Padres",cr:"Prueba: quedan {n}/5 créditos",unl:"Ilimitado · {p}",pts:"Puntos familiares",
sT:"Decodificador de jerga Gen-Z / Alpha",sS:"Toca una palabra o escribe la tuya",ph:"Escribe una palabra, p. ej. rizz…",ask:"Decodificar",why:"Por qué lo dicen",tip:"Cómo unirte",unk:"Aún no conozco esa palabra; prueba las etiquetas. Pídeles que te la expliquen: la curiosidad es un regalo.",
lT:"IA Legado · Abuela Lan",lS:"Respuestas basadas en los recuerdos que guardó",lPh:"Pregúntale lo que quieras a la abuela…",cT:"Cápsula del tiempo familiar",cPh:"Escribe una historia, consejo o nota de voz…",sv:"Guardar recuerdo",st:"Almacenamiento",
mT:"Buzón de amor",mPh:"Escribe un mensaje a la familia…",send:"Enviar",gentle:"Suena algo duro. Versión más amable:",use:"Usar esta",any:"Enviar igual",
hT:"Escudo contra estafas",hPh:"Pega un mensaje o la transcripción de una llamada…",scan:"Escanear",safe:"SEGURO",danger:"PELIGRO",hSafe:"Sin señales de estafa. Aun así, nunca compartas códigos OTP.",hBad:"Se encontraron {n} señales de alerta. NO respondas, no hagas clic ni transfieras dinero. Llama a un familiar.",
pT:"Desbloquea conexión familiar ilimitada",pS:"Has usado tus 5 solicitudes de IA gratis.",cur:"Actual",sim:"Simular mejora / Pago",paid:"Pago exitoso — ¡bienvenido a {p}!",close:"Cerrar",speak:"Escuchar",mic:"Dictar",
f1:"5 solicitudes IA/mes, funciones básicas",f2:"Decodificación ilimitada",f3:"Cápsula de 10GB",f4:"Asistente de voz",f5:"IA Legado ilimitada",f6:"Escudo antiestafas",f7:"Descuento libro de recuerdos",
bond:"Índice de unión",msgs:"Mensajes esta semana",alerts:"Alertas de seguridad",quest:"Misiones de hoy",q1:"Decodifica una palabra (+5)",q2:"Pregunta a la abuela (+5)",welcome:"¡Bienvenida, familia!"}};
const PLANS=[{id:"free",n:"Free",p:0,f:["f1"]},{id:"plus",n:"Family Plus",p:9.99,f:["f2","f3","f4"]},{id:"pro",n:"Legacy Pro",p:19.99,f:["f2","f5","f6","f7"]}];
const FAM=[["👵","Grandma"],["👨","Dad"],["👩","Mom"],["🧑‍🎤","Brother"],["👧","Sister"]];
const SEED=[{en:"I sold sticky rice at the market at 5am every day. Patience and a warm smile built our whole family.",vi:"Bà bán xôi ở chợ từ 5 giờ sáng mỗi ngày. Kiên nhẫn và nụ cười ấm áp đã xây nên cả gia đình mình."},
{en:"Advice for marriage: never go to sleep angry, and always share the last piece of fruit.",vi:"Lời khuyên hôn nhân: đừng bao giờ đi ngủ khi còn giận nhau, và luôn chia nhau miếng trái cây cuối cùng."},
{en:"My secret to phở broth: charred ginger, star anise, and love simmered for 8 hours.",vi:"Bí quyết nước phở của bà: gừng nướng, hoa hồi và tình thương hầm 8 tiếng."}];
let S=Object.assign({lang:"en",mode:"senior",credits:5,plan:"free",points:0,stories:SEED,tab:"home",mail:[{from:"Dad Minh",t:"Dinner Sunday at Grandma's? 🍲"}],used:3},(()=>{try{return JSON.parse(localStorage.getItem("genlink")||"{}")}catch(e){return{}}})());
let CH={slang:[],legacy:[]},DRAFT="";
const save=()=>{try{localStorage.setItem("genlink",JSON.stringify(S))}catch(e){}};
const t=(k,r={})=>{let s=(I[S.lang]&&I[S.lang][k])||I.en[k]||k;for(const x in r)s=s.replace("{"+x+"}",r[x]);return s};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(m){const e=$("toast");e.textContent=m;e.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>e.style.display="none",2800)}
function use(){if(S.plan==="free"){if(S.credits<=0){openPay();return false}S.credits--}S.points+=5;S.used++;save();head();return true}
function head(){const p=PLANS.find(x=>x.id===S.plan);$("credits").innerHTML=S.plan==="free"?"⚡ "+t("cr",{n:S.credits}):"👑 "+t("unl",{p:p.n});
 $("pts").className="chip"+(S.mode==="youth"?"":" hidden");$("pts").textContent="⭐ "+t("pts")+": "+S.points;
 $("modes").innerHTML=[["senior","sun"],["youth","gamepad-2"],["admin","bar-chart-3"]].map(([m,ic])=>`<button class="tab ${S.mode===m?"on":""}" onclick="S.mode='${m}';save();render()">${t(m)}</button>`).join("");
 document.body.className=S.mode;$("lang").value=S.lang;document.documentElement.lang=S.lang}
function render(){head();const tabs=["home","slang","legacy","capsule","mail","shield"];
 $("nav").innerHTML=tabs.map(x=>`<button class="tab ${S.tab===x?"on":""}" onclick="S.tab='${x}';save();render()">${t(x)}</button>`).join("");
 $("main").innerHTML=V[S.tab]();if(window.lucide)lucide.createIcons()}
const tools=(id,txt)=>`<button class="btn alt" onclick="mic('${id}')">🎤 ${t("mic")}</button>`;
const TTS={en:"en-US",vi:"vi-VN",ja:"ja-JP",es:"es-ES"};
function speak(txt){try{const u=new SpeechSynthesisUtterance(txt);u.lang=TTS[S.lang];u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){toast("TTS n/a")}}
function mic(id){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return toast("Voice dictation not supported in this browser");const r=new R();r.lang=TTS[S.lang];r.onresult=e=>{$(id).value+=e.results[0][0].transcript};r.start()}
function chat(k){return CH[k].map((m,i)=>`<div class="bub ${m.me?"me":"ai"}">${esc(m.t)}${m.me?"":`<button class="ml-2" onclick="speak(CH.${k}[${i}].t)">🔊</button>`}</div>`).join("")}
const V={
home(){const adm=S.mode==="admin";let h=`<h1 class="text-2xl font-bold mb-3">${t("welcome")}</h1><div class="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">${FAM.map(f=>`<div class="card text-center"><div class="text-4xl">${f[0]}</div><b>${f[1]}</b><div class="opacity-60 text-sm">${f[2]}</div></div>`).join("")}</div>`;
 if(adm){h+=`<div class="grid sm:grid-cols-3 gap-3"><div class="card"><b>${t("bond")}</b><div class="text-4xl font-bold" style="color:var(--acc)">${Math.min(99,72+S.used*2)}%</div></div>
 <div class="card"><b>${t("msgs")}</b><div class="flex items-end gap-1 h-20 mt-2">${[4,7,3,9,6,11,8].map(v=>`<div class="flex-1 rounded" style="height:${v*8}px;background:var(--acc)"></div>`).join("")}</div></div>
 <div class="card"><b>${t("st")}</b><div class="bg-black/10 rounded-full h-3 mt-3"><div class="h-3 rounded-full" style="width:${Math.min(100,S.stories.length*4)}%;background:var(--acc)"></div></div><small>${(S.stories.length*0.2).toFixed(1)} / ${S.plan==="free"?"1":"10"} GB</small></div>
 <div class="card sm:col-span-3"><b>🛡️ ${t("alerts")}</b><p class="mt-1">⚠️ Grandma Lan received a suspicious "bank" text (blocked).</p><p>✅ 2FA active on 5/5 accounts.</p></div></div>`}
 else if(S.mode==="youth")h+=`<div class="card"><b>🎯 ${t("quest")}</b><p class="mt-2">⚡ ${t("q1")}</p><p>💬 ${t("q2")}</p></div>`;
 else h+=`<div class="grid sm:grid-cols-2 gap-3">${["slang","legacy","mail","shield"].map(x=>`<button class="btn !py-6 !text-xl" onclick="S.tab='${x}';render()">${t(x)}</button>`).join("")}</div>`;return h},
slang(){return `<div class="card"><h2 class="text-xl font-bold">${t("sT")}</h2><p class="mb-2">${t("sS")}</p><div class="flex flex-wrap gap-2 mb-3">${TAGS.map(k=>`<span class="chip" title="${esc((SL[k]||{})[S.lang]||k)}" onclick="decode('${k}')">#${k}</span>`).join("")}</div>
 <div class="flex gap-2"><input id="sIn" placeholder="${t("ph")}" onkeydown="if(event.key==='Enter')decode()">${tools("sIn")}<button class="btn" onclick="decode()">${t("ask")}</button></div><div class="mt-3">${chat("slang")}</div></div>`},
legacy(){return `<div class="card"><h2 class="text-xl font-bold">👵 ${t("lT")}</h2><p class="mb-2">${t("lS")}</p><div>${chat("legacy")}</div><div class="flex gap-2 mt-3"><input id="lIn" placeholder="${t("lPh")}" onkeydown="if(event.key==='Enter')ask()">${tools("lIn")}<button class="btn" onclick="ask()">${t("send")}</button></div></div>`},
capsule(){return `<div class="card"><h2 class="text-xl font-bold">📦 ${t("cT")}</h2><textarea id="cIn" rows="3" placeholder="${t("cPh")}"></textarea><div class="flex gap-2 my-2">${tools("cIn")}<button class="btn" onclick="addStory()">${t("sv")}</button></div>
 ${S.stories.map(s=>`<div class="bub ai !max-w-full">📖 ${esc(typeof s==="string"?s:(s[S.lang]||s.en))}</div>`).join("")}</div>`},
mail(){return `<div class="card"><h2 class="text-xl font-bold">💌 ${t("mT")}</h2>${S.mail.map(m=>`<div class="bub ${m.from==="You"?"me":"ai"}"><b>${esc(m.from)}</b>: ${esc(m.t)}</div>`).join("")}
 <textarea id="mIn" rows="3" placeholder="${t("mPh")}">${esc(DRAFT)}</textarea><div id="mSug"></div><div class="flex gap-2 mt-2">${tools("mIn")}<button class="btn" onclick="mailSend()">${t("send")}</button></div></div>`},
shield(){return `<div class="card"><h2 class="text-xl font-bold">🛡️ ${t("hT")}</h2><textarea id="hIn" rows="4" placeholder="${t("hPh")}"></textarea><div class="flex gap-2 my-2">${tools("hIn")}<button class="btn" onclick="scan()">${t("scan")}</button></div><div id="hOut"></div></div>`}};

function addStory(){const v=$("cIn").value.trim();if(!v)return;S.stories.unshift(v);save();toast("✅ "+t("sv"));render()}

function mailPost(){S.mail.push({from:"You",t:DRAFT});DRAFT="";save();render()}

function openPay(){$("payBox").innerHTML=`<div class="text-center mb-3"><h2 class="text-2xl font-bold">${t("pT")}</h2><p>${S.credits<=0&&S.plan==="free"?t("pS"):""}</p></div><div class="grid sm:grid-cols-3 gap-3">${PLANS.map(p=>`<div class="card border-2 ${p.id==="pro"?"border-[var(--acc)]":"border-transparent"}"><b class="text-lg">${p.n}</b><div class="text-3xl font-bold my-1">$${p.p}<small class="text-base">/mo</small></div><ul class="mb-3 text-sm space-y-1">${p.f.map(f=>`<li>✔ ${t(f)}</li>`).join("")}</ul>${S.plan===p.id?`<span class="chip">${t("cur")}</span>`:p.id==="free"?"":`<button class="btn w-full" onclick="upg('${p.id}')">${t("sim")}</button>`}</div>`).join("")}</div><div class="text-center mt-3"><button class="btn alt" onclick="closePay()">${t("close")}</button></div>`;$("pay").classList.remove("hidden");$("pay").classList.add("flex")}
function closePay(){$("pay").classList.add("hidden");$("pay").classList.remove("flex")}

render();

async function decode(w){const el=$('sIn');w=(w||el.value).trim().toLowerCase().replace(/[#\s]/g,'');if(!w)return;
 const j=await api('/api/slang',{word:w,lang:S.lang});if(!j)return;CH.slang.push({me:1,t:'#'+w},{t:j.reply});render()}
async function ask(){const q=$('lIn').value.trim();if(!q)return;
 const j=await api('/api/legacy',{question:q,lang:S.lang,stories:S.stories.map(s=>typeof s==='string'?s:(s[S.lang]||s.en))});if(!j)return;
 CH.legacy.push({me:1,t:q},{t:j.reply});render()}
async function mailSend(){const v=$('mIn').value.trim();if(!v)return;DRAFT=v;
 const j=await api('/api/mediate',{text:v,lang:S.lang});if(!j)return;
 if(j.aggressive){SUG=j.suggestion;$('mSug').innerHTML=`<div class="bub ai !max-w-full">🤖 ${t('gentle')}<br><b>${esc(SUG)}</b><div class="flex gap-2 mt-2"><button class="btn" onclick="DRAFT=SUG;mailPost()">${t('use')}</button><button class="btn alt" onclick="mailPost()">${t('any')}</button></div></div>`}else mailPost()}
async function scan(){const v=$('hIn').value;if(!v.trim())return;const j=await api('/api/scan',{text:v,lang:S.lang});if(!j)return;const n=j.flags;
 $('hOut').innerHTML=`<div class="text-center rounded-2xl p-5 text-white" style="background:${n?'#dc2626':'#16a34a'}"><div class="text-5xl font-black">${n?'⛔ '+t('danger'):'✅ '+t('safe')}</div><p class="mt-2 text-lg">${n?t('hBad',{n}):t('hSafe')}</p></div>`;if(S.mode==='senior')speak(n?t('danger'):t('safe'))}
async function upg(id){const j=await api('/api/upgrade',{plan:id});if(!j)return;closePay();toast('💳 '+t('paid',{p:PLANS.find(x=>x.id===id).n}));render()}
api('/api/glossary').then(j=>{if(j)SL=j;return api('/api/me')}).then(j=>{if(j)render()});