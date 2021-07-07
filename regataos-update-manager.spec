Name: regataos-update-manager
Version: 1.5
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
Requires: magma >= 5.52.2-lp152.6.1
Requires: regataos-base >= 20.1.2-lp152.7.1
Requires: regataos-store >= 5.3-lp152.36.1
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

update-desktop-database

%clean

%files
%defattr(-,root,root)
/opt/regataos-base/%{name}-%{version}.tar.xz

%changelog
