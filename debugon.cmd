@rem For Gadget debugging, set the registry entry:
@rem    [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Sidebar] "ShowScriptErrors"=dword:00000001

reg add HKCU\Software\Microsoft\Windows\CurrentVersion\Sidebar /v ShowScriptErrors /t REG_DWORD /d 1 /f
