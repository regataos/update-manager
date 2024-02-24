// This function lists the updates available automatically
function install_all_apps() {
	const exec = require('child_process').exec;
	const fs = require('fs');

	var files = [];

	// Read the app store's JSON files
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
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
									exec(command_line, function (error, call, errlog) {
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
								exec(command_line, function (error, call, errlog) {
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
			exec(command_line, function (error, call, errlog) {
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

setInterval(function () {
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
	exec(command_line, function (error, call, errlog) {
	});

	setTimeout(function () {
		$("div#update-app-other-updates").css("display", "none");
	}, 1000);
}

setInterval(updateSystemOrCancelUpdate, 500);
function updateSystemOrCancelUpdate() {
	const fs = require('fs');
	const downloadableApp = "/tmp/regataos-update/downloadable-application.txt";
	const listAppsQueue = "/tmp/regataos-update/list-apps-queue.txt";
	const upInProgress = "/tmp/regataos-update/update-in-progress.txt";
	const otherUpInProgress = "/tmp/regataos-update/other-updates-in-progress.txt";
	const upSpecificInProgress = "/tmp/regataos-update/update-specific-in-progress.txt";
	const status = "/tmp/regataos-update/status.txt";
	const allAutoUpdate = "/tmp/regataos-update/all-auto-update.txt";
	const stopAllUp = "/tmp/regataos-update/stop-all-update.txt";

	const updateAll = document.querySelector(".update-all");
	const upAllButton = document.querySelector(".update-all-button1");
	const cancelUpButton = document.querySelector(".update-all-button2");
	const upAppButton = document.querySelector(".update-app");

	function showInstallAllButton() {
		const appsList = "/tmp/regataos-update/apps-list.txt";
		if (fs.existsSync(appsList)) {
			let data = fs.readFileSync(appsList, "utf8");
			data = data.split('\n');
			if (data.length >= 2) {
				updateAll.style.display = "block";
				upAllButton.style.display = "block";
				cancelUpButton.style.display = "none";
			} else {
				updateAll.style.display = "none";
			}
		}
	}

	if ((fs.existsSync(allAutoUpdate)) || (fs.existsSync(upSpecificInProgress))) {
		upAllButton.style.display = "none";
		cancelUpButton.style.display = "block";
	} else if (fs.existsSync(otherUpInProgress)) {
		upAllButton.style.display = "none";
		cancelUpButton.style.display = "none";
		upAppButton.style.display = "none";
	} else if (fs.existsSync(upInProgress)) {
		const download = fs.readFileSync(downloadableApp, "utf8");
		const queue = fs.readFileSync(listAppsQueue, "utf8");
		if ((download.length >= 2) || (queue.length >= 2)) {
			upAllButton.style.display = "none";
			cancelUpButton.style.display = "block";
		} else {
			showInstallAllButton();
		}
	} else if (fs.existsSync(stopAllUp)) {
		if (fs.existsSync(upInProgress)) {
			upAllButton.style.display = "none";
			cancelUpButton.style.display = "block";
		} else {
			showInstallAllButton();
		}
	} else {
		var updated = fs.readFileSync(status, "utf8");
		if ((updated.indexOf("updated") > -1) == "1") {
			upAllButton.style.display = "none";
			cancelUpButton.style.display = "none";
		} else {
			showInstallAllButton();
		}
	}
}

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
function checkUpdatesManually() {
	const exec = require('child_process').exec;
	const commandLine = "/opt/regataos-update-manager/scripts/update-manager-option -update-button";
	exec(commandLine, function (error, call, errlog) { });
}
