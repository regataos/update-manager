 #!/bin/bash

cd /

while :
do

# Checking internet connection
if ! ping -c 1 www.google.com.br ; then
    echo "Offline!"

else
    # Create file with current status
    auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
    if [[ $(echo "$auto_up_config") == *"3"* ]]; then
        echo "never-updates" > "/tmp/regataos-update/status.txt";
    else
        echo "check-updates" > "/tmp/regataos-update/status.txt";
    fi

	ps -C "regataos-up-all.sh | regataos-up-specific.sh | regataos-other-up.sh | regataos-up-other-up.sh | regataos-cancel-up-specific.sh | regataos-up-cancel-all.sh | regataosgcs | zypper | magma | steam | UbisoftConnect.exe | Launcher.exe | Origin.exe | GalaxyClient.exe | EpicGamesLauncher.exe | Battle.net.exe" > /dev/null
	if [ $? = 1 ]; then
        # Check for updates
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") != *"3"* ]]; then
            sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config
        fi

        # First update check completed
        if test -e  "/tmp/regataos-update/package-list.txt"; then
            sed -i '/^$/d' "/tmp/regataos-update/package-list.txt";
            number_packages=$(wc -l /tmp/regataos-update/package-list.txt | awk '{print $1}')
            if [ $(echo $number_packages) -ge 1 ]; then
                echo "" > "/tmp/regataos-update/already_updated.txt"
            fi

        elif test -e "/tmp/regataos-update/apps-list.txt"; then
            sed -i '/^$/d' "/tmp/regataos-update/apps-list.txt";
            number_apps=$(wc -l /tmp/regataos-update/apps-list.txt | awk '{print $1}')
            if [ $(echo $number_apps) -ge 1 ]; then
                echo "" > "/tmp/regataos-update/already_updated.txt"
            fi

        else
            echo "No updates found!"
        fi

        # Show number of updates and activate the icon in the system tray
        if test -e "/tmp/regataos-update/already_updated.txt"; then
            auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
            if [[ $(echo "$auto_up_config") == *"1"* ]]; then
                killall check-update.py
                /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -up-system

                if test -e "/tmp/regataos-update/apps-list.txt"; then
                    if test ! -e "/tmp/regataos-update/updated-apps.txt"; then
                        echo "" > "/tmp/regataos-update/updated-apps.txt";
                    fi

                    for i in /opt/regataos-store/apps-list/*.json; do
                        # Capture information about the package that will be downloaded and installed
                        app_nickname="$(grep -R '"nickname":' $i | awk '{print $2}' | sed 's/"\|,//g')"
	                    package_name="$(grep -R '"package":' $i | awk '{print $2}' | sed 's/"\|,//g')"

                        if [[ $(grep -r "$package_name" "/tmp/regataos-update/apps-list.txt") == *"$package_name"* ]]; then
                            echo "$app_nickname" >> "/tmp/regataos-update/list-apps-queue.txt"
                        fi
                    done

                    sed -i '/^$/d' "/tmp/regataos-update/list-apps-queue.txt";

			        rm -f "/tmp/regataos-update/all-auto-update.txt"
                    rm -f "/tmp/regataos-update/stop-all-update.txt"

	                sudo -S /opt/regataos-update-manager/scripts/regataos-up-all.sh & ps -C install-update.py > "/dev/null"; if [ $? = 1 ]; then  cd "/opt/regataos-update-manager/tray-icon/"; python install-update.py; fi
                    /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -upd-system

                else
                    echo "other-updates" > "/tmp/regataos-update/list-apps-queue.txt"
	                rm -f "/tmp/regataos-update/stop-all-update.txt"

	                sudo -S /opt/regataos-update-manager/scripts/regataos-up-other-up.sh & ps -C install-update.py > "/dev/null"; if [ $? = 1 ]; then  cd "/opt/regataos-update-manager/tray-icon/"; python install-update.py; fi
                    /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -upd-system
                fi

            elif [[ $(echo "$auto_up_config") == *"2"* ]]; then
                killall check-update.py
                /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -show-up

	            ps -C alert-update.py > /dev/null
	            if [ $? = 1 ]; then
                    cd /opt/regataos-update-manager/tray-icon/
                    ./alert-update.py
                fi

            elif [[ $(echo "$auto_up_config") == *"3"* ]]; then
                echo "Nothing to do ..."

            else
                echo "Nothing to do ..."
            fi
        fi
    fi
fi

   sleep 10800
done
