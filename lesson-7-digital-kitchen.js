(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const lessonId = new URLSearchParams(location.search).get('lesson');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const list = items => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const ordered = items => `<ol class="simple-steps">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;

  const questions = [
    {q:'What is phishing?',a:['A message that always comes from Microsoft','An attempt to impersonate someone you trust so you click, open, pay or share information','A normal request from a KPC volunteer'],correct:1},
    {q:'What should urgency make you do?',a:['Act immediately','Slow down and verify the request','Forward the message to everyone'],correct:1},
    {q:'What should you check besides the sender name?',a:['The full email address','Only the logo','Only the subject line'],correct:0},
    {q:'How should you verify a request for money or private information?',a:['Use the phone number in the suspicious message','Use a trusted phone number, a new Teams message or a saved contact','Reply and ask whether it is real'],correct:1},
    {q:'What should you do with an unexpected Microsoft Authenticator request?',a:['Approve it to remove the notification','Select Deny','Ignore every future request'],correct:1},
    {q:'Which item should never be sent through ordinary email?',a:['A public event announcement','A meeting agenda','A password or authentication code'],correct:2},
    {q:'How do you report a suspicious message in Outlook?',a:['Select Report, then Report phishing','Move it to Drafts','Reply to the sender'],correct:0},
    {q:'What should you do after clicking a suspicious link or entering a password?',a:['Hide the mistake','Report it immediately','Wait to see whether anything happens'],correct:1}
  ];

  function checkMarkup() {
    return `<div class="simple-check" data-security-check>${questions.map((question,index)=>`<fieldset><legend>${esc(question.q)}</legend>${question.a.map((answer,answerIndex)=>`<label><input type="radio" name="security-${index}" value="${answerIndex}"> ${esc(answer)}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-security-check-button>Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function addOverviewCard() {
    const grid = document.querySelector('.simple-lesson-grid');
    if (!grid || grid.querySelector('[data-lesson-seven]')) return;
    const card = document.createElement('article');
    card.className = 'simple-lesson-card';
    card.dataset.lessonSeven = 'true';
    card.innerHTML = '<p class="eyebrow">Lesson 7</p><h2>Defend Your Digital Kitchen</h2><p>Recognize suspicious messages, verify unusual requests and protect KPC information.</p><a class="button" href="learn.html?lesson=defend-your-digital-kitchen">Open Lesson</a>';
    grid.appendChild(card);
  }

  function renderLesson() {
    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 7 · Digital Safety</p><h1>Defend Your Digital Kitchen</h1><p>Recognize suspicious messages, verify unusual requests and keep scammers away from KPC information.</p><div class="simple-meta"><span>About 7 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>

      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can recognize a suspicious message and respond safely.</h2><p>Messages, links and requests come toward us all day. Some are safe, some are mistakes, and some are designed to get past our defences.</p><p>Passwords, personal information, money, devices and KPC information all belong inside our digital kitchen. The goal is to hold the line, watch carefully and avoid swinging at every message.</p></section>

      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Defend Your Digital Kitchen</h2><p>Erne, KPC’s Digital Safety Coach, explains how to recognize phishing, verify unusual requests, protect personal information and report suspicious messages.</p><div class="simple-placeholder"><strong>Video coming soon</strong><p>The completed Erne digital-safety video will appear here.</p></div></section>

      <section class="simple-block"><p class="eyebrow">What phishing is</p><h2>Someone may pretend to be a person or organization you trust.</h2><p>A phishing message may ask you to click a link, open a file, send money or provide personal information. It may appear to come from Microsoft, a bank, a supplier, a KPC volunteer or a Board member.</p><p>The name, logo and writing may all look convincing. That does not mean the message is safe.</p></section>

      <section class="simple-block"><p class="eyebrow">Warning signs</p><h2>Pressure is a reason to slow down.</h2>${list(['Act now','Your account will be closed','Keep this secret','Buy gift cards and send the codes'])}<p>Scammers want you to react before you have time to check where the request came from. Urgency does not prove that a request is legitimate.</p><h2>Check the full sender address</h2><p>Do not look only at the displayed name. Open the sender details and inspect the complete email address. A familiar name can be attached to an unrelated address.</p></section>

      <section class="simple-block"><p class="eyebrow">Verify another way</p><h2>Use a trusted method that did not come from the suspicious message.</h2>${list(['Call the person using a number you already know.','Start a new Teams message.','Send a new email using the address saved in your contacts.','Do not use the phone number, reply button or link in the suspicious message.'])}<p>Requests involving money, passwords, banking details or personal information deserve a second check.</p></section>

      <section class="simple-block"><p class="eyebrow">Common scams</p><h2>Gift-card requests</h2><p>If someone claiming to be a KPC leader asks you to buy gift cards and send the codes, stop. Do not reply, buy the cards or send the codes.</p><h2>Unexpected sign-in approvals</h2><p>If Microsoft Authenticator asks you to approve a sign-in and you are not signing in, select <strong>Deny</strong>. Never approve a request simply to make the notification disappear.</p><h2>Banking changes</h2><p>If a supplier emails new payment instructions, call the supplier using a trusted number before moving any money.</p></section>

      <section class="simple-block"><p class="eyebrow">Keep these out of ordinary email</p><h2>Never send sensitive identity or sign-in information through ordinary email.</h2>${list(['Passwords','Temporary passwords','Authenticator codes','Sign-in approval numbers','Social Insurance Numbers','Passport or driver’s licence scans','Birth certificates','Credit-card numbers','Banking passwords','Private medical or financial information'])}<p>If the information could help someone impersonate you, access an account or spend money, keep it out of email.</p></section>

      <section class="simple-block"><p class="eyebrow">Personal information</p><h2>Do not forward or create extra copies.</h2><p>If someone emails a passport scan, Social Insurance Number or similar document, do not forward it and do not save unnecessary copies. Ask the appropriate KPC leader how it should be handled.</p></section>

      <section class="simple-block"><p class="eyebrow">Links and attachments</p><h2>Use your normal sign-in route.</h2><p>If a message asks you to click a link and enter your Microsoft 365 password, do not use the link. Open Microsoft 365 through the normal KPC sign-in page and look for the file there.</p><p>If the file is legitimate, it should be available through the normal service. If it is not there, stop and verify the request.</p></section>

      <section class="simple-block"><p class="eyebrow">Report phishing</p><h2>Do not click, open or reply.</h2>${ordered(['In Outlook, select Report.','Select Report phishing.','If the message involves KPC, tell the appropriate KPC leader what happened.','Delete the suspicious message after it has been reported.'])}<p>Reporting the message sends it for review and removes it from your inbox.</p></section>

      <section class="simple-block"><p class="eyebrow">If you made a mistake</p><h2>Report it immediately.</h2><p>If you clicked a suspicious link, entered a password or approved a sign-in, report it right away. Do not hide it or wait to see what happens.</p><p>Quick reporting helps protect your account and the rest of the club.</p></section>

      <section class="simple-block"><p class="eyebrow">Everyday safety habits</p><h2>Use these habits every day</h2>${list(['Use a different password for every account.','Use multifactor authentication.','Never share your KPC password.','Keep KPC work in your KPC account.','Lock your computer when you step away.','Install updates when prompted.','Remove access when a volunteer no longer needs it.'])}</section>

      <section class="simple-block"><p class="eyebrow">Three questions</p><h2>Pause before responding</h2>${list(['Was I expecting this?','Can I verify it another way?','Is this safe to send?'])}<p><strong>Not every ball deserves a swing.</strong></p></section>

      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup()}</section>

      <section class="simple-block simple-help"><h2>What to do if something looks suspicious</h2><details><summary>I received an urgent request from a familiar name</summary>${list(['Open the sender details and check the full address.','Do not reply from the suspicious message.','Verify the request through a trusted phone number, Teams chat or saved contact.'])}</details><details><summary>I received an unexpected sign-in approval</summary>${list(['Select Deny.','Change your password if you suspect it may be known by someone else.','Tell the KPC Technology Team or appropriate KPC leader.'])}</details><details><summary>I clicked a suspicious link</summary>${list(['Stop interacting with the page.','Report the incident immediately.','Change any password you entered.','Follow instructions from the KPC Technology Team.'])}</details><details><summary>I received sensitive personal information</summary>${list(['Do not forward it.','Do not create unnecessary copies.','Ask the appropriate KPC leader how it should be handled.'])}</details><p><strong>Never send passwords, authentication codes, identity documents or banking passwords through ordinary email.</strong></p></section>
    </div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-security-check-button]');
    if (!button) return;
    const wrapper = button.closest('[data-security-check]');
    let correct = 0;
    questions.forEach((question,index) => {
      const selected = wrapper.querySelector(`input[name="security-${index}"]:checked`);
      if (selected && Number(selected.value) === question.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    result.innerHTML = correct === questions.length
      ? '<strong>You are ready to defend your digital kitchen.</strong><p>You can slow down, verify suspicious requests and report problems quickly.</p>'
      : `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
  });

  if (lessonId === 'defend-your-digital-kitchen') renderLesson();
  else if (!lessonId) addOverviewCard();
})();