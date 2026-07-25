const trainingVideos={
  "microsoft-365":{title:"Microsoft 365 Overview",url:"https://support.microsoft.com/en-us/office/what-is-microsoft-365-c4001f27-e798-4ed8-93e4-656d5d64d509?wt.mc_id=otc_m365basics"},
  email:{title:"KPC Email and Outlook",url:null},
  teams:{title:"Teams and Committee Work",url:null},
  onedrive:{title:"OneDrive",url:null},
  sharepoint:{title:"SharePoint and Official Records",url:null},
  "personal-access":{title:"Personal Sign-Ins and Access",url:null},
  security:{title:"Security and Sign-In Approvals",url:null},
  sharing:{title:"Sharing Files and Links",url:null},
  meetings:{title:"Meetings in Outlook and Teams",url:null},
  "kpc-guidance":{title:"KPC-Specific Guidance",url:null}
};

const dialog=document.querySelector("#trainingVideoDialog");
const content=document.querySelector("#trainingVideoContent");

document.addEventListener("click",event=>{
  const button=event.target.closest("[data-video]");
  if(!button)return;
  const item=trainingVideos[button.dataset.video];
  if(!item)return;
  content.innerHTML=item.url
    ?`<p class="eyebrow">Training video</p><h2>${item.title}</h2><p>This reviewed video supports the KPC training topic.</p><a class="button dark" href="${item.url}" target="_blank" rel="noopener noreferrer">Open video</a>`
    :`<p class="eyebrow">Training video</p><h2>${item.title}</h2><div class="video-stub"><span class="play-stub">▶</span><p>The video for this topic will appear here after it has been selected and reviewed.</p></div>`;
  dialog.showModal();
});

document.querySelector("[data-close-training]").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});

function readRecommendedTraining(){
  try{
    const saved=JSON.parse(sessionStorage.getItem("kpcMissedTraining")||"[]");
    return Array.isArray(saved)?saved:[];
  }catch{return []}
}

function focusIcon(){
  return `<span class="focus-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="24" cy="24" r="6" fill="currentColor"/><path d="M24 3v8M24 37v8M3 24h8M37 24h8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>`;
}

const requested=location.hash.slice(1);
const recommended=[...new Set([...readRecommendedTraining(),...(requested?[requested]:[])])].filter(id=>document.getElementById(id));

if(recommended.length){
  const grid=document.querySelector(".learning-grid");
  const notice=document.createElement("div");
  notice.className="focus-notice";
  notice.innerHTML=`${focusIcon()}<div><p class="eyebrow">Your focus areas</p><h2>Start with the topics marked below.</h2><p>These match the questions that need another look.</p></div>`;
  grid.before(notice);

  recommended.forEach(id=>{
    const card=document.getElementById(id);
    if(!card)return;
    card.classList.add("recommended-training");
    const badge=document.createElement("div");
    badge.className="focus-badge";
    badge.innerHTML=`${focusIcon()}<span>Focus here</span>`;
    card.prepend(badge);
  });

  const first=document.getElementById(requested)||document.getElementById(recommended[0]);
  if(first)setTimeout(()=>first.scrollIntoView({behavior:"smooth",block:"center"}),80);
}