import { embolden } from "./utils.js"

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      autoApply: false
    });
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status == "complete"){
        chrome.storage.sync.get(["autoApply"], async(res) =>{
            if(res.autoApply){
                chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  function: embolden
                });
            }
            
        })
    }
})

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-qr") {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: embolden,
    });
  }
  if (command === "toggle-auto-apply") {
    chrome.storage.sync.get(["autoApply"], (data) => {
      chrome.storage.sync.set({ autoApply: !data.autoApply });
    });
  }
});