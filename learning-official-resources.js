(() => {
  const lesson = window.KPCLearning?.lessons?.find(item => item.id === "outlook-overview");
  if (!lesson) return;

  lesson.microsoftVideo = {
    title: "Outlook training",
    publisher: "Microsoft Support",
    duration: "Choose the section for your device",
    url: "https://support.microsoft.com/en-US/Outlook/outlook-training"
  };
})();