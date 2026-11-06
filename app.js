import { connect } from './account.js';
const plans = [
  { id:'english', category:'INGLÉS · CAMBRIDGE', name:'A little help', description:'Ese empujoncito para encontrar las palabras correctas.', price:149, period:'por sesión', icon:'Aa', features:['Sesión guiada de 60 minutos','Explicación de temas y ejercicios','Material de práctica personalizado','Resolución de dudas en español'] },
  { id:'math', category:'MATEMÁTICAS · ALEKS', name:'Todo hace clic', description:'Menos «no me sale» y más «ahora sí lo entiendo».', price:149, period:'por sesión', icon:'x²', featured:true, features:['Sesión guiada de 60 minutos','Explicaciones paso a paso','Práctica en los temas que necesitas','Acompañamiento en español'] },
  { id:'monthly', category:'EL ACOMPAÑAMIENTO COMPLETO', name:'Juntos, a tu ritmo', description:'Un poquito de constancia para llegar mucho más lejos.', price:499, period:'al mes', icon:'♡', features:['4 sesiones al mes de 60 minutos','Inglés o matemáticas: tú eliges','Plan de estudio personalizado','Seguimiento de tu progreso'] }
];
const $ = (selector) => document.querySelector(selector);
const money = (price) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(price);
const safe = (text) => String(text).replace(/[&<>"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const labels = {pending:'Solicitud recibida',approved:'Cupo aprobado · pendiente de pago',reviewing:'Pago en revisión',active:'Plan activo',rejected:'Solicitud no aceptada'};
let state={open:false};
let filter = 'all';
const modal = $('#modal');
const content = $('#content');
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');setTimeout(()=>$('#toast').classList.remove('visible'),5000);}
function open(html) { content.innerHTML=html; if (!modal.open) modal.showModal(); }
function render() {
  $('#capacity').textContent=state.open?'●  Cupos disponibles esta semana':'○  Por ahora, los cupos están completos';
  $('#plans').innerHTML=plans.filter(p=>filter==='all'||p.id===filter||p.id==='monthly').map(p=>`<article class="card ${p.featured?'featured':''}">${p.featured?'<span class="popular">✦ EL FAVORITO DE MUSE</span>':''}<span class="icon">${p.icon}</span><p class="category">${p.category}</p><h3>${p.name}</h3><p class="description">${p.description}</p><div class="price">${money(p.price)}<small>MXN / ${p.period}</small></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button class="button" data-plan="${p.id}" ${state.open?'':'disabled'}>${state.open?'Este es mi plan':'Sin cupos por ahora'} <span>↗</span></button></article>`).join('');
  contentActions('#plans','[data-plan]',button=>requestPlan(button.dataset.plan));
}
function contentActions(root,selector,fn) { document.querySelector(root).querySelectorAll(selector).forEach(button=>button.addEventListener('click',()=>fn(button))); }
const cloud=connect({open,toast,plans,availability(value){state.open=value;render();}});
function requestPlan(id){cloud.requestPlan(id);}
function account(){cloud.account();}
function admin(){cloud.admin();}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(tab=>{tab.classList.toggle('selected',tab===button);tab.setAttribute('aria-pressed',String(tab===button));});render();}));
$('#account').addEventListener('click',account);$('#admin').addEventListener('click',admin);$('#close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
render();
