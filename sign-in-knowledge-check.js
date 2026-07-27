(() => {
  const lesson = window.KPCLearning?.lessons?.find(item => item.id === "first-time-m365-sign-in");
  if (!lesson) return;

  lesson.knowledgeCheck = [
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
      q: "What should you do when Microsoft asks you to change the temporary password provided by KPC?",
      a: [
        "Keep using the temporary password",
        "Create a new private password that only you know",
        "Send the temporary password to another volunteer"
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
})();