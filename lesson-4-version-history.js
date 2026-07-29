(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const lessonId = new URLSearchParams(location.search).get('lesson');
  const questions = [
    {q:'Where should you upload a document that belongs to a KPC committee or working group?',a:['To your personal computer only','To the appropriate Team and channel','To several separate email messages'],correct:1},
    {q:'What is the purpose of the Shared area in a Teams channel?',a:['It stores files used by members of the channel','It contains only private files','It is used only for meeting recordings'],correct:0},
    {q:'Why should volunteers work from one shared document?',a:['So everyone can create their own copy','So everyone can work from the same current file','So earlier versions are permanently removed'],correct:1},
    {q:'What should you select when you only want to inspect an earlier version?',a:['Restore','View','Delete'],correct:1},
    {q:'What happens when you restore an earlier version?',a:['It becomes the current version of the document','All other versions are permanently deleted','It is emailed to every Team member'],correct:0},
    {q:'Which approach should KPC volunteers avoid?',a:['Keeping one document in the correct Team channel','Using version history to review earlier work','Creating files called Final, Final Revised and Final Final'],correct:2}
  ];

  function checkMarkup() {
    return `<div class="simple-check" data-version-check>${questions.map((question,index)=>`<fieldset><legend>${question.q}</legend>${question.a.map((answer,answerIndex)=>`<label><input type="radio" name="version-${index}" value="${answerIndex}"> ${answer}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-version-check-button>Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function addOverviewCard() {
    const grid = document.querySelector('.simple-lesson-grid');
    if (!grid || grid.querySelector('[data-lesson-four]')) return;
    const card = document.createElement('article');
    card.className = 'simple-lesson-card';
    card.dataset.lessonFour = 'true';
    card.innerHTML = '<p class="eyebrow">Lesson 4</p><h2>Uploading a File and Using Version History in Teams</h2><p>Upload one clearly named shared document and use version history to inspect or restore earlier work.</p><a class="button" href="learn.html?lesson=uploading-file-version-history">Open Lesson</a>';
    grid.appendChild(card);
  }

  function renderLesson() {
    const steps = [
      'Open Microsoft Teams.',
      'Under Teams and channels, open the Team where the document belongs.',
      'Select the channel that best matches the purpose of the document.',
      'At the top of the channel, select Shared. In some versions of Teams, this area may be called Files.',
      'Select Create or upload.',
      'Choose the option to upload a file from your computer.',
      'Locate and select the document you want to upload.',
      'Check that you selected the correct document.',
      'Confirm that the filename clearly describes what the document contains.',
      'Select Open.',
      'Wait for Teams to confirm that the upload is complete.',
      'Confirm that the document appears in the channel’s shared area.'
    ];

    const historySteps = [
      'Find the document in the shared file list.',
      'Select the three dots beside the document’s name.',
      'Select Version history.',
      'Review the version number, date and time, person who made the change, and file size for each saved version.',
      'Select an earlier version and choose View when you only want to inspect it.',
      'Close the earlier version when you have finished reviewing it.',
      'Choose Restore only when you want that earlier version to become the current version.'
    ];

    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 4 · Shared files in Teams</p><h1>Uploading a File and Using Version History in Teams</h1><p>Upload a document to the correct Team channel and use version history instead of creating duplicate files.</p><div class="simple-meta"><span>About 6 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>

      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can upload a file to a shared Team channel and use version history.</h2><p>This helps KPC volunteers work from one shared document instead of creating separate files called Version 1, Version 2, Final and Final Final.</p></section>

      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Uploading a File and Using Version History in Teams</h2><p>Erne demonstrates how to upload a document to the KPC Mascots Video Production channel. He then opens the document’s version history to show how an earlier version can be viewed or restored.</p><div class="simple-placeholder"><strong>Video coming soon</strong><p>The completed Erne training video will appear here.</p></div></section>

      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2><ul><li>A computer or tablet with internet access</li><li>Your KPC Microsoft 365 account</li><li>Access to the appropriate KPC Team</li><li>A document saved on your computer that you can use for practice</li><li>Permission to upload files to the selected channel</li></ul></section>

      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Upload the document</h2><ol class="simple-steps">${steps.map(step=>`<li>${step}</li>`).join('')}</ol><h2>View the document’s version history</h2><ol class="simple-steps">${historySteps.map(step=>`<li>${step}</li>`).join('')}</ol></section>

      <section class="simple-block"><p class="eyebrow">Remember</p><h2>Keep one clearly named shared document in Teams.</h2><p>Do not create separate files called:</p><ul><li>Document Version 1</li><li>Document Version 2</li><li>Document Final</li><li>Document Final Revised</li><li>Document Final Final</li><li>Document Use This One</li></ul><p><strong>Teams keeps the earlier versions for you.</strong></p></section>

      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup()}</section>

      <section class="simple-block simple-help"><h2>What to do if it does not work</h2><p>Start by confirming that you are in the correct Team and channel.</p><details><summary>Create or upload is not available</summary><p>You may not have permission to add documents. Contact the Team owner or the KPC Technology Team.</p></details><details><summary>The file does not upload</summary><ul><li>Confirm that your internet connection is working.</li><li>Check that you selected the correct file.</li><li>Confirm that the filename does not contain unusual characters.</li><li>Close and reopen Teams.</li><li>Try the upload again.</li></ul></details><details><summary>Version history does not appear</summary><ul><li>Confirm that the document is stored in the channel’s Shared area.</li><li>Select the three dots beside the document itself, not the channel menu.</li><li>Open the document in SharePoint and check its version history there.</li><li>Contact the Team owner or the KPC Technology Team.</li></ul></details><p><strong>Do not create another copy simply because you cannot find an earlier version. Ask for help before creating duplicate files.</strong></p></section>
    </div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-version-check-button]');
    if (!button) return;
    const wrapper = button.closest('[data-version-check]');
    let correct = 0;
    questions.forEach((question,index) => {
      const selected = wrapper.querySelector(`input[name="version-${index}"]:checked`);
      if (selected && Number(selected.value) === question.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    result.innerHTML = correct === questions.length
      ? '<strong>You are ready to work with one shared document.</strong><p>You can upload it to the correct channel and use version history when you need to inspect or restore earlier work.</p>'
      : `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
  });

  if (lessonId === 'uploading-file-version-history') renderLesson();
  else if (!lessonId) addOverviewCard();
})();