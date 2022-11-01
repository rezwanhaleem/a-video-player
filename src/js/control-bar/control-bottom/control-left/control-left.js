/**
 * @file control-left.js
 */
 import Component from '../../../component.js';

// Required children
import CurrentTimeDisplay from './time-controls/current-time-display.js';
import DurationDisplay from './time-controls/duration-display.js';
import TimeDivider from './time-controls/time-divider.js';
import RemainingTimeDisplay from './time-controls/remaining-time-display.js';
import VolumeControl from './volume-control/volume-control.js';
import VolumeMenuButton from './volume-menu-button.js';
import MuteToggle from './mute-toggle.js';

 /**
  * Container of main controls
  *
  * @extends Component
  * @class ControlLeft
  */
 class ControlLeft extends Component {
 
   /**
    * Create the component's DOM element
    *
    * @return {Element}
    * @method createEl
    */
   createEl() {
     return super.createEl('div', {
       className: 'vjs-control-left',
       dir: 'ltr'
     }, {
       'role': 'group' // The control bar is a group, so it can contain menuitems
     });
   }
 }
 
 ControlLeft.prototype.options_ = {
   children: [
	'currentTimeDisplay',
	'timeDivider',
	'durationDisplay',
	'remainingTimeDisplay',
    'volumeMenuButton',
   ]
 };
 
 Component.registerComponent('ControlLeft', ControlLeft);
 export default ControlLeft;
 