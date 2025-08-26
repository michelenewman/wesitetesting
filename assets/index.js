// Main popups
function openPopup(id) {
  const popup=document.getElementById(id);
  popup.style.display="block";
  popup.style.zIndex=getTopZ()+1;
  makeDraggable(popup);
}
function closePopup(id) {
  document.getElementById(id).style.display="none";
}
function getTopZ(){
  return Math.max(...Array.from(document.querySelectorAll('.popup')).map(el=>parseInt(el.style.zIndex)||10),10);
}
function makeDraggable(el){
  const header=el.querySelector(".popup-header");
  let offsetX=0, offsetY=0, mouseX=0, mouseY=0;
  header.onmousedown=dragMouseDown;
  function dragMouseDown(e){
    e.preventDefault();
    mouseX=e.clientX; mouseY=e.clientY;
    document.onmouseup=closeDrag;
    document.onmousemove=elementDrag;
    el.style.zIndex=getTopZ()+1;
  }
  function elementDrag(e){
    e.preventDefault();
    offsetX=mouseX-e.clientX;
    offsetY=mouseY-e.clientY;
    mouseX=e.clientX;
    mouseY=e.clientY;
    el.style.top=(el.offsetTop-offsetY)+"px";
    el.style.left=(el.offsetLeft-offsetX)+"px";
  }
  function closeDrag(){
    document.onmouseup=null;
    document.onmousemove=null;
  }
}

// Copy email
function copyEmail(){
  const email=document.getElementById("email").innerText;
  navigator.clipboard.writeText(email).then(()=>{alert("Email copied: "+email);});
}

// Load YAML
async function loadData(){
  const response=await fetch("assets/data.yml");
  const text=await response.text();
  const data=jsyaml.load(text);
  if(data.publications) document.getElementById("publications-list").innerHTML="<ul>"+data.publications.map(pub=>`<li>${pub}</li>`).join("")+"</ul>";
  if(data.projects) document.getElementById("projects-list").innerHTML="<ul>"+data.projects.map(p=>`<li>${p}</li>`).join("")+"</ul>";
  if(data.teaching) document.getElementById("teaching-list").innerHTML="<ul>"+data.teaching.map(t=>`<li>${t}</li>`).join("")+"</ul>";
}
window.onload=loadData;

// Mini fun facts and Zelda Easter egg
const funFacts = [
  "Fun Fact: I love Zelda games! 🗡️",
  "Fun Fact: Coffee is my research fuel ☕",
  "Fun Fact: I collect retro game cartridges 🎮",
  "Fun Fact: I once made a mini game in JavaScript 🎮",
  "Fun Fact: My favorite color is purple 💜"
];

document.querySelector(".bio-container img").addEventListener("click", () => {
  const isZelda = Math.random() < 0.2; // 20% chance for Zelda Easter egg
  const popup = document.createElement("div");
  popup.className = "fun-fact-popup";

  if (isZelda) {
    popup.innerHTML = `
      <div class="popup-header">Zelda Easter Egg <button class="popup-close">X</button></div>
      <div class="popup-content">
        <div class="scroll-text"><span>🔺 You found the Triforce! 🔺</span></div>
        <p style="color:#6a5acd;">It's dangerous to go alone… take this! 🗡️</p>
      </div>`;
  } else {
    const factText = funFacts[Math.floor(Math.random() * funFacts.length)];
    popup.innerHTML = `
      <div class="popup-header">Fun Fact <button class="popup-close">X</button></div>
      <div class="popup-content">${factText}</div>`;
  }

  document.body.appendChild(popup);
  popup.querySelector(".popup-close").addEventListener("click", () => popup.remove());
  popup.style.top = Math.random() * (window.innerHeight - 120) + "px";
  popup.style.left = Math.random() * (window.innerWidth - 220) + "px";
  makeDraggable(popup);
});
