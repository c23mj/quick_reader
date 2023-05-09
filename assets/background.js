// import embolden from utils.js


// chrome.commands.onCommand.addListener(async (command) => {
//     if(command === "toggle-qr"){
//         let queryOptions = { active: true, lastFocusedWindow: true };
//         let [tab] = await chrome.tabs.query(queryOptions);
//         const { id, url } = tab;

//         chrome.scripting.executeScript({
//           target: { tabId: id, allFrames: true },
//           function: embolden
//         });
//     }
// });