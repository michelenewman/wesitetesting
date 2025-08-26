let data;

// Load YAML data
fetch("data.yml")
  .then(res => res.text())
  .then(text => {
    data = jsyaml.load(text);
    initSite();
  });

function initSite() {
  // Load bio text
  document.getElementById("bio-text").innerText = data.bio.text;

  // Load research list
  const researchList = document.getElementById("research-list");
  data.research.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.emoji} ${r.text}`;
    researchList.appendChild(li);
  });

  // Load My Work buttons
  const workContainer = document.getElementById("my-work-buttons");
  data.my_work.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.name;
    btn.classList.add("work-btn");
    btn.addEventListener("click", () => createProjectPopup(item));
    workContainer.appendChild(btn);
  });

  // Bio image click → scattered fun-fact pop-ups
  const bioImage = document.getElementById("bio-image");
  bioImage.addEventListener("click", () => {
    data.bio.fun_facts.forEach(f => createFunFactPopup(f));
  });

  // Zelda Easter Egg
  document.getElementById("egg-icon").addEventListener("click", () => {
    createZeldaPopup(data.zelda_egg);
  });
}

// Generic pop-up creation
function createPopup(title, content, type="project") {
  const popup = document.createElement("div");
  popup.classList.add("project-window");

  if(type === "scattered") popup.classList.add("scattered");
  if(type === "zelda") popup.classList.add("egg-window", "zelda");
  if(type === "projects") popup.classList.add("projects");

  // Size and position
  if(type === "scattered") {
    popup.style.width = `${180 + Math.random()*40}px`;
    popup.style.height = `${100 + Math.random()*50}px`;
    popup.style.top = `${50 + Math.random()*200}px`;
    popup.style.left = `${50 + Math.random()*200}px`;
  } else {
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
  }

  // Header
  const header = document.createElement("div");
  header.className = "window-header";
  header.innerText = title;

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerText = "×";
  closeBtn.addEventListener("click", () => popup.remove());
  header.appendChild(closeBtn);

  // Body
  const body = document.createElement("div");
  body.className = "window-body";
  body.innerHTML = content;

  popup.appendChild(header);
  popup.appendChild(body);
  document.body.appendChild(popup);

  // Make draggable
  makeDraggable(popup, header);
}

// Pop-up helpers
function createProjectPopup(item) { createPopup(item.name, item.content, "projects"); }
function createFunFactPopup(fact) { createPopup(fact.title, fact.content, "scattered"); }
function createZeldaPopup(egg) { createPopup(egg.title, egg.content, "zelda"); }

// Draggable function
function makeDraggable(elmnt, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.transform = ""; // remove centering while dragging
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
