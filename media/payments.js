document.body.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

var flip = Flipsnap('section ul', {
    distance: 320
});

var hasTouch = ('ontouchstart' in window) ||
               window.DocumentTouch &&
               document instanceof DocumentTouch;

var actEvent = hasTouch ? "touchstart" : "click";

document.querySelector('.prev').addEventListener(actEvent, function(e) {
    e.preventDefault();
    flip.toPrev();
});

document.querySelector('.next').addEventListener(actEvent, function(e) {
    e.preventDefault();
    flip.toNext();
});

(function() {
    var request = window.navigator.mozApps.getSelf();
    request.onsuccess = function() {
        if (!request.result) {
            promptInstall();
        }
    }
    request.onerror = function() {
        promptInstall();
    }
})();

var installEl = document.getElementById('install');

function promptInstall() {
    installEl.style.display = "block";
}

installEl.addEventListener(actEvent, installApp);

function installApp(e) {
    e.preventDefault();
    window.navigator.mozApps.install(window.location.href + '/payments-demo/manifest.webapp');
}