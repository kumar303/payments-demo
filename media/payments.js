document.body.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

var hasTouch = ('ontouchstart' in window) ||
               window.DocumentTouch &&
               document instanceof DocumentTouch;

var actEvent = hasTouch ? "touchstart" : "click";

document.querySelector('.prev').addEventListener(actEvent, function(e) {
    e.preventDefault();
    prev();
});

document.querySelector('.next').addEventListener(actEvent, function(e) {
    e.preventDefault();
    next();
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
    var manifestPath = window.location.href + 'manifest.webapp';
    console.log('install triggered: ' + manifestPath);
    var r = window.navigator.mozApps.install(manifestPath);
    r.onsuccess = function() {
        console.log('success!');
    }
    r.onerror = function() {
        console.log('error!');
    }

}

var current = 0;

var screens = document.querySelectorAll('#screens img');

function show(n) {
    for (var i=0; i<screens.length; i++) {
        if (i === n) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    }
}

function next() {
    current++;
    if (current > screens.length - 1) {
        current = 0;
    }
    show(current);
}

function prev() {
    current--;
    if (current < 0) {
        current = screens.length - 1;
    }
    show(current);
}

show(current);