window.AcessosApp = window.AcessosApp || {};

(function() {
  const Storage = window.AcessosApp.Storage;
  let currentSheet = null;
  let currentFilter = { search: '' };
  let _initialized = false;

  function getCurrentSheet() {
    return currentSheet;
  }

  function getSheetConfig(key) {
    return (window.AcessosApp.SHEETS || []).find(s => s.key === key);
  }

  function renderTabs() {
    const container = document.getElementById('tabsScroll');
    const sheets = window.AcessosApp.SHEETS || [];
    container.innerHTML = sheets.map(s => `
      <button class="tab-btn ${s.key === currentSheet ? 'active' : ''}" data-key="${s.key}">
        ${s.label}
      </button>
    `).join('');

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key !== currentSheet) {
          currentSheet = key;
          renderTabs();
          renderTable();
          updateStats();
        }
      });
    });
  }

  function renderTable() {
    if (!currentSheet) return;
    const config = getSheetConfig(currentSheet);
    if (!config) return;

    const data = applyFilters(Storage.getAll(currentSheet));
    renderColumns(config.columns);
    renderRows(data, config.columns);
    updateStats();
  }

  function renderColumns(columns) {
    const thead = document.getElementById('tableHead');
    const headers = columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
    thead.innerHTML = `<tr id="headerRow">${headers}<th style="width: 120px;">AÇÕES</th></tr>`;
  }

  function renderRows(data, columns) {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');

    if (data.length === 0) {
      tbody.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    tbody.innerHTML = data.map(r => {
      const cells = columns.map(col => {
        let val = r[col] || '';
        const isPw = /senha/i.test(col);
        if (isPw && val) {
          return `<td><span class="pw-cell" data-pw="${escapeHtml(val)}">••••••••</span></td>`;
        }
        return `<td>${escapeHtml(val)}</td>`;
      }).join('');
      return `
      <tr>
        ${cells}
        <td>
          <div class="action-btns">
            <button class="btn btn-outline btn-sm edit-btn" data-id="${r.id}">✏️</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${r.id}">🗑</button>
          </div>
        </td>
      </tr>`;
    }).join('');

    tbody.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.dataset.id));
    });
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => confirmDelete(btn.dataset.id));
    });
    tbody.querySelectorAll('.pw-cell').forEach(el => {
      el.addEventListener('click', function() {
        if (this.dataset.revealed) {
          this.textContent = '••••••••';
          delete this.dataset.revealed;
        } else {
          this.textContent = this.dataset.pw;
          this.dataset.revealed = '1';
        }
      });
    });
  }

  function applyFilters(data) {
    const { search } = currentFilter;
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(r => {
      return Object.values(r).some(v => String(v || '').toLowerCase().includes(q));
    });
  }

  function updateStats() {
    if (!currentSheet) return;
    const data = Storage.getAll(currentSheet);
    document.getElementById('statTotal').textContent = data.length;
  }

  function openCreateModal() {
    if (!currentSheet) return;
    const config = getSheetConfig(currentSheet);
    if (!config) return;
    document.getElementById('modalTitle').textContent = `Novo - ${config.label}`;
    document.getElementById('recordId').value = '';
    const body = document.getElementById('modalBody');
    body.innerHTML = config.columns.map(col => `
      <div class="form-group">
        <label for="frm_${col}">${escapeHtml(col)}</label>
        <input type="text" id="frm_${col}" placeholder="${escapeHtml(col)}">
      </div>
    `).join('');
    document.getElementById('modalOverlay').classList.add('active');
    const firstInput = body.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function openEditModal(id) {
    if (!currentSheet) return;
    const config = getSheetConfig(currentSheet);
    if (!config) return;
    const record = Storage.getById(currentSheet, id);
    if (!record) return;
    document.getElementById('modalTitle').textContent = `Editar - ${config.label}`;
    document.getElementById('recordId').value = id;
    const body = document.getElementById('modalBody');
    body.innerHTML = config.columns.map(col => `
      <div class="form-group">
        <label for="frm_${col}">${escapeHtml(col)}</label>
        <input type="text" id="frm_${col}" value="${escapeHtml(record[col] || '')}" placeholder="${escapeHtml(col)}">
      </div>
    `).join('');
    document.getElementById('modalOverlay').classList.add('active');
    const firstInput = body.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  }

  function confirmDelete(id) {
    if (!currentSheet) return;
    const record = Storage.getById(currentSheet, id);
    if (!record) return;
    const config = getSheetConfig(currentSheet);
    const firstCol = config ? (config.columns[0] || '') : '';
    const name = record[firstCol] || id;
    document.getElementById('confirmMessage').textContent = `Excluir registro "${name}"?`;
    document.getElementById('confirmDeleteBtn').dataset.id = id;
    document.getElementById('confirmOverlay').classList.add('active');
  }

  function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('active');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!currentSheet) return;
    const config = getSheetConfig(currentSheet);
    if (!config) return;
    const id = document.getElementById('recordId').value;
    const data = {};
    config.columns.forEach(col => {
      const el = document.getElementById('frm_' + col);
      data[col] = el ? el.value.trim() : '';
    });

    if (id) {
      Storage.update(currentSheet, id, data);
      showToast('Registro atualizado!', 'success');
    } else {
      Storage.create(currentSheet, data);
      showToast('Novo registro criado!', 'success');
    }

    closeModal();
    renderTable();
  }

  function handleDelete() {
    if (!currentSheet) return;
    const id = document.getElementById('confirmDeleteBtn').dataset.id;
    Storage.remove(currentSheet, id);
    closeConfirm();
    renderTable();
    showToast('Registro excluído.', 'info');
  }

  function handleSearch(e) {
    currentFilter.search = e.target.value;
    renderTable();
  }

  function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `
      <span>${icons[type] || 'ℹ️'}</span>
      <span>${escapeHtml(message)}</span>
      <button class="toast-close">&times;</button>
    `;
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function init(initialSheet) {
    if (_initialized && initialSheet) {
      if (currentSheet !== initialSheet) {
        currentSheet = initialSheet;
        renderTabs();
        renderTable();
        updateStats();
      }
      return;
    }
    _initialized = true;

    if (!initialSheet) {
      const sheets = window.AcessosApp.SHEETS || [];
      initialSheet = sheets.length > 0 ? sheets[0].key : null;
    }
    currentSheet = initialSheet;

    renderTabs();
    renderTable();
    updateStats();

    document.getElementById('addBtn').addEventListener('click', openCreateModal);
    document.getElementById('modalForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    document.getElementById('confirmCancelBtn').addEventListener('click', closeConfirm);
    document.getElementById('confirmDeleteBtn').addEventListener('click', handleDelete);
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('confirmOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeConfirm();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeModal(); closeConfirm(); }
    });
  }

  window.AcessosApp.UI = { init, renderTable, showToast, closeModal, closeConfirm, openCreateModal, getCurrentSheet };
})();
