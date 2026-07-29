window.AcessosApp = window.AcessosApp || {};

(function() {
  const Storage = window.AcessosApp.Storage;

  function getSheetConfig(key) {
    return (window.AcessosApp.SHEETS || []).find(s => s.key === key);
  }

  function getCurrentSheet() {
    const ui = window.AcessosApp.UI;
    return ui ? ui.getCurrentSheet() : null;
  }

  function exportCSV() {
    const sheet = getCurrentSheet();
    if (!sheet) return;
    const config = getSheetConfig(sheet);
    if (!config) return;
    const data = Storage.getAll(sheet);
    if (data.length === 0) {
      window.AcessosApp.UI.showToast('Nenhum dado para exportar.', 'error');
      return;
    }

    const headers = config.columns;
    const rows = data.map(r => headers.map(h => (r[h] || '').replace(/"/g, '""')));

    let csv = '\uFEFF';
    csv += headers.map(h => `"${h}"`).join(',') + '\n';
    rows.forEach(row => { csv += row.map(v => `"${v}"`).join(',') + '\n'; });

    download(csv, `acessos_${sheet.replace(/ /g,'_')}_${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8;');
    window.AcessosApp.UI.showToast('CSV exportado!', 'success');
  }

  function exportJSON() {
    const sheet = getCurrentSheet();
    if (!sheet) return;
    const config = getSheetConfig(sheet);
    if (!config) return;
    const data = Storage.getAll(sheet);
    if (data.length === 0) {
      window.AcessosApp.UI.showToast('Nenhum dado para exportar.', 'error');
      return;
    }

    const exportData = data.map(r => {
      const obj = {};
      config.columns.forEach(c => { obj[c] = r[c] || ''; });
      return obj;
    });

    download(JSON.stringify(exportData, null, 2), `acessos_${sheet.replace(/ /g,'_')}_${new Date().toISOString().slice(0,10)}.json`, 'application/json');
    window.AcessosApp.UI.showToast('JSON exportado!', 'success');
  }

  function download(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  let _initialized = false;

  function init() {
    if (_initialized) return;
    _initialized = true;
    document.getElementById('exportCSVBtn').addEventListener('click', exportCSV);
    document.getElementById('exportJSONBtn').addEventListener('click', exportJSON);
  }

  window.AcessosApp.Export = { init };
})();
