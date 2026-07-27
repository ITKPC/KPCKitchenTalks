(()=>{
  function currentLessonId(){
    const match=location.hash.match(/^#lesson\/(.+)$/);
    return match?match[1]:"";
  }

  function escapeHtml(value){
    return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
  }

  async function openFullScreen(player){
    try{
      if(player.webkitEnterFullscreen){
        player.webkitEnterFullscreen();
      }else if(player.requestFullscreen){
        await player.requestFullscreen();
      }else if(player.webkitRequestFullscreen){
        await player.webkitRequestFullscreen();
      }
      player.focus();
    }catch(error){
      console.warn("Full-screen video could not be opened automatically.",error);
    }
  }

  function enhance(){
    const lessonId=currentLessonId();
    if(!lessonId)return;

    const lesson=window.KPCLearning?.lessons?.find(item=>item.id===lessonId);
    const video=lesson?.kpcVideo;
    if(!video?.url)return;

    const panel=document.querySelector(".kpc-source");
    if(!panel||panel.dataset.videoLesson===lessonId)return;

    panel.dataset.videoLesson=lessonId;
    const title=video.title||lesson.title||"KPC demonstration";
    const filename=video.url.split("/").pop();
    const safeUrl=escapeHtml(video.url);
    panel.innerHTML=`
      <p class="block-label">See how KPC uses it</p>
      <h2>${escapeHtml(title)}</h2>
      <aside class="full-screen-callout">
        <div class="full-screen-icon" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <div>
          <strong>Make the video easier to watch</strong>
          <p>Select <b>Watch full screen</b>, or use the four-corner symbol in the video controls.</p>
        </div>
        <button class="button dark full-screen-button" type="button">Watch full screen</button>
      </aside>
      <div class="training-video-wrap">
        <video class="training-video" controls preload="metadata" playsinline webkit-playsinline x-webkit-airplay="allow" aria-label="${escapeHtml(title)} training video">
          <source src="${safeUrl}" type="video/mp4">
          Your browser cannot play this video.
        </video>
        <div class="mobile-video-help">
          <strong>Video not starting on your phone?</strong>
          <a class="button outline" href="${safeUrl}" target="_blank" rel="noopener">Open video directly</a>
        </div>
        <p class="video-fallback" hidden>
          The embedded player could not load this video. <a href="${safeUrl}" target="_blank" rel="noopener">Open the video directly</a>, or confirm that <code>${escapeHtml(filename)}</code> is available in the video assets folder.
        </p>
      </div>`;

    const player=panel.querySelector("video");
    const fallback=panel.querySelector(".video-fallback");
    const fullScreenButton=panel.querySelector(".full-screen-button");

    player.load();
    fullScreenButton.addEventListener("click",()=>openFullScreen(player));
    player.addEventListener("error",()=>{
      fallback.hidden=false;
    },{once:true});
  }

  const observer=new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("hashchange",()=>setTimeout(enhance,0));
  enhance();
})();