/**
 * @file top-bar.js
 */
import Component from '../component.js';

// Required children
import ExitLightBox from './exit-light-box.js';


/**
 * Container of main controls
 *
 * @extends Component
 * @class TopBar
 */
class TopBar extends Component {

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-top-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The control bar is a group, so it can contain menuitems
    });
  }
}

Component.registerComponent('TopBar', TopBar);
export default TopBar;
