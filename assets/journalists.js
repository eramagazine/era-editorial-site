    function textNode(tag,cls,value){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=value;return el}
    const pipeline = [
      ["Research","Собрать досье и источники."],["Pitch","Предложить историю и её ценность."],["Assignment","Утвердить ракурс, формат и объём."],
      ["Pre-interview","Подготовить интервью-гайд."],["Reporting","Провести интервью и собрать факты."],["Transcription","Расшифровать и выделить сюжеты."],
      ["Writing","Собрать первый черновик."],["Editing","Содержательная и литературная редактура."],["Fact-checking","Подтвердить даты, цитаты, факты."],
      ["Approval","Получить финальное согласование Маши Жул."],["Layout","Сверстать текст, фото и графику."],["Proofreading","Проверить уже свёрстанный материал."]
    ];
    function renderPipeline(){const el=document.getElementById("pipeline-list");pipeline.forEach((x,i)=>{const card=document.createElement("article");card.className="pipeline-step";card.dataset.important=String([2,8,9,11].includes(i));card.append(textNode("span","num",String(i+1).padStart(2,"0")),textNode("h3","",x[0]),textNode("p","",x[1]));el.append(card)})}
renderPipeline();
