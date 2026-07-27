(()=>{
  const supported=new Set(['open-outlook','send-reply-email']);
  function addPracticeLink(){
    const parts=location.hash.replace(/^#\/?/,'').split('/');
    if(parts[0]!=='lesson'||!supported.has(parts[1]))return;
    const practise=document.querySelector('.lesson-block.practise');
    if(!practise||practise.querySelector('[data-outlook-practice]'))return;
    const box=document.createElement('div');
    box.className='intentional-placeholder outlook-practice-callout';
    box.dataset.outlookPractice='true';
    box.innerHTML='<strong>Practise in a safe KPC Outlook simulation.</strong><p>Open a sample inbox for smash@kamloopspickleballclub.ca. Read, reply, search, create a message, save a draft and review Sent Items. Nothing is sent.</p><a class="button dark" href="outlook-practice.html">Open KPC Outlook Practice</a>';
    practise.appendChild(box);
  }
  const observer=new MutationObserver(addPracticeLink);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  window.addEventListener('hashchange',()=>setTimeout(addPracticeLink,0));
  addPracticeLink();
})();