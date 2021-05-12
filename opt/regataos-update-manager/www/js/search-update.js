// Check for updates when opening the application
function check_updates() {
    const exec = require('child_process').exec;
    const fs = require('fs');

    fs.access("/tmp/regataos-update/already_updated.txt", (err) => {
    if (err) {
        fs.access("/tmp/regataos-update/status.txt", (err) => {
        if (!err) {
            var status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
            if ((status.indexOf("check-updates") > -1) == "0") {
                var command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -search-up";
                console.log(command);
                exec(command,function(error,call,errlog){
                });
            }
            return;

        } else {
            var command = "sudo /opt/regataos-update-manager/scripts/regataos-up.sh -search-up";
            console.log(command);
            exec(command,function(error,call,errlog){
            });
        }
        })
    return;
    }
    })
}
