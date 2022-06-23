#!/bin/bash

if test ! -e "/usr/bin/calamares"; then
    if ping -c 1 www.google.com.br; then
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") != *"3"* ]]; then
            /opt/regataos-update-manager/scripts/notifications/notify -check-up &

            ps -C calamares > /dev/null
            if [ $? = 1 ]; then
                cd "/opt/regataos-update-manager/tray-icon/"
                ./check-update.py
            fi
        fi
    fi
fi
