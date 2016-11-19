/**
 * @file view-bar.js  ---  a.video.player
 */
import Component from '../component.js';

// Required children
import ExpandToggle from './expand-toggle.js';
import FullscreenToggle from './fullscreen-toggle.js';
import TheaterToggle from './theater-toggle.js';


/**
 * Container of view controls
 *
 * @extends Component
 * @class ViewBar
 */
class ViewBar extends Component {

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-view-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The view bar is a group, so it can contain menuitems
    });
  }
}

ViewBar.prototype.options_ = {
  loadEvent: 'play',
  children: [
    'fullscreenToggle',
    'theaterToggle',
    'expandToggle'
  ]
};

Component.registerComponent('ViewBar', ViewBar);
export default ViewBar;
