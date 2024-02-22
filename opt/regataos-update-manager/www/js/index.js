// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Display elements on the screen according to the current status
var current_status_timer = setInterval(current_status, 100);

function current_status() {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/status.txt', (err) => {
        if (!err) {
            var current_status = fs.readFileSync("/tmp/regataos-update/status.txt", "utf8");

            if ((current_status.indexOf("never-updates") > -1) == "1") {
                $(".yes-up").css("display", "none");
                $(".no-up").css("display", "none");
                $(".updated_system").css("display", "none");
                $(".updated_system-check-button").css("display", "none");
                $(".check-updates-button-status").css("display", "none");
                $(".main").css("margin-bottom", "0px");
                $(".never-up").css("display", "block");
                $(".never_update_system").css("display", "block");
                $(".div1-sub").css("display", "block");
                $(".div2").css("display", "none");
                $(".search-update-status").css("display", "none");
                $(".check-up").css("display", "none");
                $(".loading").css("display", "none");

            } else if ((current_status.indexOf("check-updates") > -1) == "1") {
                $(".yes-up").css("display", "none");
                $(".no-up").css("display", "none");
                $(".updated_system").css("display", "none");
                $(".updated_system-check-button").css("display", "none");
                $(".check-updates-button-status").css("display", "none");
                $(".main").css("margin-bottom", "60px");
                $(".never-up").css("display", "none");
                $(".never_update_system").css("display", "none");
                $(".div1-sub").css("display", "block");
                $(".div2").css("display", "none");
                $(".search-update-status").css("display", "block");
                $(".check-up").css("display", "block");
                $(".loading").css("display", "block");
                document.querySelector(".update-all-button1").style.display = "none";
                document.querySelector(".update-all-button2").style.display = "none";

            } else if ((current_status.indexOf("show-updates") > -1) == "1") {
                $(".yes-up").css("display", "block");
                $(".no-up").css("display", "none");
                $(".updated_system").css("display", "none");
                $(".updated_system-check-button").css("display", "none");
                $(".check-updates-button-status").css("display", "none");
                $(".div1-sub").css("display", "block");
                $(".main").css("margin-bottom", "60px");
                $(".never-up").css("display", "none");
                $(".never_update_system").css("display", "none");
                $(".div2").css("display", "grid");
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
                document.querySelector(".update-all-button1").style.display = "block";

                list_updates();
                applyTranslationPages();

                clearInterval(current_status_timer);

            } else if ((current_status.indexOf("no-updates") > -1) == "1") {
                var update_config = fs.readFileSync("/tmp/regataos-update/config/regataos-update.conf", "utf8");
                if ((update_config.indexOf("autoupdate=1") > -1) == "1") {
                    $(".not-up-auto").css("display", "none");
                    $(".yes-update-auto").css("display", "block");
                } else {
                    $(".not-up-auto").css("display", "block");
                    $(".yes-update-auto").css("display", "none");
                }

                $(".yes-up").css("display", "none");
                $(".no-up").css("display", "none");
                $(".updated_system").css("display", "block");
                $(".updated_system-check-button").css("display", "block");
                $(".check-updates-button-status").css("display", "block");
                $(".div1-sub").css("display", "none");
                $(".main").css("margin-bottom", "60px");
                $(".never-up").css("display", "none");
                $(".never_update_system").css("display", "none");
                $(".div2").css("display", "none");
                $(".search-update-status").css("display", "none");
                $(".check-up").css("display", "none");
                $(".loading").css("display", "none");
                document.querySelector(".update-all-button1").style.display = "none";
                document.querySelector(".update-all-button2").style.display = "none";

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
                document.querySelector(".update-all-button1").style.display = "none";
                document.querySelector(".update-all-button2").style.display = "none";
                $(".yes-up").css("display", "none");
                $(".no-up").css("display", "none");
                $(".div2").css("display", "none");

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
                $(".updated").css("display", "none");
                $(".updated-img").css("display", "none");
                //location.reload();
                $(".div1-sub").css("display", "none");
                $(".updated_system").css("display", "block");
                $(".updated_system-check-button").css("display", "block");
                $(".check-updates-button-status").css("display", "block");

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

            $(document).ready(function () {
                $(".more-details-contents").html(details_contents);
            });
            return;
        }
    });

    $(".show-details").css("display", "none");
    $(".hide-details").css("display", "flex");
    $(".more-details-contents").css("display", "block");
}

function hide_details() {
    $(".show-details").css("display", "flex");
    $(".hide-details").css("display", "none");
    $(".more-details-contents").css("display", "none");
}

// List of apps that have already been updated
function list_updated_apps() {
    const fs = require('fs');

    var files = [];

    // Read the app store's JSON files
    fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
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

setInterval(function () {
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
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
            if (!err) {
                var apps = JSON.parse(data);

                for (var i = 0; i < apps.length; i++) {
                    var app_package_name = apps[i].nickname;
                    var list_apps_queue = fs.readFileSync("/tmp/regataos-update/list-apps-queue.txt", "utf8");
                    var downloadable_application = fs.readFileSync("/tmp/regataos-update/downloadable-application.txt", "utf8");
                    var installing_application = fs.readFileSync("/tmp/regataos-update/installing-application.txt", "utf8");
                    var updated_application = fs.readFileSync("/tmp/regataos-update/updated-apps.txt", "utf8");

                    if (list_apps_queue.indexOf(app_package_name) > -1) {
                        $("div#pending-" + app_package_name).css("display", "block");
                        $("div#downloading-" + app_package_name).css("display", "none");
                        $("div#installing-" + app_package_name).css("display", "none");
                        $("div#update-app-" + app_package_name).css("display", "none");

                        setTimeout(function () {
                            $("div.cancel-app-" + app_package_name).css("display", "block");
                        }, 500);

                        $("div#concluded-" + app_package_name).css("display", "none");

                    } else if (downloadable_application.indexOf(app_package_name) > -1) {
                        $("div#pending-" + app_package_name).css("display", "none");
                        $("div#downloading-" + app_package_name).css("display", "block");
                        $("div#installing-" + app_package_name).css("display", "none");
                        $("div#update-app-" + app_package_name).css("display", "none");

                        setTimeout(function () {
                            $("div.cancel-app-" + app_package_name).css("display", "block");
                        }, 500);

                        $("div#concluded-" + app_package_name).css("display", "none");

                    } else if (installing_application.indexOf(app_package_name) > -1) {
                        $("div#pending-" + app_package_name).css("display", "none");
                        $("div#downloading-" + app_package_name).css("display", "none");
                        $("div#installing-" + app_package_name).css("display", "block");
                        $("div#update-app-" + app_package_name).css("display", "none");
                        $("div.cancel-app-" + app_package_name).css("display", "none");
                        $("div#concluded-" + app_package_name).css("display", "none");

                    } else if (updated_application.indexOf(app_package_name) > -1) {
                        $("div#pending-" + app_package_name).css("display", "none");
                        $("div#downloading-" + app_package_name).css("display", "none");
                        $("div#installing-" + app_package_name).css("display", "none");
                        $("div#update-app-" + app_package_name).css("display", "none");
                        $("div.cancel-app-" + app_package_name).css("display", "none");
                        $("div#concluded-" + app_package_name).css("display", "block");

                    } else {
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

setInterval(function () {
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

// Capture percentage of app download
function download_percentage() {
    const fs = require('fs');
    const exec = require('child_process').exec;

    var files = [];

    // Read the app store's JSON files
    fs.readdirSync("/opt/regataos-store/apps-list").forEach(files => {
        fs.readFile("/opt/regataos-store/apps-list/" + files, "utf8", function (err, data) {
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
                                    $(document).ready(function () {
                                        $("div#percentage-" + app_package_name).text('(' + stdout.replace(/\s/g, "") + ')');
                                    });
                                }
                            }
                        });

                        var command_line = "tail -2 /tmp/regataos-update/" + app_package_name + "-download-percentage.log | awk '{print $1}' | head -1 | tail -1 | awk '{$1=$1/1024; print $1}' | cut -d'.' -f -1";
                        exec(command_line, (error, stdout, stderr) => {
                            if (stdout) {
                                $(document).ready(function () {
                                    $("div#downloaded-" + app_package_name).text(stdout.replace(/\s/g, "") + 'MB');
                                });
                            }
                        });

                        var command_line = "grep -r application /tmp/regataos-update/" + app_package_name + "-download-percentage.log | head -1 | tail -1 | cut -d':' -f 2- | cut -d'(' -f 2- | cut -d')' -f -1 | sed 's/M/ MB/' | sed 's/K/ KB/' | sed 's/G/ GB/'";
                        exec(command_line, (error, stdout, stderr) => {
                            if (stdout) {
                                $(document).ready(function () {
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

setInterval(function () {
    const fs = require('fs');

    fs.access('/tmp/regataos-update/downloadable-application.txt', (err) => {
        if (!err) {
            download_percentage();
            return;
        }
    });
}, 1000);

// Disable the update cancel button on the backend
var timer_update_cancel = setInterval(disable_update_cancellation, 100);

function disable_update_cancellation() {
    const fs = require('fs');

    fs.access('/var/log/regataos-logs/regataos-other-updates.log', (err) => {
        if (!err) {
            var data = fs.readFileSync("/tmp/regataos-update/apps-list.txt", "utf8");
            if (data.length <= 1) {
                $(".update-all-button2").css("display", "none");
                clearInterval(timer_update_cancel);
            }
        }
    });
}
