// Check for updates when opening the application
function checkUpdates() {
    const exec = require('child_process').exec;
    const fs = require('fs');

    const alreadyUpdated = "/tmp/regataos-update/already_updated.txt";
    if (fs.existsSync(alreadyUpdated)) {
        return;
    }

    const status = "/tmp/regataos-update/status.txt";
    if (fs.existsSync(status)) {
        const checkStatus = fs.readFileSync(status, "utf8");
        if (checkStatus.includes("never-updates")) {
            const command = `echo "never-updates" > ${status}`;
            exec(command, function (error, call, errlog) { });
        } else if ((!checkStatus.includes("check-updates")) || (!checkStatus.includes("show-updates"))) {
            const command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config";
            exec(command, function (error, call, errlog) { });
        }
    } else {
        const updateConfig = fs.readFileSync("/tmp/regataos-update/config/regataos-update.conf", "utf8");
        if (updateConfig.includes("autoupdate=3")) {
            const command = `echo "never-updates" > "${status}"`;
            exec(command, function (error, call, errlog) { });
        } else {
            const command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config";
            exec(command, function (error, call, errlog) { });
        }
    }
}
checkUpdates();