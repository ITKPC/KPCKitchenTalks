(() => {
  const data = window.KPCLearning;
  if (!data || !Array.isArray(data.lessons)) return;

  const technologyTeam = {
    label: "Contact the KPC Technology Team",
    instructions: "Email ITConsult@kamloopspickleballclub.ca. Include what you were trying to do, the device you were using, and the exact message you saw. Never send your password, temporary password, multifactor authentication code, or sign-in approval number."
  };

  data.helpContact.label = technologyTeam.label;
  data.helpContact.instructions = technologyTeam.instructions;

  data.lessons.forEach(lesson => {
    lesson.troubleshooting = [technologyTeam.instructions];
  });

  const signInLesson = data.lessons.find(lesson => lesson.id === "first-time-m365-sign-in");
  if (signInLesson) {
    signInLesson.knowledgeCheck = [
      {
        q: "What should you do when Microsoft asks you to change the temporary password provided by KPC?",
        a: [
          "Keep using the temporary password so it is easier to remember",
          "Create a new private password that you do not share",
          "Send the temporary password to another volunteer for safekeeping"
        ],
        correct: 1
      },
      {
        q: "You receive a multifactor authentication request, but you are not trying to sign in. What should you do?",
        a: [
          "Approve it in case it is a KPC administrator",
          "Ignore or deny it and contact the KPC Technology Team",
          "Approve it and change your password later"
        ],
        correct: 1
      },
      {
        q: "After signing in, where can you find Outlook, Teams and OneDrive?",
        a: [
          "In the Microsoft 365 app launcher",
          "Only in an email from KPC",
          "Inside the multifactor authentication app"
        ],
        correct: 0
      }
    ];
  }
})();