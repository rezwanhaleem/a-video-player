/**
 * @file next-frame.js  ---  a.video.player
 */
import Component from '../../../component.js';
import FastForwardButton from './fast-forward-button.js';

/**
 * Displays the NextFrame Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class NextFrame
 */
class NextFrame extends FastForwardButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-next-frame ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.fastForward(1.0/30.0);
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

      this.fastForward(1.0/30.0);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

NextFrame.prototype.controlText_ = 'Next Frame';

Component.registerComponent('NextFrame', NextFrame);
export default NextFrame;
