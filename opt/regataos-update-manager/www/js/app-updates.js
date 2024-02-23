// Show the number of application updates
function showNumberUpdates() {
    const fs = require('fs');
    const numberApps = "/tmp/regataos-update/number-apps.txt";
    const upAppNumber = document.querySelector(".updates-app-number");

    if (fs.existsSync(numberApps)) {
        const number = fs.readFileSync(numberApps, "utf8");
        upAppNumber.innerHTML = number;
        upAppNumber.style.display = "block";
    } else {
        upAppNumber.style.display = "none";
    }
}
showNumberUpdates();

// Check if automatic update is enabled
function autoUpdate() {
    const fs = require('fs');
    const regataosUpConfig = "/tmp/regataos-update/config/regataos-update.conf";
    const checkAutoUpdate = fs.readFileSync(regataosUpConfig, "utf8");
    const noAutoUp = document.querySelector(".not-up-auto");
    const withAutoUp = document.querySelector(".yes-update-auto");

    if (checkAutoUpdate.includes("autoupdate=1")) {
        noAutoUp.style.display = "none";
        withAutoUp.style.display = "block";
    } else {
        noAutoUp.style.display = "block";
        withAutoUp.style.display = "none";
    }
}
autoUpdate();

// Display elements on the screen according to the current status
setInterval(currentStatus, 1000);
function currentStatus() {
    const fs = require('fs');
    const statusFile = "/tmp/regataos-update/status.txt";

    if (fs.existsSync(statusFile)) {
        const getCurrentStatus = fs.readFileSync(statusFile, "utf8");
        if (getCurrentStatus.includes("never-updates")) {
            document.querySelector(".never-update-title").style.display = "block";
            document.querySelector("#main-never-update").style.display = "block";
            document.querySelector(".check-update-title").style.display = "none";
            document.querySelector("#main-check-update").style.display = "none";
            document.querySelector(".without-update-title").style.display = "none";
            document.querySelector("#main-without-update").style.display = "none";
            document.querySelector(".with-update-title").style.display = "none";
            document.querySelector("#main-with-update").style.display = "none";
            document.querySelector(".div1-sub").style.display = "none";
            document.querySelector(".updated-system-title").style.display = "none";

        } else if (getCurrentStatus.includes("check-updates")) {
            document.querySelector(".never-update-title").style.display = "none";
            document.querySelector("#main-never-update").style.display = "none";
            document.querySelector(".check-update-title").style.display = "block";
            document.querySelector("#main-check-update").style.display = "block";
            document.querySelector(".without-update-title").style.display = "none";
            document.querySelector("#main-without-update").style.display = "none";
            document.querySelector(".with-update-title").style.display = "none";
            document.querySelector("#main-with-update").style.display = "none";
            document.querySelector(".div1-sub").style.display = "none";
            document.querySelector(".updated-system-title").style.display = "none";

        } else if (getCurrentStatus.includes("show-updates")) {
            document.querySelector(".never-update-title").style.display = "none";
            document.querySelector("#main-never-update").style.display = "none";
            document.querySelector(".check-update-title").style.display = "none";
            document.querySelector("#main-check-update").style.display = "none";
            document.querySelector(".without-update-title").style.display = "none";
            document.querySelector("#main-without-update").style.display = "none";
            document.querySelector(".with-update-title").style.display = "block";
            document.querySelector("#main-with-update").style.display = "block";
            document.querySelector(".div1-sub").style.display = "block";
            document.querySelector(".updated-system-title").style.display = "none";

            showNumberUpdates();
            autoUpdate();
            listUpdates();
            applyTranslationPages();

        } else if (getCurrentStatus.includes("no-updates")) {
            document.querySelector(".never-update-title").style.display = "none";
            document.querySelector("#main-never-update").style.display = "none";
            document.querySelector(".check-update-title").style.display = "none";
            document.querySelector("#main-check-update").style.display = "none";
            document.querySelector(".without-update-title").style.display = "block";
            document.querySelector("#main-without-update").style.display = "block";
            document.querySelector(".with-update-title").style.display = "none";
            document.querySelector("#main-with-update").style.display = "none";
            document.querySelector(".div1-sub").style.display = "none";
            document.querySelector(".updated-system-title").style.display = "none";

            showNumberUpdates();
            autoUpdate();

        } else if (getCurrentStatus.includes("updated")) {
            document.querySelector(".never-update-title").style.display = "none";
            document.querySelector("#main-never-update").style.display = "none";
            document.querySelector(".check-update-title").style.display = "none";
            document.querySelector("#main-check-update").style.display = "none";
            document.querySelector(".without-update-title").style.display = "none";
            document.querySelector("#main-without-update").style.display = "none";
            document.querySelector(".with-update-title").style.display = "none";
            document.querySelector("#main-with-update").style.display = "block";
            document.querySelector(".div1-sub").style.display = "none";
            document.querySelector(".updated-system-title").style.display = "block";

            showNumberUpdates();
            autoUpdate();
        }
    }
}
currentStatus();
