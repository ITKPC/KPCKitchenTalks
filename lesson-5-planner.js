(() => {
  const app = document.querySelector('#learningApp');
  if (!app) return;

  const lessonId = new URLSearchParams(location.search).get('lesson');
  const questions = [
    {q:'When is Planner most useful?',a:['When one person has a quick personal reminder','When shared work involves several people, steps or deadlines','When no one needs to know who is responsible'],correct:1},
    {q:'What does a Planner task represent?',a:['A piece of work or result that needs to be completed','A private email message','A copy of every file in the Team'],correct:0},
    {q:'What is the purpose of a checklist inside a task?',a:['To divide the task into smaller steps','To create a separate Planner plan','To remove the task owner'],correct:0},
    {q:'Why should a task have an assigned person?',a:['So the Team knows who is responsible for moving it forward','So no one else can view it','So the task automatically completes itself'],correct:0},
    {q:'What happens when you add a task to My Day?',a:['It is removed from the shared plan','It is added to your personal daily focus while remaining in the shared plan','It is automatically completed'],correct:1},
    {q:'What is task chat best used for?',a:['Discussion specifically related to that task','Unrelated club announcements','Private password information'],correct:0},
    {q:'What should you confirm before marking a task complete?',a:['That the expected work has actually been finished','That the task has no assigned person','That the task has been copied into another plan'],correct:0},
    {q:'Where can you see tasks assigned to you across different plans?',a:['My Tasks','Shared files','Version history'],correct:0}
  ];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function checkMarkup() {
    return `<div class="simple-check" data-planner-check>${questions.map((question,index)=>`<fieldset><legend>${esc(question.q)}</legend>${question.a.map((answer,answerIndex)=>`<label><input type="radio" name="planner-${index}" value="${answerIndex}"> ${esc(answer)}</label>`).join('')}</fieldset>`).join('')}<button class="button dark" data-planner-check-button>Check my choices</button><div class="simple-result" aria-live="polite"></div></div>`;
  }

  function addOverviewCard() {
    const grid = document.querySelector('.simple-lesson-grid');
    if (!grid || grid.querySelector('[data-lesson-five]')) return;
    const card = document.createElement('article');
    card.className = 'simple-lesson-card';
    card.dataset.lessonFive = 'true';
    card.innerHTML = '<p class="eyebrow">Lesson 5</p><h2>Organizing Shared Work with Planner</h2><p>Assign responsibilities, track progress and keep the details of a shared project together.</p><a class="button" href="learn.html?lesson=organizing-shared-work-planner">Open Lesson</a>';
    grid.appendChild(card);
  }

  function list(items) {
    return `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  }

  function ordered(items) {
    return `<ol class="simple-steps">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;
  }

  function renderLesson() {
    const openPlan = [
      'Open Microsoft Teams.',
      'Select the Planner icon from the app bar.',
      'Open the plan associated with your Team or project.',
      'Select Board to see the tasks arranged in columns.',
      'Review the buckets used by the plan.'
    ];
    const reviewBoard = [
      'Look at the task cards shown in each bucket.',
      'Notice that each card can display the task name, assigned volunteers, due date, checklist progress, status, priority and related plan.',
      'Select a task to open its details.'
    ];
    const updateTask = [
      'Confirm that the task title clearly describes the expected result.',
      'Check who is assigned to the task.',
      'Review or update the task status.',
      'Set a priority when needed.',
      'Add a start date and due date if the work is time-sensitive.',
      'Confirm that the task is in the correct bucket.'
    ];
    const checklist = [
      'Review the checklist inside the task.',
      'Break the larger task into smaller, clear steps.',
      'Select the circle beside a checklist item when that step is complete.',
      'Review the checklist count to see how much work remains.'
    ];
    const taskChat = [
      'Use the task chat when the conversation relates specifically to that task.',
      'Enter a message or question.',
      'Use an @mention when a particular volunteer needs to see or respond to the message.',
      'Select Send.'
    ];
    const myDay = [
      'Open the task’s three-dot menu.',
      'Select Add to My Day.',
      'Open My Day from the Planner navigation.',
      'Confirm that the task appears in your personal daily view.'
    ];
    const completeTask = [
      'Confirm that the expected work has actually been finished.',
      'Select the completion circle beside the task.',
      'Confirm that the task moves to Completed.'
    ];
    const myTasks = [
      'Open My Tasks.',
      'Select Assigned to me.',
      'Review the tasks assigned to you across your plans.',
      'Use the status columns to identify work not yet started, work underway and work already completed.'
    ];

    app.innerHTML = `<div class="simple-lesson-page"><a class="simple-back" href="learn.html">← Back to Learn</a>
      <header class="simple-lesson-header"><p class="eyebrow">Lesson 5 · Planner</p><h1>Organizing Shared Work with Planner</h1><p>Use Planner to assign responsibilities, track progress and keep the details of a shared project together.</p><div class="simple-meta"><span>About 6 minutes</span><span>Video coming soon</span><span>Written guide available</span></div></header>

      <section class="simple-block"><p class="eyebrow">After this lesson</p><h2>I can use Planner to organize work involving several people or steps.</h2><p>Planner helps KPC volunteers see what needs to be done, who is responsible, what stage the work has reached and what still needs attention.</p><p>Planner is most useful when work involves several connected tasks, more than one volunteer, clear responsibilities, deadlines, checklists, ongoing discussion or a need to track progress.</p></section>

      <section class="simple-block"><p class="eyebrow">See how KPC uses it</p><h2>Organizing Shared Work with Planner</h2><p>Erne demonstrates how Smash and Erne use the KPC Mascot Training Production plan to organize lesson-production work. The plan shows ideas, work in production and completed lessons. Erne opens a task, reviews its assignment and checklist, uses task chat, adds the task to My Day and marks it complete.</p><div class="simple-placeholder"><strong>Video coming soon</strong><p>The completed Erne Planner training video will appear here.</p></div></section>

      <section class="simple-block"><p class="eyebrow">Before you begin</p><h2>Have these ready</h2>${list(['A computer or tablet with internet access','Your KPC Microsoft 365 account','Access to a KPC Team or Planner plan','A project or activity involving more than one step','A clear idea of who is responsible for the work','Any dates, files or notes connected to the task'])}</section>

      <section class="simple-block"><p class="eyebrow">Practise</p><h2>Open a Planner plan</h2>${ordered(openPlan)}<p>Common bucket examples include Ideas, In Production and Published, or Planned, In Progress and Completed. Buckets should match the stages that make sense for the work.</p>
      <h2>Review the Planner board</h2>${ordered(reviewBoard)}
      <h2>Review and update a task</h2>${ordered(updateTask)}<p>Typical statuses are Not started, In progress and Completed.</p>
      <h2>Use a checklist</h2>${ordered(checklist)}<p>A training-video checklist might include capturing screenshots, adding them to the production tool, generating and reviewing the script, rendering the video and publishing the completed lesson.</p>
      <h2>Use task chat</h2>${ordered(taskChat)}<p>Keeping the discussion with the task helps other volunteers understand the decisions and progress later.</p>
      <h2>Add a task to My Day</h2>${ordered(myDay)}<p>Adding a task to My Day does not remove it from the shared plan. It adds it to your personal focus for the day.</p>
      <h2>Use My Day views</h2>${list(['Use Grid to see plan, due date, priority, status and checklist progress.','Use Board to see tasks grouped by Not started, In progress and Completed.'])}
      <h2>Complete a task</h2>${ordered(completeTask)}<p>Completing a task records that the responsibility is finished. Verify the result first because marking the task complete does not guarantee that every checklist item was completed.</p>
      <h2>View all tasks assigned to you</h2>${ordered(myTasks)}</section>

      <section class="simple-block"><p class="eyebrow">When Planner is useful</p><h2>Use Planner when several people are contributing to one result.</h2>${list(['Organizing a tournament','Planning a club event','Preparing member communications','Coordinating volunteer shifts','Producing training materials','Managing a facility project','Preparing for a board initiative','Tracking committee action items'])}<p>A tournament plan might contain separate tasks for registration, volunteer scheduling, court assignments, equipment, communications, food and refreshments, and results reporting. Each task can have its own owner, deadline, checklist and discussion.</p><h2>Planner is not required for every action.</h2>${list(['A quick question','A simple reply','A one-minute correction','A personal reminder that no one else needs to see','A conversation that does not require follow-up work'])}<p>Use Planner when the Team benefits from seeing and tracking the work together.</p></section>

      <section class="simple-block"><p class="eyebrow">Check</p><h2>Check your understanding</h2>${checkMarkup()}</section>

      <section class="simple-block simple-help"><h2>What to do if it does not work</h2><p>Start by confirming that you are signed in with the correct KPC Microsoft 365 account.</p><details><summary>I cannot find Planner</summary>${list(['Check the Teams app bar.','Select the three dots to look for additional apps.','Search for Planner.','Ask the KPC Technology Team whether Planner is available to your account.'])}</details><details><summary>I cannot find a plan</summary>${list(['Confirm that you are a member of the Team connected to the plan.','Check My Plans.','Ask the plan owner to confirm that you have access.'])}</details><details><summary>I cannot edit or assign a task</summary>${list(['Confirm that you are a member of the plan.','Check whether the plan is connected to the correct Team.','Ask the plan owner or KPC Technology Team for assistance.'])}</details><details><summary>A task does not appear in My Day</summary>${list(['Confirm that you selected Add to My Day.','Refresh Planner.','Open My Day again.','Check both Grid and Board views.'])}</details><details><summary>Task chat is not available</summary>${list(['Confirm that the task belongs to a shared plan.','Check that you have access to the plan and its Microsoft 365 group.','Close and reopen the task.'])}</details><p><strong>Do not use Planner to store passwords, private personal information or confidential material that does not belong in the Team.</strong></p></section>
    </div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-planner-check-button]');
    if (!button) return;
    const wrapper = button.closest('[data-planner-check]');
    let correct = 0;
    questions.forEach((question,index) => {
      const selected = wrapper.querySelector(`input[name="planner-${index}"]:checked`);
      if (selected && Number(selected.value) === question.correct) correct++;
    });
    const result = wrapper.querySelector('.simple-result');
    result.innerHTML = correct === questions.length
      ? '<strong>You are ready to organize shared work with Planner.</strong><p>You can assign responsibility, track progress and keep task-specific details together.</p>'
      : `<strong>Review the lesson and try again.</strong><p>${correct} of ${questions.length} answers are correct.</p>`;
  });

  if (lessonId === 'organizing-shared-work-planner') renderLesson();
  else if (!lessonId) addOverviewCard();
})();