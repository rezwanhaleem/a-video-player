/**
 * @file rewind-30.js  ---  a.video.player
 */
import Component from '../../../component.js';
import RewindButton from './rewind-button.js';

/**
 * Displays the Rewind Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class Rewind30
 */
class Rewind30 extends RewindButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-rewind-30 ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.rewind(30);
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

      this.rewind(30);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

Rewind30.prototype.controlText_ = 'Rewind 30s';

Component.registerComponent('Rewind30', Rewind30);
export default Rewind30;
