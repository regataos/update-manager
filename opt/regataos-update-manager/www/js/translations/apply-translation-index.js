// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslation() {
    const fs = require('fs');
    const getTranslation = selectTranslationFile();

    let data = fs.readFileSync(getTranslation, "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Window title
        const windowTitle = document.querySelector("title");
        windowTitle.innerHTML = data[i].index.windowTitle;

        // Side bar
        //Show or hide text
        const home = document.querySelector(".home");
        home.title = data[i].index.sideBar.home;

        const historic = document.querySelector(".historic");
        historic.title = data[i].index.sideBar.historic;

        const settings = document.querySelector(".settings");
        settings.title = data[i].index.sideBar.settings;
    }
}
applyTranslation();
