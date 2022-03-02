// This function lists the updates available automatically
function install_all_apps() {
	const exec = require('child_process').exec;
	const fs = require('fs');

	var files = [];

	// Read the app store's JSON files
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
	fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
	if(!err) {
		var apps = JSON.parse(data);

		for (var i = 0; i < apps.length; i++) {
			var package_name = apps[i].package;
			var list_apps_update = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");

			if ((list_apps_update.indexOf(package_name) > -1) == "1") {
				if (fs.existsSync('/tmp/regataos-update/installing-application.txt')) {
					var nickname = apps[i].nickname;
					var installing = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");

					if ((installing.indexOf(nickname) > -1) == "0") {
						if (fs.existsSync('/tmp/regataos-update/list-apps-queue.txt')) {
							var nickname = apps[i].nickname;
							var queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");

							if ((queue.indexOf(nickname) > -1) == "0") {
								var nickname = apps[i].nickname;
								var command_line = 'echo "' + nickname + '" >> "/tmp/regataos-update/list-apps-queue.txt"; \
								sed -i "/^$/d" "/tmp/regataos-update/list-apps-queue.txt"';
								exec(command_line, (error, stdout, stderr) => {
								});
							}

						} else {
							var nickname = apps[i].nickname;
							var installing = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");

							if ((installing.indexOf(nickname) > -1) == "0") {
								var nickname = apps[i].nickname;
								var command_line = 'echo "' + nickname + '" >> "/tmp/regataos-update/list-apps-queue.txt"; \
								sed -i "/^$/d" "/tmp/regataos-update/list-apps-queue.txt"';
								exec(command_line, (error, stdout, stderr) => {
								});
							}
						}
					}

				} else {
					var nickname = apps[i].nickname;
					var command_line = 'echo "' + nickname + '" >> "/tmp/regataos-update/list-apps-queue.txt"; \
					sed -i "/^$/d" "/tmp/regataos-update/list-apps-queue.txt"';
					exec(command_line, (error, stdout, stderr) => {
					});
				}
			}
		}

		fs.access('/tmp/regataos-update/package-list.txt', (err) => {
		if (!err) {
			var package_list = fs.readFileSync("/tmp/regataos-update/package-list.txt", "utf8");
			if (package_list.length >= 2) {
				var queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
				var updated = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");
				if ((queue.indexOf("other-updates") > -1) == "0") {
					if ((updated.indexOf("other-updates") > -1) == "0") {
						var command_line = 'echo "other-updates" >> "/tmp/regataos-update/list-apps-queue.txt"';
						exec(command_line,function(error,call,errlog){
						});
					}
				}
			}
		return;
		}
		});

	return;
	}
	});
	});

	fs.access('/tmp/regataos-update/apps-list.txt', (err) => {
	if (!err) {
		var command_line = "ps -C regataos-up-all.sh; if [ $? = 1 ]; then echo OK; fi";
		exec(command_line, (error, stdout, stderr) => {
		if (stdout) {
			if ((stdout.indexOf("OK") > -1) == "1") {
				fs.access('/tmp/regataos-update/other-updates-in-progress.txt', (err) => {
				if (!err) {
					var command_line = 'echo "" > "/tmp/regataos-update/all-auto-update.txt"';
					exec(command_line, (error, stdout, stderr) => {
					});

				} else {
					var command_line = "/opt/regataos-update-manager/scripts/update-functions-icontray -update-option1";
					exec(command_line,function(error,call,errlog){
					});
				}
				});

			} else {
				var command_line = 'echo "" > "/tmp/regataos-update/all-auto-update.txt"';
				exec(command_line, (error, stdout, stderr) => {
				});
			}
		}
		});
		return;

	} else {
		var command_line = "/opt/regataos-update-manager/scripts/update-functions-icontray -update-option2";
		exec(command_line,function(error,call,errlog){
		});
	}
	});
}

// Install updates from the system tray icon
var timer_trayicon = setInterval(install_updates_trayicon, 1000);
function install_updates_trayicon() {
    const fs = require('fs');

	fs.access("/tmp/regataos-update/install-updates.txt", (err) => {
	if (!err) {
		fs.unlinkSync("/tmp/regataos-update/install-updates.txt");
		install_all_apps();
		clearInterval(timer_trayicon);
		return;
	}
	});
}

// Automatically launch the "update all" option
function start_all_auto_update() {
const exec = require('child_process').exec;
const fs = require('fs');

fs.access('/tmp/regataos-update/all-auto-update.txt', (err) => {
if (!err) {
	install_all_apps();
	return;
}
});
}

setInterval(function(){
    start_all_auto_update();
}, 1000);

// Cancel installation of all updates
function cancel_all_apps() {
	const exec = require('child_process').exec;

	var command_line = 'rm -f "/tmp/regataos-update/all-auto-update.txt"; \
	echo "" > "/tmp/regataos-update/stop-all-update.txt"; \
	sudo /opt/regataos-update-manager/scripts/regataos-up-cancel-all.sh';
	exec(command_line, (error, stdout, stderr) => {
	});
}

// Install "other updates"
function install_other_updates() {
const exec = require('child_process').exec;
const fs = require('fs');

	var command_line = 'if test ! -e "/tmp/regataos-update/updated-apps.txt"; then echo "" > "/tmp/regataos-update/updated-apps.txt"; fi; \
	echo "other-updates" > "/tmp/regataos-update/list-apps-queue.txt"; \
	rm -f "/tmp/regataos-update/stop-all-update.txt"; \
	sudo /opt/regataos-update-manager/scripts/regataos-up-other-up.sh';
    exec(command_line,function(error,call,errlog){
    });

	setTimeout(function(){
		$("div#update-app-other-updates").css("display", "none");
	}, 1000);
}

function update_or_cancel() {
	const fs = require('fs');

	if (fs.existsSync('/tmp/regataos-update/all-auto-update.txt')) {
		$("div.update-all-button1").css("display", "none");
		$("div.update-all-button2").css("display", "block");

	} else if (fs.existsSync('/tmp/regataos-update/update-specific-in-progress.txt')) {
		$("div.update-all-button1").css("display", "none");
		$("div.update-all-button2").css("display", "block");

	} else if (fs.existsSync('/tmp/regataos-update/other-updates-in-progress.txt')) {
		$("div.update-all-button1").css("display", "none");
		$("div.update-all-button2").css("display", "none");
		$("div.update-app").css("display", "none");

	} else if (fs.existsSync('/tmp/regataos-update/update-in-progress.txt')) {
		var download = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");
		var queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");

        if (download.length >= 2) {
			$("div.update-all-button1").css("display", "none");
			$("div.update-all-button2").css("display", "block");

		} else if (queue.length >= 2) {
			$("div.update-all-button1").css("display", "none");
			$("div.update-all-button2").css("display", "block");

		} else {
			$("div.update-all-button1").css("display", "block");
			$("div.update-all-button2").css("display", "none");
		}

	} else if (fs.existsSync('/tmp/regataos-update/stop-all-update.txt')) {
		if (fs.existsSync('/tmp/regataos-update/update-in-progress.txt')) {
			$("div.update-all-button1").css("display", "none");
			$("div.update-all-button2").css("display", "block");

		} else if (fs.existsSync('/tmp/regataos-update/update-in-progress.txt')) {
			$("div.update-all-button1").css("display", "none");
			$("div.update-all-button2").css("display", "block");

		} else {
			var data = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");
        	if (data.length <= 1) {
				$(".update-all").css("display", "none");

			} else {
				$(".update-all").css("display", "block");
				$("div.update-all-button1").css("display", "block");
				$("div.update-all-button2").css("display", "none");
			}
		}

	} else {
		var updated = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
		if ((updated.indexOf("updated") > -1) == "1") {
			$("div.update-all-button1").css("display", "none");
			$("div.update-all-button2").css("display", "none");

		} else {
			var data = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");
        	if (data.length <= 1) {
				$(".update-all").css("display", "none");

			} else {
				$(".update-all").css("display", "block");
				$("div.update-all-button1").css("display", "block");
				$("div.update-all-button2").css("display", "none");
			}
		}
	}
}

setInterval(function(){
	update_or_cancel()
}, 1000);

// Update application individually
function update_specific_app() {
	const exec = require('child_process').exec;

	var command_line = 'if test ! -e "/tmp/regataos-update/updated-apps.txt"; then echo "" > "/tmp/regataos-update/updated-apps.txt"; fi; \
	echo "' + nickname + '" >> "/tmp/regataos-update/list-apps-queue.txt"; \
	sed -i "/^$/d" "/tmp/regataos-update/list-apps-queue.txt"; \
	export NICKNAME="' + nickname + '"; \
	sudo -E /opt/regataos-update-manager/scripts/regataos-up-specific.sh ' + nickname;
	exec(command_line, (error, stdout, stderr) => {
	});
}

// Update application individually
function cancel_specific_app() {
	const exec = require('child_process').exec;

	var command_line = 'export NICKNAME="' + nickname + '"; \
	echo "" > "/tmp/regataos-update/cancel-up-' + nickname + '.txt"; \
	sudo -E /opt/regataos-update-manager/scripts/regataos-cancel-up-specific.sh; \
	echo "" > "/tmp/regataos-update/cancel-up-' + nickname + '.txt"';
	exec(command_line, (error, stdout, stderr) => {
	});
}

// Check for updates manually
function check_updates_manually() {
	const exec = require('child_process').exec;
	var command_line = "/opt/regataos-update-manager/scripts/update-manager-option -update-button";
	exec(command_line,function(error,call,errlog){
	});

	setTimeout(function(){
		location.reload();
	}, 1000);
}
