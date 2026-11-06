(() => {
  const list=document.getElementById('team-list');
  const cards=[...list.children];
  let active=0,drag=null,shift=0,suppressClick=false;
  list.setAttribute('role','region');list.setAttribute('aria-roledescription','карусель');list.setAttribute('aria-label','Направления команды');
  const controls=document.createElement('div');controls.className='team-carousel-controls';
  const previous=document.createElement('button'),next=document.createElement('button'),status=document.createElement('span');
  previous.type=next.type='button';previous.textContent='←';next.textContent='→';previous.setAttribute('aria-label','Предыдущее направление');next.setAttribute('aria-label','Следующее направление');status.setAttribute('aria-live','polite');
  controls.append(previous,status,next);list.after(controls);
  const spacing=()=>matchMedia("(min-width:851px)").matches?1:.76;
  const distance=i=>{let d=(i-active+cards.length)%cards.length;if(d>cards.length/2)d-=cards.length;return d};
  function layout(){
    const width=cards[0].offsetWidth;
    cards.forEach((card,i)=>{
      const d=distance(i)-shift,abs=Math.abs(d),center=i===active;
      card.style.transform=`translateX(calc(-50% + ${d*width*spacing()}px)) translateZ(${-abs*110}px) rotateY(${-d*12}deg) scale(${Math.max(.62,1-abs*.13)})`;
      card.style.opacity=abs>2.7?'0':'1';card.style.zIndex=String(20-Math.round(abs*3));card.style.pointerEvents=abs>2.7?'none':'auto';
      card.classList.toggle('is-active',center);card.inert=abs>2.7;card.querySelector('summary').tabIndex=center?0:-1;
    });
    list.style.height=Math.ceil(cards[active].offsetHeight+30)+'px';
    status.textContent=cards[active].querySelector('h3').textContent;
  }
  function go(step){if(step)cards[active].open=false;active=(active+step+cards.length)%cards.length;shift=0;layout()}
  previous.onclick=()=>go(-1);next.onclick=()=>go(1);
  cards.forEach((card,i)=>{card.addEventListener('click',event=>{if(suppressClick){event.preventDefault();return}if(i!==active){event.preventDefault();go(distance(i))}},true);card.addEventListener('toggle',layout)});
  list.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(event.key==='ArrowRight'?1:-1)}});
  list.addEventListener('dragstart',event=>event.preventDefault());
  list.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={x:event.clientX,y:event.clientY,id:event.pointerId,moved:false};suppressClick=false});
  list.addEventListener('pointermove',event=>{
    if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>10){drag=null;return}
    if(Math.abs(dx)>8){drag.moved=true;list.setPointerCapture(event.pointerId);list.classList.add('is-dragging');shift=Math.max(-1.2,Math.min(1.2,-dx/(cards[0].offsetWidth*spacing())));layout()}
  });
  function release(event){if(!drag||event.pointerId!==drag.id)return;const moved=drag.moved;drag=null;list.classList.remove('is-dragging');suppressClick=moved;if(!moved)return;const step=Math.abs(shift)>.18?Math.sign(shift):0;go(step);if(moved)setTimeout(()=>suppressClick=false,0)}
  list.addEventListener('pointerup',release);list.addEventListener('pointercancel',event=>{drag=null;shift=0;list.classList.remove('is-dragging');layout()});
  let wheelTimer=null,wheelDistance=0,wheelFrame=null;
  list.addEventListener('wheel',event=>{
    if(event.ctrlKey||drag||Math.abs(event.deltaX)<=Math.abs(event.deltaY)||!event.deltaX)return;
    event.preventDefault();
    const unit=event.deltaMode===1?16:event.deltaMode===2?list.clientWidth:1;
    wheelDistance+=event.deltaX*unit;
    shift=Math.max(-1.15,Math.min(1.15,wheelDistance/(cards[0].offsetWidth*spacing())));
    list.classList.add('is-wheeling');
    if(!wheelFrame)wheelFrame=requestAnimationFrame(()=>{wheelFrame=null;layout()});
    clearTimeout(wheelTimer);
    wheelTimer=setTimeout(()=>{
      if(wheelFrame){cancelAnimationFrame(wheelFrame);wheelFrame=null}
      const step=Math.abs(shift)>.16?Math.sign(shift):0;
      wheelDistance=0;list.classList.remove('is-wheeling');go(step);
    },160);
  },{passive:false});
  new ResizeObserver(layout).observe(list);cards.forEach(card=>new ResizeObserver(layout).observe(card));layout();
})();
