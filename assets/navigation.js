    const sidebarToggle=document.getElementById("sidebar-toggle");
    const sectionSidebar=document.getElementById("section-sidebar");
    const shell=document.querySelector(".shell");
    const sidebarStorageKey="era-sidebar-collapsed";
    function setSidebarCollapsed(collapsed){
      sectionSidebar.hidden=collapsed;
      shell.classList.toggle("sidebar-collapsed",collapsed);
      sidebarToggle.setAttribute("aria-expanded",String(!collapsed));
      sidebarToggle.setAttribute("aria-controls",window.matchMedia("(max-width:850px)").matches?"mobile-section-menu":"section-sidebar");
      sidebarToggle.textContent=collapsed?"Открыть меню":"Скрыть меню";
    }
    const mobileViewport=window.matchMedia("(max-width:850px)");
    const mobileMenu=document.querySelector(".mobile-menu");
    const mobileClose=mobileMenu.querySelector(".mobile-menu-close");
    mobileMenu.querySelector("nav").replaceChildren(...Array.from(document.querySelector(".side-nav").children,child=>child.cloneNode(true)));
    let closingMenu=false;
    async function closeMobileMenu(target){
      if(!mobileMenu.open||closingMenu)return;
      closingMenu=true;
      mobileMenu.classList.add("is-closing");
      await Promise.allSettled(mobileMenu.getAnimations().map(animation=>animation.finished));
      mobileMenu.close();
      mobileMenu.classList.remove("is-closing");
      document.body.classList.remove("mobile-menu-open");
      sidebarToggle.setAttribute("aria-expanded","false");
      closingMenu=false;
      if(target){if(target.startsWith("#")){location.hash=target;document.querySelector(target)?.scrollIntoView()}else{location.assign(target)}}
    }
    mobileClose.addEventListener("click",()=>closeMobileMenu());
    mobileMenu.addEventListener("cancel",event=>{event.preventDefault();closeMobileMenu()});
    mobileMenu.querySelectorAll("nav a").forEach(link=>link.addEventListener("click",event=>{event.preventDefault();closeMobileMenu(link.getAttribute("href"))}));
    mobileViewport.addEventListener("change",()=>{if(mobileMenu.open)closeMobileMenu();if(mobileViewport.matches)setSidebarCollapsed(true)});
    let sidebarCollapsed=mobileViewport.matches;
    try{const stored=localStorage.getItem(sidebarStorageKey);if(stored!==null)sidebarCollapsed=stored==="true"}catch{}
    setSidebarCollapsed(mobileViewport.matches?true:sidebarCollapsed);
    sidebarToggle.addEventListener("click",()=>{
      if(mobileViewport.matches){
        mobileMenu.showModal();
        document.body.classList.add("mobile-menu-open");
        sidebarToggle.setAttribute("aria-expanded","true");
        mobileClose.focus();
        return;
      }
      const collapsed=!sectionSidebar.hidden;
      setSidebarCollapsed(collapsed);
      try{localStorage.setItem(sidebarStorageKey,String(collapsed))}catch{}
    });
    document.querySelectorAll('.side-nav a,.mobile-menu nav a').forEach(link=>{if(new URL(link.href).pathname===location.pathname){link.setAttribute('aria-current','page');const group=link.closest('details');if(group)group.open=true}});
