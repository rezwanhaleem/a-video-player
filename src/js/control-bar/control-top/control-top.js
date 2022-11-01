/**
 * @file control-top.js
 */
 import Component from '../../component.js';

 // Required children
 //PlayBar reference added --- a.video.player
 import ProgressControl from './progress-control/progress-control.js';
 
 /**
  * Container of main controls
  *
  * @extends Component
  * @class ControlTop
  */
 class ControlTop extends Component {
 
   /**
    * Create the component's DOM element
    *
    * @return {Element}
    * @method createEl
    */
   createEl() {
     return super.createEl('div', {
       className: 'vjs-control-top',
       dir: 'ltr'
     }, {
       'role': 'group' // The control bar is a group, so it can contain menuitems
     });
   }
 }
 
 ControlTop.prototype.options_ = {
   children: [
     'progressControl'
   ]
 };
 
 Component.registerComponent('ControlTop', ControlTop);
 export default ControlTop;
 