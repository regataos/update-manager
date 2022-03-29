#!/usr/bin/python3

import os
import sys
from PyQt5.QtWidgets import QApplication, QSystemTrayIcon, QMenu
from PyQt5.QtGui import QIcon

app = QApplication(sys.argv)

# System tray icon information
trayIcon = QSystemTrayIcon(QIcon('alert-update.png'), parent=app)
title = os.popen('/bin/bash set_language_icontray -available-up-title')
title = title.read().rstrip('\n')
trayIcon.setToolTip(title)
trayIcon.show()

# Information and menu items
menu = QMenu()

# Update system and apps
def update():
    os.system('ps -C "regataosupdate" > /dev/null; if [ $? = 0 ]; then killall regataosupdate; fi; cd /usr/share/applications/; gtk-launch "regataos-update-manager.desktop"; echo "" > "/tmp/regataos-update/install-updates.txt"')
updateSystem = os.popen('/bin/bash set_language_icontray -update-sys')
updateSystem = updateSystem.read().rstrip('\n')
updateAction = menu.addAction(updateSystem)
updateAction.triggered.connect(update)

# Open app Update Manager
def open_app():
    os.system('cd /usr/share/applications/; gtk-launch "regataos-update-manager.desktop"')
openUpdateManager = os.popen('/bin/bash set_language_icontray -open-up-mg')
openUpdateManager = openUpdateManager.read().rstrip('\n')
openApp = menu.addAction(openUpdateManager)
openApp.triggered.connect(open_app)

# Close system tray icon
#exitAction = menu.addAction("Exit")
#exitAction.triggered.connect(app.quit)

trayIcon.setContextMenu(menu)

sys.exit(app.exec_())
