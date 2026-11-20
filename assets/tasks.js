(() => {
  const tasks=window.ERA_TASKS;
  const config=window.ERA_TASKS_CONFIG||{mode:"preview"};
  const storageKey="era-task-completion-v1";
  const root=document.getElementById("task-people");
  const search=document.getElementById("task-search");
  const statusFilter=document.getElementById("task-status-filter");
  statusFilter.value="in_progress";
  const expandedPeople=new Set();
  const ownerFilter=document.getElementById("task-owner-filter");
  ownerFilter.replaceChildren(new Option("Все участники",""),...(window.ERA_TASK_PEOPLE||[]).map(name=>new Option(name,name)));
  const summary=document.getElementById("task-summary");
  const syncStatus=document.getElementById("task-sync-status");
  let completion={};
  const pending=new Set();
  let sharedReady=config.mode!=="supabase";
  let latestWrite=0;
  try { completion=JSON.parse(localStorage.getItem(storageKey)||"{}");if(!completion||typeof completion!=="object"||Array.isArray(completion))completion={}; } catch {}
  const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node};
  const completed=task=>typeof completion[task.id]==="boolean"?completion[task.id]:task.status==="done";
  const status=task=>completed(task)?"done":task.status==="done"?"in_progress":task.status;
  const labels={done:"Выполнено",in_progress:"В процессе",unset:"Не отмечено"};
  const formatDate=value=>value?value.split("-").reverse().map((p,i)=>i===2?p.slice(-2):p).join("."):"Не указан";
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(completion))}catch{syncStatus.textContent="Не удалось сохранить отметки в браузере."}}
  function render(){
    const query=search.value.trim().toLocaleLowerCase("ru");
    const filtered=tasks.filter(task=>(!query||[task.title,task.owner,...task.description].join(" ").toLocaleLowerCase("ru").includes(query))&&(!statusFilter.value||(statusFilter.value==="archive"?completed(task):!completed(task)))&&(!ownerFilter.value||(ownerFilter.value==="all"?task.group==="all":task.group==="all"||(task.assignees||[]).includes(ownerFilter.value))));
    const done=tasks.filter(completed).length;summary.textContent=`Выполнено ${done} из ${tasks.length} · Показано ${filtered.length}`;
    root.replaceChildren();
    const people=(window.ERA_TASK_PEOPLE||[]).filter(name=>!ownerFilter.value||name===ownerFilter.value);
    people.forEach((name,index)=>{
      const personal=filtered.filter(task=>task.group==="all"||(task.assignees||[]).includes(name));
      const section=el("details","task-person");section.dataset.person=name;section.open=expandedPeople.has(name);
      section.addEventListener("toggle",()=>{if(section.isConnected){if(section.open)expandedPeople.add(name);else expandedPeople.delete(name)}});
      const heading=el("summary","task-person-heading");const title=el("h3","",name);title.id="task-person-"+index;
      heading.append(title,el("span","task-person-count",`${personal.length} ${personal.length%100>=11&&personal.length%100<=14?"задач":personal.length%10===1?"задача":personal.length%10>=2&&personal.length%10<=4?"задачи":"задач"}`));section.append(heading);
      if(!personal.length){section.append(el("p","task-person-empty",statusFilter.value==="archive"?"В архиве пока нет задач.":"Активных задач нет."));root.append(section);return}
      const wrap=el("div","task-table-wrap"),table=el("table","task-table");table.setAttribute("aria-labelledby",title.id);
      table.append(el("caption","sr-only",`Задачи: ${name}`));const head=el("thead"),headRow=el("tr");
      ["Дата","Дедлайн","Задача","Описание задачи","Статус"].forEach(text=>{const cell=el("th","",text);cell.scope="col";headRow.append(cell)});head.append(headRow);table.append(head);
      const tbody=el("tbody");table.append(tbody);wrap.append(table);section.append(wrap);root.append(section);
      personal.forEach(task=>{
      const row=el("tr","task-row");row.dataset.taskId=task.id;row.dataset.status=status(task);
      const date=el("td","task-created",formatDate(task.created));date.dataset.label="Дата";
      const deadline=el("td","task-deadline");deadline.dataset.label="Дедлайн";deadline.append(el("span","",formatDate(task.deadline)));if(task.extended)deadline.append(el("span","task-extended","Дедлайн продлён"));
      const title=el("th","task-title",task.title);title.scope="row";title.dataset.label="Задача";
      const description=el("td","task-description");description.dataset.label="Описание задачи";
      if(task.description.length){
        description.append(el("p","task-description-preview",task.description[0]));
        if(task.description.length>1||(task.links||[]).length){
          const details=el("details","task-description-more");const toggle=el("summary","","Читать полностью");details.append(toggle);details.addEventListener("toggle",()=>{toggle.textContent=details.open?"Свернуть описание":"Читать полностью"});
          task.description.forEach(paragraph=>details.append(el("p","",paragraph)));
          (task.links||[]).forEach(link=>{const a=el("a","task-source-link",link.label);a.href=link.url;a.target="_blank";a.rel="noopener noreferrer";details.append(a)});description.append(details);
        }
      }else description.append(el("span","task-no-description","Описание пока не добавлено"));
      const state=el("td","task-state");state.dataset.label="Статус";
      const label=el("label","task-complete");label.dataset.status=status(task);
      const checkbox=el("input");checkbox.type="checkbox";checkbox.checked=completed(task);checkbox.disabled=!sharedReady||(config.mode==="supabase"&&typeof completion[task.id]!=="boolean")||pending.has(task.id);if(sharedReady&&config.mode==="supabase"&&typeof completion[task.id]!=="boolean")checkbox.title="Отметка станет доступна после подключения новой задачи к общей базе";checkbox.setAttribute("aria-label",`Выполнено: ${task.title}`);
      checkbox.addEventListener("change",()=>setComplete(task,checkbox.checked));label.append(checkbox,el("span","",labels[status(task)]));state.append(label);
      row.append(date,deadline,title,description,state);tbody.append(row);
    });
    });
  }
  const configured=config.mode==="supabase"&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(config.url||"")&&Boolean(config.publishableKey);
  const headers=()=>({apikey:config.publishableKey,"Content-Type":"application/json"});
  const endpoint=()=>config.url.replace(/\/$/,"")+"/rest/v1/era_task_completion";
  function announce(message){document.getElementById("task-announcement").textContent=message}
  async function loadShared(){
    if(!configured)return;
    const started=latestWrite;
    try{
      const response=await fetch(endpoint()+"?select=id,done",{headers:headers(),cache:"no-store"});
      if(!response.ok)throw new Error("read");
      const rows=await response.json();if(!Array.isArray(rows))throw new Error("format");
      if(started!==latestWrite||pending.size)return;
      const remote=Object.fromEntries(rows.filter(row=>typeof row.done==="boolean").map(row=>[row.id,row.done]));
      const missing=tasks.filter(task=>typeof remote[task.id]!=="boolean").length;
      const changed=!sharedReady||tasks.some(task=>completion[task.id]!==remote[task.id]);
      completion=remote;sharedReady=true;syncStatus.textContent=missing?`Общие отметки подключены. Для новых задач (${missing}) требуется настройка в базе.`:"Общие отметки · Синхронизация каждые 10 секунд";
      document.getElementById("task-sync-retry").hidden=!missing;if(changed)render();
    }catch{
      if(!sharedReady){syncStatus.textContent="Общие отметки недоступны. Проверьте подключение и повторите загрузку.";render()}
      else syncStatus.textContent="Не удалось обновить общие отметки. Повторим автоматически.";
      document.getElementById("task-sync-retry").hidden=false;
    }
  }
  async function setComplete(task,value){
    const previous=completed(task);pending.add(task.id);latestWrite++;completion[task.id]=value;render();
    try{
      if(config.mode==="supabase"){
        const response=await fetch(endpoint()+"?id=eq."+encodeURIComponent(task.id),{method:"PATCH",headers:{...headers(),Prefer:"return=representation"},body:JSON.stringify({done:value})});
        if(!response.ok)throw new Error("write");const rows=await response.json();
        if(!Array.isArray(rows)||rows.length!==1||rows[0].id!==task.id||rows[0].done!==value)throw new Error("not saved");
        syncStatus.textContent="Отметка сохранена для всей команды";
      }else{persist()}
      announce(`${task.title}: ${value?"выполнено":"отметка снята"}.`);
    }catch{
      completion[task.id]=previous;syncStatus.textContent="Не удалось сохранить отметку. Изменение отменено — попробуйте ещё раз.";announce(syncStatus.textContent);
    }finally{
      pending.delete(task.id);latestWrite++;render();
      const checkbox=root.querySelector(`[data-task-id="${task.id}"] input`);if(checkbox)checkbox.focus();
    }
  }
  search.addEventListener("input",render);statusFilter.addEventListener("change",render);ownerFilter.addEventListener("change",render);
  window.addEventListener("storage",event=>{if(config.mode!=="supabase"&&event.key===storageKey){try{const value=JSON.parse(event.newValue||"{}");if(value&&typeof value==="object"&&!Array.isArray(value))completion=value}catch{}render()}});
  document.getElementById("task-sync-retry").addEventListener("click",loadShared);
  if(config.mode==="supabase"){
    completion={};
    syncStatus.textContent=configured?"Загрузка общих отметок…":"Подключение общей базы в процессе. Отметки временно недоступны.";
    if(configured){loadShared();setInterval(()=>{if(!document.hidden)loadShared()},10000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)loadShared()})}
  }else syncStatus.textContent="Отметки сохраняются только на этом устройстве.";
  render();
})();
