// Show the number of application updates
function yes_up_number() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/number-apps.txt', (err) => {
    if (!err) {
        $(".update-all").css("display", "block");

        fs.readFile('/tmp/regataos-update/number-apps.txt', (err, data) => {
        if (err) throw err;
            var number = data
            $(document).ready(function() {
                $(".updates-app-number").css("display", "block");
                $(".updates-app-number").text(number);
            });
        });
    return;
    } else {
        $(".update-all").css("display", "none");
    }
    });

    fs.access('/tmp/regataos-update/number-packages.txt', (err) => {
    if (!err) {
        fs.readFile('/tmp/regataos-update/number-packages.txt', (err, data) => {
        if (err) throw err;
            var number = data
            $(document).ready(function() {
                $(".updates-package-number").text(number);
            });
        });
    return;
    }
    });
}

// Display elements on the screen according to the current status
var current_status_timer = setInterval(current_status, 100);

function current_status() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/status.txt', (err) => {
    if (!err) {
        var current_status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");

        if ((current_status.indexOf("never-updates") > -1) == "1") {
            $(".update-all").css("display", "none");
            $(".yes-up").css("display", "none");
            $(".no-up").css("display", "none");
            $(".updated_system").css("display", "none");
            $(".updated_system-check-button").css("display", "none");
            $(".check-updates-button-status").css("display", "none");
            $(".main").css("margin-bottom", "0px");
            $(".never-up").css("display", "block");
            $(".never_update_system").css("display", "block");
            $(".div2").css("display", "none");
            $(".search-update-status").css("display", "none");
            $(".auto-update-status").css("display", "none");
            $(".check-up").css("display", "none");
            $(".loading").css("display", "none");

        } else if ((current_status.indexOf("check-updates") > -1) == "1") {
            $(".update-all").css("display", "none");
            $(".yes-up").css("display", "none");
            $(".no-up").css("display", "none");
            $(".updated_system").css("display", "none");
            $(".updated_system-check-button").css("display", "none");
            $(".check-updates-button-status").css("display", "none");
            $(".main").css("margin-bottom", "60px");
            $(".never-up").css("display", "none");
            $(".never_update_system").css("display", "none");
            $(".div2").css("display", "none");
            $(".search-update-status").css("display", "block");
            $(".auto-update-status").css("display", "none");
            $(".check-up").css("display", "block");
            $(".loading").css("display", "block");

        } else if ((current_status.indexOf("show-updates") > -1) == "1") {
            $(".update-all").css("display", "block");
            $(".yes-up").css("display", "block");
            $(".no-up").css("display", "none");
            $(".updated_system").css("display", "none");
            $(".updated_system-check-button").css("display", "none");
            $(".check-updates-button-status").css("display", "none");
            $(".main").css("margin-bottom", "60px");
            $(".never-up").css("display", "none");
            $(".never_update_system").css("display", "none");
            $(".div2").css("display", "block");
            $(".search-update-status").css("display", "none");

            var update_config = fs.readFileSync("/tmp/regataos-update/config/regataos-update.conf", "utf8");
            if ((update_config.indexOf("autoupdate=1") > -1) == "1") {
                $(".not-up-auto").css("display", "none");
                $(".yes-update-auto").css("display", "block");
            } else {
                $(".not-up-auto").css("display", "block");
                $(".yes-update-auto").css("display", "none");
            }

            $(".check-up").css("display", "none");
            $(".loading").css("display", "none");

            yes_up_number();
            list_updates();
            language();

            clearInterval(current_status_timer);

        } else if ((current_status.indexOf("no-updates") > -1) == "1") {
            $(".update-all").css("display", "none");
            $(".yes-up").css("display", "none");
            $(".no-up").css("display", "none");
            $(".updated_system").css("display", "block");
            $(".updated_system-check-button").css("display", "block");
            $(".check-updates-button-status").css("display", "block");
            $(".main").css("margin-bottom", "60px");
            $(".never-up").css("display", "none");
            $(".never_update_system").css("display", "none");
            $(".div2").css("display", "none");
            $(".search-update-status").css("display", "none");
            $(".auto-update-status").css("display", "none");
            $(".check-up").css("display", "none");
            $(".loading").css("display", "none");

            clearInterval(current_status_timer);

        }
    return;
    }
    });
}

// Check if apps have already been updated
var timer_updated = setInterval(updated_status, 100);

function updated_status() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/status.txt', (err) => {
    if (!err) {
        var updated_status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");

        if ((updated_status.indexOf("updated") > -1) == "1") {
            $(".update-all").css("display", "none");
            $(".update-all-button1").css("display", "none");
            $(".update-all-button2").css("display", "none");
            $(".yes-up").css("display", "none");
            $(".no-up").css("display", "none");
            $(".div2").css("display", "block");

            var update_config = fs.readFileSync("/tmp/regataos-update/config/regataos-update.conf", "utf8");
            if ((update_config.indexOf("autoupdate=1") > -1) == "1") {
                $(".not-up-auto").css("display", "none");
                $(".yes-update-auto").css("display", "block");
            } else {
                $(".not-up-auto").css("display", "block");
                $(".yes-update-auto").css("display", "none");
            }

            $(".check-up").css("display", "none");
            $(".loading").css("display", "none");
            $(".updates-app-number").css("display", "none");
            $(".updated").css("display", "block");
            $(".updated-img").css("display", "block");

            clearInterval(timer_updated);
        }
    return;
    }
    });
}

// Functions to show or hide "Other updates" details
function show_details() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/package-list-html.txt', (err) => {
    if (!err) {
        var data = fs.readFileSync("/tmp/regataos-update/package-list-html.txt", "utf8");
        var details_contents = data.replace(/\s/g, "\n");

        $(document).ready(function() {
            $(".more-details-contents").html(details_contents);
        });
    return;
    }
    });

    $(".show-details").css("display", "none");
    $(".hide-details").css("display", "flex");
    $(".more-details-contents").css("display", "block");
    $("div.other-updates").css("height", "260px");
}

function hide_details() {
    $(".show-details").css("display", "flex");
    $(".hide-details").css("display", "none");
    $(".more-details-contents").css("display", "none");
    $("div.other-updates").css("height", "49px");
}

// List of apps that have already been updated
function list_updated_apps() {
const fs = require('fs');

var files = [];

// Read the app store's JSON files
fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
if (!err) {
var apps = JSON.parse(data);

for (var i = 0; i < apps.length; i++) {
	var app_package_name = apps[i].nickname;
	var list_apps_update = fs.readFileSync("/tmp/regataos-update/list-apps-updated.txt", "utf8");

	if (list_apps_update.indexOf(app_package_name) > -1) {
        $("div#" + app_package_name).css("display", "none");
	} else {
        $("div#" + app_package_name).css("display", "block");
    }
}
	return;
}
});
});
}

setInterval(function(){
const fs = require('fs');

fs.access('/tmp/regataos-update/list-apps-updated.txt', (err) => {
if (!err) {
    list_updated_apps();
    return;
}
});
}, 1000);

// List of applications in the queue and downloading
function list_updated_queue() {
const fs = require('fs');

var files = [];

// Read the app store's JSON files
fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
if (!err) {
var apps = JSON.parse(data);

for (var i = 0; i < apps.length; i++) {
	var app_package_name = apps[i].nickname;
	var list_apps_queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
	var downloadable_application = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");
	var installing_application = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");
	var updated_application = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");

	if (list_apps_queue.indexOf(app_package_name) > -1) {
        $("div#" + app_package_name).css("position", "relative");
        $("div#pending-" + app_package_name).css("display", "block");
        $("div#downloading-" + app_package_name).css("display", "none");
        $("div#installing-" + app_package_name).css("display", "none");
        $("div#update-app-" + app_package_name).css("display", "none");

        setTimeout(function() {
            $("div.cancel-app-" + app_package_name).css("display", "block");
        }, 500);

        $("div#concluded-" + app_package_name).css("display", "none");

    } else if (downloadable_application.indexOf(app_package_name) > -1) {
        $("div#" + app_package_name).css("position", "absolute");
        $("div#pending-" + app_package_name).css("display", "none");
        $("div#downloading-" + app_package_name).css("display", "block");
        $("div#installing-" + app_package_name).css("display", "none");
        $("div#update-app-" + app_package_name).css("display", "none");

        setTimeout(function() {
            $("div.cancel-app-" + app_package_name).css("display", "block");
        }, 500);

        $("div#concluded-" + app_package_name).css("display", "none");

    } else if (installing_application.indexOf(app_package_name) > -1) {
        $("div#" + app_package_name).css("position", "absolute");
        $("div#pending-" + app_package_name).css("display", "none");
        $("div#downloading-" + app_package_name).css("display", "none");
        $("div#installing-" + app_package_name).css("display", "block");
        $("div#update-app-" + app_package_name).css("display", "none");
        $("div.cancel-app-" + app_package_name).css("display", "none");
        $("div#concluded-" + app_package_name).css("display", "none");

    } else if (updated_application.indexOf(app_package_name) > -1) {
        $("div#" + app_package_name).css("position", "relative");
        $("div#pending-" + app_package_name).css("display", "none");
        $("div#downloading-" + app_package_name).css("display", "none");
        $("div#installing-" + app_package_name).css("display", "none");
        $("div#update-app-" + app_package_name).css("display", "none");
        $("div.cancel-app-" + app_package_name).css("display", "none");
        $("div#concluded-" + app_package_name).css("display", "block");

	} else {
        $("div#" + app_package_name).css("position", "relative");
        $("div#pending-" + app_package_name).css("display", "none");
        $("div#downloading-" + app_package_name).css("display", "none");
        $("div#installing-" + app_package_name).css("display", "none");

        if (fs.existsSync('/tmp/regataos-update/other-updates-in-progress.txt')) {
            $("div#update-app-" + app_package_name).css("display", "none");
        } else {
            //setTimeout(function() {
                $("div#update-app-" + app_package_name).css("display", "block");
            //}, 500);
        }

        $("div.cancel-app-" + app_package_name).css("display", "none");
        $("div#concluded-" + app_package_name).css("display", "none");
    }
}
	return;
}
});
});
}

setInterval(function() {
const fs = require('fs');

fs.access('/tmp/regataos-update/apps-list.txt', (err) => {
if (!err) {
    var updstatus = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
    if ((updstatus.indexOf("show-updates") > -1) == "1") {
        list_updated_queue();
        return;
    }
}
});
}, 1000);

// Show status of other package updates
var progress_other_up = setInterval(progress_other_updates, 100);

function progress_other_updates() {
const fs = require('fs');
const exec = require('child_process').exec;

fs.access('/tmp/regataos-update/status.txt', (err) => {
if (!err) {
    var current_status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");
    if ((current_status.indexOf("no-updates") > -1) == "1") {
        clearInterval(progress_other_up);

    } else if ((current_status.indexOf("never-updates") > -1) == "1") {
        clearInterval(progress_other_up);

    } else {

    fs.access('/var/log/regataos-logs/regataos-other-updates.log', (err) => {
    if (!err) {
        var progress = fs.readFileSync("/var/log/regataos-logs/regataos-other-updates.log", "utf8");

        if (progress.indexOf("have been updated") > -1) {
            var command = '\
            echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"; \
            echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"';
            exec(command,function(error,call,errlog){
            });

            clearInterval(progress_other_up);

        } else if (progress.indexOf("There are running programs") > -1) {
            var command = '\
            echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"; \
            echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"';
            exec(command,function(error,call,errlog){
            });
    
            clearInterval(progress_other_up);

        } else if (progress.indexOf("Installing") > -1) {
            var command = ' \
            echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"; \
            echo "other-updates" > "/tmp/regataos-update/installing-application-other-updates.txt"';
            exec(command,function(error,call,errlog){
            });

            var command_line = "\
            cat /var/log/regataos-logs/regataos-other-updates.log | awk 'NF>0' > /var/log/regataos-logs/regataos-other-updates.txt; \
            grep -r 'Installing:' /var/log/regataos-logs/regataos-other-updates.txt | sed 's/( /(/' | awk '{print $1}' | tail -1 | head -1";
            exec(command_line, (error, stdout, stderr) => {
			if (stdout) {
                $("div#percentage-other-updates").text(stdout);
			}
			});

        } else if (progress.indexOf("Retrieving") > -1) {
            var command = ' \
            echo "other-updates" > "/tmp/regataos-update/downloadable-application-other-updates.txt"; \
            echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"'
            exec(command,function(error,call,errlog){
            });

            var command_line = "\
            cat /var/log/regataos-logs/regataos-other-updates.log | awk 'NF>0' > /var/log/regataos-logs/regataos-other-updates.txt; \
            grep -r 'Retrieving package' /var/log/regataos-logs/regataos-other-updates.txt | sed 's/( /(/' | awk '{print $4}' | sed 's/,//' | tail -1 | head -1";
            exec(command_line, (error, stdout, stderr) => {
			if (stdout) {
                $("div#percentage-other-updates").text(stdout);
			}
			});
        } 
    }
    }); 
    }

return;
}
});   
}

// View the progress of "other updates"
function status_other_updates() {
const fs = require('fs');

if (fs.existsSync('/tmp/regataos-update/updated-apps.txt')) {

    var list_apps_queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
    var downloadable_application = fs.readFileSync("/tmp/regataos-update/downloadable-application-other-updates.txt", "utf8");
    var installing_application = fs.readFileSync("/tmp/regataos-update/installing-application-other-updates.txt", "utf8");
	var updated_application = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");

	if (list_apps_queue.indexOf("other-updates") > -1) {
        $("div#pending-other-updates").css("display", "block");
        $("div#downloading-other-updates").css("display", "none");
        $("div#installing-other-updates").css("display", "none");
        $("div#percentage-other-updates").css("display", "none");
        $("div#update-app-other-updates").css("display", "none");
        $("div#concluded-other-updates").css("display", "none");

    } else if (downloadable_application.indexOf("other-updates") > -1) {
        $("div#pending-other-updates").css("display", "none");
        $("div#downloading-other-updates").css("display", "block");
        $("div#installing-other-updates").css("display", "none");
        $("div#percentage-other-updates").css("display", "block");
        $("div#update-app-other-updates").css("display", "none");
        $("div#concluded-other-updates").css("display", "none");

    } else if (installing_application.indexOf("other-updates") > -1) {
        $("div#pending-other-updates").css("display", "none");
        $("div#downloading-other-updates").css("display", "none");
        $("div#installing-other-updates").css("display", "block");
        $("div#percentage-other-updates").css("display", "block");
        $("div#update-app-other-updates").css("display", "none");
        $("div#concluded-other-updates").css("display", "none");

    } else if (updated_application.indexOf("other-updates") > -1) {
        $("div#pending-other-updates").css("display", "none");
        $("div#downloading-other-updates").css("display", "none");
        $("div#installing-other-updates").css("display", "none");
        $("div#percentage-other-updates").css("display", "none");
        $("div#update-app-other-updates").css("display", "none");
        $("div#concluded-other-updates").css("display", "block");

	} else {
        $("div#pending-other-updates").css("display", "none");
        $("div#downloading-other-updates").css("display", "none");
        $("div#installing-other-updates").css("display", "none");
        $("div#percentage-other-updates").css("display", "none");
        $("div#concluded-other-updates").css("display", "none");

        if (fs.existsSync('/tmp/regataos-update/update-specific-in-progress.txt')) {
            $("div#update-app-other-updates").css("display", "none");
        } else {
            $("div#update-app-other-updates").css("display", "block");
        }
    }
}
}

setInterval(function(){
        status_other_updates();
}, 100);

// If it exists, display "other updates"
function show_other_updates() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/package-list-html.txt', (err) => {
    if (!err) {
        var data = fs.readFileSync("/tmp/regataos-update/package-list.txt", "utf8");
        if (data.length >= 2) {
            var updated_apps = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");
            if ((updated_apps.indexOf("other-updates") > -1) == "1") {
                $("div.other-updates").css("display", "none");
            } else {
                $("div.other-updates").css("display", "block");
            }

        } else {
            $("div.other-updates").css("display", "none");
        }
    return;
    }
});
}

setInterval(function(){
    show_other_updates();
}, 100);

// Capture percentage of app download
function download_percentage() {
const fs = require('fs');
const exec = require('child_process').exec;

var files = [];

// Read the app store's JSON files
fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
fs.readFile("/opt/regataos-store/apps-list/" +files , "utf8", function(err, data) {
if (!err) {
var apps = JSON.parse(data);

for (var i = 0; i < apps.length; i++) {
	var app_package_name = apps[i].nickname;
	var downloadable_application = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");

	if (downloadable_application.indexOf(app_package_name) > -1) {
        $("div#percentage-" + app_package_name).css("display", "block");
        $("div#downloaded-" + app_package_name).css("display", "block");
        $("div#total-download-" + app_package_name).css("display", "block");

        var command_line = "tail -2 /tmp/regataos-update/" + app_package_name + "-download-percentage.log | awk '{print $7}' | head -1 | tail -1";
		exec(command_line, (error, stdout, stderr) => {
		if (stdout) {
			if ((stdout.indexOf("100%") > -1) == "0") {
                $(document).ready(function() {
                    $("div#percentage-" + app_package_name).text('(' + stdout.replace(/\s/g, "") + ')');
                });
			}
		}
		});

        var command_line = "tail -2 /tmp/regataos-update/" + app_package_name + "-download-percentage.log | awk '{print $1}' | head -1 | tail -1 | awk '{$1=$1/1024; print $1}' | cut -d'.' -f -1";
		exec(command_line, (error, stdout, stderr) => {
		if (stdout) {
            $(document).ready(function() {
                $("div#downloaded-" + app_package_name).text(stdout.replace(/\s/g, "") + ' MB');
            });
		}
		});

        var command_line = "grep -r application /tmp/regataos-update/" + app_package_name + "-download-percentage.log | head -1 | tail -1 | cut -d':' -f 2- | cut -d'(' -f 2- | cut -d')' -f -1 | sed 's/M/ MB/' | sed 's/K/ KB/' | sed 's/G/ GB/'";
		exec(command_line, (error, stdout, stderr) => {
		if (stdout) {
            $(document).ready(function() {
                $("div#total-download-" + app_package_name).text('/' + stdout.replace(/\s/g, ""));
            });
		}
		});

    } else {
        $("div#percentage-" + app_package_name).css("display", "none");
        $("div#downloaded-" + app_package_name).css("display", "none");
        $("div#total-download-" + app_package_name).css("display", "none");
    }
}
	return;
}
});
});
}

setInterval(function(){
const fs = require('fs');

fs.access('/tmp/regataos-update/downloadable-application.txt', (err) => {
if (!err) {
    download_percentage();
    return;
}
});
}, 1000);

// Show or hide the div element for the balloon effect, used to put the app being updated to the start of the queue
function show_or_hide_balloon_effect() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/downloadable-application.txt', (err) => {
    if (!err) {
        var data = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");

        if (data.length >= 2) {
            $("div.block-app-fictitious").css("height", "49px");
            $("div.block-app-fictitious").css("margin-bottom", "10px");
            $("div.block-app-fictitious").css("padding-top", "15px");
            $("div.block-app-fictitious").css("padding-bottom", "15px");

        } else {
            fs.access('/tmp/regataos-update/installing-application.txt', (err) => {
            if (!err) {
                var data = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");
        
                if (data.length >= 2) {
                    $("div.block-app-fictitious").css("height", "49px");
                    $("div.block-app-fictitious").css("margin-bottom", "10px");
                    $("div.block-app-fictitious").css("padding-top", "15px");
                    $("div.block-app-fictitious").css("padding-bottom", "15px");
    
                } else {
                    $("div.block-app-fictitious").css("height", "0px");
                    $("div.block-app-fictitious").css("margin-bottom", "0px");
                    $("div.block-app-fictitious").css("padding-top", "0px");
                    $("div.block-app-fictitious").css("padding-bottom", "0px");
                }
            return;
    
            } else {
                $("div.block-app-fictitious").css("height", "0px");
                $("div.block-app-fictitious").css("margin-bottom", "0px");
                $("div.block-app-fictitious").css("padding-top", "0px");
                $("div.block-app-fictitious").css("padding-bottom", "0px");
            }
            });
        }
    return;

    } else {
        fs.access('/tmp/regataos-update/installing-application.txt', (err) => {
        if (!err) {
            var data = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");
    
            if (data.length >= 2) {
                $("div.block-app-fictitious").css("height", "49px");
                $("div.block-app-fictitious").css("margin-bottom", "10px");
                $("div.block-app-fictitious").css("padding-top", "15px");
                $("div.block-app-fictitious").css("padding-bottom", "15px");

            } else {
                $("div.block-app-fictitious").css("height", "0px");
                $("div.block-app-fictitious").css("margin-bottom", "0px");
                $("div.block-app-fictitious").css("padding-top", "0px");
                $("div.block-app-fictitious").css("padding-bottom", "0px");
            }
        return;

        } else {
            $("div.block-app-fictitious").css("height", "0px");
            $("div.block-app-fictitious").css("margin-bottom", "0px");
            $("div.block-app-fictitious").css("padding-top", "0px");
            $("div.block-app-fictitious").css("padding-bottom", "0px");
        }
        });
    }
    });
}

setInterval(function(){
    show_or_hide_balloon_effect();
}, 100);

// Disable the update cancel button on the backend
var timer_update_cancel = setInterval(disable_update_cancellation, 100);

function disable_update_cancellation() {
    const fs = require('fs');

    fs.access('/var/log/regataos-logs/regataos-other-updates.log', (err) => {
    if (!err) {
        var data = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");
        if (data.length <= 1) {
            $(".update-all").css("display", "none");
            clearInterval(timer_update_cancel);
        }
    }
    });
}
