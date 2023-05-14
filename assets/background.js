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


