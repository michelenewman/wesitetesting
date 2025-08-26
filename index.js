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

function copyEmail(){
  const email=document.getElementById("email").innerText;
  navigator.clipboard.writeText(email).then(()=>{alert("Email copied: "+email);});
}

async function loadData(){
  const response=await fetch("data.yml");
  const text=await response.text();
  const data=jsyaml.load(text);
  if(data.publications) document.getElementById("publications-list").innerHTML="<ul>"+data.publications.map(pub=>`<li>${pub}</li>`).join("")+"</ul>";
  if(data.projects) document.getElementById("projects-list").innerHTML="<ul>"+data.projects.map(p=>`<li>${p}</li>`).join("")+"</ul>";
  if(data.teaching) document.getElementById("teaching-list").innerHTML="<ul>"+data.teaching.map(t=>`<li>${t}</li>`).join("")+"</ul>";
}

window.onload=loadData;
