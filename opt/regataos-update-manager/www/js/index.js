// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

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
