// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslationPages() {
    const fs = require('fs');
    const getTranslation = selectTranslationFile();

    let data = fs.readFileSync(getTranslation, "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Apply translations according to page URL
        const pageUrl = window.location.href;

        if (pageUrl.includes("home.html")) {
            // Title
            document.querySelector("h1").innerHTML = data[i].index.windowTitle;

            // Top button
            document.querySelector(".update-all-button1").innerHTML = data[i].home.topButton.updateAll;
            document.querySelector(".update-all-button2").innerHTML = data[i].home.topButton.cancel;

            // Update status
            document.querySelector(".check-update-title").innerHTML = data[i].home.appStatus.checkUp;
            document.querySelector(".without-update-title").innerHTML = data[i].home.appStatus.noUpdates;
            document.querySelector(".never-update-title").innerHTML = data[i].home.appStatus.neverUp;
            document.querySelector(".yes-up").innerHTML = data[i].home.appStatus.yesUp;
            document.querySelector(".updated").innerHTML = data[i].home.appStatus.updated;
            document.querySelector(".search-update-status").innerHTML = data[i].home.appStatus.searchUp;
            document.querySelector(".not-up-auto").innerHTML = data[i].home.appStatus.noUpAuto;
            document.querySelector(".yes-update-auto").innerHTML = data[i].home.appStatus.yesUpAuto;

            // App Status
            const appStatusPending = document.querySelectorAll(".app-status-pending");
            for (let b = 0; b < appStatusPending.length; b++) {
                appStatusPending[b].innerHTML = data[i].home.updateStatus.pending;
            }

            const appStatusDownload = document.querySelectorAll(".app-status-download");
            for (let b = 0; b < appStatusDownload.length; b++) {
                appStatusDownload[b].innerHTML = data[i].home.updateStatus.download;
            }

            const appStatusInstall = document.querySelectorAll(".app-status-install");
            for (let b = 0; b < appStatusInstall.length; b++) {
                appStatusInstall[b].innerHTML = data[i].home.updateStatus.installing;
            }

            const appStatusConcluded = document.querySelectorAll(".app-status-concluded");
            for (let b = 0; b < appStatusConcluded.length; b++) {
                appStatusConcluded[b].innerHTML = data[i].home.updateStatus.concluded;
            }

            document.querySelector("#check-updates-button").innerHTML = data[i].home.updateStatus.verify;
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
            document.querySelector("#update-app-other-updates").innerHTML = data[i].home.otherUpdates.otherUpButton;

            const moreDetailsText = document.querySelectorAll(".more-details-text");
            for (let b = 0; b < moreDetailsText.length; b++) {
                moreDetailsText[b].innerHTML = data[i].home.otherUpdates.moreDetails;
            }

        } else if (pageUrl.includes("historic.html")) {
            // Title
            document.querySelector("h1").innerHTML = data[i].index.windowTitle;
            document.querySelector(".apps-updated").innerHTML = data[i].historic.title;

            // Open app button
            const openApp = document.querySelectorAll(".open-app");
            for (let b = 0; b < openApp.length; b++) {
                openApp[b].innerHTML = data[i].historic.openApp;
            }

        } else if (pageUrl.includes("settings.html")) {
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
