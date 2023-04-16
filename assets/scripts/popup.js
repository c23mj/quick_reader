const activate = document.getElementById("br-activate");
const reset = document.getElementById("br-reset");

getCurrentTab = async () => {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

injectContentScript = (tab) => {
  const { id, url } = tab;
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ["/assets/scripts/content.js"],
  });
};

activate.addEventListener("click", () => {
  activate.innerText = "hello!";
  getCurrentTab().then((tab) => {
    injectContentScript(tab);
  });
});

// reset.addEventListener("click", () => {});
