(()=>{
  function currentLessonId(){
    const match=location.hash.match(/^#lesson\/(.+)$/);
    return match?match[1]:"";
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
    panel.innerHTML=`
      <p class="block-label">See how KPC uses it</p>
      <h2>${title}</h2>
      <div class="training-video-wrap">
        <video class="training-video" controls preload="metadata" playsinline aria-label="${title} training video">
          <source src="${video.url}" type="video/mp4">
          Your browser cannot play this video.
        </video>
        <p class="video-fallback" hidden>
          The video could not be loaded. Confirm that <code>${filename}</code> is available in the video assets folder.
        </p>
      </div>`;

    const player=panel.querySelector("video");
    const fallback=panel.querySelector(".video-fallback");
    player.addEventListener("error",()=>{
      player.hidden=true;
      fallback.hidden=false;
    },{once:true});
  }

  const observer=new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("hashchange",()=>setTimeout(enhance,0));
  enhance();
})();