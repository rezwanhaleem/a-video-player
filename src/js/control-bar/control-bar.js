/**
 * @file control-bar.js
 */
import Component from '../component.js';

// Required children
//import PlayToggle from './play-toggle.js'; //Import commented out as play toggle was placed in play bar instead  ---  a.video.player
//PlayBar reference added --- a.video.player
import PlayBar from './play-bar/play-bar.js';
import CurrentTimeDisplay from './time-controls/current-time-display.js';
import DurationDisplay from './time-controls/duration-display.js';
import TimeDivider from './time-controls/time-divider.js';
import RemainingTimeDisplay from './time-controls/remaining-time-display.js';
import LiveDisplay from './live-display.js';
import ProgressControl from './progress-control/progress-control.js';
//import FullscreenToggle from './fullscreen-toggle.js'; //Import commented out as fullscreen toggle was placed in view bar instead  ---  a.video.player
//ViewBar reference added --- a.video.player
import ViewBar from './view-bar/view-bar.js';
import VolumeControl from './volume-control/volume-control.js';
import VolumeMenuButton from './volume-menu-button.js';
import MuteToggle from './mute-toggle.js';
//Imports Commented out as children have been relocated into the settings bar  ---  a.video.player
/*import ChaptersButton from './text-track-controls/chapters-button.js';
import DescriptionsButton from './text-track-controls/descriptions-button.js';
import SubtitlesButton from './text-track-controls/subtitles-button.js';
import CaptionsButton from './text-track-controls/captions-button.js';
import AudioTrackButton from './audio-track-controls/audio-track-button.js';
import PlaybackRateMenuButton from './playback-rate-menu/playback-rate-menu-button.js';
import CustomControlSpacer from './spacer-controls/custom-control-spacer.js'; */
//SettingsBar reference added --- a.video.player
import SettingsBar from './settings-bar/settings-bar.js';

/**
 * Container of main controls
 *
 * @extends Component
 * @class ControlBar
 */
class ControlBar extends Component {

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-control-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The control bar is a group, so it can contain menuitems
    });
  }
}

ControlBar.prototype.options_ = {
  children: [
	//Rearranged the order of child elements to suit the needs for a new design  ---  a.video.player
	'progressControl',
	'currentTimeDisplay',
	'timeDivider',
	'durationDisplay',
	'remainingTimeDisplay',
	'liveDisplay',
	'volumeMenuButton',
	//Commented out playToggle as it has been relocated into the play bar  ---  a.video.player
	//'playToggle',
	//playBar child added --- a.video.player
    'playBar',
    //viewBar child added --- a.video.player
    'viewBar',
	//Commented out children as they have been relocated into the settings bar  ---  a.video.player
    /*'customControlSpacer',
    'playbackRateMenuButton',
    'chaptersButton',
    'descriptionsButton',
    'subtitlesButton',
    'captionsButton',
    'audioTrackButton',*/
    //'fullscreenToggle'   //Displaced(purposely) into view bar instead  ---  a.video.player
    //settingsBar child added --- a.video.player
	'settingsBar'
  ]
};

Component.registerComponent('ControlBar', ControlBar);
export default ControlBar;
