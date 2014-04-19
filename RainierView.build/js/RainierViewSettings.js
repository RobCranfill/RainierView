// RainierViewSettings.js - rob cranfill 2014

// These duplicate values in the main .js file - merge??
var KEY_MUIR     = "show_muir";
var KEY_PARADISE = "show_paradise";
var KEY_BOTH     = "show_both";
var GROUP_NAME = "Options";


// This method is called when the dialog loads.
// 
function loadSettings()
	{
	SettingsManager.loadFile();

	System.Gadget.onSettingsClosing = gadgetSettingsClosing;

	var optMuir = SettingsManager.getValue(GROUP_NAME, KEY_MUIR);
	var optPara = SettingsManager.getValue(GROUP_NAME, KEY_PARADISE);
	var optBoth = SettingsManager.getValue(GROUP_NAME, KEY_BOTH);

	var chkMuir = document.getElementById("muir");
	var chkPara = document.getElementById("paradise");
	var chkBoth = document.getElementById("both");

	chkMuir.checked = false;
	chkPara.checked = false;
	chkBoth.checked = false;

	if (optMuir === "Y")
		{
		chkMuir.checked = true;
		}
	else
		{
		if (optPara === "Y")
			{
			chkPara.checked = true;
			}
		else
			{
			chkBoth.checked = true;
			}
		}

	}
	

// Handle the Settings dialog closing event.
// Parameters: event.
//
function gadgetSettingsClosing(event)
	{
	// Save the settings if the user clicked OK.
	if (event.closeAction == event.Action.commit)
		{
		var chkMuir = document.getElementById("muir");
		var chkPara = document.getElementById("paradise");
		var chkBoth = document.getElementById("both");
		
		var optMuir = "N";
		var optPara = "N";
		var optBoth = "N";
		if (chkMuir.checked === true)
			{
			optMuir = "Y";
			}
		if (chkPara.checked === true)
			{
			optPara = "Y";
			}
		if (chkBoth.checked === true)
			{
			optBoth = "Y";
			}

		SettingsManager.setValue(GROUP_NAME, KEY_MUIR,     optMuir);
		SettingsManager.setValue(GROUP_NAME, KEY_PARADISE, optPara);
		SettingsManager.setValue(GROUP_NAME, KEY_BOTH,     optBoth);
		SettingsManager.saveFile();

		System.Gadget.document.parentWindow.settingsHaveChanged();

		event.cancel = false;
		}
	}
