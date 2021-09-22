#!/bin/bash

# Detect system language
sleep 3

if test -e "$HOME/.config/plasma-localerc" ; then
    language=$(grep -r LANG "$HOME/.config/plasma-localerc")

elif test -e "$HOME/.config/user-dirs.locale" ; then
    language=$(grep -r LANG "$HOME/.config/user-dirs.locale")

else
    language=$(echo $LANG)
fi

# Configure application language
if [[ $language == *"pt_BR"* ]]; then
    ln -sf /opt/regataos-update-manager/scripts/notifications/pt-br/notify \
    /opt/regataos-update-manager/scripts/notifications/notify

    ln -sf /opt/regataos-update-manager/www/js/translations/pt-br/language.js \
    /opt/regataos-update-manager/www/js/translations/language.js

elif [[ $language == *"pt_PT"* ]]; then
    ln -sf /opt/regataos-update-manager/scripts/notifications/pt-br/notify \
    /opt/regataos-update-manager/scripts/notifications/notify

    ln -sf /opt/regataos-update-manager/www/js/translations/pt-br/language.js \
    /opt/regataos-update-manager/www/js/translations/language.js

elif [[ $language == *"en_US"* ]]; then
    ln -sf /opt/regataos-update-manager/scripts/notifications/en-us/notify \
    /opt/regataos-update-manager/scripts/notifications/notify

    ln -sf /opt/regataos-update-manager/www/js/translations/en-us/language.js \
    /opt/regataos-update-manager/www/js/translations/language.js

else
    ln -sf /opt/regataos-update-manager/scripts/notifications/en-us/notify \
    /opt/regataos-update-manager/scripts/notifications/notify

    ln -sf /opt/regataos-update-manager/www/js/translations/en-us/language.js \
    /opt/regataos-update-manager/www/js/translations/language.js
fi

# Clear cache
rm -f /tmp/regataos-update/*.txt
rm -f /tmp/regataos-update/*.rpm
