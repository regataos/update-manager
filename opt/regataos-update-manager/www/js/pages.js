//Detect iframe url
function detect_iframe_url() {
	var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
	const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            if ((iframe_url.indexOf("home.html") > -1) == "1") {
                $(".home a").css("border-left", "4px solid #0085e4")
            } else {
                $(".home a").css("border-left", "4px solid #2a2f35")
            }

            if ((iframe_url.indexOf("historic.html") > -1) == "1") {
		        $(".historic a").css("border-left", "4px solid #0085e4")
            } else {
                $(".historic a").css("border-left", "4px solid #2a2f35")
            }

            if ((iframe_url.indexOf("settings.html") > -1) == "1") {
		        $(".settings a").css("border-left", "4px solid #0085e4")
            } else {
                $(".settings a").css("border-left", "4px solid #2a2f35")
            }

        } else {
            if ((iframe_url.indexOf("home.html") > -1) == "1") {
                $(".home a").css("border-left", "4px solid #0085e4")
            } else {
                $(".home a").css("border-left", "4px solid #e5e5e5")
            }

            if ((iframe_url.indexOf("historic.html") > -1) == "1") {
		        $(".historic a").css("border-left", "4px solid #0085e4")
            } else {
                $(".historic a").css("border-left", "4px solid #e5e5e5")
            }

            if ((iframe_url.indexOf("settings.html") > -1) == "1") {
		        $(".settings a").css("border-left", "4px solid #0085e4")
            } else {
                $(".settings a").css("border-left", "4px solid #e5e5e5")
            }
        }
    return;
    }
    });

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
