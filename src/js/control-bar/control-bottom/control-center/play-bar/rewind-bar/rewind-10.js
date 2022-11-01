/**
 * @file rewind-10.js  ---  a.video.player
 */
import Component from '../../../../../component.js';
import RewindButton from './rewind-button.js';

/**
 * Displays the Rewind Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class Rewind10
 */
class Rewind10 extends RewindButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-rewind-10 ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.rewind(10);
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

      this.rewind(10);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

Rewind10.prototype.controlText_ = 'Rewind 10s';

Component.registerComponent('Rewind10', Rewind10);
export default Rewind10;
