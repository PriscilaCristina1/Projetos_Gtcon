window.AcessosApp = window.AcessosApp || {};

(function() {
  const APP_KEY = 'acessos_gtcon_data';
  const SETTINGS_KEY = 'acessos_gtcon_settings';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(APP_KEY)) || [];
    } catch { return []; }
  }

  function saveAll(data) {
    localStorage.setItem(APP_KEY, JSON.stringify(data));
  }

  function getById(id) {
    return getAll().find(r => r.id === id);
  }

  function create(record) {
    const data = getAll();
    const newRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      usuarioExact: record.usuarioExact || '',
      usuarioGtcon: record.usuarioGtcon || '',
      senhaPadrao: record.senhaPadrao || '',
      status: record.status || 'ativo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.push(newRecord);
    saveAll(data);
    return newRecord;
  }

  function update(id, changes) {
    const data = getAll();
    const idx = data.findIndex(r => r.id === id);
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...changes, updatedAt: new Date().toISOString() };
    saveAll(data);
    return data[idx];
  }

  function remove(id) {
    const data = getAll().filter(r => r.id !== id);
    saveAll(data);
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    } catch { return {}; }
  }

  function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function seedInitialData() {
    const data = getAll();
    if (data.length === 0) {
      const initial = [
        { usuarioExact: 'GTCON65', usuarioGtcon: 'Adriene', senhaPadrao: 'Gtcon#1882', status: 'ativo' },
        { usuarioExact: 'GTCON44', usuarioGtcon: 'Alessandra', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON85', usuarioGtcon: 'Alexandre Rangel', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON41', usuarioGtcon: 'Alexandre Vieira', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON36', usuarioGtcon: 'Alexsandra', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON3', usuarioGtcon: 'Aline Bezerra', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON90', usuarioGtcon: 'Allan', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON11', usuarioGtcon: 'Ana Cristina', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON13', usuarioGtcon: 'Andreia', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON14', usuarioGtcon: 'Anna Carolina', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON91', usuarioGtcon: 'Barbara', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON12', usuarioGtcon: 'Bruna de Almeida', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON38', usuarioGtcon: 'Bruno Silva', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON15', usuarioGtcon: 'Caroline Pereira', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON67', usuarioGtcon: 'Cassia Yara', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON45', usuarioGtcon: 'Clara', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON57', usuarioGtcon: 'CONTABIL', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON17', usuarioGtcon: 'Danieli', senhaPadrao: '', status: 'ativo' },
        { usuarioExact: 'GTCON109', usuarioGtcon: 'Danielle', senhaPadrao: '', status: 'ativo' },
      ];
      initial.forEach(r => create(r));
    }
  }

  window.AcessosApp.Storage = { getAll, getById, create, update, remove, getSettings, saveSettings, seedInitialData };
})();
