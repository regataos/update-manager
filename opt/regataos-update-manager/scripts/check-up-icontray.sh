#!/bin/bash

# Detect system language
user=$(users | awk '{print $1}')

if test -e "/home/$user/.config/plasma-localerc" ; then
	language=$(grep -r LANGUAGE= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2- | cut -d":" -f -1 | tr [A-Z] [a-z] | sed 's/_/-/')

	if [ -z $language ]; then
    	language=$(grep -r LANG= "/home/$user/.config/plasma-localerc" | cut -d"=" -f 2- | cut -d"." -f -1 | tr [A-Z] [a-z] | sed 's/_/-/')
	fi

elif test -e "/home/$user/.config/user-dirs.locale" ; then
    language=$(cat "/home/$user/.config/user-dirs.locale" | tr [A-Z] [a-z] | sed 's/_/-/')

else
    language=$(echo $LANG | tr [A-Z] [a-z] | sed 's/_/-/' | cut -d"." -f -1)
fi

# Configure application language
if test -e "/opt/regataos-update-manager/scripts/notifications/$language"; then
	scriptNotify="/opt/regataos-update-manager/scripts/notifications/$language"
else
	scriptNotify="/opt/regataos-update-manager/scripts/notifications/en-us"
fi

if test ! -e "/usr/bin/calamares"; then
    if ping -c 1 www.google.com.br ; then
        auto_up_config=$(grep -r "autoupdate=" $HOME/.config/regataos-update/regataos-update.conf | cut -d"=" -f 2-)
        if [[ $(echo "$auto_up_config") != *"3"* ]]; then
            cd "/opt/regataos-update-manager/tray-icon/"
            ./check-update.py & /bin/bash $scriptNotify -check-up
        fi
    fi
fi
