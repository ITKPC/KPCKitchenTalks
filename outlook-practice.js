(()=>{
const seed={
 inbox:[
  {id:'m1',from:'Scheduling',email:'scheduling@kamloopspickleballclub.ca',subject:'Court schedule update for next week',time:'9:12 AM',unread:true,body:'Hi Smash,\n\nThe updated court schedule is ready for review. Please reply to confirm that you received it.\n\nThanks,\nScheduling Team'},
  {id:'m2',from:'Gerrianne Clare',email:'communications@kamloopspickleballclub.ca',subject:'Draft KitchenTalk announcement',time:'Yesterday',unread:true,body:'Hi Smash,\n\nCould you review the draft KitchenTalk announcement and let me know whether the wording is clear for volunteers?\n\nThank you,\nGerrianne'},
  {id:'m3',from:'KPC Technology',email:'technology@kamloopspickleballclub.ca',subject:'Reminder: never approve an unexpected sign-in',time:'Friday',unread:false,body:'This is a training reminder. Only approve a sign-in request when you are actively signing in yourself. Report anything unexpected to the KPC technology team.'},
  {id:'m4',from:'Membership',email:'membership@kamloopspickleballclub.ca',subject:'Question about the volunteer orientation',time:'Thursday',unread:false,body:'Hi Smash,\n\nA new volunteer asked where to find the orientation material. Could you send the Learn page link?\n\nMembership Team'}
 ],
 sent:[{id:'s1',from:'Smash',email:'smash@kamloopspickleballclub.ca',to:'communications@kamloopspickleballclub.ca',subject:'Welcome to KPC Outlook Practice',time:'Monday',unread:false,body:'This is a sample sent message used only inside the practice simulator.'}],
 drafts:[],deleted:[]
};
let data=JSON.parse(sessionStorage.getItem('kpcOutlookPractice')||'null')||structuredClone(seed);
let folder='inbox',selected=null,query='';
const tasks=[
 {title:'Practice task 1 of 5',text:'Open the message from Scheduling.'},
 {title:'Practice task 2 of 5',text:'Reply to Scheduling and type: Received, thank you.'},
 {title:'Practice task 3 of 5',text:'Create a new message to communications@kamloopspickleballclub.ca.'},
 {title:'Practice task 4 of 5',text:'Find the message about an unexpected sign-in using Search.'},
 {title:'Practice task 5 of 5',text:'Open Sent Items and review a sent message.'}
];
let taskIndex=0;
const $=s=>document.querySelector(s);
function save(){sessionStorage.setItem('kpcOutlookPractice',JSON.stringify(data));updateCounts()}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function current(){return data[folder]||[]}
function updateCounts(){$('#inboxCount').textContent=data.inbox.length;$('#draftCount').textContent=data.drafts.length;$('#sentCount').textContent=data.sent.length}
function renderList(){
 $('#folderHeading').textContent=folder==='sent'?'Sent Items':folder[0].toUpperCase()+folder.slice(1);
 const list=current().filter(m=>`${m.from} ${m.email} ${m.subject} ${m.body}`.toLowerCase().includes(query.toLowerCase()));
 $('#messageList').innerHTML=list.length?list.map(m=>`<button class="message-card ${m.unread?'unread':''} ${selected===m.id?'active':''}" data-id="${m.id}"><span class="message-meta"><span class="message-from">${esc(folder==='sent'?'To: '+(m.to||''):m.from)}</span><span class="message-time">${esc(m.time)}</span></span><span class="message-subject">${esc(m.subject||'(no subject)')}</span><span class="message-preview">${esc(m.body)}</span></button>`).join(''):'<div class="empty-reading"><p>No messages here.</p></div>';
 document.querySelectorAll('.message-card').forEach(b=>b.onclick=()=>openMessage(b.dataset.id));
}
function openMessage(id){const m=current().find(x=>x.id===id);if(!m)return;selected=id;m.unread=false;save();renderList();$('#readingPane').innerHTML=`<div class="mail-header"><h2>${esc(m.subject)}</h2><div class="mail-address"><strong>${esc(folder==='sent'?'To: '+m.to:m.from)}</strong><br>${esc(folder==='sent'?'From: smash@kamloopspickleballclub.ca':m.email)}</div></div><div class="mail-actions">${folder!=='sent'?'<button data-action="reply">Reply</button><button data-action="replyall">Reply all</button>':''}<button data-action="forward">Forward</button><button data-action="delete">Delete</button></div><div class="mail-body">${esc(m.body).replace(/\n/g,'<br>')}</div>`;document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>handleAction(b.dataset.action,m))}
function handleAction(action,m){if(action==='delete'){data[folder]=current().filter(x=>x.id!==m.id);data.deleted.unshift(m);selected=null;save();renderList();showEmpty();return}compose({to:action==='forward'?'':m.email,subject:`${action==='forward'?'Fwd':'Re'}: ${m.subject}`,body:action==='forward'?`\n\n---------- Forwarded message ----------\nFrom: ${m.from}\n${m.body}`:'',replyTo:m.id})}
function compose(pref={}){$('#readingPane').innerHTML=`<form class="compose" id="composeForm"><h2>${pref.subject?'Reply or forward':'New message'}</h2><input name="to" aria-label="To" placeholder="To" value="${esc(pref.to||'')}"><input name="subject" aria-label="Subject" placeholder="Add a subject" value="${esc(pref.subject||'')}"><textarea name="body" aria-label="Message body" placeholder="Type your message">${esc(pref.body||'')}</textarea><div class="compose-actions"><button class="send-btn" type="submit">Send</button><button class="secondary-btn" type="button" id="saveDraft">Save draft</button><button class="secondary-btn" type="button" id="discardDraft">Discard</button></div></form>`;const f=$('#composeForm');f.onsubmit=e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f));data.sent.unshift({id:'s'+Date.now(),from:'Smash',email:'smash@kamloopspickleballclub.ca',to:v.to,subject:v.subject||'(no subject)',body:v.body,time:'Just now',unread:false});save();folder='sent';setFolderButtons();renderList();$('#readingPane').innerHTML='<div class="success-note"><strong>Practice message sent.</strong> Nothing left this simulator.</div><div class="empty-reading"><p>Select the message in Sent Items to review it.</p></div>'};$('#saveDraft').onclick=()=>{const v=Object.fromEntries(new FormData(f));data.drafts.unshift({id:'d'+Date.now(),from:'Smash',email:'smash@kamloopspickleballclub.ca',to:v.to,subject:v.subject||'(no subject)',body:v.body,time:'Just now',unread:false});save();folder='drafts';setFolderButtons();renderList();showEmpty()};$('#discardDraft').onclick=showEmpty}
function showEmpty(){$('#readingPane').innerHTML='<div class="empty-reading"><span aria-hidden="true">✉</span><h2>Select a message to read</h2><p>Choose a message from the list.</p></div>'}
function setFolderButtons(){document.querySelectorAll('.folder').forEach(b=>b.classList.toggle('active',b.dataset.folder===folder))}
function showCalendar(){$('#readingPane').innerHTML='<div class="calendar-view"><h2>Calendar practice</h2><p>This calendar is simulated. Select Mail to return to the inbox.</p><div class="calendar-grid">'+['Monday','Tuesday','Wednesday','Thursday','Friday'].map((d,i)=>`<div class="calendar-day"><strong>${d}</strong>${i===2?'<div class="calendar-event">10:00 AM<br>KPC Committee Meeting</div>':''}</div>`).join('')+'</div></div>'}
$('#newMail').onclick=()=>compose();
document.querySelectorAll('.folder').forEach(b=>b.onclick=()=>{folder=b.dataset.folder;selected=null;setFolderButtons();renderList();showEmpty()});
$('#searchMail').oninput=e=>{query=e.target.value;renderList()};
$('#markRead').onclick=()=>{current().forEach(m=>m.unread=false);save();renderList()};
document.querySelectorAll('.rail-button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.rail-button').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.area==='calendar')showCalendar();else showEmpty()});
$('#nextTask').onclick=()=>{taskIndex=(taskIndex+1)%tasks.length;$('#taskTitle').textContent=tasks[taskIndex].title;$('#taskText').textContent=tasks[taskIndex].text};
$('#resetPractice').onclick=()=>{data=structuredClone(seed);sessionStorage.removeItem('kpcOutlookPractice');folder='inbox';selected=null;query='';$('#searchMail').value='';setFolderButtons();save();renderList();showEmpty()};
updateCounts();renderList();
})();