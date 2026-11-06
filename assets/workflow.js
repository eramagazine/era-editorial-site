(() => {
  const phases=[
    {number:"I",title:"Подготовка материала",result:"Утверждённый ракурс и подготовленное интервью",steps:[
      ["Найти героя","Определить тему, о которой будет материал в журнале, или рубрику. Найти героя, через которого можно раскрыть эту историю."],
      ["Исследовать тему","Собрать предварительное досье: биографию героя, историю его деятельности, проекты, публикации, интервью, музыкальные релизы, архивные материалы и другие источники."],
      ["Сформулировать ракурс","Определить главную мысль будущего материала и предложить её редакции."],
      ["Утвердить редакционное задание","Согласовать с редакцией тему и формат. Связаться с героем или его представителем, представить издание, объяснить тему и формат беседы. Договориться о месте, времени, способе записи, условиях цитирования и возможной съёмке при очной встрече."],
      ["Подготовить интервью","Составить последовательность вопросов на основе исследования. Продумать тематические блоки, уточняющие и критические вопросы, подготовить факты, которые необходимо проверить во время разговора."]
    ]},
    {number:"II",title:"Сбор и обработка информации",result:"Проверенная фактура и структура будущего текста",steps:[
      ["Провести интервью","Записать разговор с героем, получить содержательные ответы, задавать дополнительные вопросы, уточнять противоречия. Фиксировать важные наблюдения, детали и истории, которые могут раскрыть героя."],
      ["Дополнить материал","Собрать недостающие сведения, документы, наблюдения и комментарии. При необходимости уточнить детали у героя и обратиться к дополнительным источникам."],
      ["Расшифровать запись","Перевести аудио- или видеозапись в текст либо подготовить подробную рабочую расшифровку."],
      ["Выстроить структуру","Определить последовательность смысловых блоков, выбрать главные цитаты, факты и эпизоды. Продумать начало, развитие и завершение истории. Для интервью в формате вопросов и ответов — выстроить логику беседы."]
    ]},
    {number:"III",title:"Создание и редакционная проверка",result:"Окончательный текст, утверждённый редакцией",steps:[
      ["Написать черновик","Подготовить первую полноценную версию материала."],
      ["Редактура, фактчекинг и правовая экспертиза","Передать текст редактору и корректору. Провести содержательную и литературную редактуру, проверить факты, источники и точность цитат. Выполнить правовую экспертизу: оценить соблюдение авторских прав, правил использования персональных данных, права на изображение и риски распространения недостоверных или порочащих сведений; спорные вопросы передать юристу. Корректор проверяет орфографию, пунктуацию и единообразие оформления."],
      ["Утвердить текст","Передать окончательную версию ответственному редактору на содержательное утверждение."]
    ]},
    {number:"IV",title:"Оформление и выпуск",result:"Утверждённый материал, готовый к публикации",steps:[
      ["Подготовить визуальные материалы","Отобрать фотографии, архивные изображения, иллюстрации и графику. Проверить авторство, разрешения на использование, подписи и качество файлов."],
      ["Сверстать материал","Разместить утверждённый текст и визуальные материалы в макете журнала. Проверить иерархию, подписи, нумерацию и соответствие общей дизайн-системе выпуска."],
      ["Вычитать макет","Передать свёрстанный материал редактору и корректору. Проверить текст на полосах, заголовки, подписи, переносы, ссылки и отсутствие потерь или искажений после вёрстки."],
      ["Утвердить и выпустить","Провести окончательную редакционную и техническую проверку. Утвердить материал и передать его в выпуск."]
    ]}
  ];
  const root=document.getElementById('editorial-cycle');
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
  const tabs=make('div','workflow-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Четыре этапа редакционного цикла');
  const panels=make('div','workflow-panels');let offset=0;
  phases.forEach((phase,index)=>{
    const tab=make('button','workflow-tab');tab.type='button';tab.id=`workflow-tab-${index}`;tab.dataset.phase=index;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',`workflow-panel-${index}`);tab.setAttribute('aria-selected',String(index===0));tab.tabIndex=index===0?0:-1;
    tab.append(make('span','workflow-tab-number',phase.number),make('span','workflow-tab-title',phase.title),make('span','workflow-tab-count',`${phase.steps.length} ${phase.steps.length===5?"пунктов":"пункта"}`));tabs.append(tab);
    const panel=make('div','workflow-panel');panel.id=`workflow-panel-${index}`;panel.dataset.phase=index;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.hidden=index!==0;
    const heading=make('div','workflow-phase-heading');heading.append(make('span','workflow-phase-number',phase.number),make('h3','',phase.title));panel.append(heading);
    const list=make('ol','workflow-steps');list.start=offset+1;
    phase.steps.forEach(([title,description],stepIndex)=>{
      const item=make('li','workflow-step');const details=make('details','workflow-step-details');details.open=stepIndex===0;
      const summary=make('summary','');const number=make('span','workflow-step-number',String(offset+stepIndex+1).padStart(2,'0'));number.setAttribute('aria-hidden','true');const plus=make('span','workflow-step-toggle','+');plus.setAttribute('aria-hidden','true');summary.append(number,make('span','workflow-step-title',title),plus);details.append(summary,make('p','workflow-step-copy',description));item.append(details);list.append(item);
    });offset+=phase.steps.length;panel.append(list);
    const output=make('div','workflow-output');output.append(make('span','workflow-output-label','На выходе'),make('p','',phase.result));panel.append(output);
    const pager=make('div','workflow-pager');const previous=make('button','','← Предыдущий этап');previous.type='button';previous.disabled=index===0;previous.onclick=()=>select(index-1,true);const next=make('button','','Следующий этап →');next.type='button';next.disabled=index===phases.length-1;next.onclick=()=>select(index+1,true);pager.append(previous,make('span','',`${index+1} / 4`),next);panel.append(pager);panels.append(panel);
    tab.addEventListener('click',()=>select(index,false));
    tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%4;if(event.key==='ArrowLeft')target=(index+3)%4;if(event.key==='Home')target=0;if(event.key==='End')target=3;if(target!==undefined){event.preventDefault();select(target,true)}});
  });
  root.append(tabs,panels);
  function select(index,focus){
    if(index<0||index>=phases.length)return;
    Array.from(tabs.children).forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});
    Array.from(panels.children).forEach((panel,i)=>panel.hidden=i!==index);
    if(focus)tabs.children[index].focus({preventScroll:true});
  }
})();
