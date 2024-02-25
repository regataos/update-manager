#!/bin/bash

# This script is used by the "Regata OS Update" application to update other updates.

if test -e "/tmp/regataos-update/stop-all-update.txt"; then
    rm -f "/tmp/regataos-update/stop-all-update.txt"
    exit
fi

if [[ $(grep -r "other-updates" "/tmp/regataos-update/updated-apps.txt") != *"other-updates"* ]]; then
    if [[ $(grep -r "other-updates" "/tmp/regataos-update/list-apps-queue.txt") == *"other-updates"* ]]; then
        echo "" >"/tmp/regataos-update/list-apps-queue.txt"
        echo "other-updates" >"/tmp/regataos-update/downloadable-application-other-updates.txt"

        echo "" >"/tmp/regataos-update/updated-apps.txt"
        echo "" >"/tmp/regataos-update/other-updates-in-progress.txt"

        echo "" >"/tmp/regataos-update/installing-application-other-updates.txt"

        {
            export LC_ALL="en_US.UTF-8"
            export LANG="en_US.UTF-8"
            export LANGUAGE="en_US"
            retry -r 20 -- zypper --non-interactive --no-gpg-checks update --auto-agree-with-licenses
        } 2>&1 | tee "/var/log/regataos-logs/regataos-other-updates.log"

        echo "" >"/tmp/regataos-update/downloadable-application-other-updates.txt"
        echo "" >"/tmp/regataos-update/installing-application-other-updates.txt"
        echo "" >"/tmp/regataos-update/system-update-installed.txt"
        echo "" >"/tmp/regataos-update/waiting-for-installation.txt"
        echo "" >"/tmp/regataos-update/installing-system-update.txt"
        echo "" >"/tmp/regataos-update/downloading-system-update.txt"

        echo "other-updates" >>"/tmp/regataos-update/updated-apps.txt"
        sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

        sed -i "s/other-updates//" "/tmp/regataos-update/apps-list.txt"
        sed -i '/^$/d' "/tmp/regataos-update/apps-list.txt"

        rm -f "/tmp/regataos-update/other-updates-in-progress.txt"
    fi
fi

number_packages=$(wc -l /tmp/regataos-update/package-list.txt | awk '{print $1}')
if [ $(echo $number_packages) -ge 1 ]; then
    if [[ $(grep -r "other-updates" "/tmp/regataos-update/updated-apps.txt") == *"other-updates"* ]]; then
        if test -e "/tmp/regataos-update/apps-list.txt"; then
            number_apps=$(wc -l /tmp/regataos-update/apps-list.txt | awk '{print $1}')
            if [ $(echo $number_apps) -eq 0 ]; then
                echo "updated" >"/tmp/regataos-update/status.txt"
                rm -f /tmp/regataos-update/already_updated.txt
                rm -f /tmp/regataos-update/*.rpm
                killall install-update.py
                killall alert-update.py
            fi

        else
            echo "updated" >"/tmp/regataos-update/status.txt"
            rm -f /tmp/regataos-update/already_updated.txt
            rm -f /tmp/regataos-update/*.rpm
            killall install-update.py
            killall alert-update.py
        fi
    fi

else
    echo "updated" >"/tmp/regataos-update/status.txt"
    rm -f /tmp/regataos-update/already_updated.txt
    rm -f /tmp/regataos-update/*.rpm
    killall install-update.py
    killall alert-update.py
fi

if test -e "/usr/share/regataos/first-update.txt"; then
    rm -f "/usr/share/regataos/first-update.txt"
fi

# Run additional application settings
if test -e "/tmp/regataos-prime/config/regataos-prime.conf"; then
    if [[ $(grep -r "amf=" "/tmp/regataos-prime/config/regataos-prime.conf") == *"amf=on"* ]]; then
        sudo /opt/regataos-prime/scripts/enable-amd-amf -amf-on
    fi
fi

sudo /opt/regataos-prime/scripts/apps-hybrid-graphics
