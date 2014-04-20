// RainierViewSettings.js - rob cranfill 2014

// These duplicate values in the main .js file - merge??
var KEY_MUIR     = "show_muir";
var KEY_PARADISE = "show_paradise";
var KEY_BOTH     = "show_both";
var KEY_SWITCH   = "switch_time_seconds";
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
	var fSwitch = document.getElementById("fieldSwitchTime");
	var lSwitch  = document.getElementById("lSwitch");
	var lSwitch2 = document.getElementById("lSwitch");

	chkMuir.checked = false;
	chkPara.checked = false;
	chkBoth.checked = false;
	fSwitch.disabled = true;
	lSwitch.style.color  = "#808080";
	lSwitch2.style.color = "#808080";

	if (optMuir === "Y")
		{
		chkMuir.checked = true;
		}
	else
	if (optPara === "Y")
		{
		chkPara.checked = true;
		}
	else
		{
		chkBoth.checked = true;
		fSwitch.disabled = false;
		lSwitch.style.color  = "black";
		lSwitch2.style.color = "black";

		var optSwitchTime = SettingsManager.getValue(GROUP_NAME, KEY_SWITCH);
		fSwitch.value = optSwitchTime;
		}

	}


function isNumberKey(evt)
	{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		{
		return false;
		}
	return true;
	}


// Handle a click on one of the "Which camera" radio buttons.
//
function toggleWhich(whichChar)
	{
	var fSwitch  = document.getElementById("fieldSwitchTime");
	var lSwitch  = document.getElementById("lSwitch");
	var lSwitch2 = document.getElementById("lSwitch2");

	if (whichChar === 'M') // Muir
		{
		fSwitch.value = "";
		fSwitch.disabled = true;
		lSwitch.style.color  = "#808080";
		lSwitch2.style.color = "#808080";
		}
	else
	if (whichChar === 'P') // Paradise
		{
		fSwitch.value = "";
		fSwitch.disabled = true;
		lSwitch.style.color  = "#808080";
		lSwitch2.style.color = "#808080";
		}
	else // Both
		{
		fSwitch.value = SettingsManager.getValue(GROUP_NAME, KEY_SWITCH);
		fSwitch.disabled = false;
		lSwitch.style.color  = "black";
		lSwitch2.style.color = "black";
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
			var fSwitch  = document.getElementById("fieldSwitchTime");
	  	SettingsManager.setValue(GROUP_NAME, KEY_SWITCH, fSwitch.value);
			}

		SettingsManager.setValue(GROUP_NAME, KEY_MUIR,     optMuir);
		SettingsManager.setValue(GROUP_NAME, KEY_PARADISE, optPara);
		SettingsManager.setValue(GROUP_NAME, KEY_BOTH,     optBoth);

		SettingsManager.saveFile();

		System.Gadget.document.parentWindow.settingsHaveChanged();

		event.cancel = false;
		}
	}

