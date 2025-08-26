let zIndexCounter = 1000;
let data;

// Load YAML data
fetch("data.yml")
  .then(res => res.text())
  .then(text => {
    data = jsyaml.load(text);
    initSite();
  });

function initSite() {
  // Bio text
  document.getElementById("bio-text").innerText = data.bio.text;

  // Research list
  const researchList = document.getElementById("research-list");
  data.research.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.emoji} ${r.text}`;
    researchList.appendChild(li);
  });

  // My Work buttons
  const workContainer = document.getElementById("my-work-buttons");
  data.my_work.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.name;
    btn.classList.add("work-btn");
    btn.addEventListener("click", () => createProjectPopup(item));
    workContainer.appendChild(btn);
  });

  // Zelda Easter egg
  document.getElementById("egg-icon").addEventListener("click", () => {
    createPopup(data.zelda_egg.title, data.zelda_egg.content, "zelda");
  });

  // Bio image fun-facts pop-ups (scattered)
  const bioImg = document.getElementById("bio-image");
  bioImg.addEventListener("click", () => {
    data.bio.fun_facts.forEach(f => createScatteredPopup(f.title, f.content));
  });
}

// Create My Work pop-ups
function createProjectPopup(item) {
  createPopup(item.name, item.content, "projects");
}

// General popup creator
function createPopup(title, content, type="projects") {
  const popup = document.createElement("div");
  popup.classList.add("project-window");
  if(type) popup.classList.add(type);

  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.zIndex = zIndexCounter++;

  const header = document.createElement("div");
  header.className = "window-header";
  header.innerText = title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerText = "×";
  closeBtn.addEventListener("click", () => popup.remove());
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.className = "window-body";
  body.innerHTML = content;

  popup.appendChild(header);
  popup.appendChild(body);
  document.body.appendChild(popup);

  makeDraggable(popup, header);

  // Bring to front when clicked
  popup.addEventListener("mousedown", () => {
    popup.style.zIndex = ++zIndexCounter;
  });
}

// Create scattered bio fun-fact popups
function createScatteredPopup(title, content) {
  const popup = document.createElement("div");
  popup.classList.add("project-window", "scattered");

  // Random position within viewport
  const maxX = window.innerWidth - 220;
  const maxY = window.innerHeight - 200;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  popup.style.left = randomX + "px";
  popup.style.top = randomY + "px";
  popup.style.zIndex = zIndexCounter++;

  const header = document.createElement("div");
  header.className = "window-header";
  header.innerText = title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerText = "×";
  closeBtn.addEventListener("click", () => popup.remove());
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.className = "window-body";
  body.innerHTML = content;

  popup.appendChild(header);
  popup.appendChild(body);
  document.body.appendChild(popup);

  makeDraggable(popup, header);

  // Bring to front on click
  popup.addEventListener("mousedown", () => {
    popup.style.zIndex = ++zIndexCounter;
  });
}

// Make pop-ups draggable
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
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.transform = ""; // disable centering transform while dragging
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
