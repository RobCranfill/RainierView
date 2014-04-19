@rem For Gadget debugging, remove the registry entry:
@rem    [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Sidebar] "ShowScriptErrors"=dword:00000001

reg delete HKCU\Software\Microsoft\Windows\CurrentVersion\Sidebar /v ShowScriptErrors /f
