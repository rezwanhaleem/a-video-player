/**
 * @file control-bottom.js
 */
 import Component from '../../component.js';

// Required children
import ControlLeft from './control-left/control-left.js';
import ControlCenter from './control-center/control-center.js';
import ControlRight from './control-right/control-right.js';

 /**
  * Container of main controls
  *
  * @extends Component
  * @class ControlBottom
  */
 class ControlBottom extends Component {
 
   /**
    * Create the component's DOM element
    *
    * @return {Element}
    * @method createEl
    */
   createEl() {
     return super.createEl('div', {
       className: 'vjs-control-bottom',
       dir: 'ltr'
     }, {
       'role': 'group' // The control bar is a group, so it can contain menuitems
     });
   }
 }
 
 ControlBottom.prototype.options_ = {
   children: [
    'controlLeft',
    'controlCenter',
    'controlRight'
   ]
 };
 
 Component.registerComponent('ControlBottom', ControlBottom);
 export default ControlBottom;
 