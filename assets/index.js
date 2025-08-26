// ---------- LOAD YAML DATA FOR WORK POPUPS ----------
fetch('assets/data.yml')
  .then(res => res.text())
  .then(text => {
    const data = jsyaml.load(text);

    // Publications
    const pubList = document.getElementById('publications-list');
    data.publications.forEach(pub => {
      const a = document.createElement('a');
      a.href = pub.link;
      a.target = "_blank";
      a.textContent = "• " + pub.title;
      pubList.appendChild(a);
      pubList.appendChild(document.createElement('br'));
    });

    // Projects
    const projList = document.getElementById('projects-list');
    data.projects.forEach(proj => {
      const a = document.createElement('a');
      a.href = proj.link;
      a.target = "_blank";
      a.textContent = "• " + proj.name;
      projList.appendChild(a);
      projList.appendChild(document.createElement('br'));
    });

    // Teaching
    const teachList = document.getElementById('teaching-list');
    data.teaching.forEach(course => {
      const a = document.createElement('a');
      a.href = course.syllabus;
      a.target = "_blank";
      a.textContent = "• " + course.course;
      teachList.appendChild(a);
      teachList.appendChild(document.createElement('br'));
    });
  });

// ---------- POPUP MANAGEMENT ----------
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pw = popup.offsetWidth;
  const ph = popup.offsetHeight;

  const offsetX = (Math.random() * 60) - 30;
  const offsetY = (Math.random() * 60) - 30;

  popup.style.left = `${(vw - pw)/2 + offsetX}px`;
  popup.style.top = `${(vh - ph)/2 + offsetY}px`;
  popup.style.zIndex = 1000;
}

function closePopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}

document.getElementById('close-all-btn').addEventListener('click', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(p => p.style.display = 'none');
});

// ---------- DRAGGABLE POPUPS ----------
document.querySelectorAll('.popup').forEach(popup => {
  const header = popup.querySelector('.popup-header');
  let offsetX = 0, offsetY = 0, isDown = false;

  header.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    popup.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    popup.style.left = (e.clientX - offsetX) + 'px';
    popup.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => { isDown = false; });
});

// ---------- FUN FACT POPUPS ----------
const funFacts = [
  "You found a hidden fun fact! 🌟",
  "Keep exploring! Did you know? 💡",
  "Fun fact: Interactive media preserves culture! 🎮",
  "Tip: Collaboration sparks creativity! ✨"
];

function createFunFact() {
  const text = funFacts[Math.floor(Math.random() * funFacts.length)];
  const popup = document.createElement('div');
  popup.className = 'popup';

  const width = 220;
  const height = 100;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const offsetX = (Math.random() * 60) - 30;
  const offsetY = (Math.random() * 60) - 30;

  popup.style.width = width + 'px';
  popup.style.height = height + 'px';
  popup.style.left = `${(vw - width)/2 + offsetX}px`;
  popup.style.top = `${(vh - height)/2 + offsetY}px`;
  popup.style.position = 'absolute';
  popup.style.display = 'block';
  popup.style.zIndex = 1000;
  popup.style.background = '#e3d7ff';
  popup.style.border = '2px solid #c4a7e7';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '4px 4px 0 #c4a7e7';

  popup.innerHTML = `
    <div class="popup-header">Fun Fact <button class="popup-close">X</button></div>
    <div class="popup-content">${text}</div>
  `;

  document.body.appendChild(popup);

  popup.querySelector('.popup-close').onclick = () => popup.remove();

  // Draggable
  const header = popup.querySelector('.popup-header');
  let isDown = false, dragX = 0, dragY = 0;
  header.addEventListener('mousedown', e => {
    isDown = true;
    dragX = e.clientX - popup.offsetLeft;
    dragY = e.clientY - popup.offsetTop;
    popup.style.zIndex = 1000;
  });
  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    popup.style.left = (e.clientX - dragX) + 'px';
    popup.style.top = (e.clientY - dragY) + 'px';
  });
  document.addEventListener('mouseup', () => { isDown = false; });
}

// Click bio image for fun fact
document.querySelector('.bio-box img').addEventListener('click', createFunFact);

// ---------- ZELDA EASTER EGG ----------
const footer = document.getElementById('footer-easter-egg');
footer.addEventListener('click', () => {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const width = 300;
  const height = 120;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  popup.style.width = width + 'px';
  popup.style.height = height + 'px';
  popup.style.left = ((vw - width)/2) + 'px';
  popup.style.top = ((vh - height)/2) + 'px';
  popup.style.position = 'absolute';
  popup.style.display = 'block';
  popup.style.background = '#e3d7ff';
  popup.style.border = '2px solid #c4a7e7';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '4px 4px 0 #c4a7e7';
  popup.style.zIndex = 1000;

  popup.innerHTML = `
    <div class="popup-header">🎮 Zelda Easter Egg <button class="popup-close">X</button></div>
    <div class="popup-content">
      <div class="marquee"><span>🔺 You found the Triforce! 🔺</span></div>
      <p style="color:#6a5acd; margin-top:0.5rem;">It's dangerous to go alone… take this! 🗡️</p>
    </div>
  `;

  document.body.appendChild(popup);
  popup.querySelector('.popup-close').onclick = () => popup.remove();

  // Draggable
  const header = popup.querySelector('.popup-header');
  let isDown = false, dragX = 0, dragY = 0;
  header.addEventListener('mousedown', e => {
    isDown = true;
    dragX = e.clientX - popup.offsetLeft;
    dragY = e.clientY - popup.offsetTop;
    popup.style.zIndex = 1000;
  });
  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    popup.style.left = (e.clientX - dragX) + 'px';
    popup.style.top = (e.clientY - dragY) + 'px';
  });
  document.addEventListener('mouseup', () => { isDown = false; });
});
