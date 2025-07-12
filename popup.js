chrome.storage.local.get({ savedTexts: [] }, (data) => {
  const entries = document.getElementById("entries");
  if (data.savedTexts.length === 0) {
    entries.textContent = "No saved texts yet.";
    return;
  }

  data.savedTexts.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <p><strong>Site:</strong> ${entry.site}</p>
      <p><strong>Time:</strong> ${entry.timestamp}</p>
      <p><strong>Text:</strong> ${entry.text}</p>
      <hr>
    `;
    entries.appendChild(div);
  });
});
