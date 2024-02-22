// Show the number of application updates
setInterval(showNumberUpdates, 500);
function showNumberUpdates() {
    const fs = require('fs');
    const numberApps = "/tmp/regataos-update/number-apps.txt";

    if (fs.existsSync(numberApps)) {
        const number = fs.readFileSync(numberApps, "utf8");
        document.querySelector(".updates-app-number").innerHTML = number;
        document.querySelector(".updates-app-number").style.display = "block";
        document.querySelector(".update-all-button1").style.display = "block";
    } else {
        document.querySelector(".update-all-button1").style.display = "none";
        document.querySelector(".updates-app-number").style.display = "none";
    }
}
showNumberUpdates();