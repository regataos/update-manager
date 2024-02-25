#!/bin/bash

cd /

system_update_install_log="/var/log/regataos-logs/regataos-other-updates.log"
package_version_file="/var/log/regataos-logs/regataos-list-updates.log"
list_system_updates="/tmp/regataos-update/package-list.txt"
installing_system_update="/tmp/regataos-update/installing-system-update.txt"
system_update_installed="/tmp/regataos-update/system-update-installed.txt"
downloading_system_update="/tmp/regataos-update/downloading-system-update.txt"
waiting_for_installation="/tmp/regataos-update/waiting-for-installation.txt"
updated_apps="/tmp/regataos-update/updated-apps.txt"
list_apps_queue="/tmp/regataos-update/list-apps-queue.txt"
installing_other_updates="/tmp/regataos-update/installing-application-other-updates.txt"
downloadable_app_other_updates="/tmp/regataos-update/downloadable-application-other-updates.txt"

# Create some log files in advance.
if test ! -e "$installing_system_update"; then
    echo "" >"$installing_system_update"
fi

if test ! -e "$system_update_installed"; then
    echo "" >"$system_update_installed"
fi

if test ! -e "$downloading_system_update"; then
    echo "" >"$downloading_system_update"
fi

if test ! -e "$waiting_for_installation"; then
    echo "" >"$waiting_for_installation"
fi

if test ! -e "$updated_apps"; then
    echo "" >"$updated_apps"
fi

if test ! -e "$list_apps_queue"; then
    echo "" >"$list_apps_queue"
fi

if test ! -e "$installing_other_updates"; then
    echo "" >"$installing_other_updates"
fi

if test ! -e "$downloadable_app_other_updates"; then
    echo "" >"$downloadable_app_other_updates"
fi

while :; do
    ps -C regataosupdate >/dev/null
    if [ $? = 0 ]; then
        if test -e "$system_update_install_log"; then
            while IFS= read -r package_name || [[ -n "$package_name" ]]; do
                read_system_update_install_log="$(cat "$system_update_install_log")"
                package_version=$(cat "$package_version_file" | grep "$package_name" | head -1 | tail -1 | awk '{print $9}')
                package=$(echo $package_name-$package_version)
                check_package_status=$(echo "$read_system_update_install_log" | grep "$package" | tail -1 | head -1)

                check_last_package="$(echo "$read_system_update_install_log" | tail -1 | head -1)"
                if [ -z "$check_last_package" ]; then
                    check_last_package="$(echo "$read_system_update_install_log" | tail -2 | head -1)"
                fi

                if [[ $(echo $check_package_status) == *"In cache"* ]]; then
                    if [[ $(cat "$waiting_for_installation") != *"$(echo $package)"* ]]; then
                        echo "$package" >>"$waiting_for_installation"
                        echo "$package waiting1..."
                        sed -i '/^$/d' "$waiting_for_installation"
                    fi
                else
                    if [[ $(echo $check_package_status) == *"Installing"* || $(echo $check_package_status) == *"warning"* ]]; then
                        if [[ $(echo $check_last_package) == *"$(echo $package)"* ]]; then
                            if [[ $(cat "$installing_system_update") != *"$(echo $package)"* ]]; then
                                echo "$package" >>"$installing_system_update"
                                echo "$package installing..."
                                sed -i '/^$/d' "$installing_system_update"
                            fi
                        else
                            if [[ $(cat "$system_update_installed") != *"$(echo $package)"* ]]; then
                                echo "$package" >>"$system_update_installed"
                                echo "$package installed..."
                                sed -i '/^$/d' "$system_update_installed"
                            fi
                        fi
                    else
                        if [[ $(echo $check_package_status) == *"Retrieving"* ]]; then
                            if [[ $(echo $check_last_package) == *"$(echo $package)"* ]]; then
                                if [[ $(cat "$downloading_system_update") != *"$(echo $package)"* ]]; then
                                    echo "$package" >>"$downloading_system_update"
                                    echo "$package downloading..."
                                    sed -i '/^$/d' "$downloading_system_update"
                                fi
                            else
                                if [[ $(cat "$waiting_for_installation") != *"$(echo $package)"* ]]; then
                                    echo "$package" >>"$waiting_for_installation"
                                    echo "$package waiting2..."
                                    sed -i '/^$/d' "$waiting_for_installation"
                                fi
                            fi
                        fi
                    fi
                fi
            done <"$list_system_updates"
        else
            echo "" >"$installing_system_update"
            echo "" >"$system_update_installed"
            echo "" >"$downloading_system_update"
            echo "" >"$waiting_for_installation"
        fi
    else
        echo "Nothing to do..."
        exit 0
    fi

    sleep 1
done
