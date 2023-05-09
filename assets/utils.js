export function embolden() {
  let boldRatio = 0.5;
  function createStyleSheet(){
    var style = document.createElement("style");
    style.id = "qr-style-id";
    style.innerHTML = 
     ".qr-highlight {font-weight: bold}  \
      .qr-rest {opacity: 0.9}";
    document.getElementsByTagName("head")[0].appendChild(style);
  }
  function deleteStyleSheet(){
      var sheet = document.getElementById("qr-style-id");
      sheet.remove();
  }
  function hasStyleSheet(){
    return document.getElementById("qr-style-id") != null;
  }
  function emboldenWord(word){
    numBold = Math.floor(boldRatio * word.length);
    return (
      '<qr class="qr-highlight">' +
      word.slice(0, numBold) +
      "</qr>" +
      '<qr class="qr-rest">' +
      word.slice(numBold) +
      "</qr>"
    );


  }
  function emboldenText(text){
      var changed = "";
      for (var word of text.split(" ")) {
        changed += emboldenWord(word) + " ";
      }
      return changed;

  }
  function sanitize(str){
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/=/g, "&#x3D;")
        .replace(/\"/g, "&quot;")
        .replace(/\//g, "&#x2F;")
        .replace(/'/g, "&#39;")
        .replace(/`/g, "&#x60;");

  }
  function emboldenNode(node){
    if (
      node.tagName === "SCRIPT" ||
      node.tagName === "STYLE" ||
      node.nodeType === 8
    )
      return;
    if (node.childNodes == undefined || node.childNodes.length == 0) {
      if (node.textContent != undefined && node.tagName == undefined) {
        var newNode = document.createElement("qr");
        newNode.innerHTML = emboldenText(sanitize(node.textContent));
        if (node.textContent.length > 20) {
          node.replaceWith(newNode);
        }
      }
    } else {
        for (var child of node.childNodes) {
          emboldenNode(child);
        }
      }
    }

    if (hasStyleSheet()) {
      deleteStyleSheet();
    } else {
      createStyleSheet();
      emboldenNode(document.body);
    }

}
 

// export function patternsInclude(patterns, url) {
//   for (var pattern of patterns) {
//     if (url.match(pattern)) {
//       return true;
//     }
//   }
//   return false;
// }