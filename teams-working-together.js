(() => {
  const lessonId = 'teams-at-kpc';
  const data = window.KPCLearning;
  const lesson = data?.lessons?.find(item => item.id === lessonId);
  if (!lesson) return;

  Object.assign(lesson, {
    title: 'Teams: Working Together',
    description: 'Learn how KPC volunteers use Teams to communicate, share files and work together without creating long email chains or multiple copies of documents.',
    outcome: 'I can participate in a Team conversation, find shared files and work with other volunteers in one organized place.',
    whyItMatters: 'Teams gives each KPC board, committee or project a shared workspace for its conversations, documents, meetings and ongoing work.',
    estimatedMinutes: 5,
    status: 'written guide available',
    contentStatus: ['video coming soon', 'written guide available'],
    builtOut: true,
    kpcVideo: { url: '', status: 'coming-soon', title: 'Working together in Microsoft Teams' },
    beforeYouStart: ['Your KPC Microsoft 365 account','Access to Microsoft Teams','Membership in at least one KPC Team','A computer, tablet or smartphone with internet access'],
    knowledgeCheck: [
      { q: 'Where should a committee discussion normally take place when the information may be useful to the whole group?', a: ['In the appropriate Team channel', 'In one volunteer’s private chat', 'In a personal email account'], correct: 0 },
      { q: 'What should you select when responding to an existing post?', a: ['New conversation', 'Reply', 'New Team'], correct: 1 },
      { q: 'Why should volunteers edit the shared file instead of downloading separate copies?', a: ['So everyone works from the same current version', 'Because downloaded files cannot be edited', 'Because only administrators may save files'], correct: 0 },
      { q: 'When should you use an @mention?', a: ['In every message', 'When a specific person’s attention or action is needed', 'Only when sending a private message'], correct: 1 },
      { q: 'Where should you place feedback about one particular sentence in a document?', a: ['In a comment beside that part of the document', 'In an unrelated Team channel', 'In a new copy saved on your computer'], correct: 0 },
      { q: 'Which area shows replies, mentions and updates involving you?', a: ['Activity', 'Files', 'Calendar'], correct: 0 }
    ]
  });

  const steps = [
    ['Sign in to Microsoft 365 with your KPC email address and open Teams.'],
    ['Select Teams from the left side of the screen.'],
    ['Open the Team for your board, committee or project.', 'A Team is the complete shared workspace for that group.'],
    ['Open the General channel.', 'The General channel normally contains information that applies to everyone in the Team.'],
    ['Review the other channels.', 'Channels divide the Team’s work into organized subjects, activities or projects.'],
    ['Select Posts to view the channel’s conversations and announcements.', 'Posts are visible to everyone who has access to that channel.'],
    ['To respond to an existing conversation, select Reply beneath the original message.', 'Do not begin a separate post when your comment belongs to an existing discussion.'],
    ['Start a new post when you are introducing a different subject.', 'Give the post a clear opening sentence so other volunteers can quickly understand its purpose.'],
    ['Use an @mention when a particular person needs to see or respond to your message.', '@Erne, could you review the revised training guide?', 'Use mentions only when someone’s attention or action is required.'],
    ['Select Files to see documents shared with the Team or channel.'],
    ['Open a shared file directly from Teams.', 'Depending on your access, you may be able to read it, edit it or review it with other volunteers.'],
    ['Edit the shared document instead of downloading a separate copy.', 'This allows everyone to work from the same current version.'],
    ['Use comments inside Word, Excel or PowerPoint when your feedback relates to a specific part of a document.', 'Use the channel conversation when the discussion applies to the broader project or decision.'],
    ['Check Activity for replies, mentions and other updates that may require your attention.'],
    ['Use the search box at the top of Teams to find messages, people, files or subjects.']
  ];

  const workspace = [
    ['Team', 'The complete shared workspace for a KPC committee, board or project.'],
    ['Channel', 'An organized area within a Team for a particular subject or type of work.'],
    ['Posts', 'Shared conversations and announcements for the people in a channel.'],
    ['Files', 'Documents available to the Team. These are stored in the Team’s connected SharePoint site.'],
    ['Activity', 'A list of recent updates, including replies and mentions involving you.'],
    ['Chat', 'A separate conversation with one person or a small group. Chat can be useful for a quick question, but information needed by the whole committee should be placed in the appropriate Team channel.']
  ];

  const choices = [
    ['Use a channel post when:', ['The information is relevant to the Team', 'Other volunteers may need the answer', 'The discussion should remain available for future reference', 'A decision or project update needs to be recorded']],
    ['Use chat when:', ['You have a quick private question', 'The subject does not need to become part of the Team’s record', 'You are coordinating a brief detail with one person']],
    ['Use a file comment when:', ['Your feedback concerns a specific word, sentence, number, slide or section', 'The document owner needs to see exactly where a change is suggested']]
  ];

  const trouble = [
    ['I cannot find my Team', 'Confirm that you signed in with your KPC account rather than a personal Microsoft account. Contact the KPC Technology Team if the Team still does not appear.'],
    ['I cannot reply to or create a post', 'You may not have access to that Team or channel, or the channel may have restricted posting. Contact the Team owner.'],
    ['I cannot edit a file', 'The file may be read-only, checked out or restricted to certain users. Contact the file owner or KPC Technology Team.'],
    ['I am unsure where to post something', 'Use the channel most closely connected to the subject. When uncertain, ask in the Team’s General channel before creating another channel or folder.'],
    ['I accidentally created a separate copy', 'Do not continue editing both documents. Confirm which file is the shared Team version and move any required changes into that file.']
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function enhance() {
    if (!location.hash.includes(`lesson/${lessonId}`)) return;
    const page = document.querySelector('.lesson-page');
    if (!page || page.dataset.teamsComplete === 'true') return;
    page.dataset.teamsComplete = 'true';

    const header = page.querySelector('.lesson-header-copy');
    if (header) {
      header.querySelector('.eyebrow').textContent = 'Your shared KPC workspace';
      header.querySelector('h1').textContent = lesson.title;
    }

    const understand = page.querySelector('.understand');
    if (understand) understand.innerHTML = `<p class="block-label">After this lesson</p><h2>${esc(lesson.outcome)}</h2><p>${esc(lesson.whyItMatters)}</p>`;

    const sources = page.querySelector('.two-source-grid');
    if (sources) sources.innerHTML = `<div class="lesson-block kpc-source teams-video-placeholder"><p class="block-label">See how KPC uses it</p><h2>Working together in Microsoft Teams</h2><p class="video-tip"><strong>Make the video easier to watch</strong><br>Select Watch full screen, or use the four-corner symbol in the video controls.</p><div class="video-coming-soon"><strong>Video coming soon</strong><p>The KPC demonstration will appear here when it is ready.</p></div></div><details class="lesson-block microsoft-source optional-help"><summary>Optional: official Microsoft help</summary><p>This section can link to Microsoft’s general Teams training.</p><p>KPC’s lesson explains how our club uses Teams. Microsoft’s training provides additional information about the application itself.</p></details>`;

    const practise = page.querySelector('.practise');
    if (practise) practise.innerHTML = `<p class="block-label">Practise</p><h2>Follow the written steps</h2><section class="before-begin"><p class="block-label">Before you begin</p><h3>Have these ready</h3><ul>${lesson.beforeYouStart.map(item => `<li>${esc(item)}</li>`).join('')}</ul></section><aside class="kpc-rule"><strong>KPC working rule:</strong> Work that belongs to a committee, board or project should remain in its Team so current and future volunteers can find it.</aside><ol class="detailed-steps">${steps.map(parts => `<li><div>${parts.map((part, index) => index === 0 ? `<strong>${esc(part)}</strong>` : `<p>${esc(part)}</p>`).join('')}</div></li>`).join('')}</ol>`;

    const check = page.querySelector('.check');
    if (check) check.insertAdjacentHTML('beforebegin', `<section class="lesson-block"><p class="block-label">Understand the workspace</p><h2>What the main areas are for</h2><dl class="workspace-definitions">${workspace.map(([term, text]) => `<div><dt>${esc(term)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl></section><section class="lesson-block kpc-example"><p class="block-label">KPC example</p><h2>Planning a Kitchen Talk</h2><p>The Communications Committee is preparing a new Kitchen Talk.</p><p>Instead of emailing several copies of the draft:</p><ul><li>The draft is saved in the Communications Team.</li><li>The working conversation is posted in the appropriate channel.</li><li>Volunteers reply beneath the original post.</li><li>Anyone who needs to take action is mentioned.</li><li>Committee members edit or comment on the same shared document.</li><li>The final version remains available to the Team.</li></ul><p><strong>This keeps the discussion, document and decisions together.</strong></p></section><section class="lesson-block"><p class="block-label">Choose the right place</p><div class="choice-grid">${choices.map(([title, items]) => `<div><h3>${esc(title)}</h3><ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>`).join('')}</div></section>`);

    if (check) {
      const result = check.querySelector('.check-result');
      if (result) result.dataset.teamsResult = 'true';
    }

    const help = page.querySelector('.help-block');
    if (help) help.innerHTML = `<details open><summary>Having trouble? Open help options</summary><div class="trouble-list">${trouble.map(([title, text]) => `<div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`).join('')}</div></details>`;
  }

  document.addEventListener('kpc:learn-rendered', enhance);
  window.addEventListener('load', enhance);

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-check-answers]') || !location.hash.includes(`lesson/${lessonId}`)) return;
    queueMicrotask(() => {
      const result = document.querySelector('.check-result[data-teams-result]');
      if (!result) return;
      if (result.textContent.includes('All choices match')) {
        result.innerHTML = '<strong>You are ready to work with your KPC Team.</strong><p>You can join a conversation, find shared files and help your group work from one organized workspace.</p>';
      } else {
        result.innerHTML += '<p>Review the written steps and try again. Focus on when to use a channel post, chat, file comment and shared document.</p>';
      }
    });
  });

  setTimeout(enhance, 0);
})();