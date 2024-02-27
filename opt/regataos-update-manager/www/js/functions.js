// This function lists the updates available automatically
function installAllApps() {
	const exec = require('child_process').exec;
	const fs = require('fs');
	let files = [];

	const appsList = "/tmp/regataos-update/apps-list.txt";
	const installingApp = "/tmp/regataos-update/installing-application.txt";
	const listAppsQueue = "/tmp/regataos-update/list-apps-queue.txt";
	const packageList = "/tmp/regataos-update/package-list.txt";
	const updatedApps = "/tmp/regataos-update/updated-apps.txt";
	const otherUpInProgress = "/tmp/regataos-update/other-updates-in-progress.txt";

	// Read the app store's JSON files
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
				let apps = JSON.parse(data);
				for (var i = 0; i < apps.length; i++) {
					let listAppsUpdate = fs.readFileSync(appsList, "utf8");
					let packageName = apps[i].package;
					let packageNickname = apps[i].nickname;

					if (listAppsUpdate.includes(packageName)) {
						if (fs.existsSync(installingApp)) {
							let installing = fs.readFileSync(installingApp, "utf8");
							if (!installing.includes(packageNickname)) {
								if (fs.existsSync(listAppsQueue)) {
									let queue = fs.readFileSync(listAppsQueue, "utf8");
									if (!queue.includes(packageNickname)) {
										let commandLine = `echo "${packageNickname}" >> "${listAppsQueue}"; sed -i "/^$/d" "${listAppsQueue}"`;
										exec(commandLine, (error, stdout, stderr) => { });
									}
								} else {
									if (!installing.includes(packageNickname)) {
										let commandLine = `echo "${packageNickname}" >> "${listAppsQueue}"; sed -i "/^$/d" "${listAppsQueue}"`;
										exec(commandLine, (error, stdout, stderr) => { });
									}
								}
							}
						} else {
							let commandLine = `echo "${packageNickname}" >> "${listAppsQueue}"; sed -i "/^$/d" "${listAppsQueue}"`;
							exec(commandLine, (error, stdout, stderr) => { });
						}
					}
				}

				if (fs.existsSync(packageList)) {
					let readPackageList = fs.readFileSync(packageList, "utf8");
					if (readPackageList.length >= 2) {
						let queue = fs.readFileSync(listAppsQueue, "utf8");
						let updated = fs.readFileSync(updatedApps, "utf8");
						if (!queue.includes("other-updates")) {
							if (!updated.includes("other-updates")) {
								let commandLine = `echo "other-updates" >> ${listAppsQueue}"`;
								exec(commandLine, function (error, call, errlog) { });
							}
						}
					}
				}
				return;
			}
		});
	});

	if (fs.existsSync(appsList)) {
		let commandLine = "ps -C regataos-up-all.sh; if [ $? = 1 ]; then echo OK; fi";
		exec(commandLine, (error, stdout, stderr) => {
			if (stdout) {
				if (stdout.includes("OK")) {
					if (fs.existsSync(otherUpInProgress)) {
						let commandLine = 'echo "" > "/tmp/regataos-update/all-auto-update.txt"';
						exec(commandLine, (error, stdout, stderr) => { });
					} else {
						let commandLine = "/opt/regataos-update-manager/scripts/update-functions-icontray -update-option1";
						exec(commandLine, function (error, call, errlog) { });
					}
				} else {
					let commandLine = 'echo "" > "/tmp/regataos-update/all-auto-update.txt"';
					exec(commandLine, (error, stdout, stderr) => { });
				}
			}
		});
	} else {
		let commandLine = "/opt/regataos-update-manager/scripts/update-functions-icontray -update-option2";
		exec(commandLine, function (error, call, errlog) { });
	}
}

// Install updates from the system tray icon
let timerTrayIcon = setInterval(installUpdatesTrayIcon, 1000);
function installUpdatesTrayIcon() {
	const fs = require('fs');
	const statusFile = "/tmp/regataos-update/status.txt";
	const installUpdates = "/tmp/regataos-update/install-updates.txt";
	if (fs.existsSync(installUpdates)) {
		fs.unlinkSync(installUpdates);
		const checkStatus = fs.readFileSync(statusFile, "utf8");
		if ((!checkStatus.includes("installing-updates")) && (checkStatus.includes("show-updates"))) {
			installAllApps();
		}
		clearInterval(timerTrayIcon);
	}
}

// Automatically launch the "update all" option
setInterval(startAllAutoUpdate, 1000);
function startAllAutoUpdate() {
	const fs = require('fs');
	const allAutoUpdate = "/tmp/regataos-update/all-auto-update.txt";
	if (fs.existsSync(allAutoUpdate)) {
		installAllApps();
	}
}

// Cancel installation of all updates
function cancelAllApps() {
	const exec = require('child_process').exec;
	const commandLine = 'rm -f "/tmp/regataos-update/all-auto-update.txt"; \
	rm -f "/tmp/regataos-update/install-updates.txt" \
	echo "" > "/tmp/regataos-update/stop-all-update.txt"; \
	sudo /opt/regataos-update-manager/scripts/regataos-up-cancel-all.sh';
	exec(commandLine, (error, stdout, stderr) => { });
}

// Install "other updates"
function installOtherUpdates() {
	const exec = require('child_process').exec;
	const commandLine = 'if test ! -e "/tmp/regataos-update/updated-apps.txt"; then \
	echo "" > "/tmp/regataos-update/updated-apps.txt"; fi; \
	echo "other-updates" > "/tmp/regataos-update/list-apps-queue.txt"; \
	rm -f "/tmp/regataos-update/stop-all-update.txt"; \
	sudo /opt/regataos-update-manager/scripts/regataos-up-other-up.sh';
	exec(commandLine, function (error, call, errlog) { });

	setTimeout(function () {
		document.querySelector("div#update-app-other-updates").style.display = "none";
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
		const updated = fs.readFileSync(status, "utf8");
		if (updated.includes("updated")) {
			upAllButton.style.display = "none";
			cancelUpButton.style.display = "none";
		} else {
			showInstallAllButton();
		}
	}
}

// Update application individually
function updateSpecificApp(nickname) {
	const exec = require('child_process').exec;
	const commandLine = 'if test ! -e "/tmp/regataos-update/updated-apps.txt"; then \
	echo "" > "/tmp/regataos-update/updated-apps.txt"; fi; \
	echo "' + nickname + '" >> "/tmp/regataos-update/list-apps-queue.txt"; \
	sed -i "/^$/d" "/tmp/regataos-update/list-apps-queue.txt"; \
	export NICKNAME="' + nickname + '"; \
	sudo -E /opt/regataos-update-manager/scripts/regataos-up-specific.sh ' + nickname;
	exec(commandLine, (error, stdout, stderr) => { });
}

// Update application individually
function cancelSpecificApp(nickname) {
	const exec = require('child_process').exec;
	const commandLine = 'export NICKNAME="' + nickname + '"; \
	echo "" > "/tmp/regataos-update/cancel-up-' + nickname + '.txt"; \
	sudo -E /opt/regataos-update-manager/scripts/regataos-cancel-up-specific.sh; \
	echo "" > "/tmp/regataos-update/cancel-up-' + nickname + '.txt"';
	exec(commandLine, (error, stdout, stderr) => { });
}

// Check for updates manually
function checkUpdatesManually() {
	const exec = require('child_process').exec;
	const commandLine = "/opt/regataos-update-manager/scripts/update-manager-option -update-button";
	exec(commandLine, function (error, call, errlog) { });
}
