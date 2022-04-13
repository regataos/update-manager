#!/bin/bash

# This script is used by the "Regata OS Update" application to update other updates.

if test -e "/tmp/regataos-update/stop-all-update.txt"; then
    rm -f "/tmp/regataos-update/stop-all-update.txt"
    exit
fi

if [[ $(grep -r "other-updates" "/tmp/regataos-update/list-apps-queue.txt") == *"other-updates"* ]]; then
    echo "" > "/tmp/regataos-update/list-apps-queue.txt"
    echo "other-updates" > "/tmp/regataos-update/downloadable-application-other-updates.txt"

    echo "" > "/tmp/regataos-update/update-in-progress.txt"
    echo "" > "/tmp/regataos-update/other-updates-in-progress.txt"

    echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"

    {
    export LC_ALL="en_US.UTF-8"
    export LANG="en_US.UTF-8"
    export LANGUAGE="en_US"
    sudo zypper --non-interactive --no-gpg-checks update --auto-agree-with-licenses $(cat /tmp/regataos-update/package-list.txt | tr '\n' ' ')
    } 2>&1 | tee "/var/log/regataos-logs/regataos-other-updates.log"

    # Run additional application settings
    if test -e "/tmp/regataos-prime/config/regataos-prime.conf"; then
        if [[ $(grep -r "amf=" "/tmp/regataos-prime/config/regataos-prime.conf") == *"amf=on"* ]]; then
            sudo /opt/regataos-prime/scripts/enable-amd-amf -amf-on
        fi
    fi

    sudo /opt/regataos-prime/scripts/apps-hybrid-graphics

    echo "" > "/tmp/regataos-update/downloadable-application-other-updates.txt"
    echo "" > "/tmp/regataos-update/installing-application-other-updates.txt"

    echo "other-updates" >> "/tmp/regataos-update/updated-apps.txt"
    sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

    sed -i "s/other-updates//" "/tmp/regataos-update/apps-list.txt"
    sed -i '/^$/d' "/tmp/regataos-update/apps-list.txt"

    rm -f "/tmp/regataos-update/update-in-progress.txt"
    rm -f "/tmp/regataos-update/other-updates-in-progress.txt"
fi

if test -e "/tmp/regataos-update/apps-list.txt"; then
    number_packages=$(wc -l /tmp/regataos-update/apps-list.txt | awk '{print $1}')
    if [ $(echo $number_packages) -lt 1 ]; then
        echo "updated" > "/tmp/regataos-update/status.txt"
	    rm -f "/tmp/regataos-update/already_updated.txt"
        killall alert-update.py
        killall install-update.py
        kill -KILL $(ps -C "python install-update.py" | awk '{print $1}'| tail -1)
    fi
else
    echo "updated" > "/tmp/regataos-update/status.txt"
	rm -f "/tmp/regataos-update/already_updated.txt"
    killall alert-update.py
    killall install-update.py
    kill -KILL $(ps -C "python install-update.py" | awk '{print $1}'| tail -1)
fi

if test -e "/usr/share/regataos/first-update.txt"; then
    rm -f "/usr/share/regataos/first-update.txt"
fi
