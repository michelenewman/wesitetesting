let zIndexCounter = 100;

// Load YAML data
fetch('assets/data.yml')
  .then(res => res.text())
  .then(yamlText => {
    const siteData = jsyaml.load(yamlText);
    populatePopups(siteData);
  })
  .catch(err => console.error('Error loading YAML:', err));

// Populate popups with data from YAML
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

  // Fun facts button (can be triggered as desired)
  document.body.addEventListener('click', (e) => {
    if (e.target.id === 'footer-text') {
      showZeldaEgg();
    }
  });

  // Show a fun fact when clicking anywhere (optional)
  // document.body.addEventListener('click', (e) => {
  //   if(e.target.id === 'fun-fact-btn') showFunFact(data.fun_facts);
  // });
}

// Open/close popups
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';
  popup.style.zIndex = zIndexCounter++;
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Close All button
document.getElementById('close-all-btn').addEventListener('click', () => {
  document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
});

// Fun-fact popup
function showFunFact(facts) {
  if (!facts || facts.length === 0) return;
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

// Zelda Easter egg
function showZeldaEgg() {
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
}

// Make popups draggable
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
