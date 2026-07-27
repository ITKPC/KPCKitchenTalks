(() => {
  const data = window.KPCLearning;
  if (!data || !Array.isArray(data.lessons)) return;

  const helpGuidance = {
    label: "KPC Technology Team",
    peerHelp: "Start by asking another board or committee member. Someone working with you may have already solved the same problem and can often help quickly.",
    technologyHelp: "If you are still stuck, email ITConsult@kamloopspickleballclub.ca. Include what you were trying to do, the device you were using, and the exact message you saw.",
    safety: "Never send your password, temporary password, multifactor authentication code, or sign-in approval number."
  };

  data.helpContact.label = helpGuidance.label;
  data.helpContact.instructions = helpGuidance.technologyHelp;
  data.helpContact.peerHelp = helpGuidance.peerHelp;
  data.helpContact.safety = helpGuidance.safety;

  data.lessons.forEach(lesson => {
    lesson.troubleshooting = [];
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