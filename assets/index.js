// Globals
let zIndexCounter = 100;
const yamlFile = 'assets/data.yml';
let siteData = null;

// Load YAML and populate popups
fetch(yamlFile)
  .then(res => res.text())
  .then(yamlText => {
    siteData = jsyaml.load(yamlText);
    populatePopups();
  })
  .catch(err => console.error('Error loading YAML:', err));

function populatePopups() {
  if (!siteData) return;

  // Publications
  const pubList = document.getElementById('publications-list');
  pubList.innerHTML = '';
  siteData.publications.forEach(pub => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${pub.title}</strong>, ${pub.journal}, ${pub.year} <a href="${pub.link}" target="_blank">Link</a>`;
    pubList.appendChild(li);
  });

  // Projects
  const projList = document.getElementById('projects-list');
  projList.innerHTML = '';
  siteData.projects.forEach(proj => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${proj.name}</strong>: ${proj.description} <a href="${proj.link}" target="_blank">Link</a>`;
    projList.appendChild(li);
  });

  // Teaching
  const teachList = document.getElementById('teaching-list');
  teachList.innerHTML = '';
  siteData.teaching.forEach(course => {
    const li = document.createElement('p');
    li.innerHTML = `<strong>${course.course}</strong>, ${course.term} <a href="${course.link}" target="_blank">Link</a>`;
    teachList.appendChild(li);
  });
}

// Popup open/close
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';
  popup.style.zIndex = zIndexCounter++;
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Fun facts / Zelda Easter egg
function showFunFact() {
  if (!siteData) return;

  // Random fun fact including Zelda
  const facts = siteData.fun_facts || [];
  if (facts.length === 0) return;

  const fact = facts[Math.floor(Math.random() * facts.length)];

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.style.background = '#e0d4ff'; // pastel purple for fun facts
  popup.style.top = `${Math.random() * 300 + 50}px`;
  popup.style.left = `${Math.random() * 500 + 50}px`;
  popup.style.zIndex = zIndexCounter++;

  popup.innerHTML = `
    <div class="popup-header">
      Fun Fact
      <button class="popup-close" onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <div class="popup-content">${fact}</div>
  `;

  document.body.appendChild(popup);
  makeDraggable(popup);
}

// Draggable
function makeDraggable(el) {
  const header = el.querySelector('.popup-header');
  let offsetX = 0, offsetY = 0, isDown = false;

  header.addEventListener('mousedown', e => {
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

// Copy email
function copyEmail() {
  const email = document.getElementById('email').innerText;
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied!');
  });
}
