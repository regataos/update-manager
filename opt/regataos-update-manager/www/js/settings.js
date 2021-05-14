// Automatic update
function check_auto_update_config() {
    const exec = require('child_process').exec;
    const fs = require('fs');

    fs.access('/tmp/regataos-update/config/regataos-update.conf', (err) => {
    if (!err) {
        var command_line = "grep -r 'autoupdate=' /tmp/regataos-update/config/regataos-update.conf | cut -d'=' -f 2-";
        exec(command_line, (error, stdout, stderr) => {
        if ((stdout.indexOf("1") > -1) == "1") {
            $("#select-update").val(1);

        } else if ((stdout.indexOf("2") > -1) == "1") {
            $("#select-update").val(2);

        } else if ((stdout.indexOf("3") > -1) == "1") {
            $("#select-update").val(3);
        }
        });
    return;

    } else {
        $(document).ready(function() {
            $("#select-update").val(1);
        });
    }
    });
}

check_auto_update_config()

// Choose gpu to render
function select_auto_update() {
	const exec = require('child_process').exec;

	var select = document.getElementById('select-update');
	var value = select.options[select.selectedIndex].value;

	var command_line = "/opt/regataos-update-manager/scripts/update-manager-option -update-" + value;
	console.log(command_line);
	exec(command_line,function(error,call,errlog){
	});
}
