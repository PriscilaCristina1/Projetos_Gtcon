from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
app.secret_key = 'pdi_secret_key_2026'

DATA_FILE = 'data/pdi_data.json'

def load_data():
    if not os.path.exists(DATA_FILE):
        return {"users": [], "admin_password": "admin123"}
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    os.makedirs('data', exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    data = load_data()
    name = request.form.get('name', '').strip()
    department = request.form.get('department', '').strip()
    role = request.form.get('role', '').strip()
    time_company = request.form.get('time_company', '').strip()
    
    if not all([name, department, role, time_company]):
        return render_template('login.html', error='Todos os campos são obrigatórios.')
    
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "name": name,
        "department": department,
        "role": role,
        "time_company": time_company,
        "created_at": datetime.now().isoformat(),
        "responses": {},
        "completed": False
    }
    
    data["users"].append(user)
    save_data(data)
    
    session['user_id'] = user_id
    session['user_name'] = name
    return redirect(url_for('pdi_phase', phase=1))

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        password = request.form.get('password', '')
        data = load_data()
        if password == data.get('admin_password', 'admin123'):
            session['is_admin'] = True
            return redirect(url_for('admin_panel'))
        return render_template('login.html', error='Senha incorreta.')
    return render_template('admin_login.html')

@app.route('/admin/panel')
def admin_panel():
    if not session.get('is_admin'):
        return redirect(url_for('admin'))
    data = load_data()
    return render_template('admin_panel.html', users=data['users'])

@app.route('/pdi/phase/<int:phase>')
def pdi_phase(phase):
    if 'user_id' not in session:
        return redirect(url_for('index'))
    return render_template(f'phase_{phase}.html', phase=phase)

@app.route('/pdi/save', methods=['POST'])
def save_phase():
    if 'user_id' not in session:
        return jsonify({"error": "Não autenticado"}), 401
    
    data = load_data()
    user_id = session['user_id']
    phase = request.json.get('phase')
    responses = request.json.get('responses', {})
    
    for user in data['users']:
        if user['id'] == user_id:
            user['responses'][f'phase_{phase}'] = responses
            if phase == 6:
                user['completed'] = True
            save_data(data)
            return jsonify({"success": True})
    
    return jsonify({"error": "Usuário não encontrado"}), 404

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    data = load_data()
    user = next((u for u in data['users'] if u['id'] == session['user_id']), None)
    if not user:
        return redirect(url_for('index'))
    return render_template('dashboard.html', user=user)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/admin/api/department/<department>')
def get_department_data(department):
    if not session.get('is_admin'):
        return jsonify({"error": "Acesso negado"}), 403
    data = load_data()
    dept_users = [u for u in data['users'] if u['department'] == department]
    return jsonify(dept_users)

@app.route('/admin/api/report')
def get_report():
    if not session.get('is_admin'):
        return jsonify({"error": "Acesso negado"}), 403
    data = load_data()
    return jsonify(data['users'])

if __name__ == '__main__':
    os.makedirs('data', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)