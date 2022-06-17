#!/bin/bash

cd /

while :
do

# Wait until the environment loads.
ps -C "plasmashell" > /dev/null
if [ $? = 0 ]; then
	sleep 10
	/opt/regataos-update-manager/scripts/regataos-check-up.sh &
	/opt/regataos-update-manager/scripts/check-up-icontray.sh &
	sudo /opt/regataos-update-manager/scripts/set_language.sh
	break
fi

   sleep 1
done
