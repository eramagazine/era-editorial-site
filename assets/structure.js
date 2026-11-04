    function textNode(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=value;return el}
    const rubrics = [
      {tag:"01 / PEOPLE",name:"Главный сюжет",desc:"Глубокие истории артистов, коллективов и людей внутри сцены. Интервью, профайл, портрет."},
      {tag:"02 / INSIDE",name:"Backstage",desc:"То, что происходит за кулисами: репортажи, технические команды, организаторы, места."},
      {tag:"03 / RESEARCH",name:"Наука / технологии",desc:"Как появляется звук: инструменты, синтез, цифровые эксперименты, инженеры и исследователи."},
      {tag:"04 / MEMORY",name:"До нас",desc:"Исторические исследования электронной музыки, эксперименты и люди, опередившие время."},
      {tag:"05 / GEOGRAPHY",name:"Картография",desc:"Регионы, локальные объединения и невидимые связи электронной сцены."},
      {tag:"06 / LISTEN",name:"ERA Playlist",desc:"Авторские подборки, новые релизы, комментарии героев, аудиопродолжения печатных историй."}
    ];
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
    function renderRubrics(){const el=document.getElementById("rubrics-list");rubrics.forEach(r=>{const card=document.createElement("article");card.className="rubric";const top=document.createElement("div");top.append(textNode("span","tag",r.tag),textNode("h3","",r.name));card.append(top,textNode("p","",r.desc));el.append(card)})}
    function selectFlat(group,number){document.querySelectorAll(".page.selected").forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-pressed","false")});const btn=document.querySelector(`.page[data-number="${number}"]`);if(btn){btn.classList.add("selected");btn.setAttribute("aria-pressed","true")};const info=document.getElementById("page-info");info.querySelector(".meta-line").textContent=`Страницы ${group[0]===group[1]?String(group[0]).padStart(2,"0"):group[0]+"—"+group[1]} / 80`;info.querySelector("h3").textContent=group[2];info.querySelector("p").textContent=group[3]}
    function renderFlat(){const el=document.getElementById("flat-grid");for(let n=1;n<=80;n++){const group=pageGroups.find(g=>n>=g[0]&&n<=g[1]);const b=document.createElement("button");b.type="button";b.className="page";b.dataset.type=group[4];b.dataset.number=String(n);b.setAttribute("aria-label",`Страница ${n}: ${group[2]}`);b.setAttribute("aria-pressed","false");b.append(textNode("span","",String(n).padStart(2,"0")));b.onclick=()=>selectFlat(group,n);el.append(b)}selectFlat(pageGroups[0],1)}
renderRubrics();renderFlat();
