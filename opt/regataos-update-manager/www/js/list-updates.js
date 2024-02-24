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
					let package_name = apps[i].package;
					let list_apps_update = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");

					if ((list_apps_update.indexOf(package_name) > -1) == "1") {
						const dad = window.document.querySelector("div#all-apps");
						const child = dad.querySelector("div#" + apps[i].nickname);

						if (child == null) {
							// Request the creation of the new element (block) for each app
							let new_app_blocks = document.createElement("div");

							// Add id and class to the new element
							let nickname = apps[i].nickname;
							new_app_blocks.id = nickname;
							new_app_blocks.classList.add("block-app");

							// Get the path of the app icon
							package_name = apps[i].package;
							let icon_file = fs.readFileSync("/tmp/regataos-update/" + package_name + "-icon.txt", "utf8");

							// Create the content of the block for each app
							let app_name = apps[i].name;
							let marks = "'"

							new_app_blocks.innerHTML = ' \
							<div class="icon-app" style="background-image:url(' + icon_file + ');"></div> \
							<div class="app-name">' + app_name + '</div> \
							<div id="pending-' + nickname + '" class="app-status-pending app-status">Pending...</div> \
							<div id="downloading-' + nickname + '" class="app-status-download app-status">Downloading...</div> \
							<div id="download-status-' + nickname + '" class="download-status-app"> \
								<div id="downloaded-' + nickname + '" class="app-status-percentage app-status"></div> \
								<div id="total-download-' + nickname + '" class="total-download-percentage app-status"></div> \
								<div id="percentage-' + nickname + '" class="app-status-percentage app-status"></div> \
							</div> \
							<div id="installing-' + nickname + '" class="app-status-install app-status">Installing...</div> \
							<div id="concluded-' + nickname + '" class="app-status-concluded app-status">Concluded!</div> \
							<div id="update-app-' + nickname + '" class="update-app" onclick=' + marks + 'updateSpecificApp("' + nickname + '");' + marks + '>Update</div> \
							<div id="cancel-app-' + nickname + '" class="cancel-app-' + nickname + ' cancel-app" onclick=' + marks + 'cancelSpecificApp("' + nickname + '");' + marks + '>Cancel</div>';

							let all_blocks = document.querySelector("div#all-apps");
							all_blocks.appendChild(new_app_blocks);
							applyTranslationPages();
						}
					}
				}
				return;
			}
		});
	});
}
