// English language translation
function language() {
$(document).ready(function() {
	// Window title
	$("title").text("Regata OS Update");

	// Title
	$("h1").text("Regata OS Update");

	// Sidebar menu
	$(".home").attr({title:"Upgrades"});
	$(".historic").attr({title:"Update history"});
	$(".settings").attr({title:"Settings"});

	// "Update all" or "cancel updates" buttons
	$(".update-all-button1").text("Update all");
	$(".update-all-button2").text("Cancel");

	// Descriptions
	$(".check-up").text("Checking for updates...");
	$(".no-up").text("There are no updates available.");
	$(".never-up").text("Never look for system updates!");
	$(".yes-up").text("Updates available!");
	$(".updated").text("Updated!");
	$(".search-update-status").text("This may take a few minutes!");
	$(".not-up-auto").text("Automatic update disabled.");
	$(".yes-update-auto").text("Automatic update enabled.");

	// Updates buttons and status
	$(".other-updates .app-name").text("Other updates");
	$(".more-details-text").text("More details");
	$("#update-app-other-updates").text("Update");

	$(".app-status-pending").text("Pending...");
	$(".app-status-download").text("Downloading...");
	$(".app-status-install").text("Installing...");
	$(".app-status-concluded").text("Concluded!");

	setTimeout(function(){
		$(".update-app").text("Update");
		$(".cancel-app").text("Cancel");
		$(".open-app").text("Open");
	}, 200);

	// Updated apps page
	$(".apps-updated").text("Recently updated apps");

	// Settings
	$(".apps-settings").text("Settings");
	$(".up-apps-auto").text("Automatic updates");
	$(".selectnav .up-on").text("Update the system automatically");
	$(".selectnav .up-only").text("Just check for system updates");
	$(".selectnav .up-off").text("Never check for updates");
});
}

language();
