const slides=document.querySelectorAll('.slide'),dotsBox=document.getElementById('dots');
let cur=0,timer;
slides.forEach((_,i)=>{const d=document.createElement('button');d.className='s-dot'+(i===0?' active':'');d.setAttribute('aria-label','Slide '+(i+1));d.onclick=()=>go(i);dotsBox.appendChild(d);});
const dots=document.querySelectorAll('.s-dot');
function go(n){
  slides[cur].classList.remove('active');dots[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].classList.add('active');dots[cur].classList.add('active');
  resetTimer();
}
const auto=()=>timer=setInterval(()=>go(cur+1),6000);
const resetTimer=()=>{clearInterval(timer);auto();};
document.getElementById('next').onclick=()=>go(cur+1);
document.getElementById('prev').onclick=()=>go(cur-1);
auto();

const nav=document.getElementById('nav'),ham=document.getElementById('hamburger');
ham.onclick=()=>nav.classList.toggle('menu-open');
document.querySelectorAll('.nav-links a,.nav-cta').forEach(l=>l.addEventListener('click',()=>nav.classList.remove('menu-open')));

const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{
  toTop.classList.toggle('show',window.scrollY>500);
  let c='home';
  document.querySelectorAll('section[id],header[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-140)c=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c));
});
toTop.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const t=e.target,end=+t.dataset.count,dur=1800,st=performance.now();
  const step=n=>{const p=Math.min((n-st)/dur,1);t.textContent=Math.floor(end*(1-Math.pow(1-p,3)))+(p===1?'+':'');if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

document.getElementById('year').textContent=new Date().getFullYear();
