(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('lesson');

  const signInQuestions = [
    {q:'Which app should you install for KPC sign-in verification?',a:['Any app with Authenticator in its name','Microsoft Authenticator published by Microsoft Corporation','An authenticator app recommended by an advertisement'],correct:1},
    {q:'What should you do when Microsoft asks you to change the temporary password?',a:['Keep using the temporary password','Create a new private password that only you know','Send the temporary password to another volunteer'],correct:1},
    {q:'Why should you have both your computer or tablet and your phone ready?',a:['The instructions appear on one device while Microsoft Authenticator is set up on the phone','KPC requires two computers','The phone replaces the temporary password'],correct:0},
    {q:'You receive a sign-in approval request that you did not start. What should you do?',a:['Approve it in case it is a KPC administrator','Deny or ignore it and contact the KPC Technology Team','Approve it and change your password later'],correct:1}
  ];

  const teamsQuestions = [
    {q:'Where should a committee discussion normally take place when it may be useful to the whole group?',a:['In the appropriate Team channel','In one volunteer’s private chat','In a personal email account'],correct:0},
    {q:'What should you select when responding to an existing post?',a:['New conversation','Reply','New Team'],correct:1},
    {q:'Why should volunteers edit the shared file instead of downloading separate copies?',a:['So everyone works from the same current version','Because downloaded files cannot be edited','Because only administrators may save files'],correct:0},
    {q:'When should you use an @mention?',a:['In every message','When a specific person’s attention or action is needed','Only when sending a private message'],correct:1},
    {q:'Where should you place feedback about one particular sentence in a document?',a:['In a comment beside that part of the document','In an unrelated Team channel','In a new copy saved on your computer'],correct:0},
    {q:'Which area shows replies, mentions and updates involving you?',a:['Activity','Files','Calendar'],correct:0}
  ];

  const meetingQuestions = [
    {q:'Where should you begin when scheduling a meeting for a particular KPC committee?',a:['In the correct Team','In a personal email account','In Microsoft Authenticator'],correct:0},
    {q:'Which option should you choose from the Meet menu when the meeting needs to appear on everyone’s calendar?',a:['Meet now','Schedule a meeting','Start a chat'],correct:1},
    {q:'What details should you review before selecting Send?',a:['Title, attendees and time','Only the background colour','Only the Team name'],correct:0},
    {q:'Why is it useful to schedule the meeting from inside the Team?',a:['It keeps the meeting connected to the Team channel, files and conversations','It prevents attendees from receiving an invitation','It makes the meeting private to one person'],correct:0},
    {q:'What happens after you select Send?',a:['Invitees receive an invitation and the meeting appears on their calendars','The meeting is saved only on your computer','The Team is deleted'],correct:0}
  ];

  function checkMarkup(questions, id) {
    return `<div class="simple-check" data-check="${id}">${questions.map((q,i)=>`<fieldset><legend>${esc(q.q)}</legend>${q.a.map((answer,j)=>`<label><input type="radio" name="${id}-${i}" value="${j}"> ${esc(answer)}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-check-button="${id}">Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function renderOverview() {
    app.innerHTML = `<div class="simple-learn">
      <section class="simple-learn-hero"><p class="eyebrow">KPC Microsoft 365 Learning</p><h1>Choose a lesson.</h1><p>Only completed lessons appear here. New lessons will be added one at a time as they are finished.</p></section>
      <section class="simple-lesson-grid" aria-label="Available lessons">
        <article class="simple-lesson-card"><p class="eyebrow">Lesson 1</p><h2>Signing into Microsoft 365 for the first time</h2><p>Set up your KPC account, create your private password and complete Microsoft Authenticator.</p><a class="button" href="learn.html?lesson=first-sign-in">Open Lesson</a></article>
        <article class="simple-lesson-card"><p class="eyebrow">Lesson 2</p><h2>Teams: Working Together</h2><p>Learn how KPC volunteers use Teams to communicate, share files and work together in one organized place.</p><a class="button" href="learn.html?lesson=teams-working-together">Open Lesson</a></article>
        <article class="simple-lesson-card"><p class="eyebrow">Lesson 3</p><h2>Creating a Teams Meeting</h2><p>Schedule a committee meeting from inside the correct Team so the invitation, channel and related work stay connected.</p><a class="button" href="learn.html?lesson=creating-teams-meeting">Open Lesson</a></article>
      </section>
      <section class="simple-games"><div><p class="eyebrow">Try it out</p><h2>Play a short KPC learning game.</h2><p>Use realistic situations to test what you know.</p></div><a class="button dark" href="index.html#games">Open the games</a></section>
    </div>`;
  }

  function renderSignIn() {
    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Your first KPC sign-in</p><h1>Signing into Microsoft 365 for the first time</h1><p>Set up your KPC account, create your private password and complete Microsoft Authenticator.</p><div class="simple-meta"><span>About 6 minutes</span><span>Video available</span><span>Written guide available</span></div></header>
      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can sign in safely and complete the required security setup.</h2><p>This one guided process prepares you to use every KPC Microsoft 365 tool connected to your role.</p></section>
      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Signing into Microsoft 365 for the first time</h2><video class="simple-video" controls preload="metadata" playsinline><source src="assets/videos/first-time-signing-into-m365-web.mp4" type="video/mp4">Your browser cannot play this video.</video></section>
      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2><ul><li>A computer or tablet with internet access</li><li>Your KPC email address and temporary password</li><li>Your smartphone</li><li>Access to the Apple App Store or Google Play Store</li></ul></section>
      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Follow the written steps</h2><ol class="simple-steps"><li>Open a web browser and go to login.microsoftonline.com.</li><li>Enter the KPC email address provided to you.</li><li>Enter the temporary password provided by KPC.</li><li>Create a new private password that only you know.</li><li>Install Microsoft Authenticator from Microsoft Corporation on your phone.</li><li>Follow the on-screen instructions to connect Microsoft Authenticator.</li><li>Complete the test approval.</li><li>Approve only sign-in requests that you started yourself.</li></ol></section>
      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup(signInQuestions,'sign-in')}</section>
      <section class="simple-block simple-help"><h2>What to do if it does not work</h2><p>Start by asking another board or committee volunteer. For additional assistance, contact the KPC Technology Team. Include what you were trying to do, the device you were using and the exact message you saw.</p><p><strong>Never share your password, temporary password, multifactor authentication code or sign-in approval number.</strong></p></section>
    </div>`;
  }

  function renderTeams() {
    const steps = [
      'Sign in to Microsoft 365 with your KPC email address and open Teams.',
      'Select Teams from the left side of the screen.',
      'Open the Team for your board, committee or project.',
      'Open the General channel.',
      'Review the other channels. Channels divide the Team’s work into organized subjects, activities or projects.',
      'Select Posts to view the channel’s conversations and announcements.',
      'To respond to an existing conversation, select Reply beneath the original message.',
      'Start a new post only when you are introducing a different subject.',
      'Use an @mention when a particular person needs to see or respond to your message. For example: @Erne, could you review the revised training guide?',
      'Select Files to see documents shared with the Team or channel.',
      'Open a shared file directly from Teams.',
      'Edit the shared document instead of downloading a separate copy.',
      'Use comments inside Word, Excel or PowerPoint when your feedback relates to a specific part of a document.',
      'Check Activity for replies, mentions and other updates that may require your attention.',
      'Use the search box at the top of Teams to find messages, people, files or subjects.'
    ];
    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Your shared KPC workspace</p><h1>Teams: Working Together</h1><p>Learn how KPC volunteers use Teams to communicate, share files and work together without creating long email chains or multiple copies of documents.</p><div class="simple-meta"><span>About 5 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>
      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can participate in a Team conversation, find shared files and work with other volunteers in one organized place.</h2><p>Teams gives each KPC board, committee or project a shared workspace for its conversations, documents, meetings and ongoing work.</p></section>
      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Working together in Microsoft Teams</h2><div class="simple-placeholder"><strong>Video coming soon</strong><p>The KPC demonstration will appear here when it is ready.</p></div></section>
      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2><ul><li>Your KPC Microsoft 365 account</li><li>Access to Microsoft Teams</li><li>Membership in at least one KPC Team</li><li>A computer, tablet or smartphone with internet access</li></ul><p><strong>KPC working rule:</strong> Work that belongs to a committee, board or project should remain in its Team so current and future volunteers can find it.</p></section>
      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Follow the written steps</h2><ol class="simple-steps">${steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol></section>
      <section class="simple-block"><p class="eyebrow">Understand the workspace</p><h2>What the main areas are for</h2><dl class="simple-definitions"><div><dt>Team</dt><dd>The complete shared workspace for a KPC committee, board or project.</dd></div><div><dt>Channel</dt><dd>An organized area within a Team for a particular subject or type of work.</dd></div><div><dt>Posts</dt><dd>Shared conversations and announcements for the people in a channel.</dd></div><div><dt>Files</dt><dd>Documents available to the Team. These are stored in the Team’s connected SharePoint site.</dd></div><div><dt>Activity</dt><dd>A list of recent updates, including replies and mentions involving you.</dd></div><div><dt>Chat</dt><dd>A separate conversation with one person or a small group.</dd></div></dl></section>
      <section class="simple-block"><p class="eyebrow">Choose the right place</p><div class="simple-choice-grid"><div><h3>Use a channel post when:</h3><ul><li>The information is relevant to the Team</li><li>Other volunteers may need the answer</li><li>The discussion should remain available</li></ul></div><div><h3>Use chat when:</h3><ul><li>You have a quick private question</li><li>The subject does not need to become part of the Team record</li></ul></div><div><h3>Use a file comment when:</h3><ul><li>Your feedback concerns a specific word, number, slide or section</li><li>The document owner needs to see exactly where a change is suggested</li></ul></div></div></section>
      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup(teamsQuestions,'teams')}</section>
      <section class="simple-block simple-help"><h2>Having trouble?</h2><details><summary>I cannot find my Team</summary><p>Confirm that you signed in with your KPC account rather than a personal Microsoft account. Contact the KPC Technology Team if it still does not appear.</p></details><details><summary>I cannot reply to or create a post</summary><p>You may not have access to that Team or channel, or posting may be restricted. Contact the Team owner.</p></details><details><summary>I cannot edit a file</summary><p>The file may be read-only or restricted. Contact the file owner or KPC Technology Team.</p></details></section>
    </div>`;
  }

  function renderMeeting() {
    const steps = [
      'Open Microsoft Teams and select the correct Team. Each KPC committee has its own shared space.',
      'Select Meet in the upper-right corner and choose Schedule a meeting so the meeting is added to everyone’s calendar.',
      'Complete the meeting details. Use a meaningful title, invite the appropriate attendees and set the date and time.',
      'Confirm that the meeting is linked to the correct Team channel. Add a short description or agenda so attendees know what to expect.',
      'Review the title, attendees, date and time to make sure everything is correct.',
      'Select Send. Everyone receives an invitation and the meeting appears on their calendar.'
    ];

    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 3 · Meetings in Teams</p><h1>Creating a Teams Meeting</h1><p>Schedule a KPC committee meeting from inside the correct Team so the invitation, channel, files and conversations remain connected.</p><div class="simple-meta"><span>About 4 minutes</span><span>Video available</span><span>Written guide available</span></div></header>
      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can schedule a meeting from inside the correct KPC Team and send a complete invitation.</h2><p>Scheduling from inside the Team keeps the meeting connected to the committee’s shared workspace.</p></section>
      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Creating a Teams Meeting</h2><video class="simple-video" controls preload="metadata" playsinline><source src="assets/videos/creating-a-teams-meeting-web.mp4" type="video/mp4">Your browser cannot play this video.</video></section>
      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2><ul><li>Your KPC Microsoft 365 account</li><li>Access to the correct KPC Team</li><li>The meeting date and time</li><li>The names or email addresses of the people to invite</li><li>A short meeting purpose or agenda</li></ul></section>
      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Follow the written steps</h2><ol class="simple-steps">${steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p><strong>Quick tip:</strong> Scheduling from inside the Team makes it easier for committee members to find the related files and conversations later. Everything stays in one place.</p></section>
      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup(meetingQuestions,'meeting')}</section>
      <section class="simple-block simple-help"><h2>Having trouble?</h2><details><summary>I cannot see the Meet button</summary><p>Confirm that you opened the correct Team and channel and that you are signed in with your KPC account.</p></details><details><summary>I cannot schedule the meeting</summary><p>Your access may not allow meeting scheduling in that Team or channel. Ask the Team owner or the KPC Technology Team.</p></details><details><summary>The wrong channel is shown</summary><p>Cancel before sending, return to the correct Team and channel, and start the meeting again from there.</p></details><details><summary>I sent incorrect details</summary><p>Open the meeting from your calendar, correct the details and send the update to the attendees.</p></details></section>
    </div>`;
  }

  const questionSets = {
    'sign-in': signInQuestions,
    teams: teamsQuestions,
    meeting: meetingQuestions
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-check-button]');
    if (!button) return;
    const id = button.dataset.checkButton;
    const questions = questionSets[id] || [];
    const wrapper = button.closest('[data-check]');
    let correct = 0;
    questions.forEach((q,i)=>{
      const selected = wrapper.querySelector(`input[name="${id}-${i}"]:checked`);
      if (selected && Number(selected.value) === q.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    if (correct === questions.length) {
      const messages = {
        'sign-in': '<strong>You are ready for your first KPC sign-in.</strong><p>Your choices match the safe KPC approach.</p>',
        teams: '<strong>You are ready to work with your KPC Team.</strong><p>You can join a conversation, find shared files and help your group work from one organized workspace.</p>',
        meeting: '<strong>You are ready to schedule a KPC committee meeting.</strong><p>You can choose the correct Team, complete the meeting details and send the invitation.</p>'
      };
      result.innerHTML = messages[id];
    } else {
      result.innerHTML = `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
    }
  });

  if (lessonId === 'first-sign-in') renderSignIn();
  else if (lessonId === 'teams-working-together') renderTeams();
  else if (lessonId === 'creating-teams-meeting') renderMeeting();
  else renderOverview();
})();