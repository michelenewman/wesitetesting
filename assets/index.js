let zIndexCounter = 100;

// Load YAML data
fetch('assets/data.yml')
  .then(res => res.text())
  .then(yamlText => {
    const siteData = jsyaml.load(yamlText);
    populatePopups(siteData);
    // Store fun-facts for dynamic popups
    window.funFacts = siteData.fun_facts;
  })
  .catch(err => console.error('Error loading YAML:', err));

// Populate static popups with YAML data
function populatePopups(data) {
  // Publications
  const pubList = document.getElementById('publications-list');
  data.publications.forEach(pub => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${pub.title}</strong>, ${pub.journal}, ${pub.year} <a href="${pub.link}" target="_blank">Link</a>`;
    pubList.appendChild(p);
  });

  // Projects
  const projList = document.getElementById('projects-list');
  data.projects.forEach(proj => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${proj.name}</strong>: ${proj.description} <a href="${proj.link}" target="_blank">Link</a>`;
    projList.appendChild(p);
  });

  // Teaching
  const teachList = document.getElementById('teaching-list');
  data.teaching.forEach(course => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${course.course}</strong>, ${course.term} <a href="${course.link}" target="_blank">Link</a>`;
    teachList.appendChild(p);
  });
}

// Open / Close My Work Popups
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';
  popup.style.zIndex = zIndexCounter++;
  makeDraggable(popup);
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Close all popups
document.getElementById('close-all-btn').addEventListener('click', () => {
  document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
});

// Create dynamic popup (fun-fact or Zelda)
function createPopup(title, contentHTML, width=250, height=150) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.style.background = '#e0d4ff';
  popup.style.width = width+'px';
  popup.style.height = height+'px';
  popup.style.top = '150px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.zIndex = zIndexCounter++;

  popup.innerHTML = `
    <div class="popup-header">
      ${title}
      <button class="popup-close" onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <div class="popup-content">${contentHTML}</div>
  `;
  document.body.appendChild(popup);
  makeDraggable(popup);
}

// Fun-fact popup
function showFunFact() {
  if (!window.funFacts || window.funFacts.length === 0) return;
  const fact = window.funFacts[Math.floor(Math.random() * window.funFacts.length)];
  createPopup('Fun Fact', fact, 220, 150);
}

// Zelda Easter egg
function showZeldaEgg() {
  createPopup(
    'Zelda Easter Egg',
    `<div class="marquee" style="font-size:0.9rem;">🔺 You found the Triforce! 🔺 It's dangerous to go alone… take this! 🗡️</div>`,
    250,
    120
  );
}

// Footer Zelda click
document.getElementById('footer-text').addEventListener('click', showZeldaEgg);

// Make popup draggable
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
