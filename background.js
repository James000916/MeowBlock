chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && String(tab.url).includes("https://www.youtube.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files : [ "script.js" ],
    });
  }
});