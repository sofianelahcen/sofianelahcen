(function () {
  "use strict";

  var root = document.documentElement;
  var supportsTrig =
    window.CSS &&
    CSS.supports &&
    CSS.supports("width", "calc(tan(atan2(1px, 1px)) * 1px)");

  function applyPortraitBias() {
    var ratio = window.innerHeight / window.innerWidth;
    var bias = (ratio - 1) / 0.777777778;
    if (bias < 0) bias = 0;
    if (bias > 1) bias = 1;
    root.style.setProperty("--portrait-bias", String(bias));
  }

  if (!supportsTrig) {
    applyPortraitBias();
    window.addEventListener("resize", applyPortraitBias, { passive: true });
    window.addEventListener("orientationchange", applyPortraitBias);
  }

  root.classList.add("is-ready");
})();
