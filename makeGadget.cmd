@REM @echo off
@rem batch file to create gadget file from folder

cd RainierView.files
"C:\Program Files\7-Zip\7z" a -tzip ..\RainierView *
cd ..

erase                         RainierView-1.0.last.gadget
rename RainierView-1.0.gadget RainierView-1.0.last.gadget
rename RainierView.zip        RainierView-1.0.gadget
