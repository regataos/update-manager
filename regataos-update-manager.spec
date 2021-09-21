Name: regataos-update-manager
Version: 1.7
Release: 0
Url: https://github.com/regataos/update-manager
Summary: Regata OS Update Manager
Group: System/GUI/KDE
BuildRequires: xz
BuildRequires: desktop-file-utils
BuildRequires: update-desktop-files
BuildRequires: hicolor-icon-theme
BuildRequires: -post-build-checks
Requires: xz
Requires: magma >= 5.54.1
Requires: regataos-base >= 21.0.12
Requires: regataos-store >= 21.3
Conflicts: plasma5-pk-updates
License: MIT
Source1: %{name}-%{version}.tar.xz
BuildRoot: %{_tmppath}/%{name}-%{version}-build

%description
Application created to manage updates on Regata OS.

%build

%install
mkdir -p %{buildroot}/opt/regataos-base/
cp -f %{SOURCE1} %{buildroot}/opt/regataos-base/%{name}-%{version}.tar.xz

%post
if test -e /opt/regataos-base/%{name}-%{version}.tar.xz ; then
	tar xf /opt/regataos-base/%{name}-%{version}.tar.xz -C /
fi

if test ! -e /opt/magma/regataosupdate ; then
	cp -f /opt/magma/magma /opt/magma/regataosupdate
fi

if test ! -e /usr/bin/regataosupdate ; then
	ln -sf /opt/magma/regataosupdate /usr/bin/regataosupdate
fi

/opt/regataos-update-manager/scripts/set_language.sh start

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base/%{name}-%{version}.tar.xz

%changelog
