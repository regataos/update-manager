// Check for updates when opening the application
function check_updates() {
    const exec = require('child_process').exec;
    const fs = require('fs');

    fs.access("/tmp/regataos-update/already_updated.txt", (err) => {
        if (err) {
            fs.access("/tmp/regataos-update/status.txt", (err) => {
                if (!err) {
                    var status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
                    if ((status.indexOf("never-updates") > -1) == "1") {
                        var command = 'echo "never-updates" > "/tmp/regataos-update/status.txt"';
                        exec(command, function (error, call, errlog) {
                        });

                    } else if ((status.indexOf("check-updates") > -1) == "1") {
                        var command = "Zypper is already looking for updates...";

                    } else {
                        var command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config";
                        exec(command, function (error, call, errlog) {
                        });
                    }
                    return;

                } else {
                    var update_config = fs.readFileSync("/tmp/regataos-update/config/regataos-update.conf", "utf8");
                    if ((update_config.indexOf("autoupdate=3") > -1) == "1") {
                        var command = 'echo "never-updates" > "/tmp/regataos-update/status.txt"';
                        exec(command, function (error, call, errlog) {
                        });

                    } else {
                        var command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config";
                        exec(command, function (error, call, errlog) {
                        });
                    }
                }
            })
            return;
        }
    })
}
