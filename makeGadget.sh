#!/usr/bin/bash
# batch file to create gadget file from folder

rm                        RainierView-2.1.last.gadget
mv RainierView-2.1.gadget RainierView-2.1.last.gadget

cd RainierView.build
/cygdrive/c/Program\ Files/7-Zip/7z.exe a -tzip ../RainierView-2.1.gadget *
cd ..

echo Done!
