// Get information from the main iframe
const mainIframe = document.getElementById("main-iframe").contentWindow;
function getIframeUrl() {
	const getUrl = mainIframe.location.href;
	return getUrl;
}

// Detect current app page
setInterval(detectIframeUrl, 500);
function detectIframeUrl() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		if (getIframeUrl().includes("home.html")) {
			document.querySelector("li#option-home .sidebar-item-effect").style.backgroundColor = "#3daee9";
		} else {
			document.querySelector("li#option-home .sidebar-item-effect").style.backgroundColor = "";
		}

		if (getIframeUrl().includes("historic.html")) {
			document.querySelector("#option-historic .sidebar-item-effect").style.backgroundColor = "#3daee9";
		} else {
			document.querySelector("#option-historic .sidebar-item-effect").style.backgroundColor = "";
		}

		if (getIframeUrl().includes("settings.html")) {
			document.querySelector("#option-settings .sidebar-item-effect").style.backgroundColor = "#3daee9";
		} else {
			document.querySelector("#option-settings .sidebar-item-effect").style.backgroundColor = "";
		}

		const sidebarItemEffectDark = document.querySelectorAll(".sidebar-item-effect");
		for (let i = 0; i < sidebarItemEffectDark.length; i++) {
			sidebarItemEffectDark[i].classList.add("sidebar-item-effect-dark");
		}

	} else {
		if (getIframeUrl().includes("home.html")) {
			document.querySelector("li#option-home .sidebar-item-effect").style.backgroundColor = "#005fb8";
		} else {
			document.querySelector("li#option-home .sidebar-item-effect").style.backgroundColor = "";
		}

		if (getIframeUrl().includes("historic.html")) {
			document.querySelector("#option-historic .sidebar-item-effect").style.backgroundColor = "#005fb8";
		} else {
			document.querySelector("#option-historic .sidebar-item-effect").style.backgroundColor = "";
		}

		if (getIframeUrl().includes("settings.html")) {
			document.querySelector("#option-settings .sidebar-item-effect").style.backgroundColor = "#005fb8";
		} else {
			document.querySelector("#option-settings .sidebar-item-effect").style.backgroundColor = "";
		}

		const sidebarItemEffectDark = document.querySelectorAll(".sidebar-item-effect");
		for (let i = 0; i < sidebarItemEffectDark.length; i++) {
			sidebarItemEffectDark[i].classList.remove("sidebar-item-effect-dark");
		}
	}

	const fs = require('fs');
	if (fs.existsSync("/var/log/regataos-logs/updated-apps.txt")) {
		document.querySelector(".historic").style.display = "block";
	} else {
		document.querySelector(".historic").style.display = "none";
	}
}

// Function of the navigation buttons
function go_home() {
	const exec = require('child_process').exec;
	const fs = require('fs');

	if (fs.existsSync("/tmp/regataos-update/status.txt")) {
		const status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
		if (status.includes("updated")) {
			const commandLine = 'echo "no-updates" > /tmp/regataos-update/status.txt';
			exec(commandLine, (error, stdout, stderr) => { });
		}
	}

	if (!getIframeUrl().includes("home.html")) {
		document.getElementById("main-iframe").contentWindow.document.location.href = "pages/home.html";
	}
}

function go_historic() {
	if (!getIframeUrl().includes("historic.html")) {
		document.getElementById("main-iframe").contentWindow.document.location.href = "pages/historic.html";
	}
}

function go_settings() {
	if (!getIframeUrl().includes("settings.html")) {
		document.getElementById("main-iframe").contentWindow.document.location.href = "pages/settings.html";
	}
}
