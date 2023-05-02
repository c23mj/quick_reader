const activate = document.getElementById("br-activate");
const reset = document.getElementById("br-reset");

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

injectContentScript = (tab, script) => {
  const { id, url } = tab;
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: [script],
  });
};

activate.addEventListener("click", () => {
  getCurrentTab().then((tab) => {
    injectContentScript(tab, "assets/scripts/content.js");
  });
});

reset.addEventListener("click", () => {
  getCurrentTab().then((tab) => {
    injectContentScript(tab, "assets/scripts/reset.js");
  });
});
