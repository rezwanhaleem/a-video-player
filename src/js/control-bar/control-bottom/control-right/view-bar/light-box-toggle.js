/**
 * @file light-box-toggle.js  ---  a.video.player
 */
import document from 'global/document';
import Button from '../../../../button.js';
import Component from '../../../../component.js';

import LightBox from '../../../../light-box/light-box.js';

/**
 * Toggle lightbox video
 *
 * @extends Button
 * @class LightBoxToggle
 */
class LightBoxToggle extends Button {

  constructor(player, options) {
    super(player, options);
    this.on(player, 'lightboxchange', this.handleLightBox);
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-light-box-control ${super.buildCSSClass()}`;
  }

  /**
   * Handles Light Box on the component and change control text accordingly
   *
   * @method handleLightBox
   */
  handleLightBox() {
    if (this.player_.isLightBox()) {
      this.controlText('Normal View');
    } else {
      this.controlText('Light Box View');
    }
  }

  /**
   * Handles click for light box
   *
   * @method handleClick
   */
  handleClick() {
    if (!this.player_.isLightBox()) {
	  if (this.player_.isFullscreen())
        this.player_.exitFullscreen();
	  if (this.player_.isTheaterMode())
        this.player_.exitTheaterMode();
      this.player_.requestLightBox(new LightBox(this.player_,this.options_));
    } else {
      this.player_.parentPlayer_.exitLightBox(this.player_.currentTime(),'lightboxtoggle');
    }
  }

}

LightBoxToggle.prototype.controlText_ = 'Light Box View';

Component.registerComponent('LightBoxToggle', LightBoxToggle);
export default LightBoxToggle;
