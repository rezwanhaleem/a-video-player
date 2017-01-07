/**
 * @file exit-light-box.js
 */
import Button from '../button.js';
import Component from '../component.js';

/**
 * Exit Light Box View
 *
 * @extends Button
 * @class ExitLightBox
 */
class ExitLightBox extends Button {

  constructor(player, options) {
    super(player, options);
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-exit-light-box ${super.buildCSSClass()}`;
  }

  /**
   * Handles click for exiting light box
   *
   * @method handleClick
   */
  handleClick() {
    this.player_.parentPlayer_.exitLightBox(this.player_.currentTime(),'exitlightbox');
  }

}

ExitLightBox.prototype.controlText_ = 'Exit Light Box';

Component.registerComponent('ExitLightBox', ExitLightBox);
export default ExitLightBox;
