(()=>{
  const videoPath="assets/videos/creating-a-teams-meeting-web.mp4";

  function enhance(){
    if(location.hash!=="#lesson/create-teams-meeting")return;
    const panel=document.querySelector(".kpc-source");
    if(!panel||panel.dataset.videoEnhanced)return;

    panel.dataset.videoEnhanced="true";
    panel.innerHTML=`
      <p class="block-label">See how KPC uses it</p>
      <h2>Create a Teams Meeting</h2>
      <div class="training-video-wrap">
        <video class="training-video" controls preload="metadata" playsinline aria-label="Create a Teams Meeting training video">
          <source src="${videoPath}" type="video/mp4">
          Your browser cannot play this video.
        </video>
        <p class="video-fallback" hidden>
          The video could not be loaded. Confirm that <code>creating-a-teams-meeting-web.mp4</code> is inside <code>assets/videos</code>.
        </p>
      </div>`;

    const video=panel.querySelector("video");
    const fallback=panel.querySelector(".video-fallback");
    video.addEventListener("error",()=>{
      video.hidden=true;
      fallback.hidden=false;
    },{once:true});
  }

  const observer=new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("hashchange",()=>setTimeout(enhance,0));
  enhance();
})();