/**
 * @file fast-forward-30.js  ---  a.video.player
 */
import Component from '../../../../../component.js';
import FastForwardButton from './fast-forward-button.js';

/**
 * Displays the FastForward Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class FastForward30
 */
class FastForward30 extends FastForwardButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-fast-forward-30 ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.fastForward(30);
    }
    else {
      this.fastClick_ = true;
    }
  }

  /**
   *
   * @method fastForwardHold
   */
  fastForwardHold(){
    if(this.mouseDown_){

      if(this.fastClick_)
    	this.fastClick_ = false;

      this.fastForward(30);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

FastForward30.prototype.controlText_ = 'Fast Forward 30s';

Component.registerComponent('FastForward30', FastForward30);
export default FastForward30;
