//Detect iframe url
function detect_iframe_url() {
	const fs = require('fs');

	var iframe_url = document.getElementById("main-iframe").contentWindow.location.href

	if ((iframe_url.indexOf("home.html") > -1) == "1") {
		$(".home a").css("border-left", "4px solid #2d78d6ff")
	} else {
		$(".home a").css("border-left", "4px solid #e5e5e5")
	}

	if ((iframe_url.indexOf("historic.html") > -1) == "1") {
		$(".historic a").css("border-left", "4px solid #2d78d6ff")
	} else {
		$(".historic a").css("border-left", "4px solid #e5e5e5")
	}

	if ((iframe_url.indexOf("settings.html") > -1) == "1") {
		$(".settings a").css("border-left", "4px solid #2d78d6ff")
	} else {
		$(".settings a").css("border-left", "4px solid #e5e5e5")
	}

	fs.access('/var/log/regataos-logs/updated-apps.txt', (err) => {
	if (!err) {
		$(".historic").css("display", "block")
	return;
	} else {
		$(".historic").css("display", "none")
	}
	});
}

setInterval(function() {
		detect_iframe_url();
}, 100);

// Function of the navigation buttons
function go_home() {
	const exec = require('child_process').exec;
	const fs = require('fs');

    fs.access('/tmp/regataos-update/status.txt', (err) => {
	if (!err) {
		var status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
		if ((status.indexOf("updated") > -1) == "1") {
			var command_line = 'echo "no-updates" > /tmp/regataos-update/status.txt';
			exec(command_line, (error, stdout, stderr) => {
			});
		}
	return;
	}
	});

	var iframe_url = document.getElementById("main-iframe").contentWindow.location.href

	if ((iframe_url.indexOf("home.html") > -1) == "0") {
		document.getElementById("main-iframe").contentWindow.document.location.href="pages/home.html";
	}
}

function go_historic() {
	var iframe_url = document.getElementById("main-iframe").contentWindow.location.href

	if ((iframe_url.indexOf("historic.html") > -1) == "0") {
		document.getElementById("main-iframe").contentWindow.document.location.href="pages/historic.html";
	}
}

function go_settings() {
	var iframe_url = document.getElementById("main-iframe").contentWindow.location.href

	if ((iframe_url.indexOf("settings.html") > -1) == "0") {
		document.getElementById("main-iframe").contentWindow.document.location.href="pages/settings.html";
	}
}
