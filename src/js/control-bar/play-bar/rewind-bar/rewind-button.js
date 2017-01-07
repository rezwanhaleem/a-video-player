/**
 * @file rewind-toggle.js  ---  a.video.player
 */
import Component from '../../../component.js';
import window from 'global/window';
import Button from '../../../button.js';

/**
 * Displays the Rewind Button
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class RewindButton
 */
class RewindButton extends Button {

  constructor(player, options){
    super(player, options);
    this.on('mousedown', this.handleMouseDown);
    this.on('mouseup', this.handleMouseUp);
  }

  /**
   * Handle mouse hold for easy fast forwarding
   *
   * @method handleMouseDownb
   */
  handleMouseDown() {
	this.mouseDown_ = true;
	this.fastClick_ = true;
	if(!this.hasClass('vjs-rewind-toggle'))
      this.player_.pause();
	//var that is used within anonymous functions
	var that = this;
	setTimeout(function() {
	  that.startTime_ = window.performance.now();
	  if(that.mouseDown_ && that.hasClass('vjs-rewind-toggle'))
	    that.player_.pause();
	  //RAF called to animate and illustrate the moving forward past the zoomed progress bar
      that.interval_ = setInterval(function() {
	    that.rewindHold();
      },200);
    },200);

  }

  /**
   * Handle rapid single click shows or hides fast forward buttons
   *
   * @method handleMouseUp
   */
  handleMouseUp() {

  }

  /**
   *
   * @method rewindHold
   */
  rewindHold(){

  }

  /**
   *
   * @method rewindHold
   */
  rewind(timeChange){
    if( this.player_.currentTime() >= timeChange ){
      this.player_.currentTime(this.player_.currentTime() - timeChange);
    }
    else {
	  this.player_.currentTime(0);
  	}
  }
}

Component.registerComponent('RewindButton', RewindButton);
export default RewindButton;
