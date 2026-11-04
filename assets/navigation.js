const menuToggle=document.getElementById("mobile-menu-toggle");
const mobileMenu=document.querySelector(".mobile-menu");
const mobileClose=mobileMenu.querySelector(".mobile-menu-close");
const headerNav=document.querySelector(".header-nav");
const desktopDepartments=headerNav.querySelector(".nav-departments");
const mobileViewport=window.matchMedia("(max-width:850px)");
mobileMenu.querySelector("nav").replaceChildren(...Array.from(headerNav.children,child=>child.cloneNode(true)));
let closingMenu=false;
async function closeMobileMenu(target){
  if(!mobileMenu.open||closingMenu)return;
  closingMenu=true;
  mobileMenu.classList.add("is-closing");
  await Promise.allSettled(mobileMenu.getAnimations().map(animation=>animation.finished));
  mobileMenu.close();
  mobileMenu.classList.remove("is-closing");
  document.body.classList.remove("mobile-menu-open");
  menuToggle.setAttribute("aria-expanded","false");
  closingMenu=false;
  if(target)location.assign(target);
}
menuToggle.addEventListener("click",()=>{
  mobileMenu.showModal();
  document.body.classList.add("mobile-menu-open");
  menuToggle.setAttribute("aria-expanded","true");
  mobileClose.focus();
});
mobileClose.addEventListener("click",()=>closeMobileMenu());
mobileMenu.addEventListener("click",event=>{
  if(event.target!==mobileMenu)return;
  const bounds=mobileMenu.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeMobileMenu();
});
mobileMenu.addEventListener("cancel",event=>{event.preventDefault();closeMobileMenu()});
mobileMenu.querySelectorAll("nav a").forEach(link=>link.addEventListener("click",event=>{event.preventDefault();closeMobileMenu(link.getAttribute("href"))}));
mobileViewport.addEventListener("change",()=>{if(mobileMenu.open)closeMobileMenu();desktopDepartments.open=false});
document.addEventListener("click",event=>{if(!desktopDepartments.contains(event.target))desktopDepartments.open=false});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&desktopDepartments.open){desktopDepartments.open=false;desktopDepartments.querySelector("summary").focus()}});
document.querySelectorAll('.header-nav a,.mobile-menu nav a').forEach(link=>{if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page')});
