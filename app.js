// ── STATE ──────────────────────────────────────────────────────────
let wells = [], meters = [];
let wellsPage = 1, metersPage = 1;
const ROWS_PER_PAGE = 20;
let map, markers = [], markerLayer;
let wellsChart, rehabChart, metersChart;
let editType = null, editIdx = null;

// ── INIT ───────────────────────────────────────────────────────────
function init() {
  const savedWells  = tryParse(localStorage.getItem('advacon_wells'));
  const savedMeters = tryParse(localStorage.getItem('advacon_meters'));
  wells  = savedWells  || JSON.parse(JSON.stringify(BASE_WELLS));
  meters = savedMeters || JSON.parse(JSON.stringify(BASE_METERS));
  renderDashboard();
  renderWellsTable();
  renderMetersTable();
  initMap();
  setupNav();
}

function tryParse(s) {
  try { return s ? JSON.parse(s) : null; } catch { return null; }
}
function save() {
  localStorage.setItem('advacon_wells', JSON.stringify(wells));
  localStorage.setItem('advacon_meters', JSON.stringify(meters));
}
function toast(msg, isErr) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.background = isErr ? '#EF4444' : '#0B1F3A';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAV ────────────────────────────────────────────────────────────
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => showPage(el.dataset.page));
  });
}
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelector('[data-page="' + name + '"]').classList.add('active');
  const titles = { dashboard:'Dashboard', wells:'Wells', meters:'Electrical Meters', add:'Add Record', upload:'Upload Excel' };
  document.getElementById('page-title').textContent = titles[name] || name;
  if (name === 'dashboard') setTimeout(() => map && map.invalidateSize(), 200);
}

// ── DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const totalW  = wells.length;
  const active  = wells.filter(w => w.Well_Status === 'Active').length;
  const inactive = totalW - active;
  const maintained    = wells.filter(w => w.Rehabilitation_Status === 'Maintained').length;
  const notMaintained = totalW - maintained;
  const totalM   = meters.length;
  const working  = meters.filter(m => (m.Status||'').trim() === 'Working').length;
  const faulty   = totalM - working;

  setText('stat-total-wells',   totalW);
  setText('stat-active-wells',  active);
  setText('stat-active-pct',    pct(active, totalW) + ' of total');
  setText('stat-inactive-wells', inactive);
  setText('stat-inactive-pct',  pct(inactive, totalW) + ' of total');
  setText('stat-total-meters',  totalM);
  setText('stat-meters-working', `${working} working / ${faulty} faulty`);
  setText('stat-maintained',    maintained);
  setText('stat-not-maintained', notMaintained);
  setText('stat-meters-ok',     working);
  setText('stat-meters-ok-pct', pct(working, totalM) + ' of total');
  setText('stat-meters-bad',    faulty);
  setText('stat-meters-bad-pct', pct(faulty, totalM) + ' of total');

  renderSummaryTable(active, inactive, maintained, notMaintained);
  renderReasonBreakdown();
  renderCharts(active, inactive, maintained, notMaintained, working, faulty);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function pct(n, total) {
  if (!total) return '0%';
  return Math.round((n / total) * 100) + '%';
}

function renderSummaryTable(active, inactive, maintained, notMaintained) {
  // Maintained-Active, Maintained-Non-Active, etc.
  const ma  = wells.filter(w => w.Well_Status==='Active'     && w.Rehabilitation_Status==='Maintained').length;
  const mna = wells.filter(w => w.Well_Status==='Non-Active' && w.Rehabilitation_Status==='Maintained').length;
  const nma = wells.filter(w => w.Well_Status==='Active'     && w.Rehabilitation_Status==='Not Maintained').length;
  const nmna= wells.filter(w => w.Well_Status==='Non-Active' && w.Rehabilitation_Status==='Not Maintained').length;

  // Rehab done / required
  const rdActive  = wells.filter(w => w.Well_Status==='Active'     && reasonContains(w,'Rehabilitation - Done')).length;
  const rdInact   = wells.filter(w => w.Well_Status==='Non-Active' && reasonContains(w,'Rehabilitation - Done')).length;
  const rrActive  = wells.filter(w => w.Well_Status==='Active'     && reasonContains(w,'required')).length;
  const rrInact   = wells.filter(w => w.Well_Status==='Non-Active' && reasonContains(w,'required')).length;

  const tbody = document.getElementById('summary-wells-body');
  tbody.innerHTML = `
    <tr>
      <td>Maintained</td>
      <td>${ma}</td><td>${mna}</td><td>${ma+mna}</td>
      <td>${rdActive+rdInact}</td><td>${rrActive+rrInact}</td>
    </tr>
    <tr>
      <td>Not Maintained</td>
      <td>${nma}</td><td>${nmna}</td><td>${nma+nmna}</td>
      <td>—</td><td>—</td>
    </tr>
    <tr>
      <td><strong>TOTALS</strong></td>
      <td><strong>${active}</strong></td><td><strong>${inactive}</strong></td><td><strong>${active+inactive}</strong></td>
      <td>—</td><td>—</td>
    </tr>
  `;
}

function reasonContains(w, str) {
  return w.Reason_of_Disconnection && String(w.Reason_of_Disconnection).toLowerCase().includes(str.toLowerCase());
}

function renderReasonBreakdown() {
  const reasons = {};
  wells.filter(w => w.Reason_of_Disconnection).forEach(w => {
    const r = String(w.Reason_of_Disconnection).trim();
    reasons[r] = (reasons[r]||0) + 1;
  });
  const sorted = Object.entries(reasons).sort((a,b) => b[1]-a[1]).slice(0,8);
  const max = sorted[0] ? sorted[0][1] : 1;
  const el = document.getElementById('reason-breakdown');
  el.innerHTML = sorted.map(([r,c]) => `
    <div class="reason-bar">
      <div class="reason-bar-label">${r}</div>
      <div style="flex:1;background:#F1F5F9;border-radius:4px;overflow:hidden;height:8px">
        <div class="reason-bar-fill" style="width:${Math.round(c/max*100)}%;height:100%"></div>
      </div>
      <div class="reason-bar-count">${c}</div>
    </div>
  `).join('') || '<p style="color:var(--slate);font-size:13px">No disconnection reasons found.</p>';
}

function renderCharts(active, inactive, maintained, notMaintained, working, faulty) {
  const TEAL='#00A99D', AMBER='#F59E0B', NAVY='#0B1F3A', RED='#EF4444', GREEN='#10B981', GRAY='#E2E8F0';

  if (wellsChart) wellsChart.destroy();
  wellsChart = new Chart(document.getElementById('chart-wells-status'), {
    type: 'doughnut',
    data: { labels:['Active','Non-Active'], datasets:[{data:[active,inactive],backgroundColor:[GREEN,AMBER],borderWidth:2,borderColor:'#fff'}] },
    options: { responsive:true, plugins:{ legend:{position:'bottom',labels:{font:{size:12},padding:12}} }, cutout:'65%' }
  });

  if (rehabChart) rehabChart.destroy();
  rehabChart = new Chart(document.getElementById('chart-rehab'), {
    type: 'doughnut',
    data: { labels:['Maintained','Not Maintained'], datasets:[{data:[maintained,notMaintained],backgroundColor:[TEAL,RED],borderWidth:2,borderColor:'#fff'}] },
    options: { responsive:true, plugins:{ legend:{position:'bottom',labels:{font:{size:12},padding:12}} }, cutout:'65%' }
  });

  if (metersChart) metersChart.destroy();
  metersChart = new Chart(document.getElementById('chart-meters-status'), {
    type: 'doughnut',
    data: { labels:['Working','Not Working'], datasets:[{data:[working,faulty],backgroundColor:[NAVY,AMBER],borderWidth:2,borderColor:'#fff'}] },
    options: { responsive:true, plugins:{ legend:{position:'bottom',labels:{font:{size:12},padding:12}} }, cutout:'65%' }
  });
}

// ── MAP ────────────────────────────────────────────────────────────
function initMap() {
  map = L.map('map').setView([26.635, 37.915], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap',maxZoom:19
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  plotWells('all');
}

function plotWells(filter) {
  markerLayer.clearLayers();
  markers = [];
  wells.forEach(w => {
    const lat = parseFloat(w.Latitude), lng = parseFloat(w.Longitude);
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;
    if (filter !== 'all' && w.Well_Status !== filter) return;
    const isActive = w.Well_Status === 'Active';
    const color = isActive ? '#10B981' : '#F59E0B';
    const icon = L.divIcon({
      className:'',
      html:`<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>`,
      iconSize:[14,14], iconAnchor:[7,7]
    });
    const m = L.marker([lat,lng],{icon});
    m.bindPopup(`
      <div style="font-family:Inter,sans-serif;min-width:180px">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px">Well #${w.Well_ID}</div>
        <div style="font-size:12px;color:#475569">
          <div>Status: <strong style="color:${color}">${w.Well_Status}</strong></div>
          <div>Rehab: <strong>${w.Rehabilitation_Status||'—'}</strong></div>
          ${w.Connected_Meter ? `<div>Meter: <strong>${w.Connected_Meter}</strong></div>` : ''}
          ${w.Reason_of_Disconnection ? `<div style="margin-top:4px;color:#EF4444">${w.Reason_of_Disconnection}</div>` : ''}
        </div>
      </div>
    `);
    m.addTo(markerLayer);
    markers.push(m);
  });
}

function filterMap(filter, btn) {
  document.querySelectorAll('.map-filter-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background=''; b.style.color=''; b.style.borderColor='';
  });
  btn.classList.add('active');
  plotWells(filter);
}

// ── WELLS TABLE ────────────────────────────────────────────────────
function filteredWells() {
  const q = (document.getElementById('wells-search').value||'').toLowerCase();
  const st = document.getElementById('wells-status-filter').value;
  const rh = document.getElementById('wells-rehab-filter').value;
  return wells.filter(w => {
    if (st && w.Well_Status !== st) return false;
    if (rh && w.Rehabilitation_Status !== rh) return false;
    if (q) {
      const s = [w.Well_ID, w.Connected_Meter, w.Reason_of_Disconnection, w.Well_Status].join(' ').toLowerCase();
      if (!s.includes(q)) return false;
    }
    return true;
  });
}

function renderWellsTable() {
  wellsPage = 1;
  renderWellsPage();
}

function renderWellsPage() {
  const data = filteredWells();
  const start = (wellsPage-1)*ROWS_PER_PAGE;
  const rows = data.slice(start, start+ROWS_PER_PAGE);
  const tbody = document.getElementById('wells-tbody');
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:32px;color:var(--slate)">No wells found</td></tr>';
    document.getElementById('wells-pagination').innerHTML='';
    return;
  }
  tbody.innerHTML = rows.map((w,i) => {
    const realIdx = wells.indexOf(w);
    const isActive = w.Well_Status === 'Active';
    return `<tr${w._new?' class="new-row"':''}>
      <td><strong>${w.Well_ID}</strong></td>
      <td>${w.Latitude||'—'}</td>
      <td>${w.Longitude||'—'}</td>
      <td><span class="badge ${isActive?'badge-green':'badge-amber'}">${w.Well_Status}</span></td>
      <td><span class="badge ${w.Rehabilitation_Status==='Maintained'?'badge-navy':'badge-gray'}">${w.Rehabilitation_Status||'—'}</span></td>
      <td>${w.Distance_to_Meter_m??'—'}</td>
      <td>${w.Total_Depth_m??'—'}</td>
      <td>${w.Amount_of_Water_m??'—'}</td>
      <td style="max-width:180px;font-size:12px">${w.Reason_of_Disconnection||'—'}</td>
      <td style="font-size:12px">${w.Connected_Meter||'—'}</td>
      <td><div class="action-btns">
        <button class="btn btn-outline btn-sm" onclick="openEditWell(${realIdx})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeWell(${realIdx})">Remove</button>
      </div></td>
    </tr>`;
  }).join('');
  renderPagination('wells', data.length);
}

function renderPagination(type, total) {
  const totalPages = Math.ceil(total / ROWS_PER_PAGE);
  const cur = type === 'wells' ? wellsPage : metersPage;
  const el = document.getElementById(type + '-pagination');
  if (totalPages <= 1) { el.innerHTML = `<span>Showing ${total} records</span>`; return; }
  let html = `<span>Showing ${Math.min((cur-1)*ROWS_PER_PAGE+1,total)}–${Math.min(cur*ROWS_PER_PAGE,total)} of ${total}</span>`;
  html += ` <button class="page-btn" onclick="${type}GoPage(${cur-1})" ${cur<=1?'disabled':''}>‹</button>`;
  for (let p=1;p<=totalPages;p++) {
    if (p===1||p===totalPages||Math.abs(p-cur)<=1) {
      html += `<button class="page-btn${p===cur?' active':''}" onclick="${type}GoPage(${p})">${p}</button>`;
    } else if (Math.abs(p-cur)===2) { html += '<span>…</span>'; }
  }
  html += ` <button class="page-btn" onclick="${type}GoPage(${cur+1})" ${cur>=totalPages?'disabled':''}>›</button>`;
  el.innerHTML = html;
}

function wellsGoPage(p) { wellsPage = p; renderWellsPage(); }
function metersGoPage(p) { metersPage = p; renderMetersPage(); }

// ── METERS TABLE ───────────────────────────────────────────────────
function filteredMeters() {
  const q  = (document.getElementById('meters-search').value||'').toLowerCase();
  const st = document.getElementById('meters-status-filter').value;
  return meters.filter(m => {
    const status = (m.Status||'').trim();
    if (st && status !== st) return false;
    if (q) {
      const s = [m.Serial_Number, m.Connected_Well, m.Reason_of_Disconnection, status].join(' ').toLowerCase();
      if (!s.includes(q)) return false;
    }
    return true;
  });
}

function renderMetersTable() {
  metersPage = 1;
  renderMetersPage();
}

function renderMetersPage() {
  const data = filteredMeters();
  const start = (metersPage-1)*ROWS_PER_PAGE;
  const rows = data.slice(start, start+ROWS_PER_PAGE);
  const tbody = document.getElementById('meters-tbody');
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--slate)">No meters found</td></tr>';
    document.getElementById('meters-pagination').innerHTML='';
    return;
  }
  tbody.innerHTML = rows.map(m => {
    const realIdx = meters.indexOf(m);
    const isWorking = (m.Status||'').trim() === 'Working';
    return `<tr${m._new?' class="new-row"':''}>
      <td><strong>${m.Serial_Number}</strong></td>
      <td>${m.Input_Voltage??'—'}</td>
      <td>${m.Output_Voltage??'—'}</td>
      <td>${m.Amperes??'—'}</td>
      <td>${m.Breaker_Capacity??'—'}</td>
      <td><span class="badge ${isWorking?'badge-green':'badge-red'}">${m.Status||'—'}</span></td>
      <td>${m.Connected_Well??'—'}</td>
      <td style="font-size:12px;max-width:200px">${m.Reason_of_Disconnection||'—'}</td>
      <td><div class="action-btns">
        <button class="btn btn-outline btn-sm" onclick="openEditMeter(${realIdx})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeMeter(${realIdx})">Remove</button>
      </div></td>
    </tr>`;
  }).join('');
  renderPagination('meters', data.length);
}

// ── ADD RECORDS ────────────────────────────────────────────────────
function switchAddTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('add-well-form').style.display  = tab==='well'  ? '' : 'none';
  document.getElementById('add-meter-form').style.display = tab==='meter' ? '' : 'none';
}

function addWell() {
  const id = document.getElementById('aw-id').value.trim();
  if (!id) { toast('Well ID is required', true); return; }
  const w = {
    Well_ID: id.padStart(3,'0'),
    Well_Status: document.getElementById('aw-status').value,
    Latitude:    parseFloatOrNull(document.getElementById('aw-lat').value),
    Longitude:   parseFloatOrNull(document.getElementById('aw-lng').value),
    Rehabilitation_Status: document.getElementById('aw-rehab').value,
    Distance_to_Meter_m:  parseFloatOrNull(document.getElementById('aw-dist').value),
    Total_Depth_m:        parseFloatOrNull(document.getElementById('aw-depth').value),
    Amount_of_Water_m:    parseFloatOrNull(document.getElementById('aw-water').value),
    Connected_Meter:      document.getElementById('aw-meter').value.trim()||null,
    Reason_of_Disconnection: document.getElementById('aw-reason').value.trim()||null,
    _new: true
  };
  wells.push(w);
  save();
  renderDashboard();
  renderWellsTable();
  plotWells('all');
  clearWellForm();
  toast('Well added successfully');
  showPage('wells');
}

function addMeter() {
  const serial = document.getElementById('am-serial').value.trim();
  if (!serial) { toast('Serial Number is required', true); return; }
  const m = {
    Serial_Number: serial,
    Input_Voltage:   parseFloatOrNull(document.getElementById('am-input').value),
    Output_Voltage:  parseFloatOrNull(document.getElementById('am-output').value),
    Amperes:         parseFloatOrNull(document.getElementById('am-amp').value),
    Breaker_Capacity:parseFloatOrNull(document.getElementById('am-breaker').value),
    Status: document.getElementById('am-status').value,
    Connected_Well: document.getElementById('am-well').value.trim()||null,
    Reason_of_Disconnection: document.getElementById('am-reason').value.trim()||null,
    _new: true
  };
  meters.push(m);
  save();
  renderDashboard();
  renderMetersTable();
  clearMeterForm();
  toast('Meter added successfully');
  showPage('meters');
}

function parseFloatOrNull(v) {
  const f = parseFloat(v);
  return isNaN(f) ? null : f;
}

function clearWellForm() {
  ['aw-id','aw-lat','aw-lng','aw-dist','aw-depth','aw-water','aw-meter','aw-reason'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
function clearMeterForm() {
  ['am-serial','am-input','am-output','am-amp','am-breaker','am-well','am-reason'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

// ── REMOVE ─────────────────────────────────────────────────────────
function removeWell(idx) {
  if (!confirm('Remove Well #' + wells[idx].Well_ID + '?')) return;
  wells.splice(idx, 1);
  save(); renderDashboard(); renderWellsTable(); plotWells('all');
  toast('Well removed');
}
function removeMeter(idx) {
  if (!confirm('Remove Meter ' + meters[idx].Serial_Number + '?')) return;
  meters.splice(idx, 1);
  save(); renderDashboard(); renderMetersTable();
  toast('Meter removed');
}

// ── EDIT MODAL ─────────────────────────────────────────────────────
function openEditWell(idx) {
  editType = 'well'; editIdx = idx;
  const w = wells[idx];
  document.getElementById('modal-title').textContent = 'Edit Well #' + w.Well_ID;
  document.getElementById('modal-form-content').innerHTML = `
    <div class="form-grid">
      <div class="form-group"><label>Well ID</label><input id="e-id" value="${w.Well_ID||''}"></div>
      <div class="form-group"><label>Well Status</label>
        <select id="e-status">
          <option${w.Well_Status==='Active'?' selected':''}>Active</option>
          <option${w.Well_Status==='Non-Active'?' selected':''}>Non-Active</option>
        </select></div>
      <div class="form-group"><label>Latitude</label><input id="e-lat" type="number" step="any" value="${w.Latitude||''}"></div>
      <div class="form-group"><label>Longitude</label><input id="e-lng" type="number" step="any" value="${w.Longitude||''}"></div>
      <div class="form-group"><label>Rehabilitation Status</label>
        <select id="e-rehab">
          <option${w.Rehabilitation_Status==='Maintained'?' selected':''}>Maintained</option>
          <option${w.Rehabilitation_Status==='Not Maintained'?' selected':''}>Not Maintained</option>
        </select></div>
      <div class="form-group"><label>Distance to Meter (m)</label><input id="e-dist" type="number" step="any" value="${w.Distance_to_Meter_m??''}"></div>
      <div class="form-group"><label>Total Depth (m)</label><input id="e-depth" type="number" step="any" value="${w.Total_Depth_m??''}"></div>
      <div class="form-group"><label>Water Amount (m)</label><input id="e-water" type="number" step="any" value="${w.Amount_of_Water_m??''}"></div>
      <div class="form-group" style="grid-column:1/-1"><label>Connected Meter</label><input id="e-meter" value="${w.Connected_Meter||''}"></div>
      <div class="form-group" style="grid-column:1/-1"><label>Disconnection Reason</label><input id="e-reason" value="${w.Reason_of_Disconnection||''}"></div>
    </div>`;
  document.getElementById('edit-modal').classList.add('open');
}

function openEditMeter(idx) {
  editType = 'meter'; editIdx = idx;
  const m = meters[idx];
  document.getElementById('modal-title').textContent = 'Edit Meter ' + m.Serial_Number;
  const status = (m.Status||'').trim();
  document.getElementById('modal-form-content').innerHTML = `
    <div class="form-grid">
      <div class="form-group" style="grid-column:1/-1"><label>Serial Number</label><input id="e-serial" value="${m.Serial_Number||''}"></div>
      <div class="form-group"><label>Input Voltage</label><input id="e-input" type="number" value="${m.Input_Voltage??''}"></div>
      <div class="form-group"><label>Output Voltage</label><input id="e-output" type="number" value="${m.Output_Voltage??''}"></div>
      <div class="form-group"><label>Amperes</label><input id="e-amp" type="number" value="${m.Amperes??''}"></div>
      <div class="form-group"><label>Breaker Capacity</label><input id="e-breaker" type="number" value="${m.Breaker_Capacity??''}"></div>
      <div class="form-group"><label>Status</label>
        <select id="e-mstatus">
          <option${status==='Working'?' selected':''}>Working</option>
          <option${status==='Not working'?' selected':''}>Not working</option>
        </select></div>
      <div class="form-group"><label>Connected Well</label><input id="e-mwell" value="${m.Connected_Well??''}"></div>
      <div class="form-group" style="grid-column:1/-1"><label>Disconnection Reason</label><input id="e-mreason" value="${m.Reason_of_Disconnection||''}"></div>
    </div>`;
  document.getElementById('edit-modal').classList.add('open');
}

function saveEdit() {
  if (editType === 'well') {
    const w = wells[editIdx];
    w.Well_ID = document.getElementById('e-id').value.trim();
    w.Well_Status = document.getElementById('e-status').value;
    w.Latitude    = parseFloatOrNull(document.getElementById('e-lat').value);
    w.Longitude   = parseFloatOrNull(document.getElementById('e-lng').value);
    w.Rehabilitation_Status = document.getElementById('e-rehab').value;
    w.Distance_to_Meter_m   = parseFloatOrNull(document.getElementById('e-dist').value);
    w.Total_Depth_m         = parseFloatOrNull(document.getElementById('e-depth').value);
    w.Amount_of_Water_m     = parseFloatOrNull(document.getElementById('e-water').value);
    w.Connected_Meter       = document.getElementById('e-meter').value.trim()||null;
    w.Reason_of_Disconnection = document.getElementById('e-reason').value.trim()||null;
    save(); renderDashboard(); renderWellsTable(); plotWells('all');
  } else {
    const m = meters[editIdx];
    m.Serial_Number  = document.getElementById('e-serial').value.trim();
    m.Input_Voltage  = parseFloatOrNull(document.getElementById('e-input').value);
    m.Output_Voltage = parseFloatOrNull(document.getElementById('e-output').value);
    m.Amperes        = parseFloatOrNull(document.getElementById('e-amp').value);
    m.Breaker_Capacity= parseFloatOrNull(document.getElementById('e-breaker').value);
    m.Status         = document.getElementById('e-mstatus').value;
    m.Connected_Well = document.getElementById('e-mwell').value.trim()||null;
    m.Reason_of_Disconnection = document.getElementById('e-mreason').value.trim()||null;
    save(); renderDashboard(); renderMetersTable();
  }
  closeModal();
  toast('Record updated successfully');
}

function closeModal() {
  document.getElementById('edit-modal').classList.remove('open');
  editType = null; editIdx = null;
}

// Close modal on backdrop click
document.getElementById('edit-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── EXCEL UPLOAD ───────────────────────────────────────────────────
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('dragover');
  const f = e.dataTransfer.files[0];
  if (f) handleFileUpload(f);
}

function handleFileUpload(file) {
  if (!file || !file.name.endsWith('.xlsx')) {
    toast('Please upload a valid .xlsx file', true); return;
  }
  const status = document.getElementById('upload-status');
  status.style.display = 'block';
  status.innerHTML = '<span style="color:var(--teal)">⏳ Reading file…</span>';

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb = XLSX.read(e.target.result, {type:'array'});

      // Wells sheet — header at row index 3 (4th row)
      const ws = wb.Sheets[wb.SheetNames[0]];
      const wData = XLSX.utils.sheet_to_json(ws, {header:1});
      const wHeader = wData[3];
      const newWells = [];
      for (let r = 4; r < wData.length; r++) {
        const row = wData[r];
        if (!row[0]) continue;
        const id = String(row[0]).trim();
        if (!/^\d+$/.test(id)) continue;
        newWells.push({
          Well_ID: id.padStart(3,'0'),
          Latitude: row[1]||null, Longitude: row[2]||null,
          Well_Status: row[3]||null, Rehabilitation_Status: row[4]||null,
          Distance_to_Meter_m: row[5]||null, Total_Depth_m: row[6]||null,
          Amount_of_Water_m: row[7]||null, Reason_of_Disconnection: row[8]||null,
          Connected_Meter: row[9]||null
        });
      }

      // Meters sheet
      const ms = wb.Sheets[wb.SheetNames[1]];
      const mData = XLSX.utils.sheet_to_json(ms, {header:1});
      const newMeters = [];
      for (let r = 1; r < mData.length; r++) {
        const row = mData[r];
        if (!row[0] || typeof row[0] !== 'string') continue;
        newMeters.push({
          Serial_Number: row[0], Input_Voltage: row[1]||null,
          Output_Voltage: row[2]||null, Amperes: row[3]||null,
          Breaker_Capacity: row[4]||null, Status: (row[5]||'').trim(),
          Connected_Well: row[6]||null, Reason_of_Disconnection: row[7]||null
        });
      }

      if (!newWells.length || !newMeters.length) {
        status.innerHTML = '<span style="color:var(--red)">❌ Could not parse data. Check sheet names and header row.</span>';
        return;
      }

      wells  = newWells;
      meters = newMeters;
      save();
      renderDashboard();
      renderWellsTable();
      renderMetersTable();
      plotWells('all');
      status.innerHTML = `<span style="color:var(--green)">✅ Loaded ${newWells.length} wells and ${newMeters.length} meters from <strong>${file.name}</strong></span>`;
      toast('Data updated from Excel file');
    } catch(err) {
      status.innerHTML = `<span style="color:var(--red)">❌ Error: ${err.message}</span>`;
    }
  };
  reader.readAsArrayBuffer(file);
}

// ── CSV EXPORT ─────────────────────────────────────────────────────
function exportWellsCSV() {
  const data = filteredWells();
  const cols = ['Well_ID','Latitude','Longitude','Well_Status','Rehabilitation_Status',
                'Distance_to_Meter_m','Total_Depth_m','Amount_of_Water_m','Reason_of_Disconnection','Connected_Meter'];
  downloadCSV('wells_export.csv', data, cols);
}

function exportMetersCSV() {
  const data = filteredMeters();
  const cols = ['Serial_Number','Input_Voltage','Output_Voltage','Amperes','Breaker_Capacity','Status','Connected_Well','Reason_of_Disconnection'];
  downloadCSV('meters_export.csv', data, cols);
}

function downloadCSV(filename, data, cols) {
  const rows = [cols, ...data.map(r => cols.map(c => r[c]??''))];
  const csv  = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  toast('CSV downloaded');
}

// ── PDF EXPORT ─────────────────────────────────────────────────────
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:'landscape', unit:'mm', format:'a4' });
  const W = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(11, 31, 58);
  doc.rect(0, 0, W, 22, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(16);
  doc.text('ADVACON — Wells & Meters Field Report', 14, 14);
  doc.setFontSize(9);
  doc.setFont('helvetica','normal');
  doc.text('Generated: ' + new Date().toLocaleString(), W-14, 14, {align:'right'});

  // Summary stats
  const active   = wells.filter(w => w.Well_Status==='Active').length;
  const inactive = wells.length - active;
  const working  = meters.filter(m => (m.Status||'').trim()==='Working').length;

  doc.setTextColor(30,41,59);
  doc.setFont('helvetica','bold');
  doc.setFontSize(11);
  doc.text('Summary', 14, 32);

  const summaryData = [
    ['Total Wells', wells.length, 'Active Wells', active, 'Non-Active Wells', inactive],
    ['Total Meters', meters.length, 'Working Meters', working, 'Faulty Meters', meters.length-working],
    ['Maintained', wells.filter(w=>w.Rehabilitation_Status==='Maintained').length,
     'Not Maintained', wells.filter(w=>w.Rehabilitation_Status==='Not Maintained').length, '', '']
  ];

  doc.autoTable({
    startY: 35,
    head: [['Metric','Value','Metric','Value','Metric','Value']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor:[0,169,157], textColor:255, fontStyle:'bold', fontSize:9 },
    bodyStyles: { fontSize:9 },
    columnStyles: { 0:{fontStyle:'bold'}, 2:{fontStyle:'bold'}, 4:{fontStyle:'bold'} },
    margin: {left:14, right:14}
  });

  // Wells table
  doc.addPage();
  doc.setFillColor(11, 31, 58);
  doc.rect(0, 0, W, 16, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(12);
  doc.text('Wells Data (' + wells.length + ' records)', 14, 11);

  doc.autoTable({
    startY: 22,
    head: [['Well ID','Status','Rehab Status','Dist. (m)','Depth (m)','Water (m)','Connected Meter','Disconnection Reason']],
    body: wells.map(w => [
      w.Well_ID, w.Well_Status, w.Rehabilitation_Status,
      w.Distance_to_Meter_m??'', w.Total_Depth_m??'', w.Amount_of_Water_m??'',
      w.Connected_Meter||'', w.Reason_of_Disconnection||''
    ]),
    theme: 'striped',
    headStyles: { fillColor:[0,169,157], textColor:255, fontStyle:'bold', fontSize:8 },
    bodyStyles: { fontSize:7.5 },
    alternateRowStyles: { fillColor:[241,245,249] },
    margin: {left:14, right:14},
    didDrawCell: (data) => {
      if (data.section==='body' && data.column.index===1) {
        const val = data.cell.raw;
        data.cell.styles.textColor = val==='Active' ? [5,150,105] : [217,119,6];
      }
    }
  });

  // Meters table
  doc.addPage();
  doc.setFillColor(11, 31, 58);
  doc.rect(0, 0, W, 16, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(12);
  doc.text('Electrical Meters Data (' + meters.length + ' records)', 14, 11);

  doc.autoTable({
    startY: 22,
    head: [['Serial Number','Input V','Output V','Amperes','Breaker Cap.','Status','Connected Well','Disconnection Reason']],
    body: meters.map(m => [
      m.Serial_Number, m.Input_Voltage??'', m.Output_Voltage??'', m.Amperes??'',
      m.Breaker_Capacity??'', (m.Status||'').trim(), m.Connected_Well??'', m.Reason_of_Disconnection||''
    ]),
    theme: 'striped',
    headStyles: { fillColor:[0,169,157], textColor:255, fontStyle:'bold', fontSize:8 },
    bodyStyles: { fontSize:7.5 },
    alternateRowStyles: { fillColor:[241,245,249] },
    margin: {left:14, right:14}
  });

  doc.save('ADVACON_Wells_Meters_Report.pdf');
  toast('PDF downloaded');
}

// ── START ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
