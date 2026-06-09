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

// System update status.
function checkProgress(filePath) {
    const fs = require('fs');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        return lines[lines.length - 2];
    } catch (err) {
        console.error('Error reading the file:', err);
        return null;
    }
}

setInterval(systemUpdateStatus, 1000);
function systemUpdateStatus() {
    const fs = require('fs');
    const updatedAppsFile = "/tmp/regataos-update/updated-apps.txt";
    const regataosOtherUpdatesLog = "/var/log/regataos-logs/regataos-other-updates.log";
    const regataosOtherUpdatesFile = "/var/log/regataos-logs/regataos-other-updates.txt";
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
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

            if (fs.existsSync(regataosOtherUpdatesFile)) {
                const status = checkProgress(regataosOtherUpdatesFile);

                if (status.includes("Checking")) {
                    installingOtherUpdates.style.display = "none";
                    percentageOtherUpdates.style.display = "none";
                } else {
                    installingOtherUpdates.style.display = "block";
                    percentageOtherUpdates.style.display = "block";
                }
            } else {
                installingOtherUpdates.style.display = "block";
                percentageOtherUpdates.style.display = "block";
            }

        } else if (downloadableApplication.includes("other-updates")) {
            pendingOtherUpdates.style.display = "none";
            installingOtherUpdates.style.display = "none";
            updateAppOtherUpdates.style.display = "none";
            concludedOtherUpdates.style.display = "none";

            if (fs.existsSync(regataosOtherUpdatesFile)) {
                const status = checkProgress(regataosOtherUpdatesFile);

                if (status.includes("Checking")) {
                    downloadingOtherUpdates.style.display = "none";
                    percentageOtherUpdates.style.display = "none";
                } else {
                    downloadingOtherUpdates.style.display = "block";
                    percentageOtherUpdates.style.display = "block";
                }
            } else {
                downloadingOtherUpdates.style.display = "block";
                percentageOtherUpdates.style.display = "block";
            }

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
const systemUpProgress = setInterval(systemUpdatesProgress, 1000);
function systemUpdatesProgress() {
    const fs = require('fs');
    const exec = require('child_process').exec;
    const statusFile = "/tmp/regataos-update/status.txt";
    const regataosOtherUpdatesLog = "/var/log/regataos-logs/regataos-other-updates.log";
    const regataosOtherUpdatesFile = "/var/log/regataos-logs/regataos-other-updates.txt";
    const downloadableAppOtherUpdates = "/tmp/regataos-update/downloadable-application-other-updates.txt";
    const installingAppOtherUpdates = "/tmp/regataos-update/installing-application-other-updates.txt";

    // Get the current step of the update process.
    function getStepUpdateProcess() {
        const regex = /\((\d+\/\d+)\)/;
        const data = fs.readFileSync(regataosOtherUpdatesFile, 'utf8');
        const lines = data.split('\n');
        let updateProcessStep = null;
        for (const line of lines) {
            const match = regex.exec(line);
            if (match) {
                updateProcessStep = match[0];
            }
        }

        if (updateProcessStep !== null) {
            return updateProcessStep;
        }
    }

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

                const updateStep = getStepUpdateProcess();
                percentageOtherUpdates.innerHTML = updateStep;
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

                const updateStep = getStepUpdateProcess();
                percentageOtherUpdates.innerHTML = updateStep;
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

// Cache of DOM elements per package — populated once when the list is rendered.
const systemUpdateElements = {};

function cacheSystemUpdateElements() {
    const fs = require('fs');
    const listSystemUpdates = "/tmp/regataos-update/package-list.txt";
    if (!fs.existsSync(listSystemUpdates)) return;

    const lines = fs.readFileSync(listSystemUpdates, "utf8").split('\n');
    lines.forEach(line => {
        if (!line || systemUpdateElements[line]) return;
        const el = document.querySelector(`.otherup-app-status-concluded-${line}`);
        if (el !== null) {
            systemUpdateElements[line] = {
                concluded: el,
                waiting:   document.querySelector(`.otherup-app-status-waiting-${line}`),
                install:   document.querySelector(`.otherup-app-status-install-${line}`),
                download:  document.querySelector(`.otherup-app-status-download-${line}`),
            };
        }
    });
}

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

        // Rebuild the DOM cache after injecting the new HTML.
        Object.keys(systemUpdateElements).forEach(k => delete systemUpdateElements[k]);
        cacheSystemUpdateElements();
    } else {
        // Clear the DOM cache when the panel is closed.
        Object.keys(systemUpdateElements).forEach(k => delete systemUpdateElements[k]);
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

    // Panel is closed — nothing to update.
    if (Object.keys(systemUpdateElements).length === 0) return;

    if (!fs.existsSync(listSystemUpdates)) return;

    // Read each status file once, outside the loop.
    const installed   = fs.readFileSync("/tmp/regataos-update/system-update-installed.txt",  "utf8");
    const waiting     = fs.readFileSync("/tmp/regataos-update/waiting-for-installation.txt", "utf8");
    const installing  = fs.readFileSync("/tmp/regataos-update/installing-system-update.txt", "utf8");
    const downloading = fs.readFileSync("/tmp/regataos-update/downloading-system-update.txt","utf8");

    const lines = fs.readFileSync(listSystemUpdates, "utf8").split('\n');
    lines.forEach(line => {
        if (!line) return;
        const els = systemUpdateElements[line];
        if (!els) return;

        // Resolve the new state for this package.
        let newState;
        if      (installed.includes(line))   newState = "concluded";
        else if (installing.includes(line))  newState = "install";
        else if (waiting.includes(line))     newState = "waiting";
        else if (downloading.includes(line)) newState = "download";
        else                                 newState = "none";

        // Skip DOM update if the state hasn't changed since last tick.
        if (els._state === newState) return;
        els._state = newState;

        els.concluded.style.display = newState === "concluded" ? "block" : "none";
        els.waiting.style.display   = newState === "waiting"   ? "block" : "none";
        els.install.style.display   = newState === "install"   ? "block" : "none";
        els.download.style.display  = newState === "download"  ? "block" : "none";
    });
}
checkInstallStatusOfSystemUpdates();
