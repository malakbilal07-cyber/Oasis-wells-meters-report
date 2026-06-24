// ── CREDENTIALS (change these as needed) ─────────────────────────
const USERS = {
  'admin':   'advacon2024',
  'manager': 'phase2@alula',
  'field':   'oasis#field',
};

// ── LOGIN ─────────────────────────────────────────────────────────
function doLogin() {
  const u = document.getElementById('login-user').value.trim().toLowerCase();
  const p = document.getElementById('login-pass').value;
  if (USERS[u] && USERS[u] === p) {
    sessionStorage.setItem('advacon_user', u);
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('topbar-username').textContent = u.charAt(0).toUpperCase()+u.slice(1);
    init();
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('login-pass').value = '';
  }
}
function doLogout() {
  sessionStorage.removeItem('advacon_user');
  location.reload();
}

// Auto-login if session exists
window.addEventListener('DOMContentLoaded', () => {
  const u = sessionStorage.getItem('advacon_user');
  if (u) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    document.getElementById('topbar-username').textContent = u.charAt(0).toUpperCase()+u.slice(1);
    init();
  }
  // Allow Enter key on username field
  document.getElementById('login-user').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-pass').focus();
  });
});

// ── STATE ─────────────────────────────────────────────────────────
let wells = [], meters = [];
let wellsPage = 1, metersPage = 1;
const RPP = 20;
let mainMap = null, mainMapInit = false;
let layerActive, layerInactive, layerKML, layerScope, layerRehab;
let layerStates = { active:true, inactive:true, kml:true, scope:true, rehab:false };
let charts = {};
let editType = null, editIdx = null;

// ── INIT ──────────────────────────────────────────────────────────
function init() {
  wells  = tryParse(localStorage.getItem('advacon_wells'))  || JSON.parse(JSON.stringify(BASE_WELLS));
  meters = tryParse(localStorage.getItem('advacon_meters')) || JSON.parse(JSON.stringify(BASE_METERS));
  setupNav();
  renderOverview();
  renderDashboard();
  renderWellsTable();
  renderMetersTable();
}
function tryParse(s){ try{ return s?JSON.parse(s):null; }catch{ return null; } }
function save(){
  localStorage.setItem('advacon_wells', JSON.stringify(wells));
  localStorage.setItem('advacon_meters', JSON.stringify(meters));
}
function toast(msg, err){
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.background = err ? '#EF4444' : '#0B2B5E';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function $id(id){ return document.getElementById(id); }
function setText(id,v){ const el=$id(id); if(el) el.textContent=v; }
function pct(n,t){ return t?Math.round(n/t*100)+'%':'0%'; }

// ── NAV ───────────────────────────────────────────────────────────
function setupNav(){
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => showPage(el.dataset.page));
  });
}
function showPage(name){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = $id('page-'+name);
  if(pg) pg.classList.add('active');
  const nav = document.querySelector('[data-page="'+name+'"]');
  if(nav) nav.classList.add('active');
  if(name === 'mapview') setTimeout(initMainMap, 150);
}

// ── OVERVIEW ──────────────────────────────────────────────────────
function renderOverview(){
  const active = wells.filter(w=>w.Well_Status==='Active').length;
  const working = meters.filter(m=>(m.Status||'').trim()==='Working').length;
  setText('ov-wells', wells.length);
  setText('ov-active', active);
  setText('ov-active-pct', pct(active,wells.length)+' of total');
  setText('ov-meters', meters.length);
  setText('ov-meters-sub', working+' working');
}

// ── DASHBOARD ────────────────────────────────────────────────────
function renderDashboard(){
  const tw=wells.length, active=wells.filter(w=>w.Well_Status==='Active').length;
  const inactive=tw-active;
  const maint=wells.filter(w=>w.Rehabilitation_Status==='Maintained').length;
  const notMaint=tw-maint;
  const tm=meters.length, working=meters.filter(m=>(m.Status||'').trim()==='Working').length;
  const faulty=tm-working;

  setText('s-total-w',tw); setText('s-active',active);
  setText('s-active-pct',pct(active,tw)+' of total');
  setText('s-inactive',inactive); setText('s-inactive-pct',pct(inactive,tw)+' of total');
  setText('s-total-m',tm); setText('s-m-sub',working+' working / '+faulty+' faulty');
  setText('s-maint',maint); setText('s-notmaint',notMaint);
  setText('s-mok',working); setText('s-mok-pct',pct(working,tm)+' of total');
  setText('s-mbad',faulty); setText('s-mbad-pct',pct(faulty,tm)+' of total');

  // Summary table
  const ma=wells.filter(w=>w.Well_Status==='Active'&&w.Rehabilitation_Status==='Maintained').length;
  const mna=wells.filter(w=>w.Well_Status==='Non-Active'&&w.Rehabilitation_Status==='Maintained').length;
  const nma=wells.filter(w=>w.Well_Status==='Active'&&w.Rehabilitation_Status==='Not Maintained').length;
  const nmna=wells.filter(w=>w.Well_Status==='Non-Active'&&w.Rehabilitation_Status==='Not Maintained').length;
  $id('dash-summary-body').innerHTML=`
    <tr><td>Maintained</td><td>${ma}</td><td>${mna}</td><td><strong>${ma+mna}</strong></td></tr>
    <tr><td>Not Maintained</td><td>${nma}</td><td>${nmna}</td><td><strong>${nma+nmna}</strong></td></tr>
    <tr><td><strong>TOTAL</strong></td><td><strong>${active}</strong></td><td><strong>${inactive}</strong></td><td><strong>${tw}</strong></td></tr>
  `;

  // Reason breakdown
  const reasons={};
  wells.filter(w=>w.Reason_of_Disconnection).forEach(w=>{
    const r=String(w.Reason_of_Disconnection).trim();
    reasons[r]=(reasons[r]||0)+1;
  });
  const sorted=Object.entries(reasons).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const max=sorted[0]?sorted[0][1]:1;
  $id('dash-reasons').innerHTML=sorted.map(([r,c])=>`
    <div class="reason-bar">
      <div class="reason-bar-label">${r}</div>
      <div style="flex:1;background:#F1F5F9;border-radius:4px;height:7px">
        <div class="reason-bar-fill" style="width:${Math.round(c/max*100)}%;height:100%"></div>
      </div>
      <div class="reason-bar-count">${c}</div>
    </div>`).join('')||'<p style="color:var(--slate);font-size:13px">No reasons found.</p>';

  // Charts
  const G='#10B981',A='#F59E0B',T='#00A99D',R='#EF4444',N='#0B2B5E';
  function mkChart(id,labels,data,colors){
    if(charts[id]) charts[id].destroy();
    charts[id]=new Chart($id(id),{
      type:'doughnut',
      data:{labels,datasets:[{data,backgroundColor:colors,borderWidth:2,borderColor:'#fff'}]},
      options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:11},padding:10}}},cutout:'65%'}
    });
  }
  mkChart('ch-wells',['Active','Non-Active'],[active,inactive],[G,A]);
  mkChart('ch-rehab',['Maintained','Not Maintained'],[maint,notMaint],[T,R]);
  mkChart('ch-meters',['Working','Not Working'],[working,faulty],[N,A]);
}

// ── MAIN MAP (Well & Meter Locations) ────────────────────────────
function initMainMap(){
  if(mainMapInit){ mainMap&&mainMap.invalidateSize(); return; }
  mainMapInit=true;
  mainMap = L.map('main-map').setView([26.635,37.915],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution:'© OpenStreetMap',maxZoom:19}).addTo(mainMap);

  layerActive   = L.layerGroup().addTo(mainMap);
  layerInactive = L.layerGroup().addTo(mainMap);
  layerKML      = L.layerGroup().addTo(mainMap);
  layerScope    = L.layerGroup().addTo(mainMap);
  layerRehab    = L.layerGroup(); // off by default

  plotMainMap();
}

function mkDot(color, size=13){
  return L.divIcon({
    className:'',
    html:`<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 5px rgba(0,0,0,.3)"></div>`,
    iconSize:[size,size], iconAnchor:[size/2,size/2]
  });
}

// Label icon showing well number
function mkLabelIcon(label, color){
  return L.divIcon({
    className:'',
    html:`<div style="position:relative;display:inline-flex;flex-direction:column;align-items:center">
      <div style="background:${color};color:white;font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.3);font-family:Inter,sans-serif">
        #${label}
      </div>
      <div style="width:2px;height:5px;background:${color}"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>
    </div>`,
    iconSize:[40,32], iconAnchor:[20,32], popupAnchor:[0,-34]
  });
}

function mapsLink(lat,lng){
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function plotMainMap(){
  [layerActive,layerInactive,layerKML,layerScope,layerRehab].forEach(l=>l&&l.clearLayers());

  // Active wells — labeled
  wells.filter(w=>w.Well_Status==='Active').forEach(w=>{
    const lat=parseFloat(w.Latitude), lng=parseFloat(w.Longitude);
    if(!lat||!lng||isNaN(lat)||isNaN(lng)) return;
    const m=L.marker([lat,lng],{icon:mkLabelIcon(w.Well_ID,'#10B981')});
    m.bindPopup(wellPopup(w,'#10B981','Active Well'));
    m.addTo(layerActive);
  });

  // Non-active wells — labeled
  wells.filter(w=>w.Well_Status==='Non-Active').forEach(w=>{
    const lat=parseFloat(w.Latitude), lng=parseFloat(w.Longitude);
    if(!lat||!lng||isNaN(lat)||isNaN(lng)) return;
    const m=L.marker([lat,lng],{icon:mkLabelIcon(w.Well_ID,'#F59E0B')});
    m.bindPopup(wellPopup(w,'#F59E0B','Non-Active Well'));
    m.addTo(layerInactive);
  });

  // KML points — meters
  if(typeof KML_DATA!=='undefined'){
    KML_DATA.filter(d=>d.category==='meter').forEach(d=>{
      const m=L.marker([d.lat,d.lng],{icon:mkDot('#3B82F6',11)});
      m.bindPopup(kmlPopup(d,'#3B82F6','Electric Meter'));
      m.addTo(layerKML);
    });
    // Out of scope
    KML_DATA.filter(d=>d.category==='out_of_scope').forEach(d=>{
      const m=L.marker([d.lat,d.lng],{icon:mkDot('#9CA3AF',10)});
      m.bindPopup(kmlPopup(d,'#9CA3AF','Out of Scope'));
      m.addTo(layerScope);
    });
    // Rehab required
    KML_DATA.filter(d=>d.category==='rehab_required').forEach(d=>{
      const m=L.marker([d.lat,d.lng],{icon:mkDot('#EF4444',11)});
      m.bindPopup(kmlPopup(d,'#EF4444','Rehab Required'));
      m.addTo(layerRehab);
    });
  }
}

function wellPopup(w, color, label){
  const url = mapsLink(w.Latitude, w.Longitude);
  return `<div style="font-family:Inter,sans-serif;min-width:210px">
    <div style="background:${color};color:white;padding:7px 10px;margin:-13px -13px 10px;border-radius:8px 8px 0 0;font-size:10px;font-weight:700;text-transform:uppercase">${label}</div>
    <div style="font-weight:700;font-size:15px;margin-bottom:8px;color:#0B2B5E">Well #${w.Well_ID}</div>
    <div style="font-size:12px;color:#374151;line-height:1.8">
      <div>Status: <strong style="color:${color}">${w.Well_Status}</strong></div>
      <div>Rehab: <strong>${w.Rehabilitation_Status||'—'}</strong></div>
      ${w.Distance_to_Meter_m?`<div>Distance to Meter: <strong>${w.Distance_to_Meter_m} m</strong></div>`:''}
      ${w.Connected_Meter?`<div>Meter: <strong style="font-size:11px">${w.Connected_Meter}</strong></div>`:''}
      ${w.Reason_of_Disconnection?`<div style="margin-top:5px;color:#EF4444;font-size:11px">⚠ ${w.Reason_of_Disconnection}</div>`:''}
    </div>
    <div style="margin-top:10px;padding-top:8px;border-top:1px solid #E5E7EB;font-size:10px;color:#9CA3AF">
      ${parseFloat(w.Latitude).toFixed(6)}, ${parseFloat(w.Longitude).toFixed(6)}
    </div>
    <a href="${url}" target="_blank" style="display:block;margin-top:8px;background:#0B2B5E;color:white;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:700;text-decoration:none;text-align:center">
      📍 Open in Google Maps
    </a>
  </div>`;
}

function kmlPopup(d, color, label){
  const url = mapsLink(d.lat, d.lng);
  const descLines = (d.lines||[]).filter(l=>l&&!l.match(/^-+$/)).slice(0,6);
  return `<div style="font-family:Inter,sans-serif;min-width:210px;max-width:280px">
    <div style="background:${color};color:white;padding:7px 10px;margin:-13px -13px 10px;border-radius:8px 8px 0 0;font-size:10px;font-weight:700;text-transform:uppercase">${label}</div>
    <div style="font-weight:600;font-size:12px;margin-bottom:6px;word-break:break-all">${d.name}</div>
    <div style="font-size:11px;color:#374151;line-height:1.7">${descLines.map(l=>`<div>${l}</div>`).join('')||'—'}</div>
    <div style="margin-top:8px;padding-top:7px;border-top:1px solid #E5E7EB;font-size:10px;color:#9CA3AF">${d.lat.toFixed(6)}, ${d.lng.toFixed(6)}</div>
    <a href="${url}" target="_blank" style="display:block;margin-top:8px;background:#0B2B5E;color:white;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:700;text-decoration:none;text-align:center">
      📍 Open in Google Maps
    </a>
  </div>`;
}

function toggleLayer(name, btn){
  layerStates[name] = !layerStates[name];
  btn.classList.toggle('on', layerStates[name]);
  const layerMap = {active:layerActive,inactive:layerInactive,kml:layerKML,scope:layerScope,rehab:layerRehab};
  const layer = layerMap[name];
  if(!layer||!mainMap) return;
  if(layerStates[name]) mainMap.addLayer(layer);
  else mainMap.removeLayer(layer);
}

function mainMapFitAll(){
  if(!mainMap) return;
  const bounds=[];
  wells.forEach(w=>{
    const lat=parseFloat(w.Latitude),lng=parseFloat(w.Longitude);
    if(lat&&lng&&!isNaN(lat)) bounds.push([lat,lng]);
  });
  if(bounds.length) mainMap.fitBounds(bounds,{padding:[30,30]});
}

// ── WELLS TABLE ───────────────────────────────────────────────────
function filteredWells(){
  const q=(($id('wells-search')||{}).value||'').toLowerCase();
  const st=($id('wells-status-filter')||{}).value||'';
  const rh=($id('wells-rehab-filter')||{}).value||'';
  return wells.filter(w=>{
    if(st&&w.Well_Status!==st) return false;
    if(rh&&w.Rehabilitation_Status!==rh) return false;
    if(q){
      const s=[w.Well_ID,w.Connected_Meter,w.Reason_of_Disconnection,w.Well_Status].join(' ').toLowerCase();
      if(!s.includes(q)) return false;
    }
    return true;
  });
}
function renderWellsTable(){ wellsPage=1; renderWellsPage(); }
function renderWellsPage(){
  const data=filteredWells();
  const rows=data.slice((wellsPage-1)*RPP, wellsPage*RPP);
  const tb=$id('wells-tbody');
  if(!rows.length){ tb.innerHTML='<tr><td colspan="11" style="text-align:center;padding:28px;color:var(--slate)">No wells found</td></tr>'; $id('wells-pagination').innerHTML=''; return; }
  tb.innerHTML=rows.map(w=>{
    const ri=wells.indexOf(w);
    const act=w.Well_Status==='Active';
    return `<tr${w._new?' class="new-row"':''}>
      <td><strong style="color:var(--navy)">#${w.Well_ID}</strong></td>
      <td style="font-size:11px">${w.Latitude||'—'}</td><td style="font-size:11px">${w.Longitude||'—'}</td>
      <td><span class="badge ${act?'badge-green':'badge-amber'}">${w.Well_Status}</span></td>
      <td><span class="badge ${w.Rehabilitation_Status==='Maintained'?'badge-navy':'badge-gray'}">${w.Rehabilitation_Status||'—'}</span></td>
      <td>${w.Distance_to_Meter_m??'—'}</td><td>${w.Total_Depth_m??'—'}</td><td>${w.Amount_of_Water_m??'—'}</td>
      <td style="max-width:160px;font-size:11px">${w.Reason_of_Disconnection||'—'}</td>
      <td style="font-size:11px">${w.Connected_Meter||'—'}</td>
      <td><div class="action-btns">
        <button class="btn btn-outline btn-sm" onclick="openEditWell(${ri})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeWell(${ri})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
  renderPag('wells',data.length);
}

// ── METERS TABLE ──────────────────────────────────────────────────
function filteredMeters(){
  const q=(($id('meters-search')||{}).value||'').toLowerCase();
  const st=($id('meters-status-filter')||{}).value||'';
  return meters.filter(m=>{
    const status=(m.Status||'').trim();
    if(st&&status!==st) return false;
    if(q){
      const s=[m.Serial_Number,m.Connected_Well,m.Reason_of_Disconnection,status].join(' ').toLowerCase();
      if(!s.includes(q)) return false;
    }
    return true;
  });
}
function renderMetersTable(){ metersPage=1; renderMetersPage(); }
function renderMetersPage(){
  const data=filteredMeters();
  const rows=data.slice((metersPage-1)*RPP, metersPage*RPP);
  const tb=$id('meters-tbody');
  if(!rows.length){ tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:28px;color:var(--slate)">No meters found</td></tr>'; $id('meters-pagination').innerHTML=''; return; }
  tb.innerHTML=rows.map(m=>{
    const ri=meters.indexOf(m);
    const ok=(m.Status||'').trim()==='Working';
    return `<tr${m._new?' class="new-row"':''}>
      <td style="font-size:12px"><strong>${m.Serial_Number}</strong></td>
      <td>${m.Input_Voltage??'—'}</td><td>${m.Output_Voltage??'—'}</td>
      <td>${m.Amperes??'—'}</td><td>${m.Breaker_Capacity??'—'}</td>
      <td><span class="badge ${ok?'badge-green':'badge-red'}">${m.Status||'—'}</span></td>
      <td>${m.Connected_Well??'—'}</td>
      <td style="font-size:11px;max-width:180px">${m.Reason_of_Disconnection||'—'}</td>
      <td><div class="action-btns">
        <button class="btn btn-outline btn-sm" onclick="openEditMeter(${ri})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeMeter(${ri})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
  renderPag('meters',data.length);
}

function renderPag(type, total){
  const totalPg=Math.ceil(total/RPP), cur=type==='wells'?wellsPage:metersPage;
  const el=$id(type+'-pagination');
  if(totalPg<=1){ el.innerHTML=`<span>${total} records</span>`; return; }
  let h=`<span>Showing ${Math.min((cur-1)*RPP+1,total)}–${Math.min(cur*RPP,total)} of ${total}</span>`;
  h+=`<button class="page-btn" onclick="${type}GoPage(${cur-1})" ${cur<=1?'disabled':''}>‹</button>`;
  for(let p=1;p<=totalPg;p++){
    if(p===1||p===totalPg||Math.abs(p-cur)<=1) h+=`<button class="page-btn${p===cur?' active':''}" onclick="${type}GoPage(${p})">${p}</button>`;
    else if(Math.abs(p-cur)===2) h+='<span>…</span>';
  }
  h+=`<button class="page-btn" onclick="${type}GoPage(${cur+1})" ${cur>=totalPg?'disabled':''}>›</button>`;
  el.innerHTML=h;
}
function wellsGoPage(p){ wellsPage=p; renderWellsPage(); }
function metersGoPage(p){ metersPage=p; renderMetersPage(); }

// ── ADD ───────────────────────────────────────────────────────────
function switchAddTab(tab,btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  $id('add-well-form').style.display=tab==='well'?'':'none';
  $id('add-meter-form').style.display=tab==='meter'?'':'none';
}
function pf(v){ const f=parseFloat(v); return isNaN(f)?null:f; }
function addWell(){
  const id=$id('aw-id').value.trim();
  if(!id){ toast('Well ID required',true); return; }
  const w={Well_ID:id.padStart(3,'0'),Well_Status:$id('aw-status').value,
    Latitude:pf($id('aw-lat').value),Longitude:pf($id('aw-lng').value),
    Rehabilitation_Status:$id('aw-rehab').value,Distance_to_Meter_m:pf($id('aw-dist').value),
    Total_Depth_m:pf($id('aw-depth').value),Amount_of_Water_m:pf($id('aw-water').value),
    Connected_Meter:$id('aw-meter').value.trim()||null,
    Reason_of_Disconnection:$id('aw-reason').value.trim()||null,_new:true};
  wells.push(w); save(); renderOverview(); renderDashboard(); renderWellsTable();
  if(mainMapInit) plotMainMap();
  clearWellForm(); toast('Well added'); showPage('wells');
}
function addMeter(){
  const s=$id('am-serial').value.trim();
  if(!s){ toast('Serial required',true); return; }
  const m={Serial_Number:s,Input_Voltage:pf($id('am-input').value),Output_Voltage:pf($id('am-output').value),
    Amperes:pf($id('am-amp').value),Breaker_Capacity:pf($id('am-breaker').value),
    Status:$id('am-status').value,Connected_Well:$id('am-well').value.trim()||null,
    Reason_of_Disconnection:$id('am-reason').value.trim()||null,_new:true};
  meters.push(m); save(); renderOverview(); renderDashboard(); renderMetersTable();
  clearMeterForm(); toast('Meter added'); showPage('meters');
}
function clearWellForm(){ ['aw-id','aw-lat','aw-lng','aw-dist','aw-depth','aw-water','aw-meter','aw-reason'].forEach(i=>$id(i).value=''); }
function clearMeterForm(){ ['am-serial','am-input','am-output','am-amp','am-breaker','am-well','am-reason'].forEach(i=>$id(i).value=''); }

// ── REMOVE ────────────────────────────────────────────────────────
function removeWell(idx){
  if(!confirm('Remove Well #'+wells[idx].Well_ID+'?')) return;
  wells.splice(idx,1); save(); renderOverview(); renderDashboard(); renderWellsTable();
  if(mainMapInit) plotMainMap(); toast('Well removed');
}
function removeMeter(idx){
  if(!confirm('Remove Meter '+meters[idx].Serial_Number+'?')) return;
  meters.splice(idx,1); save(); renderOverview(); renderDashboard(); renderMetersTable(); toast('Meter removed');
}

// ── EDIT MODAL ────────────────────────────────────────────────────
function openEditWell(idx){
  editType='well'; editIdx=idx; const w=wells[idx];
  $id('modal-title').textContent='Edit Well #'+w.Well_ID;
  $id('modal-form-content').innerHTML=`<div class="form-grid">
    <div class="form-group"><label>Well ID</label><input id="e-id" value="${w.Well_ID||''}"></div>
    <div class="form-group"><label>Status</label><select id="e-status">
      <option${w.Well_Status==='Active'?' selected':''}>Active</option>
      <option${w.Well_Status==='Non-Active'?' selected':''}>Non-Active</option></select></div>
    <div class="form-group"><label>Latitude</label><input id="e-lat" type="number" step="any" value="${w.Latitude||''}"></div>
    <div class="form-group"><label>Longitude</label><input id="e-lng" type="number" step="any" value="${w.Longitude||''}"></div>
    <div class="form-group"><label>Rehab Status</label><select id="e-rehab">
      <option${w.Rehabilitation_Status==='Maintained'?' selected':''}>Maintained</option>
      <option${w.Rehabilitation_Status==='Not Maintained'?' selected':''}>Not Maintained</option></select></div>
    <div class="form-group"><label>Distance (m)</label><input id="e-dist" type="number" step="any" value="${w.Distance_to_Meter_m??''}"></div>
    <div class="form-group"><label>Depth (m)</label><input id="e-depth" type="number" step="any" value="${w.Total_Depth_m??''}"></div>
    <div class="form-group"><label>Water (m)</label><input id="e-water" type="number" step="any" value="${w.Amount_of_Water_m??''}"></div>
    <div class="form-group" style="grid-column:1/-1"><label>Connected Meter</label><input id="e-meter" value="${w.Connected_Meter||''}"></div>
    <div class="form-group" style="grid-column:1/-1"><label>Disconnection Reason</label><input id="e-reason" value="${w.Reason_of_Disconnection||''}"></div>
  </div>`;
  $id('edit-modal').classList.add('open');
}
function openEditMeter(idx){
  editType='meter'; editIdx=idx; const m=meters[idx];
  const st=(m.Status||'').trim();
  $id('modal-title').textContent='Edit Meter '+m.Serial_Number;
  $id('modal-form-content').innerHTML=`<div class="form-grid">
    <div class="form-group" style="grid-column:1/-1"><label>Serial Number</label><input id="e-serial" value="${m.Serial_Number||''}"></div>
    <div class="form-group"><label>Input Voltage</label><input id="e-input" type="number" value="${m.Input_Voltage??''}"></div>
    <div class="form-group"><label>Output Voltage</label><input id="e-output" type="number" value="${m.Output_Voltage??''}"></div>
    <div class="form-group"><label>Amperes</label><input id="e-amp" type="number" value="${m.Amperes??''}"></div>
    <div class="form-group"><label>Breaker Capacity</label><input id="e-breaker" type="number" value="${m.Breaker_Capacity??''}"></div>
    <div class="form-group"><label>Status</label><select id="e-mstatus">
      <option${st==='Working'?' selected':''}>Working</option>
      <option${st==='Not working'?' selected':''}>Not working</option></select></div>
    <div class="form-group"><label>Connected Well</label><input id="e-mwell" value="${m.Connected_Well??''}"></div>
    <div class="form-group" style="grid-column:1/-1"><label>Reason</label><input id="e-mreason" value="${m.Reason_of_Disconnection||''}"></div>
  </div>`;
  $id('edit-modal').classList.add('open');
}
function saveEdit(){
  if(editType==='well'){
    const w=wells[editIdx];
    w.Well_ID=$id('e-id').value.trim(); w.Well_Status=$id('e-status').value;
    w.Latitude=pf($id('e-lat').value); w.Longitude=pf($id('e-lng').value);
    w.Rehabilitation_Status=$id('e-rehab').value; w.Distance_to_Meter_m=pf($id('e-dist').value);
    w.Total_Depth_m=pf($id('e-depth').value); w.Amount_of_Water_m=pf($id('e-water').value);
    w.Connected_Meter=$id('e-meter').value.trim()||null;
    w.Reason_of_Disconnection=$id('e-reason').value.trim()||null;
    save(); renderOverview(); renderDashboard(); renderWellsTable();
    if(mainMapInit) plotMainMap();
  } else {
    const m=meters[editIdx];
    m.Serial_Number=$id('e-serial').value.trim(); m.Input_Voltage=pf($id('e-input').value);
    m.Output_Voltage=pf($id('e-output').value); m.Amperes=pf($id('e-amp').value);
    m.Breaker_Capacity=pf($id('e-breaker').value); m.Status=$id('e-mstatus').value;
    m.Connected_Well=$id('e-mwell').value.trim()||null;
    m.Reason_of_Disconnection=$id('e-mreason').value.trim()||null;
    save(); renderOverview(); renderDashboard(); renderMetersTable();
  }
  closeModal(); toast('Record updated');
}
function closeModal(){ $id('edit-modal').classList.remove('open'); editType=null; editIdx=null; }
$id('edit-modal').addEventListener('click',function(e){ if(e.target===this) closeModal(); });

// ── EXCEL UPLOAD ──────────────────────────────────────────────────
function handleDrop(e){
  e.preventDefault(); $id('upload-zone').classList.remove('dragover');
  const f=e.dataTransfer.files[0]; if(f) handleFileUpload(f);
}
function handleFileUpload(file){
  if(!file||!file.name.endsWith('.xlsx')){ toast('Please upload a valid .xlsx file',true); return; }
  const status=$id('upload-status');
  status.style.display='block'; status.innerHTML='<span style="color:var(--teal)">⏳ Reading file…</span>';
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const wb=XLSX.read(e.target.result,{type:'array'});
      const wData=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1});
      const newWells=[];
      for(let r=4;r<wData.length;r++){
        const row=wData[r]; if(!row[0]) continue;
        const id=String(row[0]).trim(); if(!/^\d+$/.test(id)) continue;
        newWells.push({Well_ID:id.padStart(3,'0'),Latitude:row[1]||null,Longitude:row[2]||null,
          Well_Status:row[3]||null,Rehabilitation_Status:row[4]||null,Distance_to_Meter_m:row[5]||null,
          Total_Depth_m:row[6]||null,Amount_of_Water_m:row[7]||null,
          Reason_of_Disconnection:row[8]||null,Connected_Meter:row[9]||null});
      }
      const mData=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]],{header:1});
      const newMeters=[];
      for(let r=1;r<mData.length;r++){
        const row=mData[r]; if(!row[0]||typeof row[0]!=='string') continue;
        newMeters.push({Serial_Number:row[0],Input_Voltage:row[1]||null,Output_Voltage:row[2]||null,
          Amperes:row[3]||null,Breaker_Capacity:row[4]||null,Status:(row[5]||'').trim(),
          Connected_Well:row[6]||null,Reason_of_Disconnection:row[7]||null});
      }
      if(!newWells.length||!newMeters.length){ status.innerHTML='<span style="color:var(--red)">❌ Could not parse sheets.</span>'; return; }
      wells=newWells; meters=newMeters; save();
      renderOverview(); renderDashboard(); renderWellsTable(); renderMetersTable();
      if(mainMapInit) plotMainMap();
      status.innerHTML=`<span style="color:var(--green)">✅ Loaded ${newWells.length} wells and ${newMeters.length} meters from <strong>${file.name}</strong></span>`;
      toast('Data updated from Excel');
    } catch(err){ status.innerHTML=`<span style="color:var(--red)">❌ Error: ${err.message}</span>`; }
  };
  reader.readAsArrayBuffer(file);
}

// ── CSV EXPORT ────────────────────────────────────────────────────
function exportWellsCSV(){
  const cols=['Well_ID','Latitude','Longitude','Well_Status','Rehabilitation_Status','Distance_to_Meter_m','Total_Depth_m','Amount_of_Water_m','Reason_of_Disconnection','Connected_Meter'];
  dlCSV('wells_export.csv',filteredWells(),cols);
}
function exportMetersCSV(){
  const cols=['Serial_Number','Input_Voltage','Output_Voltage','Amperes','Breaker_Capacity','Status','Connected_Well','Reason_of_Disconnection'];
  dlCSV('meters_export.csv',filteredMeters(),cols);
}
function dlCSV(name,data,cols){
  const rows=[cols,...data.map(r=>cols.map(c=>r[c]??''))];
  const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));
  a.download=name; a.click(); toast('CSV downloaded');
}

// ── PDF EXPORT ────────────────────────────────────────────────────
function exportPDF(){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const W=doc.internal.pageSize.getWidth();
  doc.setFillColor(11,43,94); doc.rect(0,0,W,22,'F');
  doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(14);
  doc.text('ADVACON — Wells & Meters Field Report',14,14);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text('Active Farms Maintenance Project — Phase II · AlUla · CW5773',14,19);
  doc.text('Generated: '+new Date().toLocaleString(),W-14,14,{align:'right'});

  const active=wells.filter(w=>w.Well_Status==='Active').length;
  const working=meters.filter(m=>(m.Status||'').trim()==='Working').length;
  doc.setTextColor(30,41,59); doc.setFont('helvetica','bold'); doc.setFontSize(10);
  doc.text('Summary',14,30);
  doc.autoTable({startY:33,
    head:[['Metric','Value','Metric','Value','Metric','Value']],
    body:[
      ['Total Wells',wells.length,'Active Wells',active,'Non-Active',wells.length-active],
      ['Total Meters',meters.length,'Working',working,'Faulty',meters.length-working],
      ['Maintained',wells.filter(w=>w.Rehabilitation_Status==='Maintained').length,'Not Maintained',wells.filter(w=>w.Rehabilitation_Status==='Not Maintained').length,'','']
    ],
    theme:'grid',headStyles:{fillColor:[0,169,157],textColor:255,fontStyle:'bold',fontSize:8},
    bodyStyles:{fontSize:8},columnStyles:{0:{fontStyle:'bold'},2:{fontStyle:'bold'},4:{fontStyle:'bold'}},
    margin:{left:14,right:14}});

  doc.addPage();
  doc.setFillColor(11,43,94); doc.rect(0,0,W,16,'F');
  doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(12);
  doc.text('Wells ('+wells.length+' records)',14,11);
  doc.autoTable({startY:20,
    head:[['Well ID','Status','Rehab','Dist(m)','Depth(m)','Water(m)','Meter','Reason']],
    body:wells.map(w=>[w.Well_ID,w.Well_Status,w.Rehabilitation_Status,w.Distance_to_Meter_m??'',w.Total_Depth_m??'',w.Amount_of_Water_m??'',w.Connected_Meter||'',w.Reason_of_Disconnection||'']),
    theme:'striped',headStyles:{fillColor:[0,169,157],textColor:255,fontStyle:'bold',fontSize:8},
    bodyStyles:{fontSize:7},alternateRowStyles:{fillColor:[241,245,249]},margin:{left:14,right:14}});

  doc.addPage();
  doc.setFillColor(11,43,94); doc.rect(0,0,W,16,'F');
  doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(12);
  doc.text('Meters ('+meters.length+' records)',14,11);
  doc.autoTable({startY:20,
    head:[['Serial Number','In V','Out V','Amp','Breaker','Status','Well','Reason']],
    body:meters.map(m=>[m.Serial_Number,m.Input_Voltage??'',m.Output_Voltage??'',m.Amperes??'',m.Breaker_Capacity??'',(m.Status||'').trim(),m.Connected_Well??'',m.Reason_of_Disconnection||'']),
    theme:'striped',headStyles:{fillColor:[0,169,157],textColor:255,fontStyle:'bold',fontSize:8},
    bodyStyles:{fontSize:7},alternateRowStyles:{fillColor:[241,245,249]},margin:{left:14,right:14}});

  doc.save('ADVACON_Wells_Meters_Report.pdf');
  toast('PDF downloaded');
}
