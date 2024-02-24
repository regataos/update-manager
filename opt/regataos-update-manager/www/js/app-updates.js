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

        } else if ((getCurrentStatus.includes("no-updates")) || (getCurrentStatus.includes("updated"))) {
            document.querySelector(".never-update-title").style.display = "none";
            document.querySelector("#main-never-update").style.display = "none";
            document.querySelector(".check-update-title").style.display = "none";
            document.querySelector("#main-check-update").style.display = "none";
            document.querySelector("#main-without-update").style.display = "block";
            document.querySelector(".with-update-title").style.display = "none";
            document.querySelector("#main-with-update").style.display = "none";
            document.querySelector(".div1-sub").style.display = "none";

            if (getCurrentStatus.includes("no-updates")) {
                document.querySelector(".without-update-title").style.display = "block";
                document.querySelector(".updated-system-title").style.display = "none";
            } else {
                document.querySelector(".without-update-title").style.display = "none";
                document.querySelector(".updated-system-title").style.display = "block";
            }

            showNumberUpdates();
            autoUpdate();
        }
    }
}
currentStatus();

// Capture percentage of app download
setInterval(downloadPercentage, 1000);
function downloadPercentage() {
    const fs = require('fs');
    const exec = require('child_process').exec;

    const downloadableApp = "/tmp/regataos-update/downloadable-application.txt";
    if (!fs.existsSync(downloadableApp)) {
        return;
    }

    let files = [];

    // Read the app store's JSON files
    fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
            if (!err) {
                let apps = JSON.parse(data);
                for (let i = 0; i < apps.length; i++) {
                    let appName = apps[i].nickname;
                    let downloadingApp = fs.readFileSync(downloadableApp, "utf8");

                    if (downloadingApp.includes(appName)) {
                        document.querySelector(`div#download-status-${appName}`).style.display = "block";

                        let downloadPercentageApp1 = `tail -2 /tmp/regataos-update/${appName}-download-percentage.log | awk '{print $7}' | head -1 | tail -1`;
                        exec(downloadPercentageApp1, (error, stdout, stderr) => {
                            if (stdout) {
                                if (!stdout.includes("100%")) {
                                    let percentage = '(' + stdout.replace(/\s/g, "") + ')'
                                    document.querySelector(`div#percentage-${appName}`).innerHTML = percentage;
                                }
                            }
                        });

                        let downloadPercentageApp2 = `tail -2 /tmp/regataos-update/${appName}-download-percentage.log | awk '{print $1}' | head -1 | tail -1 | awk '{$1=$1/1024; print $1}' | cut -d'.' -f -1`;
                        exec(downloadPercentageApp2, (error, stdout, stderr) => {
                            if (stdout) {
                                let percentage = stdout.replace(/\s/g, "") + 'MB'
                                document.querySelector(`div#downloaded-${appName}`).innerHTML = percentage;
                            }
                        });

                        let downloadPercentageApp3 = `grep -r application /tmp/regataos-update/${appName}-download-percentage.log | head -1 | tail -1 | cut -d':' -f 2- | cut -d'(' -f 2- | cut -d')' -f -1 | sed 's/M/ MB/' | sed 's/K/ KB/' | sed 's/G/ GB/'`;
                        exec(downloadPercentageApp3, (error, stdout, stderr) => {
                            if (stdout) {
                                let percentage = '/' + stdout.replace(/\s/g, "")
                                document.querySelector(`div#total-download-${appName}`).innerHTML = percentage;
                            }
                        });

                    } else {
                        document.querySelector(`div#download-status-${appName}`).style.display = "none";
                    }
                }
                return;
            }
        });
    });
}
downloadPercentage();

// List of apps that have already been updated
setInterval(listUpdatedApps, 1000);
function listUpdatedApps() {
    const fs = require('fs');

    const listAppsUpdated = "/tmp/regataos-update/list-apps-updated.txt";
    if (!fs.existsSync(listAppsUpdated)) {
        return;
    }

    let files = [];

    // Read the app store's JSON files
    fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
            if (!err) {
                let apps = JSON.parse(data);
                for (let i = 0; i < apps.length; i++) {
                    let appName = apps[i].nickname;
                    let listAppsUpdate = fs.readFileSync(listAppsUpdated, "utf8");

                    if (listAppsUpdate.includes(appName)) {
                        document.querySelector(`div#${appName}`).style.display = "none";
                    } else {
                        document.querySelector(`div#${appName}`).style.display = "block";
                    }
                }
                return;
            }
        });
    });
}
listUpdatedApps();
