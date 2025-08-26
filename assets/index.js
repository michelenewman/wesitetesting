let zIndexCounter = 100;
const yamlFile = 'assets/data.yml';
let siteData = null;

// Load YAML
fetch(yamlFile)
  .then(res => res.text())
  .then(yamlText => { siteData = jsyaml.load(yamlText); populatePopups(); })
  .catch(err => console.error('Error loading YAML:', err));

function populatePopups() {
  if (!siteData) return;
  const pubList = document.getElementById('publications-list');
  pubList.innerHTML = '';
  siteData.publications.forEach(pub => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${pub.title}</strong>, ${pub.journal}, ${pub.year} <a href="${pub.link}" target="_blank">Link</a>`;
    pubList.appendChild(li);
  });

  const projList = document.getElementById('projects-list');
  projList.innerHTML = '';
  siteData.projects.forEach(proj => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${proj.name}</strong>: ${proj.description} <a href="${proj.link}" target="_blank">Link</a>`;
    projList.appendChild(li);
  });

  const teachList = document.getElementById('teaching-list');
  teachList.innerHTML = '';
  siteData.teaching.forEach(course => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${course.course}</strong>, ${course.term} <a href="${course.link}" target="_blank">Link</a>`;
    teachList.appendChild(li);
  });
}

function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';
  popup.style.zIndex = zIndexCounter++;
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

function showFunFact() {
  if (!siteData) return;
  const facts = siteData.fun_facts || [];
  if (facts.length === 0) return;
  const fact = facts[Math.floor(Math.random() * facts.length)];

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.style.background = '#e0d4ff';
  popup.style.width = '220px';
  popup.style.height = '150px';
  popup.style.top = `${Math.random() * (window.innerHeight - 200) + 50}px`;
  popup.style.left = `calc(50% - 110px)`;
  popup.style.zIndex = zIndexCounter++;

  popup.innerHTML = `
    <div class="popup-header">
      Fun Fact
      <button class="popup-close" onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <div class="popup-content" style="font-size:0.9rem; overflow:auto; max-height:110px;">
      ${fact}
    </div>
  `;
  document.body.appendChild(popup);
  makeDraggable(popup);
}

function makeDraggable(el) {
  const header = el.querySelector('.popup-header');
  let offsetX = 0, offsetY = 0, isDown = false;

  header.addEventListener('mousedown', e => {
    if (e.target.classList.contains('popup-close')) return;
    isDown = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = zIndexCounter++;
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => { isDown = false; });
}

// Zelda Easter Egg
document.getElementById('footer-text').addEventListener('click', () => {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.style.background = '#e0d4ff';
  popup.style.width = '250px';
  popup.style.height = '120px';
  popup.style.top = '150px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.zIndex = zIndexCounter++;

  popup.innerHTML = `
    <div class="popup-header">
      Zelda Easter Egg
      <button class="popup-close" onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <div class="popup-content marquee" style="font-size:0.9rem;">
      🔺 You found the Triforce! 🔺 It's dangerous to go alone… take this! 🗡️
    </div>
  `;

  document.body.appendChild(popup);
  makeDraggable(popup);
});

// Close All
document.getElementById('close-all-btn').addEventListener('click', () => {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => popup.remove());
});
