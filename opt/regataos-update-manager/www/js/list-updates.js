// Disable main hover effect after few seconds
setTimeout(function () {
	document.getElementById("loadscreen").style.display = "none";
}, 1000);

// This function lists the updates available automatically
function listUpdates() {
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
					let listAppsUpdate = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");
					if (listAppsUpdate.includes(packageName)) {
						const dad = window.document.querySelector("div#all-apps");
						const child = dad.querySelector("div#" + packageNickname);
						if (child == null) {
							let newAppBlocks = document.createElement("div");
							newAppBlocks.id = packageNickname;
							newAppBlocks.classList.add("block-app");
							let iconFile = fs.readFileSync("/tmp/regataos-update/" + packageName + "-icon.txt", "utf8");
							let appName = apps[i].name;
							let marks = "'"
							newAppBlocks.innerHTML = ' \
							<div class="icon-app" style="background-image:url(' + iconFile + ');"></div> \
							<div class="app-name">' + appName + '</div> \
							<div id="pending-' + packageNickname + '" class="app-status-pending app-status">Pending...</div> \
							<div id="downloading-' + packageNickname + '" class="app-status-download app-status">Downloading...</div> \
							<div id="download-status-' + packageNickname + '" class="download-status-app"> \
								<div id="downloaded-' + packageNickname + '" class="app-status-percentage app-status"></div> \
								<div id="total-download-' + packageNickname + '" class="total-download-percentage app-status"></div> \
								<div id="percentage-' + packageNickname + '" class="app-status-percentage app-status"></div> \
							</div> \
							<div id="installing-' + packageNickname + '" class="app-status-install app-status">Installing...</div> \
							<div id="concluded-' + packageNickname + '" class="app-status-concluded app-status">Concluded!</div> \
							<div id="update-app-' + packageNickname + '" class="update-app" onclick=' + marks + 'updateSpecificApp("' + packageNickname + '");' + marks + '>Update</div> \
							<div id="cancel-app-' + packageNickname + '" class="cancel-app-' + packageNickname + ' cancel-app" onclick=' + marks + 'cancelSpecificApp("' + packageNickname + '");' + marks + '>Cancel</div>';
							let allBlocks = document.querySelector("div#all-apps");
							allBlocks.appendChild(newAppBlocks);
							applyTranslationPages();
						}
					}
				}
				return;
			}
		});
	});
}

// List of applications in the queue and downloading
function listUpdatedQueue() {
	const fs = require('fs');
	let files = [];

	// Read the app store's JSON files
	fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
		fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
			if (!err) {
				let apps = JSON.parse(data);
				for (let i = 0; i < apps.length; i++) {
					let packageNickname = apps[i].nickname;
					let listAppsQueue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
					let downloadableApplication = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");
					let installingApplication = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");
					let updatedApplication = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");

					const appPending = document.querySelector("div#pending-" + packageNickname);
					const downloading = document.querySelector("div#downloading-" + packageNickname);
					const installing = document.querySelector("div#installing-" + packageNickname);
					const updateApp = document.querySelector("div#update-app-" + packageNickname);
					const cancelApp = document.querySelector("div.cancel-app-" + packageNickname);
					const concluded = document.querySelector("div#concluded-" + packageNickname);

					if (listAppsQueue.includes(packageNickname)) {
						appPending.style.display = "block";
						downloading.style.display = "none";
						installing.style.display = "none";
						updateApp.style.display = "none";
						setTimeout(function () {
							cancelApp.style.display = "block";
						}, 500);
						concluded.style.display = "none";
					} else if (downloadableApplication.includes(packageNickname)) {
						appPending.style.display = "none";
						downloading.style.display = "block";
						installing.style.display = "none";
						updateApp.style.display = "none";
						setTimeout(function () {
							cancelApp.style.display = "block";
						}, 500);
						concluded.style.display = "none";
					} else if (installingApplication.includes(packageNickname)) {
						appPending.style.display = "none";
						downloading.style.display = "none";
						installing.style.display = "block";
						updateApp.style.display = "none";
						cancelApp.style.display = "none";
						concluded.style.display = "none";
					} else if (updatedApplication.includes(packageNickname)) {
						appPending.style.display = "none";
						downloading.style.display = "none";
						installing.style.display = "none";
						updateApp.style.display = "none";
						cancelApp.style.display = "none";
						concluded.style.display = "block";
					} else {
						appPending.style.display = "none";
						downloading.style.display = "none";
						installing.style.display = "none";
						if (fs.existsSync('/tmp/regataos-update/other-updates-in-progress.txt')) {
							updateApp.style.display = "none";
						} else {
							setTimeout(function () {
								updateApp.style.display = "block";
							}, 500);
						}
						cancelApp.style.display = "none";
						concluded.style.display = "none";
					}
				}
				return;
			}
		});
	});
}

setInterval(function () {
	const fs = require('fs');
	if (fs.existsSync("/tmp/regataos-update/apps-list.txt")) {
		const updstatus = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
		if (updstatus.includes("show-updates")) {
			listUpdatedQueue();
			return;
		}
	}
}, 1000);
