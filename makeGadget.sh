#!/usr/bin/bash
# batch file to create gadget file from folder

rm                        RainierView-2.0.last.gadget
mv RainierView-2.0.gadget RainierView-2.0.last.gadget

cd RainierView.build
/cygdrive/c/Program\ Files/7-Zip/7z.exe a -tzip ../RainierView-2.0.gadget *
cd ..

echo Done!
