/**
 * @file rewind-toggle.js  ---  a.video.player
 */
import Component from '../../../component.js';
import window from 'global/window';
import RewindButton from './rewind-button.js';

/**
 * Displays the Rewind Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class RewindToggle
 */
class RewindToggle extends RewindButton {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-rewind-toggle ${super.buildCSSClass()}vjs-plyr-control`;
  }

  /**
   * Handle rapid single click shows or hides rewind buttons
   *
   * @method handleMouseUp
   */
  handleMouseUp() {
	this.mouseDown_ = false;
    if(this.fastClick_) {
      if(this.hasClass('vjs-rewinding')){
        this.removeClass('vjs-rewinding');
      }
      else {
	    this.addClass('vjs-rewinding');
      }
    }
    else {
      this.fastClick_ = true;
    }
  }

  /**
   *
   * @method rewindHold
   */
  rewindHold(){
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

      this.rewind(timeChange);
    }
    else {
      clearInterval(this.interval_);
    }
  }
}

RewindToggle.prototype.controlText_ = 'Rewind';

Component.registerComponent('RewindToggle', RewindToggle);
export default RewindToggle;
