window.AcessosApp = window.AcessosApp || {};

(function() {
  const AUTH_KEY = 'acessos_gtcon_auth';
  const VALID_USER = 'ADM';
  const VALID_PASS = '1882';

  function login(username, password) {
    if (username.toUpperCase() === VALID_USER && password === VALID_PASS) {
      const session = {
        user: username,
        loggedAt: new Date().toISOString()
      };
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  function isAuthenticated() {
    try {
      const session = JSON.parse(sessionStorage.getItem(AUTH_KEY));
      return session && session.user;
    } catch {
      return false;
    }
  }

  function getCurrentUser() {
    try {
      const session = JSON.parse(sessionStorage.getItem(AUTH_KEY));
      return session ? session.user : null;
    } catch {
      return null;
    }
  }

  window.AcessosApp.Auth = { login, logout, isAuthenticated, getCurrentUser };
})();
