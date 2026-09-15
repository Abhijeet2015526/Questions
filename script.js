const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const q = document.getElementById("questionCard");
const yes = document.getElementById("yesBtn");
const no = document.getElementById("noBtn");
const think = document.getElementById("thinkBtn");
const toast = document.getElementById("toast");

const screens = {
  yes: document.getElementById("official"),
  think: document.getElementById("thinking"),
  no: document.getElementById("nope")
};

function showToast(t){
  toast.textContent=t; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1000);
}

async function saveAnswer(answer){
  // A random browser-generated ID means you don't need her name.
  let visitorId = localStorage.getItem("questions_visitor_id");
  if(!visitorId){
    visitorId = crypto.randomUUID();
    localStorage.setItem("questions_visitor_id", visitorId);
  }

  const { error } = await client.from("questions_responses").insert({
    answer,
    visitor_id: visitorId,
    user_agent: navigator.userAgent
  });

  if(error) console.error("Could not save response:", error);
}

function finish(answer){
  q.classList.add("hidden");
  screens[answer].classList.remove("hidden");
  saveAnswer(answer);
}

yes.onclick=()=>finish("yes");
think.onclick=()=>finish("think");

function moveNo(){
  const area=document.getElementById("choiceArea");
  const x=Math.max(5,Math.random()*(area.clientWidth-100));
  const y=Math.max(5,Math.random()*(area.clientHeight-55));
  no.style.left=x+"px"; no.style.top=y+"px"; no.style.transform="none";
  showToast(["Nice try 😌","That button is shy 🙈","Catch me first 😭","Maybe YES? 💗"][Math.floor(Math.random()*4)]);
}
no.addEventListener("mouseenter",moveNo);
no.addEventListener("touchstart",e=>{e.preventDefault();moveNo()});
no.addEventListener("click",()=>finish("no"));

const petals=document.getElementById("petals");
const symbols=["💗","♡","♥","✦","🌸"];
for(let i=0;i<34;i++){
  const p=document.createElement("span");
  p.className="petal"; p.textContent=symbols[i%symbols.length];
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=(7+Math.random()*9)+"s";
  p.style.animationDelay=(-Math.random()*12)+"s";
  p.style.fontSize=(12+Math.random()*17)+"px";
  petals.appendChild(p);
}
