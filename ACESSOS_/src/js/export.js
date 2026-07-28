window.AcessosApp = window.AcessosApp || {};

(function() {
  const Storage = window.AcessosApp.Storage;

  function exportCSV() {
    const data = Storage.getAll();
    if (data.length === 0) {
      window.AcessosApp.UI.showToast('Nenhum dado para exportar.', 'error');
      return;
    }

    const headers = ['USUÁRIO EXACT', 'USUÁRIO GTCON', 'SENHA PADRÃO', 'STATUS'];
    const rows = data.map(r => [
      r.usuarioExact || '',
      r.usuarioGtcon || '',
      r.senhaPadrao || '',
      r.status === 'ativo' ? 'Ativo' : r.status === 'pendente' ? 'Pendente' : 'Inativo'
    ]);

    let csv = '\uFEFF';
    csv += headers.map(h => `"${h}"`).join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(v => `"${(v || '').replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `acessos_gtcon_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    window.AcessosApp.UI.showToast('Dados exportados em CSV com sucesso!', 'success');
  }

  function exportJSON() {
    const data = Storage.getAll();
    if (data.length === 0) {
      window.AcessosApp.UI.showToast('Nenhum dado para exportar.', 'error');
      return;
    }

    const exportData = data.map(r => ({
      usuarioExact: r.usuarioExact,
      usuarioGtcon: r.usuarioGtcon,
      senhaPadrao: r.senhaPadrao,
      status: r.status
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `acessos_gtcon_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    window.AcessosApp.UI.showToast('Dados exportados em JSON com sucesso!', 'success');
  }

  function exportXLSX() {
    const data = Storage.getAll();
    if (data.length === 0) {
      window.AcessosApp.UI.showToast('Nenhum dado para exportar.', 'error');
      return;
    }

    const wb = [
      ['USUÁRIO EXACT', 'USUÁRIO GTCON', 'SENHA PADRÃO', 'STATUS'],
      ...data.map(r => [
        r.usuarioExact || '',
        r.usuarioGtcon || '',
        r.senhaPadrao || '',
        r.status === 'ativo' ? 'Ativo' : r.status === 'pendente' ? 'Pendente' : 'Inativo'
      ])
    ];

    let csv = '\uFEFF';
    wb.forEach(row => {
      csv += row.map(v => `"${(v || '').replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `acessos_gtcon_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    window.AcessosApp.UI.showToast(
      'Exportado como CSV (compatível com Excel). Para formato .xlsx, instale a biblioteca SheetJS.',
      'info'
    );
  }

  let _initialized = false;

  function init() {
    if (_initialized) return;
    _initialized = true;
    document.getElementById('exportCSVBtn').addEventListener('click', exportCSV);
    document.getElementById('exportJSONBtn').addEventListener('click', exportJSON);
    document.getElementById('exportXLSXBtn').addEventListener('click', exportXLSX);
  }

  window.AcessosApp.Export = { init };
})();
