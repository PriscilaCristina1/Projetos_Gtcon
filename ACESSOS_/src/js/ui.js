window.AcessosApp = window.AcessosApp || {};

(function() {
  const Storage = window.AcessosApp.Storage;
  const Auth = window.AcessosApp.Auth;

  let currentFilter = { search: '', status: '', dateFrom: '', dateTo: '' };
  let _initialized = false;

  function renderTable() {
    let data = Storage.getAll();
    data = applyFilters(data);
    updateStats(data);
    renderRows(data);
  }

  function applyFilters(data) {
    const { search, status } = currentFilter;

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        (r.usuarioExact || '').toLowerCase().includes(q) ||
        (r.usuarioGtcon || '').toLowerCase().includes(q) ||
        (r.senhaPadrao || '').toLowerCase().includes(q)
      );
    }

    if (status) {
      data = data.filter(r => r.status === status);
    }

    return data;
  }

  function updateStats(data) {
    const total = Storage.getAll().length;
    const ativos = data.filter(r => r.status === 'ativo').length;
    const semSenha = data.filter(r => !r.senhaPadrao || r.senhaPadrao.trim() === '').length;

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statAtivos').textContent = ativos;
    document.getElementById('statSemSenha').textContent = semSenha;
  }

  function renderRows(data) {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');

    if (data.length === 0) {
      tbody.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    tbody.innerHTML = data.map(r => `
      <tr>
        <td><strong>${escapeHtml(r.usuarioExact || '')}</strong></td>
        <td>${escapeHtml(r.usuarioGtcon || '')}</td>
        <td>
          <div class="password-cell">
            <span class="pw-text ${r.senhaPadrao ? '' : 'text-muted'}" data-pw="${escapeHtml(r.senhaPadrao || '')}">
              ${r.senhaPadrao ? '••••••••' : '—'}
            </span>
            ${r.senhaPadrao ? `<button class="btn btn-ghost btn-icon btn-sm toggle-pw" title="Mostrar/ocultar senha" data-id="${r.id}">👁</button>` : ''}
          </div>
        </td>
        <td>
          <span class="status-badge status-${r.status}">
            <span class="dot"></span>
            ${r.status === 'ativo' ? 'Ativo' : r.status === 'pendente' ? 'Pendente' : 'Inativo'}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button class="btn btn-outline btn-sm edit-btn" data-id="${r.id}" title="Editar">
              ✏️ <span>Editar</span>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${r.id}" title="Excluir">
              🗑 <span>Excluir</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => confirmDelete(btn.dataset.id));
    });

    tbody.querySelectorAll('.toggle-pw').forEach(btn => {
      btn.addEventListener('click', () => togglePassword(btn.dataset.id, btn));
    });
  }

  function togglePassword(id, btn) {
    const record = Storage.getById(id);
    if (!record) return;
    const span = btn.closest('.password-cell').querySelector('.pw-text');
    if (span.classList.contains('masked')) {
      span.textContent = record.senhaPadrao || '—';
      span.classList.remove('masked');
      btn.textContent = '🙈';
    } else {
      span.textContent = '••••••••';
      span.classList.add('masked');
      btn.textContent = '👁';
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openCreateModal() {
    document.getElementById('modalTitle').textContent = 'Novo Acesso';
    document.getElementById('recordId').value = '';
    document.getElementById('frmUsuarioExact').value = '';
    document.getElementById('frmUsuarioGtcon').value = '';
    document.getElementById('frmSenhaPadrao').value = '';
    document.getElementById('frmStatus').value = 'ativo';
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('frmUsuarioExact').focus();
  }

  function openEditModal(id) {
    const record = Storage.getById(id);
    if (!record) return;
    document.getElementById('modalTitle').textContent = 'Editar Acesso';
    document.getElementById('recordId').value = id;
    document.getElementById('frmUsuarioExact').value = record.usuarioExact || '';
    document.getElementById('frmUsuarioGtcon').value = record.usuarioGtcon || '';
    document.getElementById('frmSenhaPadrao').value = record.senhaPadrao || '';
    document.getElementById('frmStatus').value = record.status || 'ativo';
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('frmUsuarioExact').focus();
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  }

  function confirmDelete(id) {
    const record = Storage.getById(id);
    if (!record) return;
    const name = record.usuarioGtcon || record.usuarioExact;
    document.getElementById('confirmMessage').textContent = `Tem certeza que deseja excluir o acesso de "${name}"?`;
    document.getElementById('confirmDeleteBtn').dataset.id = id;
    document.getElementById('confirmOverlay').classList.add('active');
  }

  function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('active');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('recordId').value;
    const data = {
      usuarioExact: document.getElementById('frmUsuarioExact').value.trim(),
      usuarioGtcon: document.getElementById('frmUsuarioGtcon').value.trim(),
      senhaPadrao: document.getElementById('frmSenhaPadrao').value.trim(),
      status: document.getElementById('frmStatus').value
    };

    if (!data.usuarioExact) {
      showToast('O campo USUÁRIO EXACT é obrigatório.', 'error');
      return;
    }

    if (id) {
      Storage.update(id, data);
      showToast('Registro atualizado com sucesso!', 'success');
    } else {
      Storage.create(data);
      showToast('Novo acesso cadastrado com sucesso!', 'success');
    }

    closeModal();
    renderTable();
  }

  function handleDelete() {
    const id = document.getElementById('confirmDeleteBtn').dataset.id;
    const record = Storage.getById(id);
    Storage.remove(id);
    closeConfirm();
    renderTable();
    showToast(`Acesso de "${record?.usuarioGtcon || record?.usuarioExact}" excluído.`, 'info');
  }

  function handleSearch(e) {
    currentFilter.search = e.target.value;
    renderTable();
  }

  function handleFilterStatus(e) {
    currentFilter.status = e.target.value;
    renderTable();
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `
      <span>${icons[type] || 'ℹ️'}</span>
      <span>${escapeHtml(message)}</span>
      <button class="toast-close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

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

  function init() {
    if (_initialized) { renderTable(); return; }
    _initialized = true;

    document.getElementById('addBtn').addEventListener('click', openCreateModal);
    document.getElementById('modalForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    document.getElementById('confirmCancelBtn').addEventListener('click', closeConfirm);
    document.getElementById('confirmDeleteBtn').addEventListener('click', handleDelete);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('filterStatus').addEventListener('change', handleFilterStatus);

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('confirmOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeConfirm();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeConfirm();
      }
    });

    renderTable();
  }

  window.AcessosApp.UI = { init, renderTable, showToast, closeModal, closeConfirm, openCreateModal };
})();
