/**
 * @file light-box.js  ---  a.video.player
 */
import Component from '../component.js';
import * as Dom from '../utils/dom.js';

//Required children
import LightBoxBackground from './light-box-background.js';
import LightBoxVideo from './light-box-video.js';
/**
 * Class structure for a light box
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LightBox
 */
class LightBox extends Component {

  constructor(player, options){
    super(player, options);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-light-box'
    });

    return el;
  }

}

LightBox.prototype.options_ = {
  loadEvent: 'play',
  children: [
    'lightBoxBackground',
    'lightBoxVideo'
  ]
};

Component.registerComponent('LightBox', LightBox);
export default LightBox;
