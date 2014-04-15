@REM @echo off
@rem batch file to create gadget file from folder

cd RainierView.files
"C:\Program Files\7-Zip\7z" a -tzip ..\RainierView *
cd ..

erase                     RainierView.last.gadget
rename RainierView.gadget RainierView.last.gadget
rename RainierView.zip    RainierView.gadget
