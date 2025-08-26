let data;

document.addEventListener("DOMContentLoaded", () => {

  fetch("data.yml")
    .then(response => response.text())
    .then(yamlText => {
      data = jsyaml.load(yamlText);

      // Bio text
      document.getElementById("bio-text").textContent = data.bio.text;

      // Bio image click fun-fact pop-ups
      const bioImage = document.getElementById("bio-image");
      bioImage.addEventListener("click", () => {
        data.bio.fun_facts.forEach(fact => createFunFactPopup(fact.title, fact.content));
      });

      // Research list
      const researchDiv = document.getElementById("research-list");
      researchDiv.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "research-list";
      data.research.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.emoji} ${item.text}`;
        ul.appendChild(li);
      });
      researchDiv.appendChild(ul);

      // My Work buttons
      const workDiv = document.getElementById("my-work-buttons");
      workDiv.innerHTML = "";
      data.my_work.forEach(work => {
        const btn = document.createElement("button");
        btn.className = "work-btn";
        btn.id = work.id;
        btn.textContent = work.name;
        workDiv.appendChild(btn);

        btn.addEventListener("click", () => {
          if (work.name === "Publications" && data.publications) {
            let pubContent = "<ul>";
            data.publications.forEach(pub => {
              pubContent += `<li>${pub.title}</li>`;
            });
            pubContent += "</ul>";
            createProjectPopup(work.name, pubContent);
          } else {
            createProjectPopup(work.name, work.content);
          }
        });
      });

      // Zelda Easter Egg
      document.getElementById("egg-icon").addEventListener("click", () => {
        createZeldaPopup(data.zelda_egg);
      });
    });

  // ---------- Pop-up functions ----------
  function createProjectPopup(title, content) {
    const popup = document.createElement("div");
    popup.className = "project-window projects";

    popup.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <button class="close-btn">X</button>
      </div>
      <div class="window-body">${content}</div>
    `;

    document.body.appendChild(popup);
    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
    centerPopup(popup);
    makeDraggable(popup);
  }

  function createFunFactPopup(title, content) {
    const popup = document.createElement("div");
    popup.className = "project-window scattered";
    popup.innerHTML = `
      <div class="window-header">${title}</div>
      <div class="window-body">${content}</div>
    `;
    document.body.appendChild(popup);
    randomPosition(popup);
    makeDraggable(popup);
  }

  function createZeldaPopup(data) {
    const popup = document.createElement("div");
    popup.className = "egg-window zelda";
    popup.innerHTML = `
      <div class="window-header">${data.title}</div>
      <div class="window-body">${data.content}<button class="close-btn">Close</button></div>
    `;
    document.body.appendChild(popup);
    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
    centerPopup(popup);
    makeDraggable(popup);
  }

  // ---------- Helpers ----------
  function centerPopup(popup) {
    popup.style.left = `50%`;
    popup.style.top = `50%`;
    popup.style.transform = `translate(-50%, -50%)`;
  }

  function randomPosition(popup) {
    const x = Math.random() * (window.innerWidth - 250);
    const y = Math.random() * (window.innerHeight - 150);
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
  }

  function makeDraggable(el) {
    let isDragging = false;
    let offsetX, offsetY;
    const header = el.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.zIndex = 3000;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => { isDragging = false; });
  }

});
