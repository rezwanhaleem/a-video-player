/**
 * @file theater-toggle.js  ---  a.video.player
 */
import document from 'global/document';
import Button from '../../button.js';
import Component from '../../component.js';

//Imports needed for addElClass or removeElClass methods ---  a.video.player
import * as Dom from '../../utils/dom.js';

/**
 * Toggle theater mode
 *
 * @extends Button
 * @class TheaterToggle
 */
class TheaterToggle extends Button {

  constructor(player, options) {
    super(player, options);
    this.on(player, 'theatermodechange', this.handleTheaterModeChange);
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-theater-control ${super.buildCSSClass()}`;
  }

  /**
   * Handles Theater Mode on the component and change control text accordingly
   *
   * @method handleTheaterModeChange
   */
  handleTheaterModeChange() {
    if (this.player_.isTheaterMode()) {
      this.controlText('Normal View');
    } else {
      this.controlText('Theater View');
    }
  }

  /**
   * Handles click for theater mode
   *
   * @method handleClick
   */
  handleClick() {
    if (!this.player_.isTheaterMode()) {
	  if (this.player_.isFullscreen())
        this.player_.exitFullscreen();
	  if (this.player_.isLightBox())
        this.player_.parentPlayer_.exitLightBox(this.player_.currentTime(),'theatertoggle');
      this.player_.requestTheaterMode();
    } else {
      this.player_.exitTheaterMode();
    }
  }

}

TheaterToggle.prototype.controlText_ = 'Theater View';

Component.registerComponent('TheaterToggle', TheaterToggle);
export default TheaterToggle;
