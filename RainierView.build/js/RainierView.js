//
// Javascript for RainierView.
// rob cranfill, 2014

// These duplicate values in the settings.js file - merge??
var GROUP_NAME   = "Options";
var KEY_MUIR     = "show_muir";
var KEY_PARADISE = "show_paradise";
var KEY_BOTH     = "show_both";
var KEY_SWITCH   = "switch_time_seconds";

var imageURLMuir_ = "http://www.nps.gov/webcams-mora/muir.jpg";
var imageURLPara_ = "http://www.nps.gov/webcams-mora/mountain.jpg";
var imageURL_ = imageURLMuir_;

var refreshTimeMuir_ = new Number(300);	// cam update is 10 minutes - this is half that
var refreshTimePara_ = new Number(60);	// cam update is 2 minutes - this is half that
var refreshTimeSeconds_ = refreshTimeMuir_;

var doFlipImages_ = false;
var isMuir_ = false;
var flipTime_ = new Number(30);


// TODO - These sizes are *multiplied* by the SCALE_X factors, 
//  but it would be nicer to have user-selectable *divisors*. 
var IMAGE_W = 512
var IMAGE_H = 384
var SCALE_DOCKED   = 1;
var SCALE_UNDOCKED = 2;

var refreshTimer_ = null;


function pauseMillis(ms) 
	{
	ms += new Date().getTime();
	while (new Date() < ms){}
	} 

function beepN(n)
	{
	pauseMillis(1000);
	for (var i=0; i<n; i++)
		{
		System.Sound.beep();
		pauseMillis(500);
 		}
  }
  

// This is invoked on page load.
//
function loadMain()
	{
	
	// can't we specify this elsewhere? it's not dynamic...
  System.Gadget.settingsUI = "RainierViewSettings.html";

  // Use the dock state method to set our size. TODO: persist this?
  System.Gadget.onDock   = checkDockState;
  System.Gadget.onUndock = checkDockState;

// XXX - does this do anything in Win7? Keep for Vista?
  checkDockState();

  loadSettings();

  refreshView();

  // Start a timer to call refreshView again.
  runTimer(refreshTimeSeconds_, "refreshView()");

  }


// (Re)display the image. Called periodically.
//
function refreshView()
  {
  var pic = document.getElementById("viewPicture");
 
	if (doFlipImages_)
	  {
	  if (isMuir_)
		  {
		 	imageURL_ = imageURLPara_;
		  }
	  else
		  {
		  imageURL_ = imageURLMuir_;
		  }
		isMuir_ = !isMuir_;

		// Re-start timer with new refresh value
	  runTimer(flipTime_, "refreshView()");
	  }
	else
		{
		runTimer(refreshTimeSeconds_, "refreshView()");
		}

  // Workaround for IE's refusal to reload the same URL: add fake param that changes on every refresh.
  //
  pic.src = imageURL_ + "?foo=" + new Date().getTime();

  }


// Set a timer to call the given function in the indicated number of seconds.
// Can be fractional and less than 1.0 (significant to 3 decimals: millisecond resolution).
//
function runTimer(timeoutSec, functionToCall) 
  {
  if (refreshTimer_ === null)
    {
    }
  else
    {
    clearInterval(refreshTimer_);
    }
  if (timeoutSec >= 0)
    {
    refreshTimer_ = setInterval(functionToCall, timeoutSec * 1000);
    }
  }


// Load settings to globals.
// Sets imageURL_, refreshTimeSeconds_ and doFlipImages_.
//
function loadSettings()
  {
  SettingsManager.loadFile();

	var optMuir = SettingsManager.getValue(GROUP_NAME, KEY_MUIR);
	var optPara = SettingsManager.getValue(GROUP_NAME, KEY_PARADISE);
	var optBoth = SettingsManager.getValue(GROUP_NAME, KEY_BOTH);

	imageURL_ = imageURLMuir_;
	refreshTimeSeconds_ = refreshTimeMuir_;
  doFlipImages_ = false;

	flipTime_ = SettingsManager.getValue(GROUP_NAME, KEY_SWITCH);

	if (optPara === "Y")
		{
		imageURL_ = imageURLPara_;
		refreshTimeSeconds_ = refreshTimePara_;
		}
	if (optBoth === "Y")
		{
		doFlipImages_ = true; // image and refresh time will begin set for Muir
		isMuir_ = true;
		}
	}


// Zoom in or out
//
function checkDockState()
  {
  System.Gadget.beginTransition();

  if (System.Gadget.docked)
    {
    document.body.style.width  = IMAGE_W * SCALE_DOCKED;
    document.body.style.height = IMAGE_H * SCALE_DOCKED;
    }
  else
    {
    document.body.style.width  = IMAGE_W * SCALE_UNDOCKED;
    document.body.style.height = IMAGE_H * SCALE_UNDOCKED;
    }
  System.Gadget.endTransition(System.Gadget.TransitionType.morph, 2);
  }


// The settings script will call this after saving (possibly-new) settings.
// TODO: could pass args to this method, rather than reading the settings again? whatever.
function settingsHaveChanged()
	{
	loadSettings();
	refreshView();	// this will set the appropriate timer for refresh or flip.
	}

