/* Häkchen je Seite im Browser merken (nur bei diesem Betrachter). Seite aus data-seite am Element .wrap. */
(function () {
  var wrap = document.querySelector("[data-seite]");
  var seite = wrap ? wrap.getAttribute("data-seite") : "haupt";
  var KEY = seite === "haupt" ? "fotoanleitung-v1" : "fotoanleitung-" + seite + "-v1";
  var boxes = Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"]'));
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function update() {
    var out = document.getElementById("progress");
    if (!out) return;
    var done = boxes.filter(function (b) { return b.checked; }).length;
    var mins = boxes.filter(function (b) { return b.dataset.min; });
    var minDone = mins.filter(function (b) { return b.checked; }).length;
    out.textContent = done + " von " + boxes.length + " abgehakt" + (mins.length ? " · Minimum " + minDone + "/" + mins.length : "");
  }
  boxes.forEach(function (b) {
    b.checked = !!state[b.id];
    b.addEventListener("change", function () { state[b.id] = b.checked; save(); update(); });
  });
  var reset = document.getElementById("reset");
  if (reset) reset.addEventListener("click", function () {
    boxes.forEach(function (b) { b.checked = false; }); state = {}; save(); update();
  });
  update();
})();
