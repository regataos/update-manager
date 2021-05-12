// This function lists the updates available automatically
function list_updated() {
const fs = require('fs');

var files = [];

// Read the app store's JSON files
fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
if(!err) {
var apps = JSON.parse(data);

for (var i = 0; i < apps.length; i++) {

	var nickname_name = apps[i].nickname;
	var list_apps_update = fs.readFileSync("/var/log/regataos-logs/updated-apps.txt", "utf8");

    if ((list_apps_update.indexOf(nickname_name) > -1) == "0") {
        var nickname = apps[i].nickname;
        document.getElementById('update-app-' + nickname).remove()

    } else {
        // Request the creation of the new element (block) for each app
		var new_app_blocks = document.createElement("div");

        // Add id and class to the new element
        var nickname = apps[i].nickname;
		new_app_blocks.id = nickname;
        new_app_blocks.classList.add("block-app");

        //Get the path of the app icon
        var package_name = apps[i].package;
        var icon_file = fs.readFileSync("/tmp/regataos-update/" + package_name + "-icon.txt", "utf8");

        // Create the content of the block for each app
        var marks = "'"

        var app_name = apps[i].name;
        var app_executable = apps[i].executable;

        new_app_blocks.innerHTML = ' \
        <div class="icon-app" style="background-image:url(' + icon_file + ');"></div> \
        <div class="app-name">' + app_name + '</div> \
        <div id="update-app-' + nickname + '" class="open-app" onclick=' + marks + 'window.app_exec="' + app_executable + '"; run_apps();' + marks + '>Open</div>';

        var all_blocks = document.querySelector("div#all-apps-historic");
        all_blocks.appendChild(new_app_blocks);
		language();
	}
}
	return;
}
});
});
}

list_updated()

function run_apps() {
    const exec = require('child_process').exec;
    var command_line = app_exec;
    exec(command_line, (error, stdout, stderr) => {
    });
}
