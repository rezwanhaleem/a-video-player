/**
 * @file previous-frame.js  ---  a.video.player
 */
import Component from '../../../component.js';
import RewindButton from './rewind-button.js';

/**
 * Displays the PreviousFrame Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class PreviousFrame
 */
class PreviousFrame extends RewindButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-previous-frame ${super.buildCSSClass()}`;
  }

  /**
   * Handle rapid single click
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      this.rewind(1.0/30.0);
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

      this.rewind(1.0/30.0);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

PreviousFrame.prototype.controlText_ = 'Previous Frame';

Component.registerComponent('PreviousFrame', PreviousFrame);
export default PreviousFrame;
