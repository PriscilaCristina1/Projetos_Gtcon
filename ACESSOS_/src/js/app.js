(function() {
  const Auth = window.AcessosApp.Auth;
  const Theme = window.AcessosApp.Theme;
  const UI = window.AcessosApp.UI;
  const Export = window.AcessosApp.Export;
  const Storage = window.AcessosApp.Storage;

  function init() {
    Theme.init();
    Storage.seedInitialData();

    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const mainApp = document.getElementById('mainApp');
    const loginScreen = document.getElementById('loginScreen');
    const logoutBtn = document.getElementById('logoutBtn');
    const themeToggle = document.getElementById('themeToggle');

    if (Auth.isAuthenticated()) {
      loginScreen.classList.add('hidden');
      mainApp.classList.add('active');
    }

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value;

      if (Auth.login(user, pass)) {
        loginError.classList.remove('show');
        loginScreen.classList.add('hidden');
        mainApp.classList.add('active');
        document.getElementById('userInfo').textContent = Auth.getCurrentUser();
        UI.init();
        Export.init();
        return;
      }

      loginError.classList.remove('show');
      void loginError.offsetWidth;
      loginError.classList.add('show');
      document.getElementById('loginPass').value = '';
      document.getElementById('loginPass').focus();
    });

    loginForm.addEventListener('input', function() {
      loginError.classList.remove('show');
    });

    logoutBtn.addEventListener('click', function() {
      Auth.logout();
      mainApp.classList.remove('active');
      loginScreen.classList.remove('hidden');
      document.getElementById('loginUser').value = '';
      document.getElementById('loginPass').value = '';
      document.getElementById('loginUser').focus();
    });

    themeToggle.addEventListener('click', function() {
      const newTheme = Theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    if (Theme.getTheme() === 'dark') {
      themeToggle.textContent = '☀️';
    }

    if (Auth.isAuthenticated()) {
      UI.init();
      Export.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
