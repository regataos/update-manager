// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// This function lists the updates available automatically
function listUpdated() {
    const fs = require('fs');
    let files = [];

    // Read the app store's JSON files
    fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
            if (!err) {
                let apps = JSON.parse(data);
                for (let i = 0; i < apps.length; i++) {
                    let packageName = apps[i].package;
                    let packageNickname = apps[i].nickname;
                    let listAppsUpdate = fs.readFileSync("/var/log/regataos-logs/updated-apps.txt", "utf8");
                    if (!listAppsUpdate.includes(packageNickname)) {
                        document.getElementById('update-app-' + packageNickname).remove()
                    } else {
                        let newAppBlocks = document.createElement("div");
                        newAppBlocks.id = packageNickname;
                        newAppBlocks.classList.add("block-app");
                        let icon_file = fs.readFileSync("/tmp/regataos-update/" + packageName + "-icon.txt", "utf8");
                        let marks = "'"
                        let appName = apps[i].name;
                        let appExecutable = apps[i].executable;
                        newAppBlocks.innerHTML = ' \
                        <div class="icon-app" style="background-image:url(' + icon_file + ');"></div> \
                        <div class="app-name">' + appName + '</div> \
                        <div id="update-app-' + packageNickname + '" class="open-app" onclick=' + marks + 'runApps("' + appExecutable + '");' + marks + '>Open</div>';
                        let allBlocks = document.querySelector("div#all-apps-historic");
                        allBlocks.appendChild(newAppBlocks);
                        applyTranslationPages();
                    }
                }
                return;
            }
        });
    });
}
listUpdated();

function runApps(appExec) {
    const exec = require('child_process').exec;
    const command_line = appExec;
    exec(command_line, (error, stdout, stderr) => { });
}
