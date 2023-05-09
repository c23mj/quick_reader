import { embolden } from "../utils.js";
let toggle = document.getElementById("qr-toggle");
let auto = document.getElementById("qr-auto");

toggle.addEventListener("click", async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: embolden
    });
});

auto.addEventListener("click", () => {
  auto.innerText = "clicked!"
});
