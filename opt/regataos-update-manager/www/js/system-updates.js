// Check the status of system updates.
//Quit if already running.
function checkSystemUpdateStatus() {
    const exec = require('child_process').exec;
    const commandLine = "ps -C status-other-up >/dev/null; if [ $? = 1 ]; then /opt/regataos-update-manager/scripts/status-other-updates.sh start; fi";
    exec(commandLine, function (error, call, errlog) { });
}
checkSystemUpdateStatus();

// Display system updates.
setInterval(showSystemUpdates, 500);
function showSystemUpdates() {
    const fs = require('fs');
    const packageListHtml = "/tmp/regataos-update/package-list-html.txt";
    const packageListFile = "/tmp/regataos-update/package-list.txt";
    const updatedApps = "/tmp/regataos-update/updated-apps.txt";

    if (fs.existsSync(packageListHtml)) {
        const data = fs.readFileSync(packageListFile, "utf8");
        const systemUpdates = document.querySelector(".div2-other-updates");

        if (data.length >= 2) {
            if (fs.existsSync(updatedApps)) {
                const displayOtherUpdates = fs.readFileSync(updatedApps, "utf8");
                if (displayOtherUpdates.includes("other-updates")) {
                    systemUpdates.style.display = "";
                } else {
                    systemUpdates.style.display = "grid";
                }
            } else {
                systemUpdates.style.display = "grid";
            }
        } else {
            systemUpdates.style.display = "";
        }
        return;
    }
}
showSystemUpdates();

// Show number of system updates.
setInterval(showNumberSystemUpdates, 500);
function showNumberSystemUpdates() {
    const fs = require('fs');
    const statusFile = "/tmp/regataos-update/status.txt";
    const numberPackagesFile = "/tmp/regataos-update/number-packages.txt";

    if (fs.existsSync(statusFile)) {
        const appStatus = fs.readFileSync(statusFile, "utf8");
        if ((appStatus.includes("show-updates")) || (appStatus.includes("installing-updates"))) {
            if (fs.existsSync(numberPackagesFile)) {
                const numberPackages = fs.readFileSync(numberPackagesFile, "utf8");
                document.querySelector(".updates-package-number").innerHTML = numberPackages;
            }
        }
    }
}
showNumberSystemUpdates();

// system update status.
setInterval(systemUpdateStatus, 500);
function systemUpdateStatus() {
    const fs = require('fs');
    const updatedAppsFile = "/tmp/regataos-update/updated-apps.txt";
    const regataosOtherUpdatesLog = "/var/log/regataos-logs/regataos-other-updates.log";
    const updateSpecificProgressFile = "/tmp/regataos-update/update-specific-in-progress.txt";

    if (fs.existsSync(updatedAppsFile)) {
        const listAppsQueue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
        const installingApplication = fs.readFileSync("/tmp/regataos-update/installing-application-other-updates.txt", "utf8");
        const downloadableApplication = fs.readFileSync("/tmp/regataos-update/downloadable-application-other-updates.txt", "utf8");
        const updatedApplication = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");

        const pendingOtherUpdates = document.querySelector("div#pending-other-updates");
        const downloadingOtherUpdates = document.querySelector("div#downloading-other-updates");
        const installingOtherUpdates = document.querySelector("div#installing-other-updates");
        const percentageOtherUpdates = document.querySelector("div#percentage-other-updates");
        const updateAppOtherUpdates = document.querySelector("div#update-app-other-updates");
        const concludedOtherUpdates = document.querySelector("div#concluded-other-updates");

        if (listAppsQueue.includes("other-updates")) {
            pendingOtherUpdates.style.display = "block";
            downloadingOtherUpdates.style.display = "none";
            installingOtherUpdates.style.display = "none";
            percentageOtherUpdates.style.display = "none";
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

        } else if (installingApplication.includes("other-updates")) {
            pendingOtherUpdates.style.display = "none";
            downloadingOtherUpdates.style.display = "none";
            installingOtherUpdates.style.display = "block";
            percentageOtherUpdates.style.display = "block";
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

        } else if (downloadableApplication.includes("other-updates")) {
            pendingOtherUpdates.style.display = "none";
            downloadingOtherUpdates.style.display = "block";
            installingOtherUpdates.style.display = "none";
            percentageOtherUpdates.style.display = "block";
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

        } else if (updatedApplication.includes("other-updates")) {
            pendingOtherUpdates.style.display = "none";
            downloadingOtherUpdates.style.display = "none";
            installingOtherUpdates.style.display = "none";
            percentageOtherUpdates.style.display = "none";
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "block";

        } else {
            pendingOtherUpdates.style.display = "none";
            downloadingOtherUpdates.style.display = "none";
            installingOtherUpdates.style.display = "none";
            percentageOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

            if (fs.existsSync(updateSpecificProgressFile)) {
                updateAppOtherUpdates.style.display = "none";
            } else {
                if (fs.existsSync(regataosOtherUpdatesLog)) {
                    updateAppOtherUpdates.style.display = "none";
                } else {
                    updateAppOtherUpdates.style.display = "block";
                }
            }
        }
    }
}
systemUpdateStatus();

// Show progress of system updates.
const systemUpProgress = setInterval(systemUpdatesProgress, 500);
function systemUpdatesProgress() {
    const fs = require('fs');
    const exec = require('child_process').exec;
    const statusFile = "/tmp/regataos-update/status.txt";
    const regataosOtherUpdatesLog = "/var/log/regataos-logs/regataos-other-updates.log";
    const regataosOtherUpdatesFile = "/var/log/regataos-logs/regataos-other-updates.txt";
    const downloadableAppOtherUpdates = "/tmp/regataos-update/downloadable-application-other-updates.txt";
    const installingAppOtherUpdates = "/tmp/regataos-update/installing-application-other-updates.txt";

    if (fs.existsSync(statusFile)) {
        const currentStatus = fs.readFileSync(statusFile, "utf8");
        if ((currentStatus.includes("no-updates")) || (currentStatus.includes("never-updates"))) {
            clearInterval(systemUpProgress);
        } else {
            const percentageOtherUpdates = document.querySelector("div#percentage-other-updates");
            const updateAppOtherUpdates = document.querySelector("div#update-app-other-updates");

            function clearProgress() {
                const commandLine = `echo "" > "${downloadableAppOtherUpdates}"; echo "" > "${installingAppOtherUpdates}"`;
                exec(commandLine, function (error, call, errlog) { });
                clearInterval(systemUpProgress);
            }

            function progressInstalling() {
                const commandLine1 = ` echo "" > "${downloadableAppOtherUpdates}"; echo "other-updates" > "${installingAppOtherUpdates}"`;
                exec(commandLine1, function (error, call, errlog) { });

                const commandLine2 = `grep -r 'Installing:' ${regataosOtherUpdatesFile} | sed 's/(   /(/' | sed 's/(  /(/' | sed 's/( /(/' | awk '{print $1}' | tail -1 | head -1`;
                exec(commandLine2, (error, stdout, stderr) => {
                    if (stdout) {
                        percentageOtherUpdates.innerHTML = stdout;
                    }
                });
                updateAppOtherUpdates.style.display = "none";
            }

            function progressChecking() {
                const fs = require('fs');
                const getTranslation = selectTranslationFile();

                const commandLine = `echo "other-updates" > "${downloadableAppOtherUpdates}"; echo "" > "${installingAppOtherUpdates}"`;
                exec(commandLine, function (error, call, errlog) { });

                let data = fs.readFileSync(getTranslation, "utf8");
                data = JSON.parse(data);

                for (let i = 0; i < data.length; i++) {
                    percentageOtherUpdates.innerHTML = data[i].home.updateStatus.checking;
                }

                updateAppOtherUpdates.style.display = "none";
            }

            function progressRetrieving() {
                const commandLine1 = `echo "other-updates" > "${downloadableAppOtherUpdates}"; echo "" > "${installingAppOtherUpdates}"`
                exec(commandLine1, function (error, call, errlog) { });

                const commandLine2 = `grep -r 'Retrieving' ${regataosOtherUpdatesFile} | sed 's/(   /(/' | sed 's/(  /(/' | sed 's/( /(/' | awk '{print $4}' | sed 's/,//' | tail -1 | head -1`;
                exec(commandLine2, (error, stdout, stderr) => {
                    if (stdout) {
                        percentageOtherUpdates.innerHTML = stdout;
                    }
                });
                updateAppOtherUpdates.style.display = "none";
            }

            if (fs.existsSync(regataosOtherUpdatesLog)) {
                const generateProgressFile = `cat ${regataosOtherUpdatesLog} | awk 'NF>0' > ${regataosOtherUpdatesFile}; cat ${regataosOtherUpdatesFile}`;
                exec(generateProgressFile, (error, stdout, stderr) => {
                    if (stdout) {
                        const progress = stdout;

                        if ((progress.includes("have been updated")) || (progress.includes("There are running programs"))) {
                            clearProgress();
                        } else if ((progress.includes("Executing")) || (progress.includes("Installing"))) {
                            progressInstalling();
                        } else if (progress.includes("Checking")) {
                            progressChecking();
                        } else if (progress.includes("Retrieving")) {
                            progressRetrieving();
                        } else {
                            updateAppOtherUpdates.style.display = "none";
                        }
                    }
                });
            } else {
                const clearOtherUpdates = `echo "" > "${downloadableAppOtherUpdates}"; echo "" > "${installingAppOtherUpdates}"`
                exec(clearOtherUpdates, function (error, call, errlog) { });
            }
        }
    }
}
systemUpdatesProgress();

// Functions to show or hide "Other updates" details.
function displayDetails(display) {
    const fs = require('fs');
    const moreDetailsContents = document.querySelector(".more-details-contents");
    const showDetails = document.querySelector(".show-details");
    const hideDetails = document.querySelector(".hide-details");

    if (display.includes("show")) {
        const packageListHtml = "/tmp/regataos-update/package-list-html.txt";
        if (fs.existsSync(packageListHtml)) {
            let getPackageListHtml = fs.readFileSync(packageListHtml, "utf8");
            getPackageListHtml = getPackageListHtml.replace(/\s/g, "\n");
            moreDetailsContents.innerHTML = getPackageListHtml;
        }
        showDetails.style.display = "none";
        hideDetails.style.display = "flex";
        moreDetailsContents.style.display = "block";
    } else {
        moreDetailsContents.style.display = "none";
        showDetails.style.display = "flex";
        hideDetails.style.display = "none";
    }
}

// Check and show the installation status of system updates.
setInterval(checkInstallStatusOfSystemUpdates, 1000);
function checkInstallStatusOfSystemUpdates() {
    const fs = require('fs');
    const listSystemUpdates = "/tmp/regataos-update/package-list.txt";
    const systemUpdateInstalled = "/tmp/regataos-update/system-update-installed.txt"
    const waitingForInstallation = "/tmp/regataos-update/waiting-for-installation.txt"
    const installingSystemUpdate = "/tmp/regataos-update/installing-system-update.txt"
    const downloadingSystemUpdate = "/tmp/regataos-update/downloading-system-update.txt"

    if (fs.existsSync(listSystemUpdates)) {
        const systemUpdates = fs.readFileSync(listSystemUpdates, "utf8");
        const fileLines = systemUpdates.split('\n');
        fileLines.forEach(line => {
            if (document.querySelector(`.otherup-app-status-concluded-${line}`) !== null) {
                const installed = fs.readFileSync(systemUpdateInstalled, "utf8");
                const waiting = fs.readFileSync(waitingForInstallation, "utf8");
                const installing = fs.readFileSync(installingSystemUpdate, "utf8");
                const downloading = fs.readFileSync(downloadingSystemUpdate, "utf8");

                if (installed.includes(line)) {
                    document.querySelector(`.otherup-app-status-concluded-${line}`).style.display = "block";
                    document.querySelector(`.otherup-app-status-waiting-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-install-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-download-${line}`).style.display = "none";
                } else if (installing.includes(line)) {
                    document.querySelector(`.otherup-app-status-concluded-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-waiting-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-install-${line}`).style.display = "block";
                    document.querySelector(`.otherup-app-status-download-${line}`).style.display = "none";
                } else if (waiting.includes(line)) {
                    document.querySelector(`.otherup-app-status-concluded-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-waiting-${line}`).style.display = "block";
                    document.querySelector(`.otherup-app-status-install-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-download-${line}`).style.display = "none";
                } else if (downloading.includes(line)) {
                    document.querySelector(`.otherup-app-status-concluded-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-waiting-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-install-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-download-${line}`).style.display = "block";
                } else {
                    document.querySelector(`.otherup-app-status-concluded-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-waiting-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-install-${line}`).style.display = "none";
                    document.querySelector(`.otherup-app-status-download-${line}`).style.display = "none";
                }
            }
        });
    }
}
checkInstallStatusOfSystemUpdates();