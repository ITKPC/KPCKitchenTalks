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

const requested=location.hash.slice(1);
if(requested){
  const card=document.getElementById(requested);
  if(card){
    card.classList.add("recommended-training");
    setTimeout(()=>card.scrollIntoView({behavior:"smooth",block:"center"}),50);
  }
}