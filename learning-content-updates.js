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
    signInLesson.beforeYouStart = [
      "A computer or tablet with an internet connection and a web browser, such as Edge, Chrome or Safari.",
      "The KPC email address and temporary password provided to you.",
      "Your smartphone. You will use it to install Microsoft Authenticator and approve sign-ins.",
      "Access to the Apple App Store on an iPhone or the Google Play Store on an Android phone."
    ];

    signInLesson.authenticatorWarning = "Install the app named Microsoft Authenticator. Confirm that the publisher or developer is Microsoft Corporation. Do not install an authenticator app from another publisher.";

    signInLesson.steps = [
      "On your computer or tablet, open a web browser such as Edge, Chrome or Safari.",
      "Go to login.microsoftonline.com.",
      "Enter the KPC email address provided to you and select Next.",
      "Enter the temporary password provided by KPC.",
      "When prompted, create a new private password that only you know.",
      "On your smartphone, open the Apple App Store or Google Play Store and search for Microsoft Authenticator.",
      "Before installing it, confirm the app is named Microsoft Authenticator and the publisher or developer is Microsoft Corporation.",
      "Install Microsoft Authenticator and open it on your phone.",
      "Return to the sign-in screen on your computer or tablet and continue the security setup.",
      "In Microsoft Authenticator, choose Add account, then Work or school account, and follow the on-screen instructions. You may be asked to scan a QR code shown on your computer or tablet.",
      "Complete the test approval when Microsoft asks you to confirm that the app is connected.",
      "Approve only sign-in requests that you started yourself.",
      "When setup is complete, open the Microsoft 365 app launcher and locate Outlook, Teams and OneDrive."
    ];

    signInLesson.practiceTask = "Before you begin, place your computer or tablet and your smartphone beside each other. Confirm that Microsoft Authenticator from Microsoft Corporation is installed on the phone.";

    signInLesson.knowledgeCheck = [
      {
        q: "Which app should you install for KPC sign-in verification?",
        a: [
          "Any app with Authenticator in its name",
          "Microsoft Authenticator published by Microsoft Corporation",
          "An authenticator app recommended by an advertisement"
        ],
        correct: 1
      },
      {
        q: "Why should you have both your computer or tablet and your phone ready?",
        a: [
          "The sign-in instructions appear on one device while Microsoft Authenticator is set up on the phone",
          "KPC requires two computers",
          "The phone replaces the temporary password"
        ],
        correct: 0
      },
      {
        q: "You receive a sign-in approval request, but you are not trying to sign in. What should you do?",
        a: [
          "Approve it in case it is a KPC administrator",
          "Deny or ignore it and contact the KPC Technology Team",
          "Approve it and change your password later"
        ],
        correct: 1
      }
    ];
  }
})();