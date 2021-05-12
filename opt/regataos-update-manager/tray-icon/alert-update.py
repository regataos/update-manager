#!/usr/bin/python

import os
import sys
import subprocess
from PyQt5.QtWidgets import QApplication, QSystemTrayIcon, QMenu
from PyQt5.QtGui import QIcon

app = QApplication(sys.argv)

# System tray icon information
trayIcon = QSystemTrayIcon(QIcon('alert-update.png'), parent=app)
title = subprocess.Popen('/bin/bash set_language_icontray -available-up-title', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
title = str(title.rstrip("\n"))
trayIcon.setToolTip(title)
trayIcon.show()

# Information and menu items
menu = QMenu()

# Update system and apps
def update():
    os.system('cd /usr/share/applications/; gtk-launch "regataos-update-manager.desktop"; echo "" > "/tmp/regataos-update/install-updates.txt"')
updateSystem = subprocess.Popen('/bin/bash set_language_icontray -update-sys', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
updateSystem = str(updateSystem.rstrip("\n"))
updateAction = menu.addAction(updateSystem)
updateAction.triggered.connect(update)
#updateAction.setIcon(QIcon("icon.png"))

# Open app Update Manager
def open_app():
    os.system('cd /usr/share/applications/; gtk-launch "regataos-update-manager.desktop"')
openUpdateManager = subprocess.Popen('/bin/bash set_language_icontray -open-up-mg', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
openUpdateManager = str(openUpdateManager.rstrip("\n"))
openApp = menu.addAction(openUpdateManager)
openApp.triggered.connect(open_app)
#openApp.setIcon(QIcon("icon.png"))

# Close system tray icon
#exitAction = menu.addAction("Exit")
#exitAction.triggered.connect(app.quit)

trayIcon.setContextMenu(menu)

sys.exit(app.exec_())
