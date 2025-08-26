let data;
fetch("data.yml")
  .then(res => res.text())
  .then(text => { data = jsyaml.load(text); initSite(); });

function initSite() {
  document.getElementById("bio-text").innerText = data.bio.text;

  const researchList = document.getElementById("research-list");
  data.research.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.emoji} ${r.text}`;
    researchList.appendChild(li);
  });

  const workContainer = document.getElementById("my-work-buttons");
  data.my_work.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.name;
    btn.classList.add("work-btn");
    btn.addEventListener("click", () => createProjectPopup(item));
    workContainer.appendChild(btn);
  });

  const bioImage = document.getElementById("bio-image");
  bioImage.addEventListener("click", () => {
    data.bio.fun_facts.forEach(f => createFunFactPopup(f));
  });

  document.getElementById("egg-icon").addEventListener("click", () => {
    createZeldaPopup(data.zelda_egg);
  });
}

function createPopup(title, content, type="project") {
  const popup = document.createElement("div");
  popup.classList.add("project-window");
  
  if(type === "scattered") popup.classList.add("scattered");
  if(type === "zelda") popup.classList.add("egg-window", "zelda");
  if(type === "projects") popup.classList.add("projects");

  if(type === "scattered") {
    popup.style.width = `${180 + Math.random()*40}px`;
    popup.style.height = `${100 + Math.random()*50}px`;
    popup.style.top = `${50 + Math.random()*200}px`;
    popup.style.left = `${50 + Math.random()*200}px`;
  } else {
    popup.style.top = `50%`;
    popup.style.left = `50%`;
    popup.style.transform = `translate(-50%, -50%)`;
  }

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
}

function createProjectPopup(item) {
  createPopup(item.name, item.content, "projects");
}

function createFunFactPopup(fact) {
  createPopup(fact.title, fact.content, "scattered");
}

function createZeldaPopup(egg) {
  createPopup(egg.title, egg.content, "zelda");
}
