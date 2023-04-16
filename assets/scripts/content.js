function test() {
  var text = document.querySelectorAll("p, li");
  for (var i = 0; i < text.length; i++) {
    text[i].innerText = "test";
  }
}

test();
