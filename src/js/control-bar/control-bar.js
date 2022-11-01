/**
 * @file control-bar.js
 */
import Component from '../component.js';

// Required children
//import PlayToggle from './play-toggle.js'; //Import commented out as play toggle was placed in play bar instead  ---  a.video.player
// import LiveDisplay from './live-display.js';
//ControlTop and ControlBottom reference added --- a.video.player
import ControlTop from './control-top/control-top.js';
import ControlBottom from './control-bottom/control-bottom.js';

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
	// 'progressControl',
  'controlTop',
	// 'currentTimeDisplay',
	// 'timeDivider',
	// 'durationDisplay',
	// 'remainingTimeDisplay',
	// 'liveDisplay',
	// 'volumeMenuButton',
	//Commented out playToggle as it has been relocated into the play bar  ---  a.video.player
	//'playToggle',
	//playBar child added --- a.video.player
    // 'playBar',
    //viewBar child added --- a.video.player
    // 'viewBar',
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
	// 'settingsBar'
    'controlBottom'
  ]
};

Component.registerComponent('ControlBar', ControlBar);
export default ControlBar;
