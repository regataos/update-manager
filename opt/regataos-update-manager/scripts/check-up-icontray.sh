#!/bin/bash

if test ! -e "/usr/bin/calamares"; then
    if ping -c 1 www.google.com.br ; then
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") != *"3"* ]]; then
            cd "/opt/regataos-update-manager/tray-icon/"
            ./check-update.py
        fi
    fi
fi
