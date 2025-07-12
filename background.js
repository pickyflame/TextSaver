chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "saveText") {
    const [tabInfo] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        text: window.getSelection().toString(),
        hostname: window.location.hostname
      })
    });

    const now = new Date();
    const savedData = {
      text: tabInfo.result.text,
      site: tabInfo.result.hostname,
      timestamp: now.toLocaleString()
    };

    chrome.storage.local.get({ savedTexts: [] }, (data) => {
      const updated = [...data.savedTexts, savedData];
      chrome.storage.local.set({ savedTexts: updated });
    });
  }
});
