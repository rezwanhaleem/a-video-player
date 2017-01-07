/**
 * @file fast-forward-toggle.js  ---  a.video.player
 */
import Component from '../../../component.js';
import window from 'global/window';
import FastForwardButton from './fast-forward-button.js';

/**
 * Displays the FastForward Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class FastForwardToggle
 */
class FastForwardToggle extends FastForwardButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-fast-forward-toggle ${super.buildCSSClass()}vjs-plyr-control`;
  }

  /**
   * Handle rapid single click shows or hides fast forward buttons
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      if(this.hasClass('vjs-fast-forwarding')){
        this.removeClass('vjs-fast-forwarding');
      }
      else {
        this.addClass('vjs-fast-forwarding');
      }
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

      let timeChange;
      let elapsedTime = window.performance.now() - this.startTime_;

      if( elapsedTime >= 4000 ) {
        timeChange = 4;
      }
      else if (elapsedTime >= 2000 ) {
    	timeChange = 2;
      }
      else {
        timeChange = 1;
      }

      this.fastForward(timeChange);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

FastForwardToggle.prototype.controlText_ = 'FastForward';

Component.registerComponent('FastForwardToggle', FastForwardToggle);
export default FastForwardToggle;
