// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Automatic update
function checkAutoUpdateConfig() {
    const fs = require('fs');
    const regataosUpdateConf = "/tmp/regataos-update/config/regataos-update.conf";
    const updateConfigButton = document.querySelector("#select-update-config");
    if (fs.existsSync(regataosUpdateConf)) {
        const checkUpdateConf = fs.readFileSync(regataosUpdateConf, "utf8");
        if (checkUpdateConf.includes("1")) {
            updateConfigButton.classList.add("up-on");
        } else if (checkUpdateConf.includes("2")) {
            updateConfigButton.classList.add("up-only");
        } else if (checkUpdateConf.includes("3")) {
            updateConfigButton.classList.add("up-off");
        }
    } else {
        updateConfigButton.classList.add("up-only");
    }
}
checkAutoUpdateConfig();

// Choose gpu to render
function selectAutoUpdate(setting) {
    const exec = require('child_process').exec;
    const commandLine = `/opt/regataos-update-manager/scripts/update-manager-option -update-${setting}`;
    exec(commandLine, function (error, call, errlog) { });
}

// Functions for buttons with drop-down menu.
sessionStorage.setItem("hideMenu", "");
function hideSpecifiedMenu() {
    let buttonId = sessionStorage.getItem("buttonId");
    let menuId = sessionStorage.getItem("hideMenu");
    let clickedElement = document.activeElement.id;

    if (clickedElement != buttonId) {
        let elementToHide = document.querySelector(`#${menuId}`);
        elementToHide.style.display = "none";
    }
}

function showSpecifiedMenu(buttonId, menuId, optionId) {
    let extendedMenu = document.querySelector(`#${menuId}`);
    let styleDefaultValue = extendedMenu.style.display;

    function openMenu() {
        extendedMenu.style.display = "block";
        sessionStorage.setItem("hideMenu", menuId);
        sessionStorage.setItem("buttonId", buttonId);
    }

    if (styleDefaultValue == "" || styleDefaultValue == "none") {
        // check if there are any menus open
        let checkMenuOpen = sessionStorage.getItem("hideMenu");
        if (checkMenuOpen && checkMenuOpen != menuId) {
            document.querySelector(`#${menuId}`).style.display = "none";
            setTimeout(function () {
                openMenu();
            }, 100);
        } else {
            openMenu();
        }
    } else {
        extendedMenu.style.display = "none";
        const buttonText = document.querySelector(`#${optionId}`).textContent;
        document.querySelector(`#${buttonId}`).textContent = buttonText;
    }
}
