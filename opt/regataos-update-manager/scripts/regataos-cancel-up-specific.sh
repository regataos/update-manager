#!/bin/bash

# This script cancels the automatic update of any app in the queue or in the process of downloading.
app_nickname="$NICKNAME"
app_name="$1"
echo "Ending the $app_name app update"

sleep 1

sed -i '/^$/d' "/tmp/regataos-update/downloadable-application.txt"
sed -i '/^$/d' "/tmp/regataos-update/installing-application.txt"
sed -i '/^$/d' "/tmp/regataos-update/list-apps-queue.txt"

download=$(wc -l /tmp/regataos-update/downloadable-application.txt | awk '{print $1}')
installation=$(wc -l /tmp/regataos-update/installing-application.txt | awk '{print $1}')
queue=$(wc -l /tmp/regataos-update/list-apps-queue.txt | awk '{print $1}')

if [ $(echo $(($download+$installation+$queue))) -eq 0 ]; then
    rm -f "/tmp/regataos-update/update-specific-in-progress.txt"
fi

if [[ $(grep -r "$app_nickname" "/tmp/regataos-update/list-apps-queue.txt") == *"$app_nickname"* ]]; then
    sed -i "s/$app_nickname//" "/tmp/regataos-update/list-apps-queue.txt"
    sed -i '/^$/d' "/tmp/regataos-update/list-apps-queue.txt"

    echo "" > "/tmp/regataos-update/cancel-up-$app_nickname.txt"

    get_pid=$(cat /tmp/regataos-update/get-pid-$app_nickname.txt)
    pid=$(ps -C "$get_pid" | awk '{print $1}'| tail -1)
    kill -STOP $pid
    kill -KILL $pid

    sed -i "s/$app_nickname//" "/tmp/regataos-update/updated-apps.txt"
    sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

    sed -i "s/$app_nickname//" "/var/log/regataos-logs/updated-apps.txt"
    sed -i '/^$/d' "/var/log/regataos-logs/updated-apps.txt"

else
    if [[ $(grep -r "$app_nickname" "/tmp/regataos-update/downloadable-application.txt") == *"$app_nickname"* ]]; then
        if test -e "/tmp/regataos-update/get-pid-$app_nickname.txt";then
            echo "" > "/tmp/regataos-update/cancel-up-$app_nickname.txt"

            get_pid=$(cat /tmp/regataos-update/get-pid-$app_nickname.txt)
            pid=$(ps -C "$get_pid" | awk '{print $1}'| tail -1)
            kill -STOP $pid
            kill -KILL $pid

            sed -i "s/$app_nickname//" "/tmp/regataos-update/updated-apps.txt"
            sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

            sed -i "s/$app_nickname//" "/var/log/regataos-logs/updated-apps.txt"
            sed -i '/^$/d' "/var/log/regataos-logs/updated-apps.txt"

        else
            if test -e "/tmp/regataos-update/get-pid.txt";then
                echo "" > "/tmp/regataos-update/cancel-up-$app_nickname.txt"

                get_pid=$(cat /tmp/regataos-update/get-pid.txt)
                pid=$(ps -C "$get_pid" | awk '{print $1}'| tail -1)
                kill -STOP $pid
                kill -KILL $pid

                sed -i "s/$app_nickname//" "/tmp/regataos-update/updated-apps.txt"
                sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

                sed -i "s/$app_nickname//" "/var/log/regataos-logs/updated-apps.txt"
                sed -i '/^$/d' "/var/log/regataos-logs/updated-apps.txt"
            fi
        fi

        sed -i "s/$app_nickname//" "/tmp/regataos-update/downloadable-application.txt"
        sed -i '/^$/d' "/tmp/regataos-update/downloadable-application.txt"

        sed -i "s/$app_nickname//" "/tmp/regataos-update/installing-application.txt"
        sed -i '/^$/d' "/tmp/regataos-update/installing-application.txt"

        sed -i "s/$app_nickname//" "/tmp/regataos-update/updated-apps.txt"
        sed -i '/^$/d' "/tmp/regataos-update/updated-apps.txt"

        sed -i "s/$app_nickname//" "/var/log/regataos-logs/updated-apps.txt"
        sed -i '/^$/d' "/var/log/regataos-logs/updated-apps.txt"

    fi
fi
