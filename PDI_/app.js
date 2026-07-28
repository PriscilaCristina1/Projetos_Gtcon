const ADMIN_PASSWORD = "admin123";
let currentPhase = 1;
let currentUser = null;

function getDB() {
    const raw = localStorage.getItem("pdi_db");
    return raw ? JSON.parse(raw) : { users: [] };
}

function saveDB(db) {
    localStorage.setItem("pdi_db", JSON.stringify(db));
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
}

function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// ===== LOGIN =====
function startPDI() {
    const name = document.getElementById("login-name").value.trim();
    const dept = document.getElementById("login-dept").value;
    const role = document.getElementById("login-role").value.trim();
    const time = document.getElementById("login-time").value;

    if (!name || !dept || !role || !time) {
        alert("Preencha todos os campos.");
        return;
    }

    const db = getDB();
    const existing = db.users.find(u =>
        u.name.toLowerCase() === name.toLowerCase() &&
        u.department === dept
    );

    if (existing) {
        currentUser = existing;
    } else {
        currentUser = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            name,
            department: dept,
            role,
            time_company: time,
            created_at: new Date().toISOString(),
            responses: {},
            completed: false
        };
        db.users.push(currentUser);
        saveDB(db);
    }

    currentPhase = Math.min(Object.keys(currentUser.responses).length + 1, 6);
    renderPhase();
    showScreen("screen-phase");
}

// ===== ADMIN =====
function adminLogin() {
    const pw = document.getElementById("admin-password").value;
    if (pw === ADMIN_PASSWORD) {
        renderAdmin();
        showScreen("screen-admin");
    } else {
        alert("Senha incorreta.");
    }
}

// ===== FASES =====
function renderPhase() {
    const phase = PHASES[currentPhase - 1];
    document.getElementById("phase-subtitle").textContent = `Fase ${currentPhase} de 6`;

    let dots = "";
    for (let i = 1; i <= 6; i++) {
        const cls = i < currentPhase ? "completed" : i === currentPhase ? "active" : "";
        dots += `<div class="phase-dot ${cls}">${i}</div>`;
    }
    document.getElementById("phase-indicator").innerHTML = dots;

    let html = `<h2>${phase.title}</h2>`;
    if (phase.welcome) {
        html += `<div class="welcome-box"><strong>Bem-vindo(a) ao PDI!</strong><br>${phase.welcome}</div>`;
    }
    html += `<p style="color:#666;margin-bottom:1.5rem;">${phase.intro}</p>`;

    const saved = currentUser.responses[`phase_${currentPhase}`] || {};
    phase.questions.forEach(q => {
        html += `<div class="form-group">
            <label>${q.label}</label>
            <textarea id="resp-${q.id}" placeholder="Sua resposta...">${saved[q.id] || ""}</textarea>
        </div>`;
    });

    document.getElementById("phase-content").innerHTML = html;
    document.getElementById("btn-prev").style.display = currentPhase === 1 ? "none" : "inline-block";

    const isLast = currentPhase === 6;
    const btnNext = document.getElementById("btn-next");
    btnNext.textContent = isLast ? "✅ Finalizar PDI" : "Próxima Fase →";
    btnNext.className = isLast ? "btn btn-success" : "btn btn-primary";

    if (isLast && currentUser.completed) {
        document.getElementById("phase-content").innerHTML += `
            <div class="completion-msg">
                <h3>🎉 PDI Já Finalizado!</h3>
                <p>Suas respostas foram salvas com sucesso.</p>
                <button class="btn btn-primary" onclick="showScreen('screen-dashboard')" style="margin-top:1rem;">Ver Meu Dashboard</button>
            </div>`;
        document.querySelector(".navigation").style.display = "none";
    } else {
        document.querySelector(".navigation").style.display = "flex";
    }
}

function saveCurrentPhase() {
    const phase = PHASES[currentPhase - 1];
    const responses = {};
    phase.questions.forEach(q => {
        responses[q.id] = document.getElementById(`resp-${q.id}`).value;
    });

    const db = getDB();
    const user = db.users.find(u => u.id === currentUser.id);
    if (user) {
        user.responses[`phase_${currentPhase}`] = responses;
        if (currentPhase === 6) user.completed = true;
        saveDB(db);
        currentUser = user;
    }
}

function nextPhase() {
    saveCurrentPhase();
    if (currentPhase === 6) {
        toast("🎉 PDI concluído com sucesso!");
        renderDashboard();
        showScreen("screen-dashboard");
    } else {
        currentPhase++;
        renderPhase();
    }
}

function prevPhase() {
    if (currentPhase > 1) {
        saveCurrentPhase();
        currentPhase--;
        renderPhase();
    }
}

// ===== DASHBOARD =====
function renderDashboard() {
    const u = currentUser;
    const completed = Object.keys(u.responses).length;
    const pct = Math.round((completed / 6) * 100);

    let html = `<h2>Olá, ${u.name}!</h2>
    <div class="user-info">
        <div class="info-item"><div class="info-label">Departamento</div><div class="info-value">${u.department}</div></div>
        <div class="info-item"><div class="info-label">Cargo</div><div class="info-value">${u.role}</div></div>
        <div class="info-item"><div class="info-label">Tempo de Empresa</div><div class="info-value">${u.time_company}</div></div>
        <div class="info-item"><div class="info-label">Status</div><div class="info-value">${u.completed ? "Concluído ✅" : "Em andamento..."}</div></div>
    </div>
    <p><strong>Progresso Geral:</strong></p>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%">${completed}/6 fases</div></div>
    <div style="margin-top:1.5rem;"><h3>Resumo das Fases:</h3>`;

    for (let i = 1; i <= 6; i++) {
        const done = `phase_${i}` in u.responses;
        html += `<div class="phase-item">
            <div class="phase-icon ${done ? "done" : "pending"}">${i}</div>
            <div class="phase-name">${PHASE_NAMES[i]}</div>
            <div>${done ? "✅" : "⏳"}</div>
        </div>`;
    }

    html += `</div>
    <div class="actions">
        ${!u.completed ? `<button class="btn btn-primary" onclick="currentPhase=${completed + 1 < 6 ? completed + 1 : 6}; renderPhase(); showScreen('screen-phase');">Continuar PDI →</button>` : ""}
        <button class="btn btn-secondary" onclick="showScreen('screen-login')">Sair</button>
    </div>`;

    document.getElementById("dashboard-content").innerHTML = html;
}

// ===== ADMIN PANEL =====
function renderAdmin() {
    const db = getDB();
    const users = db.users;
    const completed = users.filter(u => u.completed).length;
    const departments = [...new Set(users.map(u => u.department))];

    document.getElementById("admin-stats").innerHTML = `
        <div class="stat-card"><div class="stat-number">${users.length}</div><div class="stat-label">Total de PDIs</div></div>
        <div class="stat-card"><div class="stat-number">${completed}</div><div class="stat-label">Concluídos</div></div>
        <div class="stat-card"><div class="stat-number">${users.length - completed}</div><div class="stat-label">Em Andamento</div></div>
        <div class="stat-card"><div class="stat-number">${departments.length}</div><div class="stat-label">Departamentos</div></div>`;

    const filterDept = document.getElementById("filter-dept");
    filterDept.innerHTML = `<option value="">Todos os Departamentos</option>` +
        departments.map(d => `<option value="${d}">${d}</option>`).join("");

    renderAdminTable(users);
    renderAdminReport(users, departments);
}

function renderAdminTable(users) {
    const tbody = document.getElementById("admin-tbody");
    tbody.innerHTML = users.map(u => {
        const completed = Object.keys(u.responses).length;
        const pct = Math.round((completed / 6) * 100);
        return `<tr data-dept="${u.department}" data-status="${u.completed ? "completed" : "pending"}" data-name="${u.name.toLowerCase()}">
            <td>${u.name}</td>
            <td>${u.department}</td>
            <td>${u.role}</td>
            <td><div class="progress-bar" style="height:14px;margin:0;"><div class="progress-fill" style="width:${pct}%;font-size:0.7rem;">${completed}/6</div></div></td>
            <td><span class="badge ${u.completed ? "badge-success" : "badge-warning"}">${u.completed ? "Concluído" : "Em andamento"}</span></td>
            <td><button class="btn btn-primary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="showDetail('${u.id}')">Ver</button></td>
        </tr>`;
    }).join("");
}

function renderAdminReport(users, departments) {
    let html = "";
    departments.forEach(dept => {
        const deptUsers = users.filter(u => u.department === dept);
        const deptCompleted = deptUsers.filter(u => u.completed).length;
        html += `<div class="dept-card">
            <strong>${dept}</strong> — ${deptUsers.length} colaborador(es) | Concluídos: ${deptCompleted}
        </div>`;
    });
    document.getElementById("admin-report").innerHTML = html;
}

function filterAdmin() {
    const dept = document.getElementById("filter-dept").value;
    const status = document.getElementById("filter-status").value;
    const search = document.getElementById("filter-search").value.toLowerCase();

    document.querySelectorAll("#admin-tbody tr").forEach(row => {
        const matchDept = !dept || row.dataset.dept === dept;
        const matchStatus = !status || row.dataset.status === status;
        const matchSearch = !search || row.dataset.name.includes(search);
        row.style.display = (matchDept && matchStatus && matchSearch) ? "" : "none";
    });
}

// ===== DETALHES =====
function showDetail(userId) {
    const db = getDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) return;

    let html = `<h2>📄 PDI de ${user.name}</h2>
    <p><strong>Departamento:</strong> ${user.department} | <strong>Cargo:</strong> ${user.role} | <strong>Tempo:</strong> ${user.time_company}</p>
    <p style="margin:0.5rem 0;color:#666;">Criado em: ${new Date(user.created_at).toLocaleDateString("pt-BR")}</p>
    <hr style="margin:1rem 0;border:none;border-top:1px solid #eee;">`;

    for (let i = 1; i <= 6; i++) {
        const key = `phase_${i}`;
        if (key in user.responses) {
            html += `<div class="phase-response"><h4>Fase ${i}: ${PHASE_NAMES[i]}</h4>`;
            const resp = user.responses[key];
            Object.entries(resp).forEach(([k, v]) => {
                html += `<p><strong>${k.toUpperCase()}:</strong> ${v || "(sem resposta)"}</p>`;
            });
            html += `</div>`;
        }
    }

    document.getElementById("detail-content").innerHTML = html;
    showScreen("screen-detail");
}

// ===== EXPORTAR =====
function exportJSON() {
    const db = getDB();
    const blob = new Blob([JSON.stringify(db.users, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pdi_report_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    toast("📥 JSON exportado!");
}

function exportCSV() {
    const db = getDB();
    const users = db.users;
    if (!users.length) { alert("Nenhum dado para exportar."); return; }

    let csv = "Nome,Departamento,Cargo,Tempo de Empresa,Criado em,Status,Fases Completas\n";
    users.forEach(u => {
        const completed = Object.keys(u.responses).length;
        csv += `"${u.name}","${u.department}","${u.role}","${u.time_company}","${new Date(u.created_at).toLocaleDateString("pt-BR")}","${u.completed ? "Concluído" : "Em andamento"}","${completed}/6"\n`;
    });

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pdi_report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast("📥 CSV exportado!");
}