/**
 * @file light-box-background.js  ---  a.video.player
 */
import Component from '../component.js';
import * as Dom from '../utils/dom.js';

/**
 * Class structure for a light box background
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LightBoxBackground
 */
class LightBoxBackground extends Component {

  constructor(player, options){
    super(player, options);
    this.on('mousedown', this.handleMouseDown);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-light-box-background'
    });
    return el;
  }

  /**
   * Handle Mouse Down ---  a.video.player
   *
   * @method handleMouseDown
   */
  handleMouseDown() {
	this.el_.setAttribute('lol','lol');
    this.player_.exitLightBox(this.player_.video_.currentTime(),'lightboxbackground');
  }

}

Component.registerComponent('LightBoxBackground', LightBoxBackground);
export default LightBoxBackground;
