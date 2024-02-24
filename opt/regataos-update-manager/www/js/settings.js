// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Automatic update
function checkAutoUpdateConfig() {
    const exec = require('child_process').exec;
    const fs = require('fs');
    const regataosUpdateConf = "/tmp/regataos-update/config/regataos-update.conf";

    if (fs.existsSync(regataosUpdateConf)) {
        const commandLine = `grep -r 'autoupdate=' ${regataosUpdateConf} | cut -d'=' -f 2-`;
        exec(commandLine, (error, stdout, stderr) => {
            const selectUpdate = document.getElementById("select-update");
            if (stdout.includes("1")) {
                selectUpdate.value = "1";
            } else if (stdout.includes("2")) {
                selectUpdate.value = "2";
            } else if (stdout.includes("3")) {
                selectUpdate.value = "3";
            }
        });
    } else {
        document.getElementById("select-update").value = "2";
    }
}
checkAutoUpdateConfig();

// Choose gpu to render
function selectAutoUpdate() {
    const exec = require('child_process').exec;
    const select = document.getElementById('select-update');
    const value = select.options[select.selectedIndex].value;
    const commandLine = "/opt/regataos-update-manager/scripts/update-manager-option -update-" + value;
    exec(commandLine, function (error, call, errlog) { });
}
