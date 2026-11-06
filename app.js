const plans = [
  { id:'english', category:'INGLÉS · CAMBRIDGE', name:'A little help', description:'Ese empujoncito para encontrar las palabras correctas.', price:149, period:'por sesión', icon:'Aa', features:['Sesión guiada de 60 minutos','Explicación de temas y ejercicios','Material de práctica personalizado','Resolución de dudas en español'] },
  { id:'math', category:'MATEMÁTICAS · ALEKS', name:'Todo hace clic', description:'Menos «no me sale» y más «ahora sí lo entiendo».', price:149, period:'por sesión', icon:'x²', featured:true, features:['Sesión guiada de 60 minutos','Explicaciones paso a paso','Práctica en los temas que necesitas','Acompañamiento en español'] },
  { id:'monthly', category:'EL ACOMPAÑAMIENTO COMPLETO', name:'Juntos, a tu ritmo', description:'Un poquito de constancia para llegar mucho más lejos.', price:499, period:'al mes', icon:'♡', features:['4 sesiones al mes de 60 minutos','Inglés o matemáticas: tú eliges','Plan de estudio personalizado','Seguimiento de tu progreso'] }
];
const $ = (selector) => document.querySelector(selector);
const money = (price) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(price);
const safe = (text) => String(text).replace(/[&<>"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const labels = {pending:'Solicitud recibida',approved:'Cupo aprobado · pendiente de pago',reviewing:'Pago en revisión',active:'Plan activo',rejected:'Solicitud no aceptada'};
let state;
try { state = JSON.parse(localStorage.getItem('muse-demo-v1') || 'null'); } catch { state = null; }
if (!state || !Array.isArray(state.requests)) state = {requests:[],open:true,bank:''};
let filter = 'all';
const modal = $('#modal');
const content = $('#content');
const notice = '<p class="notice">Demostración: datos guardados solo en este navegador, sin cuentas ni pagos reales. Precios propuestos. No ingreses datos personales o bancarios reales.</p>';
function toast(text) { $('#toast').textContent=text; $('#toast').classList.add('visible'); setTimeout(()=>$('#toast').classList.remove('visible'),4000); }
function save() { try { localStorage.setItem('muse-demo-v1',JSON.stringify(state)); } catch { toast('El navegador no permite guardar esta demostración.'); } render(); }
function open(html) { content.innerHTML=html; if (!modal.open) modal.showModal(); }
function render() {
  $('#capacity').textContent=state.open?'●  Cupos disponibles esta semana':'○  Por ahora, los cupos están completos';
  $('#plans').innerHTML=plans.filter(p=>filter==='all'||p.id===filter||p.id==='monthly').map(p=>`<article class="card ${p.featured?'featured':''}">${p.featured?'<span class="popular">✦ EL FAVORITO DE MUSE</span>':''}<span class="icon">${p.icon}</span><p class="category">${p.category}</p><h3>${p.name}</h3><p class="description">${p.description}</p><div class="price">${money(p.price)}<small>MXN / ${p.period}</small></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button class="button" data-plan="${p.id}" ${state.open?'':'disabled'}>${state.open?'Este es mi plan':'Sin cupos por ahora'} <span>↗</span></button></article>`).join('');
  contentActions('#plans','[data-plan]',button=>requestPlan(button.dataset.plan));
}
function contentActions(root,selector,fn) { document.querySelector(root).querySelectorAll(selector).forEach(button=>button.addEventListener('click',()=>fn(button))); }
function requestPlan(id) {
  if(!state.open) return;
  const plan=plans.find(p=>p.id===id);
  open(`<h2>Tu primer pasito ♡</h2><p>${plan.name} · ${money(plan.price)} MXN. Revisamos tu cupo antes de pedirte cualquier pago.</p>${notice}<form id="request-form"><label>Tu nombre<input name="name" maxlength="80" autocomplete="name" required></label><label>Correo de contacto<input name="email" type="email" maxlength="120" autocomplete="email" required></label><label>¿En qué te ayudamos?<select name="subject"><option>Inglés · Cambridge</option><option>Matemáticas · ALEKS</option></select></label><label>Cuéntanos qué necesitas<textarea name="message" maxlength="600" placeholder="Temas para practicar y horarios disponibles" required></textarea></label><button class="button primary">Solicitar mi lugar ↗</button></form>`);
  if(id==='math') content.querySelector('select').selectedIndex=1;
  $('#request-form').addEventListener('submit',event=>{ event.preventDefault(); const data=new FormData(event.currentTarget); state.requests.unshift({id:crypto.randomUUID(),plan:id,name:data.get('name').trim(),email:data.get('email').trim(),subject:data.get('subject'),message:data.get('message').trim(),status:'pending',createdAt:new Date().toISOString()}); save(); account(); toast('Solicitud de prueba registrada. ♡'); });
}
function account() {
  open(`<h2>Tu espacio, sin prisas.</h2>${notice}${state.requests.length?state.requests.map(r=>`<article class="request"><strong>${safe(plans.find(p=>p.id===r.plan)?.name||r.plan)}</strong><br><span class="badge">${labels[r.status]}</span><p>${safe(r.name)} · ${safe(r.subject)}</p>${r.status==='approved'?state.bank?`<p>Tu lugar está reservado. Transfiere ${money(plans.find(p=>p.id===r.plan).price)} MXN y registra la referencia.</p><div class="bank">${safe(state.bank)}</div><form data-payment="${r.id}"><label>Referencia de transferencia<input name="reference" maxlength="100" required></label><button class="button primary">Registrar pago</button></form>`:'<p>El equipo aún debe configurar los datos de transferencia. Todavía no realices el pago.</p>':''}${r.status==='reviewing'?'<p>Verificaremos la transferencia antes de activar el plan.</p>':''}${r.status==='active'?'<p>¡Todo listo! El equipo coordinará tus sesiones por correo.</p>':''}${r.status==='rejected'?'<p>Esta vez no pudimos reservar tu lugar. No realices ningún pago.</p>':''}</article>`).join(''):'<p>Todavía no hay solicitudes. Encuentra un plan que vaya contigo. ♡</p>'}`);
  content.querySelectorAll('[data-payment]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const r=state.requests.find(item=>item.id===form.dataset.payment);r.reference=new FormData(form).get('reference').trim();r.status='reviewing';save();account();toast('Referencia registrada para revisión.');}));
}
function admin() {
  open(`<h2>El rinconcito del equipo</h2>${notice}<p>Panel de prueba abierto para explorar el flujo. En producción accederán solo las cuatro cuentas autorizadas.</p><form id="settings"><label>Disponibilidad<select name="open"><option value="true" ${state.open?'selected':''}>Aceptar nuevas solicitudes</option><option value="false" ${state.open?'':'selected'}>Pausar solicitudes · sin cupos</option></select></label><label>Datos de transferencia<textarea name="bank" maxlength="1000" placeholder="Banco, titular, CLABE y concepto (ficticios)">${safe(state.bank)}</textarea></label><button class="button primary">Guardar configuración</button></form><h2 style="margin-top:28px">Solicitudes (${state.requests.length})</h2>${state.requests.length?state.requests.map(r=>`<article class="request"><strong>${safe(r.name)}</strong><p>${safe(r.email)}<br>${safe(r.subject)} · ${money(plans.find(p=>p.id===r.plan).price)} MXN<br>${safe(r.message)}</p><span class="badge">${labels[r.status]}</span>${r.reference?`<p>Referencia: ${safe(r.reference)}</p>`:''}<div>${r.status==='pending'?`<button class="button primary" data-id="${r.id}" data-status="approved">Aceptar cupo</button><button class="button white" data-id="${r.id}" data-status="rejected">No aceptar</button>`:''}${r.status==='reviewing'?`<button class="button primary" data-id="${r.id}" data-status="active">Confirmar pago</button><button class="button white" data-id="${r.id}" data-status="approved">Pedir revisión</button>`:''}</div></article>`).join(''):'<p>Sin solicitudes. Todo tranquilo por aquí. ✧</p>'}`);
  $('#settings').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);state.open=data.get('open')==='true';state.bank=data.get('bank').trim();save();toast('Configuración de prueba guardada.');});
  contentActions('#content','[data-status]',button=>{state.requests.find(r=>r.id===button.dataset.id).status=button.dataset.status;save();admin();toast('Solicitud actualizada.');});
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(tab=>{tab.classList.toggle('selected',tab===button);tab.setAttribute('aria-pressed',String(tab===button));});render();}));
$('#account').addEventListener('click',account);$('#admin').addEventListener('click',admin);$('#close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
render();
