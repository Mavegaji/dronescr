function actualizarPrecio() {
  const servicio = document.getElementById('tipo-servicio');
  const horas = parseInt(document.getElementById('horas')?.value || '1', 10);
  if (!servicio) return;
  const tarifas = {foto:50, inspeccion:70, mapeo:80, agricultura:60};
  const precio = tarifas[servicio.value] ? tarifas[servicio.value] * horas : 0;
  const out = document.getElementById('precio');
  if (out) out.textContent = precio;
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transition = "opacity 1s ease-out";
  });
  let delay = 500;
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = 1;
    }, delay * (index + 1));
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({behavior: "smooth"});
    });
  });

  if (document.getElementById('map')) {
    const map = L.map('map').setView([9.932, -84.08], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    const pilotos = [
      {name:'San José', lat:9.93, lon:-84.08},
      {name:'Liberia', lat:10.63, lon:-85.43},
      {name:'Limón', lat:9.99, lon:-83.05}
    ];
    pilotos.forEach(p => L.marker([p.lat, p.lon]).addTo(map).bindPopup(p.name));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup('Tú estás aquí');
        map.setView([pos.coords.latitude, pos.coords.longitude], 10);
      });
    }
  }
});

function toggleChat() {
  const chat = document.getElementById('chat');
  if (chat) chat.classList.toggle('hidden');
}

function enviarMensaje() {
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');
  if (input && body && input.value.trim()) {
    const msg = document.createElement('div');
    msg.className = 'mb-1 text-right';
    msg.textContent = input.value.trim();
    body.appendChild(msg);
    input.value = '';
    body.scrollTop = body.scrollHeight;
  }
}
