#!/usr/bin/python3.11

import os
import sys
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication, QMenu, QSystemTrayIcon

class SystemTrayIcon(QSystemTrayIcon):
    def __init__(self, icon, parent=None):
        super(SystemTrayIcon, self).__init__(icon, parent)

        self.menu = QMenu(parent)

        #def update():
        #    os.system('ps -C "regataosupdate" > /dev/null; if [ $? = 0 ]; then \
        #              killall regataosupdate; fi; cd /usr/share/applications/; \
        #              gtk-launch "regataos-update-manager.desktop"; \
        #              echo "" > "/tmp/regataos-update/install-updates.txt"')

        def open_app():
            os.system('/bin/bash up_icontray_functions -show-up-app')

        #updateSystem = os.popen('/bin/bash set_language_icontray -update-sys')
        #updateSystem = updateSystem.read().rstrip('\n')
        #self.left_action = self.menu.addAction(updateSystem)
        #self.left_action.triggered.connect(update)

        openUpdateManager = os.popen('/bin/bash set_language_icontray -open-up-mg')
        openUpdateManager = openUpdateManager.read().rstrip('\n')
        self.right_action = self.menu.addAction(openUpdateManager)
        self.right_action.triggered.connect(open_app)

        self.setContextMenu(self.menu)
        self.activated.connect(self.onTrayIconActivated)

    def onTrayIconActivated(self, reason):
        if reason == QSystemTrayIcon.ActivationReason.Trigger:
            print("Click with the left mouse button.")
            os.system('/bin/bash up_icontray_functions -show-hide-up')

        elif reason == QSystemTrayIcon.ActivationReason.Context:
            print("Click with the right mouse button.")

def main():
    app = QApplication(sys.argv)

    # System tray icon information
    icon = QIcon("check-update.png")
    tray_icon = SystemTrayIcon(icon)
    title = os.popen('/bin/bash set_language_icontray -check-up-title')
    title = title.read().rstrip('\n')
    tray_icon.setToolTip(title)
    tray_icon.show()

    sys.exit(app.exec())

if __name__ == "__main__":
    main()
