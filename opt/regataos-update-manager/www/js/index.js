// Show app only when the UI is ready
const gui = require('nw.gui');
onload = function () {
    gui.Window.get().show();
}

const win = nw.Window.get();
// Move window to top left of screen
win.moveTo(0, 0);
// Move window to middle of screen
win.setPosition('center');

// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);
