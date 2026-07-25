const quizTrainingMap={
  erne:["outlook","teams","microsoft-365","onedrive","personal-access","security","sharepoint","microsoft-365"],
  smash:["teams","onedrive","sharepoint","sharepoint","teams","personal-access","sharepoint","microsoft-365"]
};

const trainingLabels={
  "microsoft-365":"Microsoft 365",
  outlook:"Outlook",
  teams:"Microsoft Teams",
  sharepoint:"SharePoint",
  onedrive:"OneDrive",
  "personal-access":"Personal Sign-Ins and Access",
  security:"Security and Sign-In Approvals"
};

function readMissedTraining(){
  try{return JSON.parse(sessionStorage.getItem("kpcMissedTraining")||"[]")}catch{return []}
}

function saveMissedTraining(items){
  try{sessionStorage.setItem("kpcMissedTraining",JSON.stringify([...new Set(items)]))}catch{}
}

function openTopic(id){
  const t=topics.find(x=>x.id===id);
  if(!t)return;
  topicContent.innerHTML=`<p class="eyebrow">M365 KitchenTalk #${t.number}</p><h2>${t.title}</h2><div class="full-talk">${t.body.map(p=>`<p>${p}</p>`).join("")}</div><div class="memory-hook"><strong>Less Computer, More Pickleball</strong><p>${t.memory}</p></div>`;
  topicDialog.showModal();
}

function startQuiz(type){
  quizState={type,index:0,score:0,answered:false,missed:[]};
  renderQuestion();
  quizDialog.showModal();
}

function chooseAnswer(index){
  if(quizState.answered)return;
  quizState.answered=true;
  const quiz=quizzes[quizState.type];
  const item=quiz.questions[quizState.index];
  const buttons=[...quizContent.querySelectorAll(".answer")];
  buttons.forEach((b,i)=>{
    b.disabled=true;
    if(i===item.correct)b.classList.add("correct");
    if(i===index&&i!==item.correct)b.classList.add("incorrect");
  });
  const good=index===item.correct;
  if(good){
    quizState.score++;
  }else{
    const trainingId=quizTrainingMap[quizState.type][quizState.index];
    if(trainingId)quizState.missed.push(trainingId);
  }
  document.querySelector("#feedback").innerHTML=`<div class="feedback"><strong>${good?"Nice rally!":"Good try."}</strong><p>${item.why}</p></div><div class="next-row"><button class="button dark" data-next>${quizState.index+1===quiz.questions.length?"See my result":"Next question"}</button></div>`;
}

function renderResult(){
  const quiz=quizzes[quizState.type];
  const allCorrect=quizState.score===quiz.questions.length;
  const accumulated=[...new Set([...readMissedTraining(),...quizState.missed])];
  saveMissedTraining(accumulated);
  const links=accumulated.map(id=>`<a class="training-link" href="learn.html#${id}">${trainingLabels[id]}</a>`).join("");
  quizContent.innerHTML=`
    <p class="eyebrow">${quiz.name} complete</p>
    <h2>${quizState.type==="erne"?"Warm-up finished":"Challenge finished"}</h2>
    <div class="score">${quizState.score}/${quiz.questions.length}</div>
    ${allCorrect
      ?`<div class="perfect-result"><h3>Kewl — perfect game.</h3><p>You got every question right.</p></div>`
      :`<div class="training-result"><h3>Review these training topics</h3><p>These short lessons match the questions that need another look.</p><div class="training-links">${links}</div></div>`}
    <div class="actions"><button class="button dark" data-replay>Play again</button><button class="button outline" data-close-result>Back to KitchenTalks</button></div>`;
}
