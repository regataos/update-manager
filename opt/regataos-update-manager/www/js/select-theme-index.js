// Check the theme that should be used
function check_theme_index() {
    const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            // Side bar
            $(".sidebar").css("background-color", "#2a2f35");
            $(".sidebar").css("box-shadow", "0px 0px 3px 0px rgb(8 13 18 / 34%)");

            // Sidebar Images
            $("img.home-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/home-dark.png");
            $("img.historic-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/historic-dark.png");
            $("img.settings-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/settings-dark.png");

            // To the main page
            $("#loadscreen").css("background-color", "#171a21");
            $("body").css("background-color", "#171a21");

            // For sidebar buttons
            var option_home = document.getElementById("option-home");
            option_home.classList.remove("sidebar-button");
            option_home.classList.add("sidebar-button-dark");

            var option_historic = document.getElementById("option-historic");
            option_historic.classList.remove("sidebar-button");
            option_historic.classList.add("sidebar-button-dark");

            var option_settings = document.getElementById("option-settings");
            option_settings.classList.remove("sidebar-button");
            option_settings.classList.add("sidebar-button-dark");

        } else {
            // Side bar
            $(".sidebar").css("background-color", "#e5e5e5");
            $(".sidebar").css("box-shadow", "0px 0px 3px 0px rgb(8 13 18 / 34%)");

            // Sidebar Images
            $("img.home-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/home.png");
            $("img.historic-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/historic.png");
            $("img.settings-icon").attr("src","file:///opt/regataos-update-manager/www/images/img-sidebar/settings.png");

            // To the main page
            $("#loadscreen").css("background-color", "#fff");
            $("body").css("background-color", "#fff");

            // For sidebar buttons
            var option_home = document.getElementById("option-home");
            option_home.classList.remove("sidebar-button-dark");
            option_home.classList.add("sidebar-button");

            var option_historic = document.getElementById("option-historic");
            option_historic.classList.remove("sidebar-button-dark");
            option_historic.classList.add("sidebar-button");

            var option_settings = document.getElementById("option-settings");
            option_settings.classList.remove("sidebar-button-dark");
            option_settings.classList.add("sidebar-button");
        }
        return;
    }
    });
}
check_theme_index();

setInterval(function() {
    check_theme_index();
}, 100);
