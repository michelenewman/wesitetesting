// Sample data (replace or load from YAML if needed)
const publications = [
  { title: "Publication 1", link: "#" },
  { title: "Publication 2", link: "#" },
  { title: "Publication 3", link: "#" }
];

const projects = [
  { title: "Project A", link: "#" },
  { title: "Project B", link: "#" }
];

const teaching = [
  { title: "Course 101", link: "#" },
  { title: "Course 102", link: "#" }
];

// Populate popup lists
function populateList(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('p');
    if(item.link) el.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
    else el.textContent = item.title;
    container.appendChild(el);
  });
}

populateList('publications-list', publications);
populateList('projects-list', projects);
populateList('teaching-list', teaching);

// Open/close popups
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';

  // Center on viewport
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pw = popup.offsetWidth;
  const ph = popup.offsetHeight;

  popup.style.left = `${(vw - pw) / 2}px`;
  popup.style.top = `${(vh - ph) / 2}px`;
  popup.style.transform = 'none';
  popup.style.zIndex = 1000;
}

function closePopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}

// Close all popups
document.getElementById('close-all-btn').onclick = () => {
  document.querySelectorAll('.popup').forEach(p => p.style.display='none');
};

// Make popups draggable
document.querySelectorAll('.popup').forEach(popup => {
  const header = popup.querySelector('.popup-header');
  let isDragging = false, offsetX, offsetY;

  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    popup.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', e => {
    if(isDragging){
      popup.style.left = (e.clientX - offsetX) + 'px';
      popup.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => { isDragging = false; });
});

// Fun-facts Easter eggs
const funFacts = [
  "Did you know? The first video game Easter egg was in 1979!",
  "Tip: Collaboration sparks creativity.",
  "AI can help preserve digital culture.",
  "Creativity support tools make learning fun!"
];

function createFunFact() {
  const fact = document.createElement('div');
  fact.className = 'popup';
  fact.style.width = '200px';
  fact.style.height = '100px';
  fact.style.background = '#e8d7ff';
  fact.style.border = '2px solid #c4a7e7';
  fact.style.color = '#333';
  fact.style.top = `${Math.random() * (window.innerHeight - 120)}px`;
  fact.style.left = `${Math.random() * (window.innerWidth - 220)}px`;
  fact.style.zIndex = 500;
  fact.innerHTML = `<div class="popup-header">Fun Fact <button class="popup-close">X</button></div>
                    <div class="popup-content">${funFacts[Math.floor(Math.random()*funFacts.length)]}</div>`;
  document.body.appendChild(fact);
  fact.querySelector('.popup-close').onclick = () => fact.remove();

  // Draggable
  const header = fact.querySelector('.popup-header');
  let isDragging = false, offsetX, offsetY;
  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - fact.offsetLeft;
    offsetY = e.clientY - fact.offsetTop;
    fact.style.zIndex = 1000;
  });
  document.addEventListener('mousemove', e => {
    if(isDragging){
      fact.style.left = (e.clientX - offsetX) + 'px';
      fact.style.top = (e.clientY - offsetY) + 'px';
    }
  });
  document.addEventListener('mouseup', () => { isDragging = false; });
}

// Footer Zelda Easter Egg
document.getElementById('footer-easter-egg').addEventListener('click', () => {
  const zeldaPopup = document.createElement('div');
  zeldaPopup.className = 'popup';
  zeldaPopup.style.width = '250px';
  zeldaPopup.style.height = '120px';
  zeldaPopup.style.top = '50%';
  zeldaPopup.style.left = '50%';
  zeldaPopup.style.transform = 'translate(-50%, -50%)';
  zeldaPopup.style.zIndex = 1000;
  zeldaPopup.innerHTML = `
    <div class="popup-header">Zelda Easter Egg <button class="popup-close">X</button></div>
    <div class="popup-content">
      <div class="marquee"><span>🔺 You found the Triforce! 🔺</span></div>
      <p style="color:#6a5acd;">It's dangerous to go alone… take this! 🗡️</p>
    </div>
  `;
  document.body.appendChild(zeldaPopup);
  zeldaPopup.querySelector('.popup-close').onclick = () => zeldaPopup.remove();
});
