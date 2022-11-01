/**
 * @file control-center.js
 */
 import Component from '../../../component.js';

// Required children
//PlayBar reference added --- a.video.player
import PlayBar from './play-bar/play-bar.js';

 /**
  * Container of main controls
  *
  * @extends Component
  * @class ControlCenter
  */
 class ControlCenter extends Component {
 
   /**
    * Create the component's DOM element
    *
    * @return {Element}
    * @method createEl
    */
   createEl() {
     return super.createEl('div', {
       className: 'vjs-control-center',
       dir: 'ltr'
     }, {
       'role': 'group' // The control bar is a group, so it can contain menuitems
     });
   }
 }
 
 ControlCenter.prototype.options_ = {
   children: [
    'playBar'
   ]
 };
 
 Component.registerComponent('ControlCenter', ControlCenter);
 export default ControlCenter;
 