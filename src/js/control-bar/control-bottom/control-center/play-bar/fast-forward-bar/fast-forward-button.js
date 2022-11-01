/**
 * @file fast-forward-toggle.js  ---  a.video.player
 */
import Component from '../../../../../component.js';
import window from 'global/window';
import Button from '../../../../../button.js';

/**
 * Displays the FastForward Button
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class FastForwardButton
 */
class FastForwardButton extends Button {

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
	if(!this.hasClass('vjs-fast-forward-toggle'))
	  this.player_.pause();
	//var that is used within anonymous functions
	var that = this;
	setTimeout(function() {
	  that.startTime_ = window.performance.now();
	  //RAF called to animate and illustrate the moving forward past the zoomed progress bar
	  if(that.mouseDown_ && that.hasClass('vjs-fast-forward-toggle'))
	    that.player_.pause();
      that.interval_ = setInterval(function() {
	    that.fastForwardHold();
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
   * @method fastForwardHold
   */
  fastForwardHold(){

  }

  /**
   *
   * @method fastForwardHold
   */
  fastForward(timeChange){
    if( this.player_.remainingTime() >= timeChange ){
      this.player_.currentTime(this.player_.currentTime() + timeChange);
    }
    else {
	  this.player_.currentTime(this.player_.duration() - (1.0/60.0));
  	}
  }
}

Component.registerComponent('FastForwardButton', FastForwardButton);
export default FastForwardButton;
