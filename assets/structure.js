    function textNode(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=value;return el}
    const rubricClusters = [
      {title:"Основные рубрики",kind:"main",cards:[
        {name:"Соавторы",desc:"Люди, которые формируют электронную музыкальную сцену: организаторы, инженеры, продюсеры, менеджеры, исследователи, дизайнеры и другие участники музыкальной индустрии. Истории об их работе, идеях и влиянии на музыкальную культуру."},
        {name:"Бэкстейдж",desc:"Внутренняя жизнь музыкальной индустрии. Как создаются концерты, фестивали, релизы и независимые проекты. Организационные, технические и творческие процессы, скрытые от зрителя."},
        {name:"Наука и технологии",desc:"Экспериментальные инструменты, звуковые технологии, синтез, научные открытия и современные исследования. Как технологии изменяют способы создания и восприятия музыки."},
        {name:"До нас",desc:"История электронной и экспериментальной музыки, архивные исследования, забытые имена и открытия. Как идеи прошлого повлияли на музыкальную культуру настоящего."}
      ]},
      {title:"Сквозные темы",kind:"themes",cards:[
        {name:"Объединения",desc:"Музыкальные сообщества, творческие коллективы, независимые инициативы и совместные проекты."},
        {name:"Лейблы",desc:"Независимые музыкальные издательства, звукозаписывающие компании, их история, артисты и принципы работы."},
        {name:"Пространства",desc:"Клубы, студии, культурные площадки, творческие лаборатории и места формирования музыкальных сообществ."}
      ]},
      {title:"Специальные форматы",kind:"special",cards:[
        {name:"ERA Playlist",desc:"Музыкальные подборки от редакции и приглашённых героев. Новые релизы, авторские рекомендации, тематические плейлисты и звуковые дополнения к материалам журнала."},
        {name:"Картография",desc:"Визуальное исследование географии российской электронной музыки. Карты региональных сцен, связей между городами, артистами, объединениями, лейблами и пространствами."}
      ]},
      {title:"Журналистские форматы",kind:"journalism",cards:[
        {name:"Интервью",desc:"Беседа с одним или несколькими героями, раскрывающая их опыт, деятельность, мировоззрение и отношение к событиям музыкальной индустрии."},
        {name:"История",placeholder:true,desc:"Авторское повествование о человеке, коллективе, проекте или культурном явлении. Материал основан на исследовании, документах, архивных источниках и проверенных фактах."}
      ]}
    ];
    // Add the uploaded image paths by card name here; no generated or guessed URLs.
    const rubricImages = {
      "Бэкстейдж": "images/%D0%B1%D1%8D%D0%BA%D1%81%D1%82%D0%B5%D0%B8%CC%86%D0%B4%D0%B6.png",
      "До нас": "images/%D0%B4%D0%BE%20%D0%BD%D0%B0%D1%81%20%28%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8F%29.png",
      "Интервью": "images/%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D1%8C%D1%8E.png",
      "Картография": "images/%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F.png",
      "Лейблы": "images/%D0%BB%D0%B5%D0%B8%CC%86%D0%B1%D0%BB%D1%8B.png",
      "Наука и технологии": "images/%D0%BD%D0%B0%D1%83%D0%BA%D0%B0%20%D0%B8%20%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8.png",
      "Объединения": "images/%D0%BE%D0%B1%D1%8A%D0%B5%D0%B4%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F.png",
      "ERA Playlist": "images/%D0%BF%D0%BB%D0%B5%D0%B8%CC%86%D0%BB%D0%B8%D1%81%D1%82.png",
      "Пространства": "images/%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%B0.png"
};
    const mainRubrics=rubricClusters.find(cluster=>cluster.kind==="main");
    mainRubrics.title="Рубрики";
    mainRubrics.cards.push(...rubricClusters.find(cluster=>cluster.kind==="special").cards);
    const formats=rubricClusters.find(cluster=>cluster.kind==="journalism");formats.title="Форматы";
    rubricClusters.splice(0,rubricClusters.length,formats,mainRubrics,rubricClusters.find(cluster=>cluster.kind==="themes"));
    const pageGroups = [
      [1,1,"Обложка","Визуальный образ первого выпуска.","intro"],
      [2,2,"Визуальный пролог","Вводная визуальная работа — первая встреча с темой.","intro"],
      [3,3,"Оглавление","Навигация по материалам и рубрикам.","intro"],
      [4,4,"Редакция / Masthead","Команда, роли, выходные сведения в рабочем составе.","intro"],
      [5,5,"Слово редакции","Зачем существует ERA и почему этот выпуск важен.","intro"],
      [6,7,"Манифест ERA","Основная идея номера, визуальная и текстовая композиция.","intro"],
      [8,9,"ERA Signals","Короткие открытия и наблюдения перед основными историями.","intro"],
      [10,15,"Главное интервью № 1","Известный артист; глубокая история, визуальный портрет.","feature"],
      [16,19,"Региональный герой № 1","Профайл и контекст локальной сцены.","region"],
      [20,23,"Backstage / история № 1","Человек, коллектив или профессия за сценой.","backstage"],
      [24,27,"До нас","Историческое исследование электронной музыки.","research"],
      [28,31,"Наука и технологии","Устройство, эксперимент или инженерная практика.","research"],
      [32,37,"Главное интервью № 2","Развёрнутый материал об известном артисте.","feature"],
      [38,41,"Backstage / история № 2","Техническая профессия или участник индустрии.","backstage"],
      [42,45,"Картография","Групповой портрет двух региональных героев.","region"],
      [46,49,"Музыкальное объединение","Как формируется и существует независимое сообщество.","backstage"],
      [50,55,"Главное интервью № 3","Ещё одна большая история артиста.","feature"],
      [56,59,"Диалог двух героев","Известный и локальный участник сцены — в одном сюжете.","feature"],
      [60,63,"Визуальные практики","Дизайнер, свет, графика и культура образов.","backstage"],
      [64,67,"Backstage / репортаж","Полевая история человека или команды за сценой.","backstage"],
      [68,71,"Региональный герой № 2","Визуальная история новой локальной сцены.","region"],
      [72,73,"ERA Playlist","Треки и короткие авторские комментарии.","outro"],
      [74,75,"Объект исследования","История одного музыкального артефакта.","research"],
      [76,77,"Архив / источники","Источники, участники, благодарности и выходные данные.","outro"],
      [78,78,"Цифровое продолжение","QR, ссылка на архив и цифровые дополнения.","outro"],
      [79,79,"Внутренняя задняя сторона","Свободное редакционное или техническое размещение.","outro"],
      [80,80,"Задняя обложка","Финальный визуальный акцент и данные выпуска.","outro"]
    ];
    function renderRubrics(){
      const root=document.getElementById("rubrics-list");root.replaceChildren();
      rubricClusters.forEach(cluster=>{
        const section=document.createElement("section");section.className="rubric-cluster";section.dataset.kind=cluster.kind;
        const title=textNode("h3","rubric-cluster-title",cluster.title);section.append(title);
        if(cluster.description)section.append(textNode("p","rubric-cluster-desc",cluster.description));
        const grid=document.createElement("div");grid.className="rubric-cluster-grid";
        cluster.cards.forEach(card=>{
          const article=document.createElement("article");article.className="rubric-entry";
          const media=document.createElement("div");media.className="rubric-media";
          if(rubricImages[card.name]&&!card.placeholder){
            const image=document.createElement("img");image.src=rubricImages[card.name];image.alt=card.name;image.loading="lazy";image.width=600;image.height=600;media.append(image);
          }else{
            media.classList.add(card.placeholder?"rubric-history-placeholder":"rubric-media-pending");media.setAttribute("role","img");media.setAttribute("aria-label",card.placeholder?"Место для будущего изображения истории":`Место для изображения «${card.name}»`);
          }
          article.append(media,textNode("h4","rubric-entry-title",card.name));
          if(card.format)article.append(textNode("p","rubric-entry-format",card.format));
          article.append(textNode("p","rubric-entry-copy",card.desc));grid.append(article);
        });section.append(grid);root.append(section);
      });
    }
    function selectFlat(group,number){document.querySelectorAll(".page.selected").forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-pressed","false")});const btn=document.querySelector(`.page[data-number="${number}"]`);if(btn){btn.classList.add("selected");btn.setAttribute("aria-pressed","true")};const info=document.getElementById("page-info");info.querySelector(".meta-line").textContent=`Страницы ${group[0]===group[1]?String(group[0]).padStart(2,"0"):group[0]+"—"+group[1]} / 80`;info.querySelector("h3").textContent=group[2];info.querySelector("p").textContent=group[3]}
    function renderFlat(){const el=document.getElementById("flat-grid");for(let n=1;n<=80;n++){const group=pageGroups.find(g=>n>=g[0]&&n<=g[1]);const b=document.createElement("button");b.type="button";b.className="page";b.dataset.type=group[4];b.dataset.number=String(n);b.setAttribute("aria-label",`Страница ${n}: ${group[2]}`);b.setAttribute("aria-pressed","false");b.append(textNode("span","",String(n).padStart(2,"0")));b.onclick=()=>selectFlat(group,n);el.append(b)}selectFlat(pageGroups[0],1)}
renderRubrics();renderFlat();
