/**
 * @file rewind-5.js  ---  a.video.player
 */
import Component from '../../../../../component.js';
import RewindButton from './rewind-button.js';

/**
 * Displays the Rewind Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class Rewind5
 */
class Rewind5 extends RewindButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-rewind-5 ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.rewind(5);
    }
    else {
      this.fastClick_ = true;
    }
  }

  /**
   *
   * @method fastForwardHold
   */
  rewindHold(){
    if(this.mouseDown_){

      if(this.fastClick_)
    	this.fastClick_ = false;

      this.rewind(5);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

Rewind5.prototype.controlText_ = 'Rewind 5s';

Component.registerComponent('Rewind5', Rewind5);
export default Rewind5;
