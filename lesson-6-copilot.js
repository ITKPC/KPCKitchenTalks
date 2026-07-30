(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const lessonId = new URLSearchParams(location.search).get('lesson');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const list = items => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const ordered = items => `<ol class="simple-steps">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;

  const questions = [
    {q:'Which version of Copilot is available with KPC Microsoft 365 Business Basic accounts?',a:['Microsoft 365 Copilot Chat','Every paid Copilot feature automatically','A Copilot that automatically reads all KPC information'],correct:0},
    {q:'What makes a prompt more useful?',a:['Leaving Copilot to guess the audience and facts','Giving it the task, context, expectations and source information','Using as few words as possible regardless of the task'],correct:1},
    {q:'What should you do when Copilot’s first result is close but not quite right?',a:['Accept it without reviewing it','Use a follow-up prompt to refine it','Delete the entire conversation immediately'],correct:1},
    {q:'Why should you tell Copilot not to invent missing details?',a:['To help protect the accuracy of the result','To prevent Copilot from using headings','To stop it from producing more than one format'],correct:0},
    {q:'What can you attach to a prompt when appropriate?',a:['An approved file, image or official logo','A password list','An authentication code'],correct:0},
    {q:'What should you check in an AI-generated image?',a:['Only whether the colours look attractive','Text, spelling, dates, branding, people and objects','Nothing, because generated images are automatically correct'],correct:1},
    {q:'Who is responsible for deciding whether Copilot content is ready to use?',a:['Copilot','The appropriate KPC volunteer or approver','No one'],correct:1},
    {q:'Which information should never be entered into Copilot for this type of work?',a:['Approved event facts','A public event description','Passwords and authentication codes'],correct:2}
  ];

  function checkMarkup() {
    return `<div class="simple-check" data-copilot-check>${questions.map((question,index)=>`<fieldset><legend>${esc(question.q)}</legend>${question.a.map((answer,answerIndex)=>`<label><input type="radio" name="copilot-${index}" value="${answerIndex}"> ${esc(answer)}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-copilot-check-button>Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function addOverviewCard() {
    const grid = document.querySelector('.simple-lesson-grid');
    if (!grid || grid.querySelector('[data-lesson-six]')) return;
    const card = document.createElement('article');
    card.className = 'simple-lesson-card';
    card.dataset.lessonSix = 'true';
    card.innerHTML = '<p class="eyebrow">Lesson 6</p><h2>How to Ask Copilot for Help</h2><p>Use a smart prompt to give Copilot the right task, facts, audience and expected result.</p><a class="button" href="learn.html?lesson=how-to-ask-copilot">Open Lesson</a>';
    grid.appendChild(card);
  }

  function renderLesson() {
    const promptSteps = [
      'Open Microsoft Teams or Microsoft 365.',
      'Select Copilot from the app bar.',
      'Find the large message area labelled Message Copilot.',
      'Decide what you want Copilot to help you accomplish before entering the prompt.'
    ];
    const submitSteps = [
      'Review the prompt before sending it.',
      'Confirm that the facts, dates, names and instructions are correct.',
      'Select the Send arrow.',
      'Wait for Copilot to generate its response.'
    ];
    const reviewSteps = [
      'Read each version Copilot creates.',
      'Check that the result matches the requested platform or format.',
      'Confirm that all facts are correct.',
      'Check whether Copilot added information that was not provided.',
      'Check that the tone is appropriate for KPC.',
      'Revise the prompt when the first answer is not quite right.'
    ];

    const examplePrompt = `KPC stands for Kamloops Pickleball Club. Our brand colours are blue #01aef0, green #8ec753 and yellow #e9df46.\n\nCreate a communication package for KPC volunteers about an upcoming Microsoft Teams training session.\n\nUse these details:\nThursday, August 20\n6:30 p.m.\nOnline\n30 minutes\nFor KPC board members and committee volunteers\nBring KPC sign-in information\nCovers finding Teams, understanding channels and locating shared files\n\nCreate:\nA short website announcement\nA Facebook post\nAn Instagram caption\nAn Instagram image concept\nAn AI image-generation prompt\n\nUse friendly, plain language for volunteers with mixed computer skills. Make each version appropriate for its platform. Do not invent details that were not provided.`;

    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 6 · Copilot Chat</p><h1>How to Ask Copilot for Help</h1><p>Use a smart prompt to give Copilot the right task, facts, audience and expected result.</p><div class="simple-meta"><span>About 5 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>

      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can ask Microsoft 365 Copilot Chat for useful help and review the result before using it.</h2><p>Copilot can help KPC volunteers draft, rewrite, organize and create content faster. The version available with KPC Microsoft 365 Business Basic accounts is Microsoft 365 Copilot Chat.</p><p>It can work with information entered into the prompt, text pasted into the conversation, appropriate files or images attached to the prompt, and public information from the web.</p><p><strong>Do not assume it knows everything stored in KPC email, Teams conversations, meetings or shared files.</strong> Copilot creates a draft. KPC volunteers remain responsible for checking facts, protecting information and deciding what is ready to use.</p></section>

      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>How to Ask Copilot for Help</h2><p>Smash uses Microsoft 365 Copilot Chat to turn one set of event details into a website announcement, Facebook post, Instagram caption, Instagram image concept and generated promotional image. She also explains how a smart prompt improves the result and why every response must be reviewed.</p><div class="simple-placeholder"><strong>Video coming soon</strong><p>The completed Smash training video will appear here.</p></div></section>

      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2>${list(['A computer or tablet with internet access','Your KPC Microsoft 365 account','Access to Microsoft 365 Copilot Chat','The approved facts you want Copilot to use','A clear idea of the audience','A description of the result you need','Any appropriate file, image or logo you may want to attach'])}<p><strong>Do not include passwords, temporary passwords, authentication codes or unnecessary personal information.</strong></p></section>

      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Open Copilot Chat</h2>${ordered(promptSteps)}
      <h2>Build a smart prompt</h2><p>A useful prompt should answer four questions:</p><dl class="simple-definitions"><div><dt>What do I need?</dt><dd>State the task or goal.</dd></div><div><dt>Who is it for?</dt><dd>Describe the audience and relevant background.</dd></div><div><dt>What should the result look like?</dt><dd>Specify the tone, length, format and required content.</dd></div><div><dt>What information should Copilot use?</dt><dd>Provide the facts, text, file or image it should rely on.</dd></div></dl>
      <p><strong>Weak prompt:</strong> Write something about Teams training.</p><p><strong>Stronger prompt:</strong> Create a communication package for KPC volunteers about an upcoming Microsoft Teams training session. Use the event details below. Create a website announcement, Facebook post and Instagram caption. Use friendly, plain language for volunteers with mixed computer skills. Do not invent information that was not provided.</p>
      <h2>Give Copilot the approved facts</h2>${list(['Explain abbreviations and organization names.','Provide approved event or project details.','Identify the intended audience.','State the tone: friendly, plain language, professional, welcoming, concise or conversational.','State the exact outputs needed, such as a website announcement, Facebook post, Instagram caption, agenda, checklist, summary or table.','Tell Copilot not to invent missing facts when accuracy matters.'])}<p><strong>Useful instruction:</strong> Use only the information provided. If something is missing, identify it instead of guessing.</p>
      <h2>Add brand information</h2><p>KPC stands for Kamloops Pickleball Club. Approved brand colours are blue <strong>#01aef0</strong>, green <strong>#8ec753</strong> and yellow <strong>#e9df46</strong>.</p><p>When appropriate, select the plus sign in the prompt area and attach the official KPC logo. Tell Copilot: <strong>Use the attached KPC logo as a visual reference.</strong> The generated result must still be checked carefully.</p>
      <h2>Submit the prompt</h2>${ordered(submitSteps)}
      <h2>Review the written results</h2>${ordered(reviewSteps)}<p>The website version may be more structured, Facebook may be more conversational, and Instagram may be shorter and include hashtags.</p><p>Useful follow-up prompts include: “Make the website version slightly more formal,” “Make the Facebook post more conversational,” “Shorten the Instagram caption,” “Keep all dates and facts unchanged,” and “Use plain language and remove technical terms.”</p>
      <h2>Create and generate an image</h2>${ordered(['Ask Copilot to suggest an image concept that supports the communication.','Include the platform, image dimensions or format, KPC colours, desired atmosphere, pickleball elements, event information and logo requirements.','Ask Copilot to create a detailed image-generation prompt.','Review and edit the image prompt before using it.','Copy the image prompt into a new Copilot message and select Send.','Wait for Copilot to generate the image.'])}
      <h2>Review the generated image</h2>${list(['Check every word shown in the image.','Confirm the organization name, event title, date, time, format, duration, logo, colours and spelling.','Inspect people, hands, equipment, devices and the background for visual errors.','Confirm that the image does not misrepresent KPC or the event.','Use editing tools carefully when changes are needed.','Save and copy only after the image has been reviewed and approved.'])}</section>

      <section class="simple-block"><p class="eyebrow">The smart-prompt method</p><h2>Tell Copilot four things</h2><dl class="simple-definitions"><div><dt>Goal</dt><dd>What do you need Copilot to do?</dd></div><div><dt>Context</dt><dd>What background, facts and audience information does it need?</dd></div><div><dt>Expectations</dt><dd>What tone, format, length and structure should it use?</dd></div><div><dt>Source</dt><dd>What facts, text, file, image or public information should it rely on?</dd></div></dl><p><strong>Memory phrase:</strong> Task, audience, result and facts.</p></section>

      <section class="simple-block"><p class="eyebrow">Example prompt</p><h2>A complete KPC prompt</h2><pre style="white-space:pre-wrap;font:inherit;background:#f1f6fc;padding:1rem;border-radius:12px;border:1px solid #d9e2ef">${esc(examplePrompt)}</pre></section>

      <section class="simple-block"><p class="eyebrow">When Copilot is useful</p><h2>Good uses for Copilot Chat</h2>${list(['Turn rough notes into a clear announcement','Rewrite technical language in plain language','Create an agenda','Organize meeting notes into actions','Create a checklist','Draft several versions of one message','Summarize approved text','Suggest questions or missing information','Create an image concept','Generate a first-draft promotional image','Improve an existing draft through follow-up prompts'])}<h2>What Copilot does not replace</h2>${list(['Fact checking','Privacy judgment','Approval','Committee or Board decisions','Subject-matter expertise','KPC policies','Human review'])}<p>Do not assume Copilot automatically knows every KPC file, email, Teams conversation, meeting or policy, which information is confidential, or whether its answer is approved.</p></section>

      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup()}</section>

      <section class="simple-block simple-help"><h2>What to do if it does not work</h2><p>Start by confirming that you are signed in with the correct KPC Microsoft 365 account.</p><details><summary>I cannot find Copilot</summary>${list(['Check the Microsoft 365 or Teams app bar.','Select the three dots to see additional apps.','Search for Copilot.','Ask the KPC Technology Team whether Copilot Chat is available to your account.'])}</details><details><summary>Copilot does not understand the prompt</summary>${list(['Make the task more specific.','Add the missing facts.','Identify the audience.','State the format you need.','Break a large request into smaller steps.','Tell Copilot what not to change or invent.'])}</details><details><summary>The response contains incorrect information</summary>${list(['Do not use it.','Correct the facts in a follow-up prompt.','Ask Copilot to use only the supplied information.','Review the revised response again.'])}</details><details><summary>The image does not match KPC branding</summary>${list(['Upload the official KPC logo when appropriate.','Restate the exact brand colours.','Ask for fewer or simpler elements.','Ask Copilot to regenerate the image.','Replace incorrect branding during editing.'])}</details><details><summary>The image contains spelling or visual errors</summary>${list(['Do not publish it.','Edit or regenerate the image.','Confirm all event details again.','Ask another volunteer to review it.'])}</details><p><strong>Never enter passwords, temporary passwords, multifactor authentication codes or sign-in approval numbers into Copilot.</strong></p></section>
    </div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-copilot-check-button]');
    if (!button) return;
    const wrapper = button.closest('[data-copilot-check]');
    let correct = 0;
    questions.forEach((question,index) => {
      const selected = wrapper.querySelector(`input[name="copilot-${index}"]:checked`);
      if (selected && Number(selected.value) === question.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    result.innerHTML = correct === questions.length
      ? '<strong>You are ready to ask Copilot for useful help.</strong><p>You can provide clear instructions and approved facts, then review the draft before using it.</p>'
      : `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
  });

  if (lessonId === 'how-to-ask-copilot') renderLesson();
  else if (!lessonId) addOverviewCard();
})();