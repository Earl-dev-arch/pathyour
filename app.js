const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORE={user:"yp_user_v3",answers:"yp_answers_v3",saved:"yp_saved_v3",cookie:"yp_cookie_v3",session:"yp_question_session_v3"};
const state={user:JSON.parse(localStorage.getItem(STORE.user)||"null"),answers:JSON.parse(localStorage.getItem(STORE.answers)||"{}"),saved:JSON.parse(localStorage.getItem(STORE.saved)||"[]"),session:JSON.parse(localStorage.getItem(STORE.session)||"null"),qIndex:0};

const categoryConfig=[
 {id:"interests",label:"Genuine interests",weight:14,types:["scenario","single","multi"]},
 {id:"subjects",label:"Subjects & curiosity",weight:10,types:["multi","single","open"]},
 {id:"problem",label:"Problem solving",weight:12,types:["scenario","scale","single"]},
 {id:"creativity",label:"Creativity",weight:9,types:["scenario","single","open"]},
 {id:"communication",label:"Communication & people",weight:10,types:["scenario","single","rank"]},
 {id:"workstyle",label:"Working style",weight:11,types:["single","scale","scenario"]},
 {id:"motivation",label:"Motivation",weight:9,types:["single","scenario","open"]},
 {id:"learning",label:"Learning environment",weight:8,types:["single","scale","rank"]},
 {id:"pressure",label:"External pressure",weight:9,types:["scenario","single","open"]},
 {id:"values",label:"Values & long-term direction",weight:8,types:["single","scenario","open"]}
];

const contexts=[
"when you have a free weekend","during a school project","when nobody is grading you","when you are choosing an extracurricular activity","when you discover a new topic online"
];

const seedByCategory={
interests:[
"What activity would you naturally keep doing after the first hour because you are genuinely absorbed?",
"If you had to spend a month exploring one unfamiliar area, which kind of exploration would hold your attention?",
"Which type of question makes you want to search for the answer instead of moving on?",
"When a hobby becomes difficult, what usually makes you continue?",
"What kind of result makes you feel that an activity was worth your time?",
"Which type of project would you open voluntarily without being assigned it?",
"What topic could you imagine discussing for a long time without needing external praise?",
"When you see someone demonstrating a skill, what makes you want to try it yourself?",
"Which activity gives you the strongest feeling of curiosity rather than obligation?",
"What kind of challenge would you choose if several options were equally available?",
"Which part of a new field do you usually want to understand first?",
"What kind of problem makes you lose track of time?",
"Which type of content do you most often return to after discovering it once?",
"When you have a completely open afternoon, what kind of activity is most tempting?",
"What kind of project would you be willing to restart after failing the first attempt?",
"Which kind of discovery feels most satisfying to you?",
"What makes you think, 'I want to learn how to do that'?",
"Which activity would you keep exploring even if your friends were uninterested?",
"Which kind of curiosity has stayed with you for more than a few months?",
"What would you choose to investigate if there were no reward, grade, status or audience?"
],
subjects:[
"Which school subject would you choose to study more deeply if you could remove grades from the decision?",
"Which subject has concepts you enjoy connecting with real-world examples?",
"When a lesson is difficult, which kind of subject makes you most willing to persist?",
"Which combination of subjects feels most interesting when you imagine studying them together?",
"What kind of school assignment do you tend to improve beyond the minimum?",
"Which subject would you like to understand well enough to teach someone else?",
"Which subject would you choose for an independent mini-project?",
"Which type of class makes you ask follow-up questions most often?",
"Which subject would you miss most if it disappeared from your schedule?",
"Which subject feels most useful for solving real problems you care about?",
"Which subject do you enjoy even when the teacher is not especially entertaining?",
"Which subject-related skill would you like to become noticeably stronger at?",
"Which subject creates the most interesting questions for you outside class?",
"Which subject would you combine with technology, design or business?",
"Which school topic have you explored voluntarily outside the curriculum?",
"Which subject would you investigate through a documentary, book or experiment?",
"Which subject has changed the way you look at everyday situations?",
"Which subject feels difficult but still rewarding?",
"Which subject would you choose if you could design your own elective?",
"Which subject area could you imagine studying for several years without needing a quick payoff?"
],
problem:[
"When a problem has no obvious answer, what is your first instinct?",
"When a solution fails, what do you naturally do next?",
"Which part of solving a complicated problem feels most satisfying?",
"When several explanations are possible, how do you decide what to investigate first?",
"What kind of puzzle or challenge keeps your attention longest?",
"How do you react when a problem requires several attempts before it works?",
"When instructions are incomplete, what do you tend to do?",
"Which approach sounds most natural when a system is behaving unexpectedly?",
"How do you handle a task that looks too large to finish at first?",
"What makes you trust that a solution is actually working?",
"When you notice a mistake, what do you want to know before fixing it?",
"Which kind of evidence helps you change your mind about a solution?",
"When two good solutions exist, what usually matters most to you?",
"How do you approach a problem where people disagree about the cause?",
"What part of debugging or troubleshooting do you find most interesting?",
"How comfortable are you breaking a large problem into smaller tests?",
"What kind of problem would you willingly solve just for the challenge?",
"When a solution works by accident, what are you most likely to do?",
"How do you respond when a familiar method stops working?",
"What kind of problem would you like to become unusually good at solving?"
],
creativity:[
"When you are asked to make something original, where do your ideas usually come from?",
"What kind of creative constraint makes you more interested rather than less interested?",
"When you see a design you like, what do you notice first?",
"Which kind of creative project would you keep refining after it was technically finished?",
"How do you react when someone critiques something you created?",
"What kind of medium would you choose to communicate an idea?",
"When a blank page feels intimidating, what helps you start?",
"Which part of creating something feels best: imagining, making, testing or polishing?",
"What kind of unusual combination of ideas sounds fun to explore?",
"When you redesign something, what do you focus on first?",
"Which creative task would you try without worrying whether you are already good at it?",
"How important is personal style when you make something?",
"What kind of feedback makes you want to improve a creative project?",
"Which kind of visual, written or interactive work grabs your attention?",
"When a creative project has no single correct answer, how do you feel?",
"What would you create if you had to teach an idea without using a normal lecture?",
"How often do you find yourself changing an existing idea to make it your own?",
"Which type of creativity feels most natural: visual, technical, verbal, social or practical?",
"What kind of project would you proudly show someone even if it were unfinished?",
"What creative skill would you most like to develop over the next two years?"
],
communication:[
"When working with other people, which contribution feels most natural?",
"How do you usually explain something complicated to someone who is new to it?",
"What kind of conversation makes you want to learn more about another person?",
"When a group disagrees, what role do you tend to take?",
"How comfortable are you asking for clarification when you do not understand?",
"What makes communication feel satisfying to you?",
"When someone is struggling with a task, what do you naturally do?",
"Which kind of group project would you choose voluntarily?",
"How do you react when you need to present an idea to unfamiliar people?",
"What kind of feedback are you most comfortable giving?",
"When someone has a different viewpoint, what makes you curious rather than frustrated?",
"Which communication skill would most improve your future work?",
"How do you balance listening with getting your own idea across?",
"What kind of person do you find easiest to collaborate with?",
"Which role sounds most natural in a team: explainer, organizer, researcher, builder or mediator?",
"When a team succeeds, which part of the process gives you the most satisfaction?",
"How do you prefer to resolve misunderstandings?",
"What kind of audience would you enjoy communicating with?",
"How much do you enjoy helping someone understand something they previously found confusing?",
"What kind of leadership communication would you like to become better at?"
],
workstyle:[
"When you have control over how a task gets done, which structure suits you?",
"How much uninterrupted time do you prefer before checking in with other people?",
"When priorities change suddenly, what helps you stay productive?",
"Which environment would make it easiest for you to do your best work?",
"How do you prefer to divide a large project?",
"What balance between routine and variety feels comfortable?",
"When you have several tasks, how do you decide what to do first?",
"How much autonomy do you want in choosing methods?",
"Which sounds better: a clearly defined task or a problem you must define yourself?",
"How do you feel about working on a project that changes direction repeatedly?",
"What kind of workspace helps you concentrate?",
"When deadlines are far away, what keeps you moving?",
"How do you prefer to receive instructions?",
"How comfortable are you switching between deep focus and social collaboration?",
"What kind of responsibility would you rather have?",
"How do you respond to repetitive work when it serves a larger goal?",
"What makes a workday feel satisfying to you?",
"Which schedule would let you use your strengths best?",
"How much structure do you need before starting an unfamiliar task?",
"What work pattern would you like to avoid in a future career?"
],
motivation:[
"Which outcome would make you feel that your effort was meaningful?",
"What kind of progress motivates you to keep going?",
"Which reward matters least to you when deciding whether to pursue an activity?",
"What makes you willing to practice a difficult skill for months?",
"When a task is boring but useful, what helps you finish it?",
"Which kind of recognition feels genuinely satisfying rather than merely impressive?",
"What would make you choose a harder path over an easier one?",
"How important is visible progress to your motivation?",
"What makes you proud of your work?",
"Which kind of goal would you willingly set for yourself?",
"When nobody notices your effort, what keeps you working?",
"Which matters more when choosing a project: impact, mastery, freedom, creativity or stability?",
"What makes you lose motivation quickly?",
"How do you react when progress is slower than expected?",
"What kind of challenge gives you a sense of purpose?",
"Which future outcome would you work toward even if it took years?",
"How much does competition motivate you?",
"What kind of independence matters most to you?",
"What makes a successful result feel personally meaningful?",
"If money and status were equal across careers, what would you optimize for?"
],
learning:[
"When learning a new skill, what do you want to do first?",
"How do you know when you genuinely understand something?",
"Which learning format keeps you engaged longest?",
"What do you do when an explanation does not make sense?",
"How much trial and error do you like when learning?",
"When you find a gap in your knowledge, what do you do?",
"How do you prefer to practice a new skill?",
"What kind of teacher or mentor helps you learn best?",
"How much theory do you want before applying an idea?",
"Which type of project teaches you the most?",
"How do you prefer to prepare for a difficult assessment?",
"When you learn from the internet, what makes a source feel trustworthy?",
"How comfortable are you teaching yourself from multiple sources?",
"What helps you remember something for a long time?",
"How do you respond to feedback while learning?",
"Which is more satisfying: understanding a concept or mastering a procedure?",
"How much freedom do you want to choose what to learn next?",
"What do you do when you become interested in a topic outside school?",
"How do you prefer to measure your progress?",
"What learning habit would you most like to strengthen?"
],
pressure:[
"When people around you strongly prefer a particular career for you, what happens to your own preference?",
"If a prestigious career did not impress anyone, how interested would you remain?",
"When friends choose a popular field, how much does that affect your curiosity?",
"How often do salary discussions change how you think about a career?",
"If your family expected one path, what would you want to investigate before agreeing?",
"How confident are you that your current career preference comes from your own experiences?",
"What information might be missing from your current view of careers?",
"When someone says a career is 'the future,' what do you do with that claim?",
"How much does social media influence what careers seem attractive?",
"If a career were respected but its daily tasks bored you, what would you do?",
"When adults give career advice, what kind of evidence would you want from them?",
"How often do you compare your future with classmates' plans?",
"What would make you reconsider a career you chose mainly for status?",
"If a career paid less but matched your interests much better, what would you investigate?",
"How much do you feel you need a career choice that others can easily explain?",
"What would you choose to explore if nobody could see the result?",
"How comfortable are you saying 'I don't know yet' about your career?",
"Which pressure is hardest to notice: family, peers, trends, money or lack of information?",
"How often do you choose something because it seems safe rather than interesting?",
"What would help you separate your own preference from other people's expectations?"
],
values:[
"What kind of contribution would you like your future work to make?",
"Which trade-off would you think about most when choosing an education path?",
"What does a good life look like beyond a job title?",
"How important is flexibility when imagining your adult life?",
"What kind of problem in society would you like your work to help address?",
"Which matters most: stability, autonomy, impact, mastery, creativity or community?",
"What kind of environment would you want to spend most of your working life in?",
"How important is geographic freedom to your future plans?",
"What would make you change your mind about a long-term goal?",
"Which future skill do you think will remain useful across many careers?",
"What kind of person do you hope your education helps you become?",
"How much uncertainty are you comfortable accepting for a meaningful opportunity?",
"What does financial security mean to you?",
"How important is time outside work when thinking about a career?",
"Which kind of responsibility would you be proud to carry?",
"What would make an education pathway feel worth the effort?",
"How important is the ability to keep learning throughout adulthood?",
"What kind of legacy, if any, would you want your work to leave?",
"Which constraint would most affect your education choices: location, cost, time, family needs or academic requirements?",
"What do you want your future career to leave room for?"
]};

const answerSets={
single:["I would choose it naturally","I would probably try it","I might choose it if it had a clear purpose","I would avoid it unless required","I am genuinely unsure"],
multi:["Building or making","Researching or analyzing","Creating or designing","Explaining or teaching","Helping or organizing","Experimenting","Writing or communicating","Leading or coordinating"],
scale:null,scenario:["Explore the problem first","Start making a small experiment","Ask someone and compare perspectives","Research examples and evidence","Break it into steps and test each one"],open:null,rank:["Most natural","Second most natural","Middle","Less natural","Least natural"]
};

function makeQuestionBank(){
 const bank=[];let id=1;
 for(const cfg of categoryConfig){
   const seeds=seedByCategory[cfg.id];
   seeds.forEach((seed,si)=>{
     contexts.forEach((ctx,ci)=>{
       const type=cfg.types[(si+ci)%cfg.types.length];
       let q={id:`Q${String(id).padStart(4,"0")}`,category:cfg.id,categoryLabel:cfg.label,weight:cfg.weight,type,prompt:`${seed} ${ctx}.`,sourceWeight:cfg.weight};
       if(type==="single"||type==="scenario") q.options=type==="scenario"?answerSets.scenario:answerSets.single;
       if(type==="multi") q.options=answerSets.multi;
       if(type==="scale") q.scaleLabels=["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"];
       if(type==="rank") q.options=["Solving a difficult problem","Creating something original","Explaining an idea","Investigating evidence","Leading a group"];
       bank.push(q);id++;
     });
   });
 }
 return bank;
}
const QUESTION_BANK=makeQuestionBank(); // exactly 1,000 generated deep prompts
const TOTAL_BANK=QUESTION_BANK.length;

function weightedSession(){
 // Weighted sampling without replacement using an exponential-race key.
 // Each question has the category's configured first-draw weight.
 const candidates=QUESTION_BANK.map(q=>({q,key:-Math.log(Math.max(Math.random(),1e-12))/q.weight}));
 candidates.sort((a,b)=>a.key-b.key);
 let selected=candidates.slice(0,20).map(x=>x.q);
 // Ensure every dimension can appear at least once; replace the weakest duplicate-category picks if needed.
 const present=new Set(selected.map(q=>q.category));
 for(const cfg of categoryConfig){
   if(present.has(cfg.id)) continue;
   const replacement=QUESTION_BANK.filter(q=>q.category===cfg.id&&!selected.some(s=>s.id===q.id))[Math.floor(Math.random()*100)];
   const counts={};selected.forEach(q=>counts[q.category]=(counts[q.category]||0)+1);
   let idx=selected.length-1;let weakest=Infinity;
   for(let i=0;i<selected.length;i++){if(counts[selected[i].category]>1 && candidates.find(x=>x.q.id===selected[i].id)?.key<weakest){weakest=candidates.find(x=>x.q.id===selected[i].id)?.key;idx=i}}
   selected[idx]=replacement;present.add(cfg.id);
 }
 return shuffle(selected);
}
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1])}
function newSession(){state.session={ids:weightedSession().map(q=>q.id),started:Date.now()};state.answers={};state.qIndex=0;saveState()}
function saveState(){localStorage.setItem(STORE.user,JSON.stringify(state.user));localStorage.setItem(STORE.answers,JSON.stringify(state.answers));localStorage.setItem(STORE.saved,JSON.stringify(state.saved));localStorage.setItem(STORE.session,JSON.stringify(state.session))}
function sessionQuestions(){return state.session?.ids?.map(id=>QUESTION_BANK.find(q=>q.id===id)).filter(Boolean)||[]}
function ensureSession(){if(!state.session||state.session.ids?.length!==20)newSession()}

function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2400)}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function showPage(id){$$(".page").forEach(x=>x.classList.remove("active"));$("#"+id)?.classList.add("active");window.scrollTo({top:0,behavior:"smooth"});$("#mobileNav").classList.remove("open")}
function openModal(id){$("#"+id).classList.remove("hidden")}
function closeModal(id){$("#"+id).classList.add("hidden")}
function switchAuth(type){$$(".auth-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.auth===type));$("#loginBox").classList.toggle("hidden",type!=="login");$("#signupBox").classList.toggle("hidden",type!=="signup")}

$$("[data-page]").forEach(a=>a.onclick=e=>{e.preventDefault();showPage(a.dataset.page)});
$("#hamb").onclick=()=>$("#mobileNav").classList.toggle("open");
$("#heroStart").onclick=()=>{if(requireLogin()){goTab("questionnaire")}};
$("#roadmapStart").onclick=()=>{if(requireLogin()){showPage("dashboard");goTab("roadmaps")}};
$$("[data-scroll]").forEach(b=>b.onclick=()=>document.querySelector(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
$("#loginBtn").onclick=()=>{openModal("authModal");switchAuth("login")};
$("#signupBtn").onclick=()=>{openModal("authModal");switchAuth("signup")};
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$("#privacyBtn").onclick=$("#privacyFoot").onclick=()=>openModal("privacyModal");

function requireLogin(){if(!state.user){openModal("authModal");switchAuth("login");toast("Log in or create an account to continue.");return false}showPage("dashboard");return true}
function goTab(name){if(!state.user)return;$$(".side").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));$$(".tab").forEach(x=>x.classList.toggle("active",x.id==="tab-"+name));if(name==="questionnaire")renderQuestion();if(name==="analysis")renderAnalysis();if(name==="pathways")renderPathways();if(name==="roadmaps")renderRoadmap();if(name==="saved")renderSaved();if(name==="compare")renderCompare();if(name==="profile")loadProfile();if(name==="overview")renderOverview()}
$$("[data-tab]").forEach(b=>b.onclick=()=>{if(requireLogin())goTab(b.dataset.tab)});

$("#signupForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());state.user={...d,role:"student",createdAt:Date.now()};state.answers={};newSession();saveState();closeModal("authModal");updateUI();showPage("dashboard");goTab("overview");requestAnimationFrame(()=>{document.getElementById("journeyBoard")?.scrollIntoView({behavior:"smooth",block:"start"});document.getElementById("journeyQuestionnaire")?.classList.add("current")});toast("Account created — your Your Path journey starts here!")};
$("#loginForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());if(d.email==="admin@yourpath.demo"&&d.password==="admin123"){state.user={name:"Admin",email:d.email,role:"admin",grade:"College"}}else{state.user={name:d.email.split("@")[0],email:d.email,role:"student",grade:state.user?.grade||"Grade 10"}}ensureSession();saveState();closeModal("authModal");updateUI();showPage("dashboard");goTab("overview");toast("Logged in.")};
$("#logout").onclick=()=>{state.user=null;saveState();showPage("home");toast("Logged out.")};

function updateUI(){
 $("#welcome").textContent=`Welcome back, ${state.user?.name||"there"}! 👋`;
 $("#savedCount").textContent=state.saved.length;
 const answered=Object.keys(state.answers).length;$("#completion").textContent=`${Math.round(answered/20*100)}%`;
 $(".side.admin").style.display=state.user?.role==="admin"?"block":"none";
 renderOverview();renderPublic();
 renderInterestMap();
 renderJourney();
}
function renderJourney(){
 const user=state.user||{};
 const qs=sessionQuestions();
 const answered=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!==""&&!(Array.isArray(state.answers[q.id])&&state.answers[q.id].length===0)).length;
 const complete=answered===20;
 const pct=Math.round(answered/20*100);
 const profile=document.getElementById("journeyProfileText");
 const qTitle=document.getElementById("journeyQTitle");
 const qText=document.getElementById("journeyQText");
 const aTitle=document.getElementById("journeyATitle");
 const aText=document.getElementById("journeyAText");
 const action=document.getElementById("journeyActionText");
 if(profile) profile.textContent=`${user.name||"Student"} • ${user.grade||"Grade not set"} • Account created`;
 if(qTitle) qTitle.textContent=complete?"20 / 20 completed":`${answered} / 20 answered`;
 if(qText) qText.textContent=complete?"Questionnaire complete. Your interest map and analysis are ready.":"Explore your genuine interests, preferences and motivations.";
 if(aTitle) aTitle.textContent=complete?"Analysis ready":"Waiting for answers";
 if(aText) aText.textContent=complete?"Your responses can now be reviewed for patterns, contradictions and uncertainty.":"Complete the questionnaire before interpreting your responses.";
 if(action) action.textContent=complete?"Choose one small experiment from your roadmap and track what you learn.":"Start by answering the questionnaire, then choose an action based on what you discover.";
 const ids=["journeyQuestionnaire","journeyAnalysis","journeyPathways","journeyRoadmap","journeyAction"];
 ids.forEach(id=>document.getElementById(id)?.classList.remove("current","done"));
 const jq=document.getElementById("journeyQuestionnaire");
 if(complete) jq?.classList.add("done"); else jq?.classList.add("current");
 if(complete){["journeyAnalysis","journeyPathways"].forEach(id=>document.getElementById(id)?.classList.add("current"));}
 // The first three journey stages become complete as the student progresses.
 if(complete){document.getElementById("journeyQuestionnaire")?.classList.add("done");}
}

function renderOverview(){
 const p=pathways.slice(0,4);$("#topPaths").innerHTML=p.map(x=>`<div class="path-mini"><span class="path-icon">${x.icon}</span><span><b>${x.name}</b><small>${x.tag}</small></span></div>`).join("");
}
function renderInterestMap(){
 const fill=$("#radarFill"), status=$("#interestStatus"), bars=$("#interestBars");
 if(!fill||!status||!bars)return;
 const qs=sessionQuestions();
 const answeredQs=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!==""&&!(Array.isArray(state.answers[q.id])&&state.answers[q.id].every(v=>v==="")));
 const complete=answeredQs.length===20;
 if(!complete){
   fill.classList.remove("ready");
   status.textContent=`${answeredQs.length}/20 answered`;
   bars.innerHTML="<div class=\"muted\">Finish all 20 questions to reveal your interest profile.</div>";
   return;
 }
 // This is an explainable prototype signal map, not a scientific personality score.
 const axes=["Analytical","Creative","People","Learning","Curiosity"];
 const scores=Object.fromEntries(axes.map(a=>[a,1]));
 const axisByCategory={
   interests:{Curiosity:3,Creative:1}, subjects:{Learning:2,Analytical:1}, problem:{Analytical:4,Curiosity:1},
   creativity:{Creative:5}, communication:{People:4,Creative:1}, leadership:{People:5}, motivation:{Learning:2,People:1},
   learning:{Learning:5,Curiosity:2}, pressure:{People:1,Curiosity:1}, values:{Curiosity:2,Learning:1}
 };
 const addText=(text)=>{
   const t=String(text||"").toLowerCase();
   const hits={analytical:["math","data","logic","solve","analysis","code","program","system","evidence","research","pattern","debug","science"],creative:["design","create","art","music","story","write","video","build","invent","creative","visual"],people:["people","help","teach","team","lead","communicate","community","listen","friend","customer"],learning:["learn","study","understand","read","course","practice","skill","knowledge","curious","explore"],curiosity:["why","how","discover","investigate","experiment","question","research","explore","new","curious"]};
   for(const [axis,words] of Object.entries(hits)){const n=words.reduce((a,w)=>a+(t.includes(w)?1:0),0);scores[axis]+=Math.min(n,3);}
 };
 answeredQs.forEach(q=>{
   const base=axisByCategory[q.category]||{};
   Object.entries(base).forEach(([axis,val])=>scores[axis]+=val);
   const val=state.answers[q.id];
   addText(Array.isArray(val)?val.join(" "):val);
   if(q.type==="scale" && Number(val)){const n=Number(val);scores.Learning+=n*.25;scores.Curiosity+=n*.25;}
 });
 const max=Math.max(...Object.values(scores));
 const normalized=Object.fromEntries(axes.map(a=>[a,Math.max(28,Math.round(scores[a]/max*100))]));
 // The visual uses five radial points in the same order as the labels.
 const points=[normalized.Analytical,normalized.Creative,normalized.People,normalized.Learning,normalized.Curiosity];
 const cx=50,cy=50,r=45;
 const coords=points.map((v,i)=>{const angle=(-90+i*72)*Math.PI/180;const rr=r*(v/100);return `${(cx+Math.cos(angle)*rr).toFixed(1)}% ${(cy+Math.sin(angle)*rr).toFixed(1)}%`;});
 fill.style.clipPath=`polygon(${coords.join(",")})`;
 fill.classList.remove("ready");requestAnimationFrame(()=>fill.classList.add("ready"));
 status.textContent="Updated from your 20 answers";
 bars.innerHTML=axes.map((a,i)=>`<div class="interest-bar"><span>${a}</span><div class="interest-track"><i style="width:${normalized[a]}%"></i></div><b>${normalized[a]}</b></div>`).join("");
}
const pathways=[
{name:"Data Science & Analytics",icon:"◈",tag:"Analytical + curious",reason:"A useful direction to test if you enjoy patterns, evidence, statistics and turning questions into structured analysis.",skills:"Statistics, Python, SQL, communication",edu:"Math/science + CS, statistics or data-focused degree",work:"Focused analysis + collaboration",challenge:"Abstract math, messy data and long debugging cycles",alt:"Economics, BI, research, quantitative analysis"},
{name:"Psychology & Behaviour",icon:"◉",tag:"People + research",reason:"Worth exploring if you are curious about people, behaviour, communication and evidence-based questions.",skills:"Research methods, writing, statistics, listening",edu:"Psychology/social science + specialist study where required",work:"People-facing + research",challenge:"Some specialist roles require further study",alt:"UX research, HR, education, behavioural science"},
{name:"UX / Product Design",icon:"◇",tag:"Creative + problem solving",reason:"Worth testing if you like understanding users, creating ideas and improving how products work.",skills:"Design, prototyping, research, communication",edu:"Design, HCI, CS or portfolio-based routes",work:"Highly collaborative",challenge:"Iteration, critique and portfolio building",alt:"Product management, UX research, visual design"},
{name:"Environmental Science",icon:"♧",tag:"Science + impact",reason:"Fits a curiosity about natural systems, evidence and practical environmental problems.",skills:"Research, data, field methods, communication",edu:"Science + environmental/geoscience routes",work:"Field + lab + collaboration",challenge:"Some roles involve fieldwork and location constraints",alt:"Geoscience, conservation, sustainability"},
{name:"Software Engineering",icon:"</>",tag:"Logical + builder",reason:"A direction to investigate if you enjoy constructing systems, debugging and learning technical tools.",skills:"Programming, algorithms, teamwork, systems thinking",edu:"CS/software/engineering or strong portfolio route",work:"Focused building + team collaboration",challenge:"Continuous learning and debugging",alt:"Cybersecurity, cloud, QA, developer tools"},
{name:"Cybersecurity",icon:"⌁",tag:"Systems + investigation",reason:"Explore this if protecting systems, investigating failures and understanding networks sounds engaging.",skills:"Networking, Linux, security concepts, scripting",edu:"CS/IT/cybersecurity + labs/certifications",work:"Independent investigation + team response",challenge:"Constant learning and careful documentation",alt:"Network engineering, digital forensics, cloud security"},
{name:"Engineering & Computational Science",icon:"△",tag:"Math + making",reason:"A direction for students drawn to physics, systems, models and building practical solutions.",skills:"Math, modelling, programming, technical communication",edu:"Math/science + engineering or computational degree",work:"Technical team + project work",challenge:"Can be mathematically demanding",alt:"Robotics, simulation, systems engineering"},
{name:"Business & Entrepreneurship",icon:"↗",tag:"Initiative + people",reason:"Worth testing if you enjoy building ideas, decision-making, communication and measurable outcomes.",skills:"Communication, finance, market research, leadership",edu:"Business/economics or mixed routes",work:"Collaboration + uncertainty",challenge:"Outcomes and income can be less predictable",alt:"Marketing, operations, product, finance"}
];

function renderPublic(){$("#publicPaths").innerHTML=pathways.map(p=>`<article class="path-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p class="reason">${p.reason}</p><p><b>Skills:</b> ${p.skills}</p><p><b>Related:</b> ${p.alt}</p><button class="small-btn" onclick="requireLogin()">Personalize this</button></article>`).join("")}

function capture(){
 const q=sessionQuestions()[state.qIndex];if(!q)return;
 if(q.type==="open")state.answers[q.id]=$("#answerOpen")?.value||"";
 else if(q.type==="rank")state.answers[q.id]=$$("#answerRank select").map(x=>x.value);
 else if(q.type==="multi")state.answers[q.id]=$$("#question input[type=checkbox]:checked").map(x=>x.value);
 else state.answers[q.id]=$$("#question input[name=answer]:checked")[0]?.value||"";
 saveState();updateUI();
}
function renderQuestion(){
 ensureSession();const qs=sessionQuestions(),q=qs[state.qIndex];if(!q)return;
 $("#qCount").textContent=`${state.qIndex+1} / 20`;
 const firstDraw=(q.weight/100).toFixed(2);$("#selectionInfo").innerHTML=`<b>${escapeHtml(q.categoryLabel)}</b><br><br>This question has a configured <strong>${firstDraw}% first-draw chance</strong> because its category weight is ${q.weight}/100 and there are 100 questions in each category.<br><br>The exact chance of appearing in the full 20-question session changes after other questions are selected. This number is a selection mechanic, not a psychological score.`;
 let body="";
 const val=state.answers[q.id];
 if(q.type==="scale")body=`<div class="scale">${q.scaleLabels.map((x,i)=>`<label><input type="radio" name="answer" value="${i+1}" ${String(val)===String(i+1)?"checked":""}>${i+1}<small>${x}</small></label>`).join("")}</div>`;
 else if(q.type==="open")body=`<textarea class="open" id="answerOpen" placeholder="Write honestly. A few sentences are enough.">${escapeHtml(val||"")}</textarea>`;
 else if(q.type==="rank")body=`<div class="rank" id="answerRank">${q.options.map((o,i)=>`<div><span>${escapeHtml(o)}</span><select><option value="">Rank</option>${[1,2,3,4,5].map(n=>`<option ${String(val?.[i])===String(n)?"selected":""}>${n}</option>`).join("")}</select></div>`).join("")}</div>`;
 else body=`<div class="options">${q.options.map(o=>`<label class="option ${Array.isArray(val)?val.includes(o):val===o?"selected":""}"><input type="${q.type==="multi"?"checkbox":"radio"}" name="answer" value="${escapeHtml(o)}" ${Array.isArray(val)?val.includes(o)?"checked":"":val===o?"checked":""}><span>${escapeHtml(o)}</span></label>`).join("")}</div>`;
 $("#question").innerHTML=`<div class="question-card"><div class="question-type">${q.type.toUpperCase()} · ${escapeHtml(q.categoryLabel)}</div><h3>${escapeHtml(q.prompt)}</h3>${body}<p class="muted">There is no socially correct answer. Choose what describes you, even if it sounds less impressive.</p><div class="question-nav"><button class="btn soft" id="back" ${state.qIndex===0?"disabled":""}>← Back</button><button class="btn primary" id="next">${state.qIndex===19?"Finish analysis":"Next →"}</button></div></div>`;
 $$("#question input").forEach(x=>x.addEventListener("change",()=>{$$(".option").forEach(o=>{const inp=o.querySelector("input");if(inp)o.classList.toggle("selected",inp.checked)})}));
 $("#answerOpen")?.addEventListener("input",capture);$$("#answerRank select").forEach(x=>x.addEventListener("change",capture));
 $("#back").onclick=()=>{capture();state.qIndex=Math.max(0,state.qIndex-1);renderQuestion()};
 $("#next").onclick=()=>{capture();if(state.qIndex<19){state.qIndex++;renderQuestion()}else{capture();renderInterestMap();goTab("analysis");toast("20 responses analyzed. Your interest map is now filled from your answers.")}};
}
function renderAnalysis(){
 const qs=sessionQuestions(),answered=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!=="").length;
 const categoryCounts={};qs.forEach(q=>{if(state.answers[q.id]!=null)categoryCounts[q.categoryLabel]=(categoryCounts[q.categoryLabel]||0)+1});
 const chips=Object.keys(categoryCounts).map(x=>`<span class="chip">${x}</span>`).join("");
 $("#analysisIntro").textContent=answered<20?`You have answered ${answered} of 20 selected questions. Complete the session for a fuller analysis.`:"Your responses are now treated as a set of signals. The analysis should be read as hypotheses to test, not a prediction of your future.";
 $("#analysis").innerHTML=`<div class="analysis-grid"><div class="analysis-box"><h3>Dimensions explored</h3><div class="chips2">${chips||"<span class=chip>Not enough data yet</span>"}</div><p class="muted">The 1,000-question bank covers ten dimensions. The 20-question session is only one sample, so retaking later can add information.</p></div><div class="analysis-box"><h3>Possible working style</h3><p><b>Explore:</b> focused work with purposeful collaboration, then compare that hypothesis with your real experiences in projects.</p><p class="muted">Do not treat this as a diagnosis or personality type.</p></div><div class="analysis-box"><h3>External-pressure reflection</h3><div class="notice">If answers about status, salary, family expectations or social trends conflict with your activity preferences, the system should ask follow-up questions rather than decide that pressure is the cause.</div></div><div class="analysis-box"><h3>Contradictions</h3><p>If you say you strongly prefer a career but repeatedly choose activities that conflict with its core work, that should be flagged for reflection. Your Path should never silently convert a contradiction into a “match score.”</p></div><div class="analysis-box full"><h3>Next step</h3><p>Explore several pathways, save the ones worth testing, then use the roadmap to run small real-world experiments.</p><button class="btn primary" onclick="goTab('pathways')">Explore pathways →</button></div></div>`;
}
function renderPathways(){
 $("#pathGrid").innerHTML=pathways.map(p=>`<article class="path-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p class="reason">${p.reason}</p><p><b>Skills:</b> ${p.skills}</p><p><b>Education:</b> ${p.edu}</p><p><b>Work style:</b> ${p.work}</p><p><b>Challenges:</b> ${p.challenge}</p><p><b>Alternatives:</b> ${p.alt}</p><div class="path-actions"><button class="small-btn save" onclick="toggleSave('${p.name}')">♡ ${state.saved.includes(p.name)?"Saved":"Save"}</button><button class="small-btn" onclick="toast('In production, this would open current cited research for this pathway.')">Research</button></div></article>`).join("");
}
function toggleSave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];saveState();renderPathways();renderSaved();updateUI();toast(state.saved.includes(name)?"Pathway saved.":"Pathway removed.")}
function renderSaved(){if(!state.saved.length){$("#saved").innerHTML='<div class="card"><p class="muted">Nothing saved yet. Explore pathways and save a few directions you want to investigate.</p></div>';return}$("#saved").innerHTML=state.saved.map(n=>{const p=pathways.find(x=>x.name===n);return `<div class="card" style="margin-bottom:10px"><b>${p.name}</b><p class="muted">${p.reason}</p><button class="small-btn" onclick="toggleSave('${p.name}')">Remove</button></div>`}).join("")}
function renderCompare(){const p=pathways.slice(0,4);$("#compare").innerHTML=`<table class="compare"><thead><tr><th>Feature</th>${p.map(x=>`<th>${x.name}</th>`).join("")}</tr></thead><tbody><tr><th>Why it matches</th>${p.map(x=>`<td>${x.reason}</td>`).join("")}</tr><tr><th>Skills</th>${p.map(x=>`<td>${x.skills}</td>`).join("")}</tr><tr><th>Education</th>${p.map(x=>`<td>${x.edu}</td>`).join("")}</tr><tr><th>Work style</th>${p.map(x=>`<td>${x.work}</td>`).join("")}</tr><tr><th>Challenges</th>${p.map(x=>`<td>${x.challenge}</td>`).join("")}</tr></tbody></table>`}
function renderRoadmap(){const g=state.user?.grade||"Grade 10";$("#roadmapGrade").textContent=`Example action plan for ${g}. A production version should adapt this to country, budget, admissions and the chosen pathway.`;$("#roadmap").innerHTML=`<div class="roadmap-card"><h3>Next 30 days</h3><p class="muted">Explore 2–3 pathways, talk to someone in a relevant field, try one small project and write down what you enjoyed and disliked.</p></div><div class="roadmap-card"><h3>Next 6 months</h3><p class="muted">Build a portfolio project, join a relevant club/competition, strengthen prerequisite subjects and research education routes.</p></div><div class="roadmap-card"><h3>Next 1–2 years</h3><p class="muted">Deepen skills, create stronger evidence of interest, compare degree routes and prepare applications or entrance requirements.</p></div>`}
function loadProfile(){const f=$("#profile");if(!state.user)return;for(const el of f.elements)if(el.name&&state.user[el.name]!=null)el.value=state.user[el.name]}
$("#profile").onsubmit=e=>{e.preventDefault();state.user={...state.user,...Object.fromEntries(new FormData(e.target).entries())};saveState();updateUI();toast("Profile saved.")};
$("#feedback").onsubmit=e=>{e.preventDefault();localStorage.setItem("yp_feedback_v3",JSON.stringify(Object.fromEntries(new FormData(e.target).entries())));e.target.reset();toast("Feedback saved in this demo.")};

$("#accept").onclick=()=>{localStorage.setItem(STORE.cookie,"accepted");$("#cookie").style.display="none";toast("Cookie preference saved.")};
$("#essential").onclick=()=>{localStorage.setItem(STORE.cookie,"essential");$("#cookie").style.display="none";toast("Essential-only preference saved.")};
$("#cookieSettings").onclick=()=>$("#cookie").style.display="flex";
if(localStorage.getItem(STORE.cookie))$("#cookie").style.display="none";

ensureSession();updateUI();renderQuestion();

window.newQuestionSession=()=>{newSession();renderQuestion();toast("New 20-question session generated.")};
window.goTab=goTab;window.requireLogin=requireLogin;window.toggleSave=toggleSave;

document.addEventListener("keydown",e=>{if(e.key==="Escape"){$$(".modal-backdrop").forEach(m=>m.classList.add("hidden"))}});
