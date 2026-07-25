const approvedMicrosoft365Url = "https://support.microsoft.com/en-us/office/what-is-microsoft-365-c4001f27-e798-4ed8-93e4-656d5d64d509?wt.mc_id=otc_m365basics";

window.openTopic = function(id) {
  const topic = topics.find((item) => item.id === id);
  if (!topic) return;

  const approvedResource = id === "what"
    ? `<a class="button dark" href="${approvedMicrosoft365Url}" target="_blank" rel="noopener noreferrer">Watch: What is Microsoft 365?</a>`
    : "";

  topicContent.innerHTML = `
    <p class="eyebrow">Kitchen Talk preview</p>
    <h2>${topic.title}</h2>
    <p>${topic.summary}</p>
    <ul class="topic-points">${topic.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    ${approvedResource}
  `;
  topicDialog.showModal();
};