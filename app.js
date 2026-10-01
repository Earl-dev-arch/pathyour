const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const state = {
  user: JSON.parse(localStorage.getItem("yp_user") || "null"),
  answers: JSON.parse(localStorage.getItem("yp_answers") || "{}"),
  saved: JSON.parse(localStorage.getItem("yp_saved") || "[]"),
  qIndex: 0
};

const questions = [
 {type:"SCENARIO",q:"You have an entire Saturday free and nobody tells you what to do. What would you naturally spend several hours doing?",kind:"single",opts:["Building, fixing or experimenting with something","Creating art, stories, music, designs or videos","Reading, researching or going down a curiosity rabbit hole","Helping, teaching, organizing or spending time with people","Playing games, exploring systems or solving challenges"]},
 {type:"MULTIPLE CHOICE",q:"Which school subjects do you genuinely enjoy or want to understand more deeply?",kind:"multi",opts:["Mathematics","Science","Computer / ICT","Languages","Arts / Design","Social sciences / Psychology","Business / Economics","Hands-on / technical subjects"]},
 {type:"RANKING",q:"Rank the activities that sound most satisfying to you.",kind:"rank",opts:["Solve a difficult problem","Make something original","Explain an idea to someone","Investigate how something works","Lead a group toward a goal"]},
 {type:"SCALE",q:"I enjoy working through a problem even when the answer is not obvious.",kind:"scale"},
 {type:"SCALE",q:"I notice patterns, inconsistencies or details that other people may miss.",kind:"scale"},
 {type:"MULTIPLE CHOICE",q:"When learning something new, which approach feels most natural?",kind:"single",opts:["Try it hands-on first","Read/watch a clear explanation","Discuss it with someone","Explore independently and connect ideas","Follow a structured course step by step"]},
 {type:"SCENARIO",q:"A team project is going badly. What role would you naturally take?",kind:"single",opts:["Figure out what is technically wrong","Generate a new approach","Coordinate people and deadlines","Research the problem and evidence","Support teammates and keep communication healthy"]},
 {type:"MULTIPLE CHOICE",q:"Which working environment sounds most comfortable?",kind:"single",opts:["Mostly independent","Small collaborative team","Large social/team environment","A mix of focused work and collaboration","Fast-changing environment with lots of variety"]},
 {type:"SCALE",q:"I would rather become excellent at a difficult skill than choose the easiest route.",kind:"scale"},
 {type:"MULTIPLE CHOICE",q:"Which outcome motivates you most?",kind:"single",opts:["Understanding something deeply","Creating something people can use","Helping people directly","Winning a challenge or reaching a measurable goal","Having freedom to choose what I work on"]},
 {type:"MULTIPLE CHOICE",q:"Which type of task do you tend to avoid?",kind:"single",opts:["Repetitive paperwork","Constant social interaction","Ambiguous problems with no clear answer","Highly competitive environments","Creative tasks with no clear starting point"]},
 {type:"OPEN",q:"What is something you can talk about, watch, read or experiment with for a long time without being told to?",kind:"open"},
 {type:"OPEN",q:"What is a skill you wish you could develop over the next few years, and why?",kind:"open"},
 {type:"SCENARIO",q:"Imagine money, popularity and other people's opinions did not matter. Which direction would you be most curious to test?",kind:"single",opts:["Technology / computing","Science / research","Design / creative work","People / psychology / education","Business / entrepreneurship","Engineering / making things","Environment / health / society"]},
 {type:"MULTIPLE CHOICE",q:"How do you feel about being responsible for other people's decisions?",kind:"single",opts:["I like it","I could grow into it","I prefer responsibility for my own work","I prefer contributing without leading","It depends on the situation"]},
 {type:"MULTIPLE CHOICE",q:"What would make a career feel meaningful to you?",kind:"single",opts:["Solving important problems","Creating useful or beautiful things","Improving people's lives","Discovering new knowledge","Building something that lasts","Having independence and flexibility"]},
 {type:"SCALE",q:"I would keep exploring a subject even if nobody praised me for it.",kind:"scale"},
 {type:"MULTIPLE CHOICE",q:"Which learning environment would you prefer?",kind:"single",opts:["University-style theory and lectures","Project-based learning","Apprenticeship / hands-on training","Research-oriented environment","A flexible mix of online and in-person learning"]},
 {type:"OPEN",q:"What career or education path do you currently feel expected to choose, if any? Who or what creates that expectation?",kind:"open"},
 {type:"OPEN",q:"If you could test one career for one month with no consequences, what would you try and what would you hope to learn?",kind:"open"}
];

const pathways = [
 {name:"Data Science & Analytics",icon:"◈",tag:"Analytical + curious",reason:"Fits students who enjoy patterns, evidence, problem solving and exploring questions with data.",skills:"Statistics, Python, SQL, communication",edu:"Math / science + CS or statistics / data degree",work:"Focused independent work + collaboration",challenge:"Can involve abstract math, messy data and long debugging cycles",alt:"Economics, BI, research, quantitative analysis"},
 {name:"Psychology & Behaviour",icon:"◉",tag:"People + research",reason:"Fits curiosity about people, behaviour, communication and evidence-based questions.",skills:"Research methods, writing, statistics, listening",edu:"Social science + psychology / related degree",work:"People-facing + research",challenge:"Further study may be useful for some specialist roles",alt:"UX research, HR, education, behavioural science"},
 {name:"UX / Product Design",icon:"◇",tag:"Creative + problem solving",reason:"Fits people who enjoy understanding users, creating ideas and improving how things work.",skills:"Design, prototyping, research, communication",edu:"Design / HCI / CS / portfolio routes",work:"Highly collaborative",challenge:"Requires iteration, critique and a strong portfolio",alt:"Product management, UX research, visual design"},
 {name:"Environmental Science",icon:"♧",tag:"Science + impact",reason:"Fits curiosity about natural systems, evidence and real-world environmental problems.",skills:"Research, data, field methods, communication",edu:"Science subjects + environmental degree",work:"Field + lab + collaborative work",challenge:"Some roles involve fieldwork and location constraints",alt:"Geoscience, conservation, sustainability"},
 {name:"Software Engineering",icon:"</>",tag:"Logical + builder",reason:"Fits students who enjoy constructing systems, debugging and learning technical tools.",skills:"Programming, algorithms, teamwork, systems thinking",edu:"CS / software / engineering or strong portfolio route",work:"Focused building + team collaboration",challenge:"Continuous learning and debugging are part of the job",alt:"Cybersecurity, cloud, QA, developer tools"},
 {name:"Cybersecurity",icon:"⌁",tag:"Systems + investigation",reason:"Fits curiosity about how systems fail, protecting information and solving unusual problems.",skills:"Networking, Linux, security concepts, scripting",edu:"CS / IT / cybersecurity + labs and certifications",work:"Independent investigation + team response",challenge:"Requires constant learning and careful documentation",alt:"Network engineering, digital forensics, cloud security"},
 {name:"Engineering & Computational Science",icon:"△",tag:"Math + making",reason:"Fits students who like physics, systems, mathematical models and building practical solutions.",skills:"Math, modelling, programming, technical communication",edu:"Math/science + engineering or computational degree",work:"Technical team + project work",challenge:"Can be mathematically demanding and specialized",alt:"Robotics, simulation, systems engineering"},
 {name:"Business & Entrepreneurship",icon:"↗",tag:"Initiative + people",reason:"Fits students motivated by building ideas, decision-making, communication and measurable outcomes.",skills:"Communication, finance, market research, leadership",edu:"Business/economics or mixed academic routes",work:"High collaboration + uncertainty",challenge:"Income and outcomes can be less predictable",alt:"Marketing, operations, product, finance"}
];

function save(){localStorage.setItem("yp_user",JSON.stringify(state.user));localStorage.setItem("yp_answers",JSON.stringify(state.answers));localStorage.setItem("yp_saved",JSON.stringify(state.saved))}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function showPage(id){$$(".page").forEach(p=>p.classList.remove("active"));const p=$("#"+id);if(p)p.classList.add("active");window.scrollTo({top:0,behavior:"smooth"});$$(".mobile-menu").forEach(x=>x.classList.remove("open"))}
function requireLogin(){if(!state.user){openModal("authModal");return false}showPage("dashboard");return true}
function openModal(id){$("#"+id).classList.remove("hidden")}
function closeModal(id){$("#"+id).classList.add("hidden")}

$$("[data-nav]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const id=a.dataset.nav;if(id==="home"||id==="explore"||id==="roadmap"||id==="resources"||id==="about")showPage(id);else showPage("dashboard")}));
$("#mobileMenuBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");
$("#loginBtn").onclick=()=>{openModal("authModal");switchAuth("login")};
$("#signupBtn").onclick=()=>{openModal("authModal");switchAuth("signup")};
$("#heroStart").onclick=()=>{if(requireLogin()){activateDash("questionnaire")}};
$("#roadmapLogin").onclick=()=>{if(requireLogin())activateDash("roadmaps")};
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$("#privacyBtn").onclick=$("#privacyFooter").onclick=()=>openModal("privacyModal");

function switchAuth(which){$$(".auth-tab").forEach(b=>b.classList.toggle("active",b.dataset.auth===which));$("#loginFormWrap").classList.toggle("hidden",which!=="login");$("#signupFormWrap").classList.toggle("hidden",which!=="signup")}
$$(".auth-tab").forEach(b=>b.onclick=()=>switchAuth(b.dataset.auth));

$("#signupForm").addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target);state.user=Object.fromEntries(d.entries());state.user.role="student";state.answers={};state.saved=[];save();closeModal("authModal");updateUI();showPage("dashboard");activateDash("overview");toast("Account created. Welcome to Your Path!");
});
$("#loginForm").addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target);const email=d.get("email"),pw=d.get("password");
 if(email==="admin@yourpath.demo"&&pw==="admin123"){state.user={name:"Admin",email,role:"admin",grade:"College"}}
 else {state.user=state.user||{name:email.split("@")[0],email,role:"student",grade:"Grade 10"}}
 save();closeModal("authModal");updateUI();showPage("dashboard");activateDash("overview");toast("Logged in.");
});
$("#logoutBtn").onclick=()=>{state.user=null;save();showPage("home");toast("Logged out.")};

function activateDash(name){
 if(!requireLogin())return;
 $$(".side-link").forEach(b=>b.classList.toggle("active",b.dataset.dash===name));
 $$(".dash-panel").forEach(p=>p.classList.toggle("active",p.id==="dash-"+name));
 if(name==="questionnaire")renderQuestion();
 if(name==="analysis")renderAnalysis();
 if(name==="pathways"){renderPathways("#pathwayGrid")}
 if(name==="roadmaps")renderRoadmap();
 if(name==="saved")renderSaved();
 if(name==="compare")renderCompare();
 if(name==="profile")loadProfile();
}
$$("[data-dash]").forEach(b=>b.addEventListener("click",()=>activateDash(b.dataset.dash)));

function updateUI(){
 const logged=!!state.user;
 $(".desktop-nav").style.opacity="1";
 if(logged){$("#welcomeName").textContent=`Welcome back, ${state.user.name||"there"}! 👋`;$("#loginBtn").textContent="Dashboard";$("#signupBtn").textContent="Profile";$("#loginBtn").onclick=()=>{showPage("dashboard");activateDash("overview")};$("#signupBtn").onclick=()=>{showPage("dashboard");activateDash("profile")}}
 else {$("#loginBtn").textContent="Log in";$("#signupBtn").textContent="Sign up";$("#loginBtn").onclick=()=>{openModal("authModal");switchAuth("login")};$("#signupBtn").onclick=()=>{openModal("authModal");switchAuth("signup")}}
 $$(".admin-only").forEach(x=>x.classList.toggle("admin-visible",state.user?.role==="admin"));
 $("#completionStat").textContent=`${Math.round(Object.keys(state.answers).length/questions.length*100)}%`;
 $("#savedStat").textContent=state.saved.length;
 renderTop();
}
function renderTop(){
 $("#topPathways").innerHTML=pathways.slice(0,4).map((p,i)=>`<div class="path-mini"><span class="path-icon">${p.icon}</span><span><b>${p.name}</b><small>${p.tag}</small></span><em class="match-tag">${i<2?"Explore":"Good fit to investigate"}</em></div>`).join("");
}

function renderQuestion(){
 const q=questions[state.qIndex];$("#qProgress").textContent=`${state.qIndex+1} / ${questions.length}`;
 let body="";
 if(q.kind==="single"||q.kind==="multi"){
  const current=state.answers[state.qIndex]||[];
  body=`<div class="options">${q.opts.map((o,i)=>`<label class="option ${current.includes(o)?"selected":""}"><input type="${q.kind==="single"?"radio":"checkbox"}" name="q" value="${escapeHtml(o)}" ${current.includes(o)?"checked":""}> <span>${escapeHtml(o)}</span></label>`).join("")}</div>`;
 } else if(q.kind==="scale"){
  const current=state.answers[state.qIndex]||"";
  body=`<div class="scale">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="q" value="${n}" ${String(current)===String(n)?"checked":""}>${n}<small>${n===1?"Not me":n===5?"Very much":" "}</small></label>`).join("")}</div>`;
 } else if(q.kind==="open"){
  body=`<textarea class="open-answer" id="openAnswer" placeholder="Write honestly — there is no right answer.">${escapeHtml(state.answers[state.qIndex]||"")}</textarea>`;
 } else if(q.kind==="rank"){
  const current=state.answers[state.qIndex]||q.opts.map((_,i)=>i+1);
  body=`<div class="rank-list">${q.opts.map((o,i)=>`<div class="rank-item"><span>${o}</span><select data-rank="${i}">${q.opts.map((_,n)=>`<option value="${n+1}" ${String(current[i])===String(n+1)?"selected":""}>${n+1}</option>`).join("")}</select></div>`).join("")}</div>`;
 }
 $("#questionnaireBox").innerHTML=`<div class="question-card"><div class="question-type">${q.type}</div><h3>${q.q}</h3>${body}<p class="q-helper">Tip: choose what is actually true for you, not what sounds impressive.</p><div class="question-nav"><button class="btn btn-soft" id="qPrev" ${state.qIndex===0?"disabled":""}>← Back</button><button class="btn btn-primary" id="qNext">${state.qIndex===questions.length-1?"Finish analysis":"Next →"}</button></div></div>`;
 $$("#questionnaireBox input").forEach(inp=>inp.addEventListener("change",captureQuestion));
 $$("#questionnaireBox select").forEach(inp=>inp.addEventListener("change",captureQuestion));
 $("#openAnswer")?.addEventListener("input",captureQuestion);
 $("#qPrev").onclick=()=>{captureQuestion();state.qIndex=Math.max(0,state.qIndex-1);renderQuestion()};
 $("#qNext").onclick=()=>{captureQuestion();if(state.qIndex<questions.length-1){state.qIndex++;renderQuestion()}else{save();activateDash("analysis");toast("Analysis prepared from your responses.")}};
}
function captureQuestion(){
 const q=questions[state.qIndex];
 if(q.kind==="open"){state.answers[state.qIndex]=$("#openAnswer")?.value||""}
 else if(q.kind==="rank"){state.answers[state.qIndex]=$$("#questionnaireBox [data-rank]").map(s=>s.value)}
 else if(q.kind==="multi"){state.answers[state.qIndex]=$$("#questionnaireBox input[name=q]:checked").map(x=>x.value)}
 else {state.answers[state.qIndex]=$$("#questionnaireBox input[name=q]:checked")[0]?.value||""}
 save();
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderAnalysis(){
 const answered=Object.keys(state.answers).length;
 $("#analysisIntro").textContent=answered<questions.length?`You have answered ${answered} of ${questions.length}. You can still review and retake the questionnaire.`:"Your responses point to several themes. These are hypotheses to test, not a final career verdict.";
 const pressure = answered>=12 ? "Some responses may indicate that expectations around a career choice deserve reflection. This is an indicator, not a claim about what you think." : "There is not enough response data yet to interpret external pressure responsibly.";
 $("#analysisContent").innerHTML=`
 <div class="analysis-grid">
  <div class="analysis-card"><h3>Interest signals</h3><div class="chips"><span class="chip">Curiosity</span><span class="chip">Problem solving</span><span class="chip">Independent learning</span><span class="chip">Creating things</span></div><p>These themes appear across different question types. Repeated patterns are more informative than a single selection.</p></div>
  <div class="analysis-card"><h3>Working style</h3><p><b>Possible preference:</b> focused work with opportunities to collaborate when the problem requires it.</p><p><b>Explore:</b> try both a solo project and a team project before deciding what you prefer.</p></div>
  <div class="analysis-card"><h3>Development areas</h3><p>Communication, technical depth and project planning can be developed regardless of which pathway you eventually choose.</p></div>
  <div class="analysis-card"><h3>External-pressure reflection</h3><div class="notice">${pressure}</div></div>
  <div class="analysis-card" style="grid-column:1/-1"><h3>Contradictions to investigate</h3><p>Instead of hiding inconsistencies, Your Path flags them for reflection. For example: if a student selects a career as a strong preference but repeatedly describes disliking its core activities, the system should ask a follow-up question rather than force a match.</p><button class="btn btn-soft" onclick="activateDash('questionnaire')">Review answers</button></div>
 </div>`;
}

function renderPathways(target){
 const box=$(target);box.innerHTML=pathways.map((p,i)=>`<article class="pathway-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p class="reason">${p.reason}</p><p><b>Skills:</b> ${p.skills}</p><p><b>Education:</b> ${p.edu}</p><p><b>Work style:</b> ${p.work}</p><p><b>Challenge:</b> ${p.challenge}</p><p><b>Alternatives:</b> ${p.alt}</p><div class="pathway-actions"><button class="small-btn save" onclick="toggleSave('${p.name}')">♡ ${state.saved.includes(p.name)?"Saved":"Save"}</button><button class="small-btn" onclick="showPathDetails('${p.name}')">Details</button></div></article>`).join("");
}
function toggleSave(name){if(state.saved.includes(name))state.saved=state.saved.filter(x=>x!==name);else state.saved.push(name);save();updateUI();renderPathways("#pathwayGrid");renderSaved();toast(state.saved.includes(name)?"Pathway saved.":"Pathway removed.")}
function renderSaved(){const box=$("#savedContent");box.innerHTML=state.saved.length?state.saved.map(n=>{const p=pathways.find(x=>x.name===n);return `<div class="card" style="margin-bottom:10px"><b>${p.name}</b><p>${p.reason}</p><button class="small-btn" onclick="toggleSave('${p.name}')">Remove</button></div>`}).join(""):`<div class="card"><p>You have not saved a pathway yet. Explore a few options and save the ones you want to investigate.</p></div>`}
function renderCompare(){
 const chosen=pathways.slice(0,4);$("#compareContent").innerHTML=`<table class="compare-table"><thead><tr><th>Feature</th>${chosen.map(p=>`<th>${p.name}</th>`).join("")}</tr></thead><tbody>
 <tr><th>Why it matches</th>${chosen.map(p=>`<td>${p.reason}</td>`).join("")}</tr>
 <tr><th>Skills</th>${chosen.map(p=>`<td>${p.skills}</td>`).join("")}</tr>
 <tr><th>Education</th>${chosen.map(p=>`<td>${p.edu}</td>`).join("")}</tr>
 <tr><th>Work style</th>${chosen.map(p=>`<td>${p.work}</td>`).join("")}</tr>
 <tr><th>Challenges</th>${chosen.map(p=>`<td>${p.challenge}</td>`).join("")}</tr>
 </tbody></table>`}
function renderRoadmap(){
 const grade=state.user?.grade||"Grade 10";$("#roadmapContent").innerHTML=`<div class="roadmap-card"><h3>Example roadmap for ${grade}</h3><p>This is a prototype. A production system should generate the details from the student's current grade, country, target universities and chosen pathway.</p><div class="timeline"><div><h4>Next 30 days</h4><p>Explore 2–3 pathways, interview someone in a field, try one small project and record what you enjoyed/disliked.</p></div><div><h4>Next 6 months</h4><p>Build a portfolio project, join a relevant club/competition, strengthen prerequisite subjects and research programs.</p></div><div><h4>Next 1–2 years</h4><p>Deepen skills, create stronger evidence of interest, compare degree routes and prepare applications or entrance requirements.</p></div></div></div>`}
function loadProfile(){const f=$("#profileForm"),u=state.user||{};for(const el of f.elements){if(el.name&&u[el.name]!=null)el.value=u[el.name]}}
$("#profileForm").addEventListener("submit",e=>{e.preventDefault();Object.assign(state.user,Object.fromEntries(new FormData(e.target).entries()));save();updateUI();toast("Profile saved.")});
$("#feedbackForm").addEventListener("submit",e=>{e.preventDefault();localStorage.setItem("yp_feedback",JSON.stringify(Object.fromEntries(new FormData(e.target).entries())));toast("Thank you — feedback saved in this demo.");e.target.reset()});
$("#refreshPathways").onclick=()=>{renderPathways("#pathwayGrid");toast("Pathway set refreshed.")};
function showPathDetails(name){const p=pathways.find(x=>x.name===name);openModal("privacyModal");$(".wide-modal").querySelector("h2").textContent=p.name;$(".wide-modal").querySelector("p").textContent=`${p.reason} This prototype intentionally uses example pathway data; a production version should fetch current, cited information for salaries, demand, admissions and universities.`}

$("#publicPathways").innerHTML=pathways.map(p=>`<article class="pathway-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p>${p.reason}</p><p><b>Explore:</b> ${p.alt}</p><button class="small-btn" onclick="requireLogin()">Personalize this</button></article>`).join("");

$("#cookieAccept").onclick=()=>{localStorage.setItem("yp_cookie","accepted");$("#cookieBanner").style.display="none";toast("Cookie preference saved.")};
$("#cookieReject").onclick=()=>{localStorage.setItem("yp_cookie","essential");$("#cookieBanner").style.display="none";toast("Essential-only preference saved.")};
$("#cookieSettings").onclick=()=>{$("#cookieBanner").style.display="flex"};
if(localStorage.getItem("yp_cookie"))$("#cookieBanner").style.display="none";

updateUI();
