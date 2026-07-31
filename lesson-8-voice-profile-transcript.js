(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const lessonId = new URLSearchParams(location.search).get('lesson');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const list = items => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const ordered = items => `<ol class="simple-steps">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;

  const questions = [
    {q:'Where do you create a voice profile in Teams?',a:['Settings, then Recognition','Outlook Calendar','Microsoft Authenticator'],correct:0},
    {q:'Why can a voice profile be useful when several people share room audio?',a:['It can help Teams identify enrolled speakers by name','It automatically records every meeting','It removes the need to invite people'],correct:0},
    {q:'What should you do while creating the voice profile?',a:['Whisper as quietly as possible','Read the displayed passage aloud in a quiet room','Play a recording of someone else'],correct:1},
    {q:'Where should you schedule a meeting that does not belong to a specific Team or channel?',a:['Outlook Calendar','Microsoft Authenticator','Teams Settings'],correct:0},
    {q:'How do you start transcription during a Teams meeting?',a:['More, then Record and transcribe, then Start transcription','Chat, then New conversation','People, then Manage attendees'],correct:0},
    {q:'Why should you confirm the spoken language?',a:['To help improve transcription accuracy','To change the meeting organizer','To turn on the camera'],correct:0},
    {q:'Where can you find the transcript after the meeting?',a:['In the meeting recap or meeting chat','Only in the Windows Recycle Bin','Only in the original invitation email'],correct:0},
    {q:'What should you remember about automatic transcripts?',a:['They are always perfect','They can contain mistakes and should be reviewed','They should be emailed to everyone automatically'],correct:1}
  ];

  function checkMarkup() {
    return `<div class="simple-check" data-transcript-check>${questions.map((question,index)=>`<fieldset><legend>${esc(question.q)}</legend>${question.a.map((answer,answerIndex)=>`<label><input type="radio" name="transcript-${index}" value="${answerIndex}"> ${esc(answer)}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-transcript-check-button>Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function addOverviewCard() {
    const grid = document.querySelector('.simple-lesson-grid');
    if (!grid || grid.querySelector('[data-lesson-eight]')) return;
    const card = document.createElement('article');
    card.className = 'simple-lesson-card';
    card.dataset.lessonEight = 'true';
    card.innerHTML = '<p class="eyebrow">Lesson 8</p><h2>Let Teams Remember Who Said What</h2><p>Create a voice profile, start transcription and review the meeting record afterward.</p><a class="button" href="learn.html?lesson=voice-profile-and-transcript">Open Lesson</a>';
    grid.appendChild(card);
  }

  function renderLesson() {
    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 8 · Meetings in Teams</p><h1>Let Teams Remember Who Said What</h1><p>Create a Teams voice profile, schedule a meeting, start transcription and review the transcript afterward.</p><div class="simple-meta"><span>About 6 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>

      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can create a voice profile, schedule a Teams meeting, start transcription and review the transcript afterward.</h2><p>Teams can create a written record of a meeting and show speaker names with timestamps. A voice profile can also help Teams recognize enrolled speakers when several people are physically together and share the room audio.</p></section>

      <section class="simple-block"><p class="eyebrow">Why create a voice profile?</p><h2>It helps Teams recognize your voice in supported shared-room situations.</h2><p>When you join from your own computer and use your own microphone, Teams normally knows who is speaking from the signed-in account.</p><p>When several people sit together and share one room microphone, they can use <strong>Room audio</strong> when joining. If speaker recognition is available and each person has created a voice profile, Teams may identify enrolled speakers by name in the transcript and meeting recap instead of attributing everything to the room.</p><p><strong>The video follows the normal Teams meeting workflow.</strong> Room audio is an additional option for meetings where several KPC volunteers are together in one room.</p></section>

      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Let Teams Remember Who Said What</h2><p>Smash creates a Teams voice profile, schedules a meeting in Outlook, starts transcription and finds the completed transcript in the meeting recap.</p><div class="simple-placeholder"><strong>Video coming soon</strong><p>The completed Smash training video will appear here.</p></div></section>

      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2>${list(['The Teams desktop app','Your KPC Microsoft 365 account','A working microphone','A quiet place to record your voice profile','The meeting title, attendees, date and time','A short meeting agenda'])}<p>The Recognition option may depend on the Teams features enabled for your account.</p></section>

      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Create your voice profile</h2>${ordered(['Open the Teams desktop app.','Select the three dots near the top of Teams.','Select Settings.','In Settings, select Recognition.','Under Voice, select Create voice profile.','Choose the correct microphone.','Select Start voice capture.','Read the displayed passage aloud in a normal voice.','When the reading is complete, select End voice capture.','When Teams confirms that voice recognition is ready, select Close.'])}<p><strong>Tip:</strong> Speak normally and record in a quiet room so Teams can learn your voice clearly.</p>

      <h2>Schedule the meeting in Outlook</h2>${ordered(['Open Outlook Calendar.','Select New event.','Enter a clear meeting title.','Add the invited people.','Choose the date and time.','Make sure Teams meeting is turned on.','Add a short agenda or description.','Review the details and select Send.'])}<p>Use Outlook for a meeting that does not need to belong to a particular Team or channel.</p>

      <h2>Join the meeting</h2>${ordered(['At the meeting time, open the calendar event.','Select Join.','Choose the correct microphone, speaker and camera settings.','Join the meeting.'])}

      <h2>Start transcription</h2>${ordered(['Inside the meeting, select More.','Select Record and transcribe.','Select Start transcription.','Confirm the spoken language. For KPC, choose English (Canada).'])}<p>Everyone in the meeting is notified when transcription begins.</p>

      <h2>Watch the live transcript</h2>${list(['The transcript appears during the meeting.','Speaker names and timestamps are shown when Teams can identify the speaker.','Automatic transcription can make mistakes.','Review important names, decisions and details after the meeting.'])}

      <h2>Find the meeting recap</h2>${ordered(['After the meeting, open the meeting chat.','Select View recap.','Select Transcript.','Review the conversation, speaker names and timestamps.','Download the transcript only when there is a legitimate reason to keep a separate copy.'])}</section>

      <section class="simple-block"><p class="eyebrow">Room audio</p><h2>When several volunteers are together in one room</h2><p>Room audio is useful when several people are physically together and want to share the room’s microphone and speakers instead of having every nearby laptop use its own audio.</p>${ordered(['Invite each participant to the Teams meeting.','Each person who wants to be recognized should create a voice profile beforehand.','When joining from the room, choose Room audio when that option is available.','Keep nearby laptop microphones and speakers muted to reduce echo.','Start transcription in the normal way.','Review the transcript afterward to make sure the speaker names are correct.'])}<p>Speaker recognition depends on the available meeting setup and the Teams features enabled for KPC.</p></section>

      <section class="simple-block"><p class="eyebrow">Privacy and accuracy</p><h2>A transcript is a written meeting record.</h2>${list(['Tell participants when transcription is being used.','Do not assume the transcript is word-for-word perfect.','Review important decisions and action items.','Protect transcripts that contain confidential or personal information.','Do not download or share a transcript unless there is a valid KPC reason.','Correct the official meeting notes when the transcript is inaccurate.'])}</section>

      <section class="simple-block"><p class="eyebrow">The complete rally</p><h2>Four parts to remember</h2><dl class="simple-definitions"><div><dt>Create</dt><dd>Create your Teams voice profile.</dd></div><div><dt>Schedule</dt><dd>Schedule the Teams meeting in Outlook.</dd></div><div><dt>Transcribe</dt><dd>Start transcription during the meeting.</dd></div><div><dt>Review</dt><dd>Open the recap and check the transcript afterward.</dd></div></dl></section>

      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup()}</section>

      <section class="simple-block simple-help"><h2>Having trouble?</h2><details><summary>I cannot find Recognition</summary>${list(['Make sure you are using the Teams desktop app.','Check that Teams is up to date.','Ask the KPC Technology Team whether voice profiles are enabled for your account.'])}</details><details><summary>Teams is using the wrong microphone</summary>${list(['Cancel the voice capture.','Choose the correct microphone from the list.','Check your Teams device settings and Windows microphone permissions.','Try the voice capture again in a quiet room.'])}</details><details><summary>I cannot start transcription</summary>${list(['Confirm that you are in the Teams meeting.','Select More, then Record and transcribe.','Ask the meeting organizer whether transcription is allowed.','Check with the KPC Technology Team if the option is unavailable.'])}</details><details><summary>The transcript has the wrong speaker</summary>${list(['Remember that automatic recognition is not perfect.','Confirm that each person was signed in and had completed a voice profile.','Check whether Room audio or supported shared-room audio was used.','Correct important information in the official meeting notes.'])}</details><details><summary>I cannot find the transcript afterward</summary>${list(['Open the meeting chat.','Look for View recap or the Recap tab.','Select Transcript.','Ask the meeting organizer whether transcription was started and saved.'])}</details></section>
    </div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-transcript-check-button]');
    if (!button) return;
    const wrapper = button.closest('[data-transcript-check]');
    let correct = 0;
    questions.forEach((question,index) => {
      const selected = wrapper.querySelector(`input[name="transcript-${index}"]:checked`);
      if (selected && Number(selected.value) === question.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    result.innerHTML = correct === questions.length
      ? '<strong>You are ready to use voice recognition and meeting transcription.</strong><p>You can create the profile, start the transcript and review the meeting record afterward.</p>'
      : `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
  });

  if (lessonId === 'voice-profile-and-transcript') renderLesson();
  else if (!lessonId) addOverviewCard();
})();