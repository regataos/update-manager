// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslationPages() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Apply translations according to page URL
        pageUrl = window.location.href;

        if ((pageUrl.indexOf("home.html") > -1) == "1") {
            // Title
            document.querySelector("h1").innerHTML = data[i].index.windowTitle;

            // Top button
            document.querySelector(".update-all-button1").innerHTML = data[i].home.topButton.updateAll;
            document.querySelector(".update-all-button2").innerHTML = data[i].home.topButton.cancel;

            // App Status
            document.querySelector(".check-up").innerHTML = data[i].home.appStatus.checkUp;
            document.querySelector(".no-up").innerHTML = data[i].home.appStatus.noUpdates;
            document.querySelector(".never-up").innerHTML = data[i].home.appStatus.neverUp;
            document.querySelector(".yes-up").innerHTML = data[i].home.appStatus.yesUp;
            document.querySelector(".updated").innerHTML = data[i].home.appStatus.updated;
            document.querySelector(".search-update-status").innerHTML = data[i].home.appStatus.searchUp;
            document.querySelector(".not-up-auto").innerHTML = data[i].home.appStatus.noUpAuto;
            document.querySelector(".yes-update-auto").innerHTML = data[i].home.appStatus.yesUpAuto;

            // Update status
            document.querySelector(".app-status-pending").innerHTML = data[i].home.updateStatus.pending;
            document.querySelector(".app-status-download").innerHTML = data[i].home.updateStatus.download;
            document.querySelector(".app-status-install").innerHTML = data[i].home.updateStatus.installing;
            document.querySelector(".app-status-concluded").innerHTML = data[i].home.updateStatus.concluded;
            document.querySelector("#check-updates-button").innerHTML = data[i].home.updateStatus.checking;
            document.querySelector("#check-updates-button-title").innerHTML = data[i].home.updateStatus.allReady;
            document.querySelector("#check-updates-button-desc").innerHTML = data[i].home.updateStatus.allReadyDesc;

            // Button
            const updateApp = document.querySelectorAll(".update-app");
            for (let b = 0; b < updateApp.length; b++) {
                updateApp[b].innerHTML = data[i].home.button.update;
            }

            const cancelUpdate = document.querySelectorAll(".cancel-app");
            for (let b = 0; b < cancelUpdate.length; b++) {
                cancelUpdate[b].innerHTML = data[i].home.button.cancel;
            }

            // Other updates
            document.querySelector(".other-updates .app-name").innerHTML = data[i].home.otherUpdates.title;
            document.querySelector(".more-details-text").innerHTML = data[i].home.otherUpdates.moreDetails;
            document.querySelector("#update-app-other-updates").innerHTML = data[i].home.otherUpdates.otherUpButton;

        } else if ((pageUrl.indexOf("historic.html") > -1) == "1") {
            // Title
            document.querySelector("h1").innerHTML = data[i].index.windowTitle;
            document.querySelector(".apps-updated").innerHTML = data[i].historic.title;

            // Open app button
            const openApp = document.querySelectorAll(".open-app");
            for (let b = 0; b < openApp.length; b++) {
                openApp[b].innerHTML = data[i].historic.openApp;
            }

        } else if ((pageUrl.indexOf("settings.html") > -1) == "1") {
            // Title
            document.querySelector("h1").innerHTML = data[i].index.windowTitle;
            document.querySelector(".apps-settings").innerHTML = data[i].settings.title;

            // Auto update option
            document.querySelector(".up-apps-auto").innerHTML = data[i].settings.autoUpdateOption.title;
            document.querySelector(".selectnav .up-on").innerHTML = data[i].settings.autoUpdateOption.autoUpOn;
            document.querySelector(".selectnav .up-only").innerHTML = data[i].settings.autoUpdateOption.checkUpOnly;
            document.querySelector(".selectnav .up-off").innerHTML = data[i].settings.autoUpdateOption.neverUpdate;
        }
    }
}
applyTranslationPages();
