const defaults = {
  html: `<main class="card">
  <p class="eyebrow">YOUR FIRST PROJECT</p>
  <h1>Hello, world! 👋</h1>
  <p>Edit the HTML, CSS, and JavaScript panels, then run your code.</p>
  <button id="hello-button">Click me</button>
  <p id="message" aria-live="polite"></p>
</main>`,
  css: `* { box-sizing: border-box; }
body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #dbeafe, #f5d0fe);
  color: #172033;
  font: 16px/1.6 system-ui, sans-serif;
}
.card {
  width: min(100%, 520px);
  padding: 36px;
  border: 1px solid #ffffffaa;
  border-radius: 20px;
  background: #ffffffd9;
  box-shadow: 0 20px 60px #25314c22;
}
.eyebrow { color: #6951c9; font-size: 12px; font-weight: 800; letter-spacing: .12em; }
h1 { margin: 8px 0; font-size: clamp(2rem, 8vw, 3rem); }
button { border: 0; border-radius: 10px; padding: 11px 18px; background: #6951c9; color: white; font: inherit; font-weight: 700; cursor: pointer; }
button:hover { background: #523caf; }`,
  js: `document.querySelector('#hello-button').addEventListener('click', () => {
  document.querySelector('#message').textContent = 'Nice work — your JavaScript is running!';
});`
};

const htmlEditor = document.querySelector('#html-code');
const cssEditor = document.querySelector('#css-code');
const jsEditor = document.querySelector('#js-code');
const preview = document.querySelector('#preview');
const status = document.querySelector('#status');
let statusTimer;

function setStatus(message) {
  status.textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.textContent = 'Ready'; }, 1800);
}

function runCode() {
  const source = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${cssEditor.value}</style></head><body>${htmlEditor.value}<script>${jsEditor.value.replace(/<\/script/gi, '<\\/script')}<\/script></body></html>`;
  preview.srcdoc = source;
  setStatus('Preview updated');
}

function resetExample() {
  htmlEditor.value = defaults.html;
  cssEditor.value = defaults.css;
  jsEditor.value = defaults.js;
  runCode();
}

document.querySelector('#run-button').addEventListener('click', runCode);
document.querySelector('#reset-button').addEventListener('click', resetExample);
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') runCode();
});

resetExample();
