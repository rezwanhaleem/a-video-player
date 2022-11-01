/**
 * @file control-right.js
 */
 import Component from '../../../component.js';

// Required children
//import FullscreenToggle from './fullscreen-toggle.js'; //Import commented out as fullscreen toggle was placed in view bar instead  ---  a.video.player
//ViewBar reference added --- a.video.player
import ViewBar from './view-bar/view-bar.js';
import SettingsBar from './settings-bar/settings-bar.js';

 /**
  * Container of main controls
  *
  * @extends Component
  * @class ControlRight
  */
 class ControlRight extends Component {
 
   /**
    * Create the component's DOM element
    *
    * @return {Element}
    * @method createEl
    */
   createEl() {
     return super.createEl('div', {
       className: 'vjs-control-right',
       dir: 'ltr'
     }, {
       'role': 'group' // The control bar is a group, so it can contain menuitems
     });
   }
 }
 
 ControlRight.prototype.options_ = {
   children: [
    //viewBar child added --- a.video.player
    'viewBar',
    'settingsBar'
   ]
 };
 
 Component.registerComponent('ControlRight', ControlRight);
 export default ControlRight;
 