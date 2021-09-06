#!/bin/bash

# Clear cache
rm -f "/tmp/regataos-update/status.txt"
rm -f "/tmp/regataos-update/already_updated.txt"

# Functions that display notifications in the system tray icon
#Checking for updates
function check_updates() {
    killall install-update.py
    killall alert-update.py

    ps -C check-update.py > /dev/null
    if [ $? = 1 ]; then
        cd /opt/regataos-update-manager/tray-icon/
        ./check-update.py & /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -check-up
    fi
}

#Installing updates
function install_updates() {
    killall check-update.py
    killall alert-update.py

    ps -C install-update.py > /dev/null
    if [ $? = 1 ]; then
        cd /opt/regataos-update-manager/tray-icon/
        ./install-update.py & /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -up-system
    fi
}

#Alert about updates
function alert_updates() {
    killall check-update.py
    killall install-update.py

    ps -C alert-update.py > /dev/null
    if [ $? = 1 ]; then
        cd /opt/regataos-update-manager/tray-icon/
        ./alert-update.py & /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -show-up
    fi
}

#There are no updates
function no_updates() {
    /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -no-up

    sleep 5
    killall check-update.py
    killall install-update.py
    killall alert-update.py
}

# If the Calamares Installer is installed, just exit
if test -e "/usr/bin/calamares"; then
    echo "The Calamares Installer was detected, leaving..."

    echo "no-updates" > "/tmp/regataos-update/status.txt";
    echo "" > "/tmp/regataos-update/already_updated.txt";

    killall alert-update.py
    killall install-update.py
    killall check-update.py

    exit 0;

else
    # Checking internet connection
    if ! ping -c 1 www.google.com.br ; then
        # Start the Regata OS Update Manager's service
        echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"
        echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"

        sleep 3600
        /bin/bash /opt/regataos-update-manager/scripts/regataos-up-service.sh

    else
        # Check for updates
        if test ! -e "$HOME/.config/regataos-update/regataos-update.conf"; then
            mkdir -p "$HOME/.config/regataos-update"
            echo "autoupdate=1" > "$HOME/.config/regataos-update/regataos-update.conf"
        fi

        # Create cache and configuration directory
        if test ! -e "/tmp/regataos-update"; then
	        mkdir -p "/tmp/regataos-update/"
	        chmod 777 "/tmp/regataos-update"
	        chmod 777 /tmp/regataos-update/*
        else
	        chmod 777 "/tmp/regataos-update"
	        chmod 777 /tmp/regataos-update/*
        fi

        if test ! -e "/var/log/regataos-logs"; then
	        mkdir -p "/var/log/regataos-logs/"
	        chmod 777 "/var/log/regataos-logs"
	        chmod 777 /var/log/regataos-logs/*
        else
	        chmod 777 "/var/log/regataos-logs"
	        chmod 777 /var/log/regataos-logs/*
        fi

        # Create file with current status
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") == *"3"* ]]; then
            echo "never-updates" > "/tmp/regataos-update/status.txt";
        else
            echo "check-updates" > "/tmp/regataos-update/status.txt";
        fi

        if test ! -e "/tmp/regataos-update/config"; then
	        ln -sf "$HOME/.config/regataos-update" "/tmp/regataos-update/config"
        fi

        echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"
        echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"
        rm -f "/var/log/regataos-logs/updated-apps.txt"

        # Check for updates
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") != *"3"* ]]; then
            check_updates & sudo /opt/regataos-update-manager/scripts/regataos-up.sh -check-up-config
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
                    echo "show-updates" > "/tmp/regataos-update/status.txt";

                    rm -f "/tmp/regataos-update/all-auto-update.txt"
                    rm -f "/tmp/regataos-update/stop-all-update.txt"

                    install_updates & sudo /opt/regataos-update-manager/scripts/regataos-up-all.sh
                    /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -upd-system

                else
                    if test ! -e "/tmp/regataos-update/updated-apps.txt"; then
                        echo "" > "/tmp/regataos-update/updated-apps.txt"
                    fi

                    echo "show-updates" > "/tmp/regataos-update/status.txt";
                    echo "other-updates" > "/tmp/regataos-update/list-apps-queue.txt"
                    rm -f "/tmp/regataos-update/stop-all-update.txt"

                    install_updates & sudo /opt/regataos-update-manager/scripts/regataos-up-other-up.sh
                    /bin/bash /opt/regataos-update-manager/scripts/notifications/notify -upd-system
                fi

            elif [[ $(echo "$auto_up_config") == *"2"* ]]; then
                alert_updates

            elif [[ $(echo "$auto_up_config") == *"3"* ]]; then
                echo "Nothing to do..."

            else
                echo "Nothing to do..."
            fi

        else
            auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
            if [[ $(echo "$auto_up_config") == *"1"* ]]; then
                no_updates

            elif [[ $(echo "$auto_up_config") == *"2"* ]]; then
                no_updates

            elif [[ $(echo "$auto_up_config") == *"3"* ]]; then
                echo "Nothing to do..."

            else
                echo "Nothing to do..."
            fi
        fi

        # Start the Regata OS Update Manager's service
        sleep 3600
        /bin/bash /opt/regataos-update-manager/scripts/regataos-up-service.sh
    fi
fi
