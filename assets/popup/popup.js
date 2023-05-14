import { embolden } from "../utils.js";
let toggleButton = document.getElementById("qr-toggle");
let autoButton = document.getElementById("qr-auto");

toggleButton.addEventListener("click", async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: embolden
    });
});


function updateAutoText(autoApply){
  if(autoApply){
    autoButton.innerText = "Disable Auto Apply"
  } else{
    autoButton.innerText = "Enable Auto Apply"
  }

}
autoButton.addEventListener("click", () => {
  chrome.storage.sync.get(["autoApply"], (data) => {
    updateAutoText(!data.autoApply);
    chrome.storage.sync.set({ autoApply: !data.autoApply });
  });
});

chrome.storage.sync.get(["autoApply"], (data) =>{
  updateAutoText(data.autoApply);
});