const lessons = [
  {
    id: "meet-tools",
    category: "Getting Started",
    title: "Meet Your KPC Microsoft 365 Tools",
    summary: "Understand what Teams, Outlook, SharePoint and OneDrive each do.",
    time: "4 min",
    level: "Start here",
    steps: [
      "Use Outlook for KPC email, calendars and meeting invitations.",
      "Use Teams as the main place to communicate and work with your committee.",
      "Use SharePoint for shared KPC information and files. Teams files are normally stored there.",
      "Use OneDrive for your own drafts, notes and working files.",
      "Use Word, Excel and PowerPoint to create the files stored in these locations."
    ],
    practice: "Open Microsoft 365 and identify where you would go for email, committee work and a personal draft.",
    resourceLabel: "Microsoft 365 basics video training",
    resourceUrl: "https://support.microsoft.com/en-us/office/microsoft-365-basics-video-training-396b8d9e-e118-42d0-8a0d-87d1f2f055fb"
  },
  {
    id: "find-team",
    category: "Teams",
    title: "Find Your Committee in Teams",
    summary: "Open Teams and locate the workspace for your KPC committee.",
    time: "3 min",
    level: "Beginner",
    steps: [
      "Open Microsoft Teams using your KPC account.",
      "Select Teams from the left side of the screen.",
      "Find the name of your committee or board workspace.",
      "Select the General channel first.",
      "Look for Posts, Files and any other tabs added for your committee."
    ],
    practice: "Open your committee workspace and find its Files tab.",
    resourceLabel: "Microsoft Teams help and learning",
    resourceUrl: "https://support.microsoft.com/en-us/teams"
  },
  {
    id: "teams-post",
    category: "Teams",
    title: "Read and Reply to a Teams Post",
    summary: "Keep committee discussions together by replying to the correct post.",
    time: "3 min",
    level: "Beginner",
    steps: [
      "Open the correct team and channel.",
      "Read the original post and any existing replies.",
      "Select Reply under that post rather than starting a new conversation.",
      "Type your message and check that it is intended for everyone in the channel.",
      "Select Send."
    ],
    practice: "Reply to a practice post in your committee's training channel.",
    resourceLabel: "Microsoft Teams help and learning",
    resourceUrl: "https://support.microsoft.com/en-us/teams"
  },
  {
    id: "shared-file",
    category: "SharePoint",
    title: "Find and Open a Shared File",
    summary: "Access a committee file through Teams without creating another copy.",
    time: "4 min",
    level: "Beginner",
    steps: [
      "Open the correct committee in Teams.",
      "Select the channel where the work belongs.",
      "Select Files.",
      "Open the appropriate folder and select the file.",
      "Work in the shared file whenever possible instead of downloading and emailing copies."
    ],
    practice: "Find one shared document and open it without downloading it.",
    resourceLabel: "Share documents in Microsoft 365",
    resourceUrl: "https://support.microsoft.com/en-us/office/video-share-documents-in-microsoft-365"
  },
  {
    id: "join-meeting",
    category: "Teams",
    title: "Join a Teams Meeting",
    summary: "Join from Outlook or Teams and check your microphone and camera.",
    time: "3 min",
    level: "Beginner",
    steps: [
      "Open the meeting invitation in Outlook or the meeting in your Teams calendar.",
      "Select the meeting link or Join.",
      "Confirm that you are using your KPC account.",
      "Check your microphone, speaker and camera before entering.",
      "Select Join now and mute your microphone when you are not speaking."
    ],
    practice: "Open an upcoming meeting invitation and locate the Join button without entering the meeting.",
    resourceLabel: "Microsoft video: Join a Teams meeting",
    resourceUrl: "https://support.microsoft.com/en-us/office/get-started-with-meetings-909b75b4-5448-455c-9c9a-5115acf4d3d8"
  },
  {
    id: "outlook-basics",
    category: "Outlook",
    title: "Outlook Email and Calendar Basics",
    summary: "Use your KPC mailbox and calendar for club communication and invitations.",
    time: "5 min",
    level: "Beginner",
    steps: [
      "Open Outlook using your KPC account.",
      "Use Mail to read and send KPC messages.",
      "Use Calendar to see meetings and appointments.",
      "Open meeting invitations and respond with Accept, Tentative or Decline.",
      "Use KPC email rather than personal email for KPC business."
    ],
    practice: "Open your KPC calendar and identify your next scheduled meeting.",
    resourceLabel: "Microsoft 365 basics video training",
    resourceUrl: "https://support.microsoft.com/en-us/office/microsoft-365-basics-video-training-396b8d9e-e118-42d0-8a0d-87d1f2f055fb"
  },
  {
    id: "sharepoint-home",
    category: "SharePoint",
    title: "Use the KPC SharePoint Home Site",
    summary: "Find KPC news, policies, templates, minutes and internal links.",
    time: "4 min",
    level: "Beginner",
    steps: [
      "Open the KPC SharePoint home site from its saved link or Microsoft 365.",
      "Use the main navigation to find the area you need.",
      "Look for official policies, procedures, templates and approved minutes.",
      "Use Search when you do not know where an item is located.",
      "Bookmark the home site for future use."
    ],
    practice: "Find one KPC policy or template and note where it is stored.",
    resourceLabel: "Microsoft video: SharePoint home base",
    resourceUrl: "https://support.microsoft.com/en-us/office/sharepoint-your-company-s-home-base-2ebcfb7f-dc5e-4202-a6bb-366c6578c242"
  },
  {
    id: "where-save",
    category: "OneDrive",
    title: "OneDrive or Teams: Where Should I Save This?",
    summary: "Choose the right home for a private draft or a shared KPC document.",
    time: "4 min",
    level: "Essential",
    steps: [
      "Save private notes, early drafts and temporary files in your KPC OneDrive.",
      "Save committee work in the correct Teams channel or SharePoint library.",
      "Move a draft into the shared workspace when it becomes committee work.",
      "Do not keep the only copy of an official KPC document in one person's OneDrive.",
      "Share links to shared files instead of sending multiple attachments."
    ],
    practice: "Choose one of your current files and decide whether it belongs in OneDrive or a committee workspace.",
    resourceLabel: "Microsoft video: OneDrive vs. SharePoint",
    resourceUrl: "https://support.microsoft.com/en-us/office/get-started-creating-managing-and-sharing-files-in-onedrive-and-sharepoint-123ff6b5-3c93-4a60-99d4-ca1bfb1734fe"
  },
  {
    id: "onedrive-basics",
    category: "OneDrive",
    title: "Find Your Way Around OneDrive",
    summary: "Locate, upload, organize and recover your individual KPC files.",
    time: "4 min",
    level: "Beginner",
    steps: [
      "Open OneDrive from Microsoft 365.",
      "Use My files to see your folders and documents.",
      "Use Recent to find something you worked on recently.",
      "Use Shared to see files shared with you or by you.",
      "Use the Recycle bin if you accidentally delete a file."
    ],
    practice: "Open OneDrive and find one recent file and the Recycle bin.",
    resourceLabel: "Microsoft video: OneDrive basics",
    resourceUrl: "https://support.microsoft.com/en-us/office/video-onedrive-basics-fe8aab1e-3d1a-4a65-a9b6-77b79b6dbb30"
  }
];

const grid = document.querySelector("#lessonGrid");
const search = document.querySelector("#lessonSearch");
const filterButtons = document.querySelector("#filterButtons");
const noResults = document.querySelector("#noResults");
const dialog = document.querySelector("#lessonDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");
let activeFilter = "all";

function renderLessons() {
  const query = search.value.trim().toLowerCase();
  const matches = lessons.filter((lesson) => {
    const categoryMatch = activeFilter === "all" || lesson.category === activeFilter;
    const textMatch = `${lesson.title} ${lesson.summary} ${lesson.category}`.toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });

  grid.innerHTML = matches.map((lesson) => `
    <article class="lesson-card">
      <span class="tag">${lesson.category}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.summary}</p>
      <div class="meta"><span>${lesson.time}</span><span>${lesson.level}</span></div>
      <button type="button" data-lesson="${lesson.id}">Open Kitchen Talk</button>
    </article>
  `).join("");

  noResults.hidden = matches.length > 0;
}

function openLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;

  dialogContent.innerHTML = `
    <p class="eyebrow">${lesson.category} · ${lesson.time}</p>
    <h2>${lesson.title}</h2>
    <p class="lesson-summary">${lesson.summary}</p>
    <h3>KPC quick steps</h3>
    <ol>${lesson.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    <h3>Try it yourself</h3>
    <p>${lesson.practice}</p>
    <div class="resource-actions">
      <a class="microsoft" href="${lesson.resourceUrl}" target="_blank" rel="noopener noreferrer">Watch or read on Microsoft</a>
      <a class="practice" href="#lessons" data-close-dialog>Back to lessons</a>
    </div>
  `;
  dialog.showModal();
}

filterButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
  renderLessons();
});

search.addEventListener("input", renderLessons);
grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-lesson]");
  if (button) openLesson(button.dataset.lesson);
});
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog || event.target.closest("[data-close-dialog]")) dialog.close();
});

renderLessons();
