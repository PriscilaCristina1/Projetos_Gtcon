window.AcessosApp = window.AcessosApp || {};

(function() {
  const PREFIX = 'acessos_gtcon_';

  function getKey(sheet) { return PREFIX + sheet; }
  function getSettingsKey() { return PREFIX + 'settings'; }

  function getAll(sheet) {
    try {
      return JSON.parse(localStorage.getItem(getKey(sheet))) || [];
    } catch { return []; }
  }

  function saveAll(sheet, data) {
    localStorage.setItem(getKey(sheet), JSON.stringify(data));
  }

  function getById(sheet, id) {
    return getAll(sheet).find(r => r.id === id);
  }

  function create(sheet, record) {
    const data = getAll(sheet);
    const newRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      ...record,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.push(newRecord);
    saveAll(sheet, data);
    return newRecord;
  }

  function update(sheet, id, changes) {
    const data = getAll(sheet);
    const idx = data.findIndex(r => r.id === id);
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...changes, updatedAt: new Date().toISOString() };
    saveAll(sheet, data);
    return data[idx];
  }

  function remove(sheet, id) {
    const data = getAll(sheet).filter(r => r.id !== id);
    saveAll(sheet, data);
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(getSettingsKey())) || {};
    } catch { return {}; }
  }

  function saveSettings(settings) {
    localStorage.setItem(getSettingsKey(), JSON.stringify(settings));
  }

  function parseSheet(sheetKey, columns) {
    const raw = (window.AcessosApp.XLSX_DATA || {})[sheetKey];
    if (!raw || !Array.isArray(raw)) return [];

    const colSet = new Set(columns);

    const records = [];
    for (let ri = 0; ri < raw.length; ri++) {
      const row = raw[ri];
      if (!row || row.every(v => v === null || v === undefined || v === '')) continue;

      const nonNull = row.filter(v => v !== null && v !== undefined && v !== '');
      if (nonNull.length < 2) continue;

      if (nonNull.some(v => typeof v === 'string' && colSet.has(v.trim()))) continue;

      const record = { id: undefined };
      let hasData = false;
      columns.forEach((col, ci) => {
        let val = row[ci] !== undefined ? row[ci] : null;
        if (val === null || val === undefined) val = '';
        record[col] = String(val).trim();
        if (record[col]) hasData = true;
      });
      if (hasData) {
        record.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 3) + ri;
        records.push(record);
      }
    }
    return records;
  }

  function seedInitialData() {
    const sheets = window.AcessosApp.SHEETS || [];
    let seeded = 0;
    sheets.forEach(s => {
      const existing = getAll(s.key);
      if (existing.length === 0) {
        const parsed = parseSheet(s.key, s.columns);
        if (parsed.length > 0) {
          saveAll(s.key, parsed);
          seeded += parsed.length;
        }
      }
    });
    return seeded;
  }

  function resetSheet(sheetKey, columns) {
    const parsed = parseSheet(sheetKey, columns);
    saveAll(sheetKey, parsed);
    return parsed.length;
  }

  window.AcessosApp.Storage = { getAll, getById, create, update, remove, getSettings, saveSettings, seedInitialData, resetSheet, parseSheet };
})();
