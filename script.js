/*
  Wayne Premium - script.js (final)
  - localStorage based
  - users seeded with roles
  - auth + authorize + UI + data layer
*/

const LS_KEYS = {
  USERS: 'wp_users',
  SESSION: 'wp_session',
  RECURSOS: 'wp_recursos',
  THEME: 'wp_theme'
};

// Seed users on first load
(function seedUsers(){
  const existing = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || 'null');
  if(!existing){
    const users = [
      { email: 'bruce@wayne.com', senha: 'batman123', role: 'admin', name: 'Bruce Wayne' },
      { email: 'alfred@wayne.com', senha: 'alfred123', role: 'funcionario', name: 'Alfred' },
      { email: 'gordon@wayne.com', senha: 'gordon123', role: 'gerente', name: 'Gordon' },
      { email: 'lucius@wayne.com', senha: 'lucius123', role: 'seguranca', name: 'Lucius' }
    ];
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
  }
})();

// Data layer
const appData = {
  getRecursos(){
    return JSON.parse(localStorage.getItem(LS_KEYS.RECURSOS) || '[]');
  },
  saveRecursos(arr){
    localStorage.setItem(LS_KEYS.RECURSOS, JSON.stringify(arr));
  },
  addRecurso(obj){
    const arr = appData.getRecursos();
    arr.push(obj);
    appData.saveRecursos(arr);
  },
  updateRecurso(idx, obj){
    const arr = appData.getRecursos();
    if(arr[idx]) arr[idx] = obj;
    appData.saveRecursos(arr);
  },
  removeRecurso(idx){
    const arr = appData.getRecursos();
    arr.splice(idx,1);
    appData.saveRecursos(arr);
  }
};

// Auth layer
const appAuth = {
  login(email, senha){
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const user = users.find(u => u.email === email && u.senha === senha);
    if(user){
      localStorage.setItem(LS_KEYS.SESSION, JSON.stringify({email:user.email, role:user.role, name:user.name}));
      return {success:true, msg: 'Olá ' + user.name, role: user.role};
    }
    return {success:false, msg:'Credenciais inválidas'};
  },

  logout(){
    localStorage.removeItem(LS_KEYS.SESSION);
    Swal.fire({icon:'success', title:'Sessão encerrada', timer:900, showConfirmButton:false}).then(()=> location.href = '/pages/login.html');
  },

  session(){
    return JSON.parse(localStorage.getItem(LS_KEYS.SESSION) || 'null');
  },

  authorize(allowedRoles = []) {
    const s = this.session();
    if(!s) {
      Swal.fire({
        icon: 'warning',
        title: 'Acesso restrito',
        text: 'Você precisa entrar para acessar esta área.',
        confirmButtonText: 'Entrar'
      }).then(()=> location.href = '/pages/login.html');
      return false;
    }
    if(!allowedRoles || allowedRoles.length === 0) return true;
    if(allowedRoles.includes(s.role)) return true;
    Swal.fire({
      icon: 'error',
      title: 'Acesso negado',
      text: 'Você não possui permissão para acessar esta área.'
    }).then(()=> {
      location.href = '/pages/dashboard.html';
    });
    return false;
  }
};

// UI helpers
const appUI = {
  _editing: null,
  toggleTheme(){
    const root = document.documentElement;
    const cur = localStorage.getItem(LS_KEYS.THEME) || 'dark';
    if(cur === 'dark'){
      localStorage.setItem(LS_KEYS.THEME, 'light');
      root.classList.add('light');
    } else {
      localStorage.setItem(LS_KEYS.THEME, 'dark');
      root.classList.remove('light');
    }
  },
  initTheme(){
    const cur = localStorage.getItem(LS_KEYS.THEME) || 'dark';
    if(cur === 'light') document.documentElement.classList.add('light');
  },
  focusInput(id){ const el = document.getElementById(id); if(el) el.focus(); },
  clearForm(){
    const name = document.getElementById('nomeRec');
    if(name) name.value='';
    const desc = document.getElementById('descRec');
    if(desc) desc.value='';
    const tipo = document.getElementById('tipoRec');
    if(tipo) tipo.value='equipamento';
    this._editing = null;
    const saveBtn = document.getElementById('saveRec');
    if(saveBtn) saveBtn.innerText='Salvar';
  },

  renderList(){
    const listEl = document.getElementById('listaRecursos');
    if(!listEl) return;
    const q = (document.getElementById('filtro')?.value || '').toString().trim().toLowerCase();
    const tipo = (document.getElementById('tipoFilter')?.value || '').toString();
    const all = appData.getRecursos();
    const filtered = all.filter(r => {
      const name = (r.name || '').toString().toLowerCase();
      const desc = (r.description || '').toString().toLowerCase();
      const matchesQ = q === '' ? true : (name.includes(q) || desc.includes(q));
      const matchesTipo = tipo ? r.type === tipo : true;
      return matchesQ && matchesTipo;
    });
    listEl.innerHTML = '';
    filtered.forEach((r, i) => {
      const li = document.createElement('li');
      const canApprove = (appAuth.session() && ['admin','gerente'].includes(appAuth.session().role));
      li.innerHTML = `
        <div class="item-meta">
          <div>
            <strong>${r.name}</strong><div class="small">${r.type} • ${r.createdAt}</div>
            <div class="small">${r.description || ''}</div>
          </div>
        </div>
        <div class="row">
          <button class="btn outline" onclick="window.appUI.editRec(${i})">Editar</button>
          <button class="btn outline" onclick="window.appUI.viewRec(${i})">Ver</button>
          ${ canApprove ? '<button class="btn outline" onclick="window.appUI.approveRec('+i+')">Aprovar</button>' : '' }
          ${ (appAuth.session() && appAuth.session().role==='admin') ? '<button class="btn" onclick="window.appUI.deleteRec('+i+')">Remover</button>' : ''}
        </div>`;
      listEl.appendChild(li);
    });
    this.renderStats();
    this.updateChart();
  },

  editRec(idx){
    const all = appData.getRecursos();
    const r = all[idx];
    if(!r) return;
    document.getElementById('nomeRec').value = r.name;
    document.getElementById('descRec').value = r.description || '';
    document.getElementById('tipoRec').value = r.type || 'equipamento';
    document.getElementById('saveRec').innerText = 'Atualizar';
    this._editing = idx;
    document.getElementById('addBox').classList.remove('hidden');
    this.focusInput('nomeRec');
  },

  viewRec(idx){
    const r = appData.getRecursos()[idx];
    if(!r) return;
    Swal.fire({
      title: r.name,
      html: `<p><strong>Tipo:</strong> ${r.type}</p><p><strong>Descrição:</strong> ${r.description || '—'}</p><p><small>Criado: ${r.createdAt}</small></p>`
    });
  },

  approveRec(idx){
    // placeholder demo action
    Swal.fire({icon:'success', title:'Aprovado', text:'Recurso marcado como aprovado', timer:900, showConfirmButton:false});
  },

  deleteRec(idx){
    Swal.fire({
      title:'Remover recurso?',
      text:'Essa ação não pode ser desfeita',
      icon:'warning',
      showCancelButton:true
    }).then(res=>{
      if(res.isConfirmed){
        appData.removeRecurso(idx);
        Swal.fire({icon:'success', title:'Removido', timer:1000, showConfirmButton:false});
        appUI.renderList();
      }
    });
  },

  saveCurrent(){
    const nameEl = document.getElementById('nomeRec');
    const name = nameEl ? nameEl.value.trim() : '';
    if(!name) return Swal.fire({icon:'error', title:'Erro', text:'Informe um nome'});
    const obj = {
      name,
      type: document.getElementById('tipoRec').value,
      description: document.getElementById('descRec').value.trim(),
      createdAt: new Date().toLocaleString()
    };
    if(this._editing !== null){
      appData.updateRecurso(this._editing, obj);
      Swal.fire({icon:'success', title:'Atualizado', timer:900, showConfirmButton:false});
    } else {
      appData.addRecurso(obj);
      Swal.fire({icon:'success', title:'Adicionado', timer:900, showConfirmButton:false});
    }
    this.clearForm();
    document.getElementById('addBox').classList.add('hidden');
    this.renderList();
  },

  renderStats(){
    const all = appData.getRecursos();
    const total = all.length;
    const eq = all.filter(r=>r.type==='equipamento').length;
    const ve = all.filter(r=>r.type==='veiculo').length;
    const di = all.filter(r=>r.type==='dispositivo').length;
    const elTotal = document.getElementById('totalCount');
    if(elTotal) elTotal.innerText = total;
    const elEq = document.getElementById('countEquip');
    if(elEq) elEq.innerText = eq;
    const elVe = document.getElementById('countVeic');
    if(elVe) elVe.innerText = ve;
    const elDi = document.getElementById('countDisp');
    if(elDi) elDi.innerText = di;
  },

  chartInstance: null,
  updateChart(){
    const ctx = document.getElementById('chart');
    if(!ctx) return;
    const all = appData.getRecursos();
    const eq = all.filter(r=>r.type==='equipamento').length;
    const ve = all.filter(r=>r.type==='veiculo').length;
    const di = all.filter(r=>r.type==='dispositivo').length;
    const data = [eq, ve, di];
    if(!this.chartInstance){
      this.chartInstance = new Chart(ctx.getContext('2d'), {
        type:'doughnut',
        data:{ labels:['Equipamentos','Veículos','Dispositivos'], datasets:[{data, backgroundColor:['#45a29e','#1f8fbf','#7f8fa6']}] }
      });
    } else {
      this.chartInstance.data.datasets[0].data = data;
      this.chartInstance.update();
    }
  },

  initDashboard(){
    this.initTheme();
    const s = appAuth.session();
    if(!s) {
      Swal.fire({icon:'info', title:'Atenção', text:'Você precisa entrar primeiro'}).then(()=> location.href = '/pages/login.html');
      return;
    }
    document.getElementById('welcomeTitle').innerText = `Bem-vindo, ${s.name}`;
    document.getElementById('roleBadge').innerText = `Perfil: ${s.role}`;
    this.renderList();
  }
};

// expose
window.appData = appData;
window.appAuth = appAuth;
window.appUI = appUI;

// init theme
appUI.initTheme();
