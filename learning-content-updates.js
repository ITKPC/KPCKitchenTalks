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
  data.lessons.forEach(lesson => { lesson.troubleshooting = []; });

  const lesson = id => data.lessons.find(item => item.id === id);
  const apply = (id, updates) => Object.assign(lesson(id) || {}, updates);

  apply("first-time-m365-sign-in", {
    beforeYouStart: [
      "A computer or tablet with an internet connection and a web browser, such as Edge, Chrome or Safari.",
      "The KPC email address and temporary password provided to you.",
      "Your smartphone. You will use it to install Microsoft Authenticator and approve sign-ins.",
      "Access to the Apple App Store on an iPhone or the Google Play Store on an Android phone."
    ],
    authenticatorWarning: "Install the app named Microsoft Authenticator. Confirm that the publisher or developer is Microsoft Corporation. Do not install an authenticator app from another publisher.",
    steps: [
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
    ],
    knowledgeCheck: [
      {q:"Which app should you install for KPC sign-in verification?",a:["Any app with Authenticator in its name","Microsoft Authenticator published by Microsoft Corporation","An authenticator app recommended by an advertisement"],correct:1},
      {q:"Why should you have both your computer or tablet and your phone ready?",a:["The sign-in instructions appear on one device while Microsoft Authenticator is set up on the phone","KPC requires two computers","The phone replaces the temporary password"],correct:0},
      {q:"You receive a sign-in approval request, but you are not trying to sign in. What should you do?",a:["Approve it in case it is a KPC administrator","Deny or ignore it and contact the KPC Technology Team","Approve it and change your password later"],correct:1}
    ]
  });

  apply("outlook-overview", {
    description:"Understand how Outlook brings email, calendars and several separate accounts into one app.",
    outcome:"I can explain what Outlook does and how separate mailboxes remain separate inside the same app.",
    whyItMatters:"Outlook can reduce the number of websites and sign-ins you need to manage while keeping KPC and personal information distinct.",
    steps:[
      "Outlook is Microsoft's email and calendar app.",
      "Your KPC mailbox and KPC calendar appear together when you sign in with your KPC account.",
      "The Outlook app can also display other supported email accounts you choose to add.",
      "Each account keeps its own inbox, folders, calendar and sign-in.",
      "Adding a personal account to Outlook does not give KPC access to that account.",
      "Before sending a message or creating an event, confirm which account is selected."
    ],
    knowledgeCheck:[
      {q:"What happens when you add two accounts to Outlook?",a:["The accounts merge into one mailbox","They remain separate but can be viewed in one app","KPC gains access to both accounts"],correct:1},
      {q:"What should you check before sending a message?",a:["Which account is selected in the From field","Whether Teams is open","Whether the message has a calendar"],correct:0}
    ]
  });

  apply("open-outlook", {
    description:"Open Outlook on the web or in the Outlook app and confirm that you are using your KPC account.",
    outcome:"I can open my KPC inbox and recognize the account I am using.",
    whyItMatters:"Confirming the selected account prevents KPC messages from being sent from the wrong address.",
    beforeYouStart:["Your KPC sign-in must already be completed.","Use a web browser or the Microsoft Outlook app."],
    steps:[
      "In a browser, go to microsoft365.com and sign in with your KPC account, or open the Outlook app.",
      "From Microsoft 365, open the app launcher and choose Outlook.",
      "Look at the account name or profile area and confirm that your KPC email address is selected.",
      "Open Inbox to see new KPC messages.",
      "Open Sent Items to see messages sent from that mailbox.",
      "When finished on a shared or public device, sign out and close the browser."
    ],
    knowledgeCheck:[
      {q:"How can you confirm you opened the correct mailbox?",a:["Check the selected account or email address","Check the computer brand","Open Microsoft Authenticator"],correct:0},
      {q:"What should you do after using Outlook on a shared computer?",a:["Leave the browser open","Sign out and close the browser","Delete the inbox"],correct:1}
    ]
  });

  apply("outlook-other-accounts", {
    description:"Add another supported email account to the Outlook app and switch between accounts without combining them.",
    outcome:"I can add another account to Outlook and keep it separate from my KPC mailbox.",
    whyItMatters:"This can simplify your routine without mixing KPC records with personal email.",
    beforeYouStart:["Install or open the Microsoft Outlook app on your device.","Have the email address and sign-in information for the account you are adding.","Only add an account on a device you control and trust."],
    steps:[
      "Open the Outlook app and select your profile or account icon.",
      "Open Settings and choose Add email account or Add account.",
      "Enter the email address you want to add.",
      "Follow the sign-in instructions from that email provider.",
      "Return to Outlook and use the account switcher to select a mailbox.",
      "Confirm the selected account before sending email or creating a calendar event.",
      "Remove the account from Outlook settings if you no longer want it on that device."
    ],
    knowledgeCheck:[
      {q:"Does adding a personal account to Outlook give KPC access to it?",a:["Yes","No, the accounts remain separate","Only during meetings"],correct:1},
      {q:"Where should you add another account?",a:["On a trusted device you control","On any public computer","Inside a shared KPC mailbox"],correct:0}
    ]
  });

  apply("shared-mailboxes", {
    description:"Open and use a KPC role or function mailbox that has been assigned to your individual account.",
    outcome:"I can work from an authorized shared mailbox without using a shared password.",
    whyItMatters:"KPC can preserve permanent addresses while each volunteer signs in as themselves.",
    beforeYouStart:["KPC must grant your account access to the mailbox.","Sign in to Outlook using your own KPC account."],
    steps:[
      "Open Outlook with your own KPC account.",
      "Look in the folder list for the shared mailbox. It may appear automatically after access is granted.",
      "If it does not appear, use Open another mailbox or Add shared folder or mailbox, depending on your Outlook version.",
      "Enter the KPC role or function address and open it.",
      "Choose New message from inside that mailbox or select its address in the From field.",
      "Before sending, confirm that the From address is the correct KPC mailbox.",
      "Do not ask for or share a password for the shared mailbox."
    ],
    knowledgeCheck:[
      {q:"How do you access a KPC shared mailbox?",a:["With a shared password","Through permission granted to your own KPC account","Through a personal social media account"],correct:1},
      {q:"What should you confirm before sending?",a:["The From address","The weather","The browser colour"],correct:0}
    ]
  });

  apply("outlook-calendar", {
    description:"Use the Outlook calendar to view KPC appointments, create events and respond to invitations.",
    outcome:"I can use the correct calendar and understand how it connects with email and Teams meetings.",
    whyItMatters:"Outlook keeps invitations, responses, dates and Teams links together.",
    steps:[
      "Open Outlook and choose Calendar.",
      "Use the calendar list to confirm which account or shared calendar you are viewing.",
      "Select an invitation to review the date, time, location, attendees and Teams link.",
      "Choose Accept, Tentative or Decline when a response is requested.",
      "To create an event, choose New event and select the correct calendar.",
      "Add a clear title, date, start time and end time.",
      "Add attendees only when you want Outlook to send them an invitation.",
      "Review the time zone and calendar before saving or sending."
    ],
    knowledgeCheck:[
      {q:"Why should you check the selected calendar before creating an event?",a:["The event may otherwise be saved to the wrong account or calendar","It changes the email password","It controls the screen brightness"],correct:0},
      {q:"Which response means you may attend but are not certain?",a:["Accept","Tentative","Delete"],correct:1}
    ]
  });

  apply("create-teams-meeting", {
    beforeYouStart:["Open the Outlook calendar using the account that should organize the meeting.","Have the meeting date, time and attendee email addresses ready."],
    steps:[
      "Open Outlook and choose Calendar.",
      "Choose New event.",
      "Confirm that the event is being created on the correct calendar.",
      "Enter a clear meeting title.",
      "Choose the date, start time and end time, and check the time zone.",
      "Add the people who should receive the invitation.",
      "Turn on the Teams meeting option so Outlook adds an online joining link.",
      "Add any useful agenda, preparation notes or documents.",
      "Review the invitation and select Send."
    ],
    knowledgeCheck:[
      {q:"What creates the online joining link?",a:["Turning on the Teams meeting option","Adding an attachment","Opening OneDrive"],correct:0},
      {q:"What should you verify before sending?",a:["Calendar, date, time, time zone and attendees","Only the font","Only your password"],correct:0}
    ]
  });

  apply("join-teams-meeting", {
    description:"Join a Teams meeting from an Outlook invitation or from the Teams calendar.",
    outcome:"I can join the correct meeting and check my audio and camera before entering.",
    whyItMatters:"A quick pre-join check prevents avoidable sound and camera problems during KPC meetings.",
    beforeYouStart:["Use a device with internet access.","Allow Teams to use your microphone and camera when prompted.","Join a few minutes early when the meeting is important."],
    steps:[
      "Open the meeting invitation in Outlook, or open the meeting in the Teams calendar.",
      "Select Join Teams Meeting or the meeting link.",
      "Choose whether to open the Teams app or continue in the browser when that option is available.",
      "On the pre-join screen, select the correct speaker, microphone and camera.",
      "Turn your camera on or off as appropriate.",
      "Confirm that your microphone is muted unless you are ready to speak.",
      "Select Join now.",
      "If you enter a waiting area, wait for the organizer to admit you.",
      "Use Leave when the meeting is finished."
    ],
    knowledgeCheck:[
      {q:"Where can you normally find the Teams joining link?",a:["In the Outlook invitation or Teams calendar","Only in OneDrive","Only in Microsoft Authenticator"],correct:0},
      {q:"What should you check before selecting Join now?",a:["Speaker, microphone and camera","Your shared mailbox password","The SharePoint site colour"],correct:0}
    ]
  });
})();