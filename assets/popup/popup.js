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



function updateAuto(autoApply){
  if(autoApply){
    autoButton.innerHTML = "<span> Disable Auto Apply <span></span><span style = 'font-size:8px'> <br> &#x28;Cmd/Ctrl + I&#x29;</span>";
    autoButton.className = "auto-enabled";
  } else{
    autoButton.innerHTML = "<span> Enable Auto Apply <span></span><span style = 'font-size:8px'> <br> &#x28;Cmd/Ctrl + I&#x29;</span>";
    autoButton.className = "auto-disabled";
  }

}
autoButton.addEventListener("click", () => {
  chrome.storage.sync.get(["autoApply"], (data) => {
    updateAuto(!data.autoApply);
    chrome.storage.sync.set({ autoApply: !data.autoApply });
  });
});

chrome.storage.sync.get(["autoApply"], (data) =>{
  updateAuto(data.autoApply);
});



chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-auto"){
    chrome.storage.sync.get(["autoApply"], (data) =>{
      updateAuto(!data.autoApply);
    });

  }

});