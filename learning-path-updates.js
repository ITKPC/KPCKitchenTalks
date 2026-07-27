(() => {
  const data = window.KPCLearning;
  if (!data || !Array.isArray(data.learningPaths) || !Array.isArray(data.lessons)) return;

  const adminIndex = data.learningPaths.findIndex(path => path.restricted || path.id === "kpc-administration");
  if (adminIndex >= 0) data.learningPaths.splice(adminIndex, 1);

  if (!data.learningPaths.some(path => path.id === "everyday-apps")) {
    data.learningPaths.push({
      id: "everyday-apps",
      title: "Everyday Microsoft 365 Apps",
      description: "Find and use the Microsoft 365 apps that support common KPC volunteer tasks, including Word, Excel, PowerPoint and Forms.",
      outcome: "I can choose and open the right Microsoft 365 app for a common KPC task.",
      featured: false,
      restricted: false,
      mascot: "assets/mascots/everyday-apps.svg",
      mascotAlt: "Simple Microsoft 365 apps icon.",
      lessons: ["choose-m365-app", "use-word", "use-excel", "use-powerpoint", "use-forms"]
    });
  }

  const lessonDefinitions = [
    ["choose-m365-app", "Choose the right Microsoft 365 app", "Recognize which Microsoft 365 app best fits a common KPC task."],
    ["use-word", "Use Word for documents", "Create and edit letters, procedures and other text-based KPC documents."],
    ["use-excel", "Use Excel for lists and tracking", "Work with tables, lists and simple tracking information."],
    ["use-powerpoint", "Use PowerPoint for presentations", "Create and review slides for meetings, updates and training."],
    ["use-forms", "Use Forms to collect information", "Create or complete a simple form for surveys, registrations or feedback."]
  ];

  lessonDefinitions.forEach(([id, title, description]) => {
    if (data.lessons.some(lesson => lesson.id === id)) return;
    data.lessons.push({
      id,
      pathId: "everyday-apps",
      title,
      description,
      outcome: `I can ${title.charAt(0).toLowerCase()}${title.slice(1)}.`,
      whyItMatters: "Choosing the right tool keeps KPC work simpler and easier for other volunteers to continue.",
      estimatedMinutes: 4,
      microsoftVideo: null,
      kpcVideo: { url: "", status: "coming-soon" },
      screenshots: [],
      steps: [],
      practiceTask: "",
      knowledgeCheck: [],
      troubleshooting: [],
      relatedKitchenTalkId: null,
      status: "lesson outline",
      contentStatus: ["lesson being developed"]
    });
  });
})();