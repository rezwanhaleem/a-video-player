/**
 * @file fast-forward-5.js  ---  a.video.player
 */
import Component from '../../../component.js';
import FastForwardButton from './fast-forward-button.js';

/**
 * Displays the FastForward Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class FastForward5
 */
class FastForward5 extends FastForwardButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-fast-forward-5 ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.fastForward(10);
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

      this.fastForward(10);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

FastForward5.prototype.controlText_ = 'Fast Forward 5s';

Component.registerComponent('FastForward5', FastForward5);
export default FastForward5;
