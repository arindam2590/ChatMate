(function () {
  var STORAGE_KEY = 'theme';
  var DEFAULT_THEME = 'dark';
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  var theme = (saved === 'light' || saved === 'dark') ? saved : DEFAULT_THEME;
  if (root.getAttribute('data-theme') !== theme) {
    root.setAttribute('data-theme', theme);
  }

  function setLabel() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = (theme === 'dark') ? '☀️ Light' : '🌙 Dark';
  }

  setLabel();

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || t.id !== 'theme-toggle') return;
    theme = (theme === 'dark') ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    setLabel();
  });
})(); 