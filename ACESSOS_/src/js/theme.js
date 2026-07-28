window.AcessosApp = window.AcessosApp || {};

(function() {
  const THEME_KEY = 'acessos_gtcon_theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  function toggle() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
    return getTheme();
  }

  function init() {
    applyTheme(getTheme());
  }

  window.AcessosApp.Theme = { getTheme, setTheme, toggle, init };
})();
