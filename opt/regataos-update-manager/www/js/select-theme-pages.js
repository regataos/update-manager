// Check the theme that should be used
function check_theme_pages() {
    const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            // To the main page
            $("#loadscreen").css("background-color", "#171a21");
            $("body").css("background-color", "#171a21");
            $("body").css("color", "#fff");
            $(".auto-update-status").css("color", "#ccc");
            $(".search-update-status").css("color", "#ccc");
            $(".loader").css("border-left", "10px solid #2a2f35");
            $(".loader").css("border-right", "10px solid #2a2f35");
            $(".loader").css("border-bottom", "10px solid #2a2f35");
            $(".block-app").css("background-color", "#2a2f35");
            $(".block-app-fictitious").css("background-color", "#171a21");
            $(".other-updates").css("background-color", "#2a2f35");
            $(".more-details-contents").css("background-color", "#171a21");
            $(".more-details-contents").css("border", "1px solid #3daee9");
            $(".app-status").css("color", "#ccc");

            var option_home = document.getElementById("updateall-button2");
            option_home.classList.remove("update-all-button2-white");
            option_home.classList.add("update-all-button2-dark");

            var option_home = document.getElementById("cancel-specific-app");
            option_home.classList.remove("cancel-app-white");
            option_home.classList.add("cancel-app-dark");

        } else {
            // To the main page
            $("#loadscreen").css("background-color", "#fff");
            $("body").css("background-color", "#fff");
            $("body").css("color", "#000");
            $(".auto-update-status").css("color", "#575757");
            $(".search-update-status").css("color", "#575757");
            $(".loader").css("border-left", "10px solid #eaeaea");
            $(".loader").css("border-right", "10px solid #eaeaea");
            $(".loader").css("border-bottom", "10px solid #eaeaea");
            $(".block-app").css("background-color", "#f4f4f4");
            $(".block-app-fictitious").css("background-color", "#fff");
            $(".other-updates").css("background-color", "#f4f4f4");
            $(".more-details-contents").css("background-color", "#fff");
            $(".more-details-contents").css("border", "1px solid #ccc");
            $(".app-status").css("color", "#575757");

            var option_home = document.getElementById("updateall-button2");
            option_home.classList.remove("update-all-button2-dark");
            option_home.classList.add("update-all-button2-white");

            var option_home = document.getElementById("cancel-specific-app");
            option_home.classList.remove("cancel-app-dark");
            option_home.classList.add("cancel-app-white");
        }
        return;
    }
    });
}
check_theme_pages();

setInterval(function() {
    check_theme_pages();
}, 100);
