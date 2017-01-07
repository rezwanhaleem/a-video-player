/**
 * @file seek-bar.js
 */
import window from 'global/window';
import Slider from '../../slider/slider.js';
import Component from '../../component.js';
import LoadProgressBar from './load-progress-bar.js';
import PlayProgressBar from './play-progress-bar.js';
import TooltipProgressBar from './tooltip-progress-bar.js';
import * as Fn from '../../utils/fn.js';
import formatTime from '../../utils/format-time.js';
import assign from 'object.assign';
//Imported to allow access to the method "Dom.getPointerPosition(" ---  a.video.player
import * as Dom from '../../utils/dom.js';

/**
 * Seek Bar and holder for the progress bars
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Slider
 * @class SeekBar
 */
class SeekBar extends Slider {

  constructor(player, options){
    super(player, options);
    this.on(player, 'timeupdate', this.updateProgress);
    this.on(player, 'ended', this.updateProgress);
    player.ready(Fn.bind(this, this.updateProgress));

    if (options.playerOptions &&
        options.playerOptions.controlBar &&
        options.playerOptions.controlBar.progressControl &&
        options.playerOptions.controlBar.progressControl.keepTooltipsInside) {
      this.keepTooltipsInside = options.playerOptions.controlBar.progressControl.keepTooltipsInside;
    }

    if (this.keepTooltipsInside) {
      this.tooltipProgressBar = this.addChild('TooltipProgressBar');
    }
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-progress-holder'
    }, {
      'aria-label': 'progress bar'
    });
  }

  /**
   * Update ARIA accessibility attributes
   *
   * @method updateARIAAttributes
   */
  updateProgress() {
    this.updateAriaAttributes(this.el_);

    if (this.keepTooltipsInside) {
      this.updateAriaAttributes(this.tooltipProgressBar.el_);
      this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;

      let playerWidth = parseFloat(window.getComputedStyle(this.player().el()).width);
      let tooltipWidth = parseFloat(window.getComputedStyle(this.tooltipProgressBar.tooltip).width);
      let tooltipStyle = this.tooltipProgressBar.el().style;
      tooltipStyle.maxWidth = Math.floor(playerWidth - (tooltipWidth / 2)) + 'px';
      tooltipStyle.minWidth = Math.ceil(tooltipWidth / 2) + 'px';
      tooltipStyle.right = `-${tooltipWidth / 2}px`;
    }
  }

  updateAriaAttributes(el) {
    // Allows for smooth scrubbing, when player can't keep up.
    let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
    el.setAttribute('aria-valuenow', (this.getPercent() * 100).toFixed(2)); // machine readable value of progress bar (percentage complete)
    el.setAttribute('aria-valuetext', formatTime(time, this.player_.duration())); // human readable value of progress bar (time complete)
  }

  /**
   * Get percentage of video played
   *
   * @return {Number} Percentage played
   * @method getPercent
   */
  getPercent() {
    let percent = this.player_.currentTime() / this.player_.duration();
    return percent >= 1 ? 1 : percent;
  }

  /**
   * Handle mouse down on seek bar
   *
   * @method handleMouseDown
   */
  handleMouseDown(event) {
    super.handleMouseDown(event);

    this.player_.scrubbing(true);

    this.videoWasPlaying = !this.player_.paused();
    this.player_.pause();
    //Add proper classes so the states of the player can be identified by later codes properly	---  a.video.player
    this.addClass('vjs-pulling');
    this.player_.addClass('vjs-pull');
    //Used as a boolean to show whether pullseeking has started	---  a.video.player
    this.el_.setAttribute('zoom', 'false');
  }

  /**
   * Handle mouse move on seek bar
   *
   * @method handleMouseMove
   */
  handleMouseMove(event) {
    //Get pointer position relative to the progress holder hit area (bottom left precisely)	---  a.video.player
    let pointerpos = Dom.getPointerPosition(this.el_.parentNode, event);
    let pullup = pointerpos.y;
    let pull = pointerpos.x;
    let temp = pullup * 3;
    this.el_.setAttribute('temp', temp);

    //Start pullseeking ONLY when the progress handle is drag farther than the threshold of 1.5em above the bottom of the progress holder  ---  a.video.player
    if(temp >= 1.5){
      this.el_.style.height = temp + 'em';
      //Top changed only to keep the position of the progress bar constant as its height changes  --  a.video.player
      this.el_.style.top = (-1 * (temp / 2)) + 'em';

      this.loadProgressBar.el_.style.height = temp + 'em';
      this.playProgressBar.el_.style.height = temp + 'em';

      this.el_.style.backgroundSize = (pullup * 5) + 'em';
      this.playProgressBar.el_.style.backgroundSize = (pullup * 5) + 'em';

      //Set the background position ONCE so that zooming effect can be displayed as the progress handle is dragged upwards  ---  a.video.player
      if(this.el_.getAttribute('zoom') === 'false') {
    	let backpos = Math.floor(this.calculateDistance(event)*parseFloat(window.getComputedStyle(this.el_.parentNode).width));
        this.el_.style.backgroundPosition = backpos + 'px 0%';
        this.playProgressBar.el_.style.backgroundPosition = backpos + 'px 0%';
        this.el_.setAttribute('backpos', backpos);
        //Time offset set to help updateTooltip method retrieve calculations already made by the RAFs  ---  a.video.player
        this.el_.setAttribute('timeOffset', 0);
      }

      if(this.el_.getAttribute('zoom') === 'false')
    	  this.el_.setAttribute('zoom', 'true');

      //Pullseeking is the name given to the state that the progress bar is zoomed upon  ---  a.video.player
      this.addClass('vjs-pullseeking');

      //var that is used within anonymous functions calling RAFs  ---  a.video.player
      var that = this;
      //Check if the progress handle has been pulled farthest back while pullseeking  ---  a.video.player
      if(parseFloat(window.getComputedStyle(this.playProgressBar.el_).width) === 0 ){
    	this.addClass('vjs-backpulling');
    	//RAF called to animate and illustrate the moving back from the zoomed progress bar  ---  a.video.player
    	window.requestAnimationFrame(function() {
	      that.pullback(event);
	    });
      }
      //Check if the progress handled has been pulled all the way to the end wile pullseeking  ---  a.video.player
      else if(parseFloat(window.getComputedStyle(this.playProgressBar.el_).width) === parseFloat(window.getComputedStyle(this.el_).width) ){
    	this.addClass('vjs-forwardpulling');
    	//RAF called to animate and illustrate the moving forward past the zoomed progress bar  ---  a.video.player
    	window.requestAnimationFrame(function() {
	      that.pullforward(event);
	    });
      }
      else{
        //If pullseeking anywhere within the zoomed area then other indicating class names need to be removed from the seek bar  ---  a.video.player
    	if(this.hasClass('vjs-forwardpulling')){
          this.removeClass('vjs-forwardpulling');
    	  if(this.hasClass('vjs-maxforwardpull'))
            this.removeClass('vjs-maxforwardpull');
    	}
    	if(this.hasClass('vjs-backpulling')){
    	  this.removeClass('vjs-backpulling');
    	  if(this.hasClass('vjs-maxbackpull'))
            this.removeClass('vjs-maxbackpull');
    	}
      }
    }
    else{
      //If not pullseeking then states need to be changed via removal of unnecessary class names  ---  a.video.player
      if(this.hasClass('vjs-pullseeking'))
    	this.removeClass('vjs-pullseeking');
	  if(this.hasClass('vjs-forwardpulling')){
	    this.removeClass('vjs-forwardpulling');
		if(this.hasClass('vjs-maxforwardpull'))
          this.removeClass('vjs-maxforwardpull');
	  }
	  if(this.hasClass('vjs-backpulling')){
	    this.removeClass('vjs-backpulling');
		if(this.hasClass('vjs-maxbackpull'))
          this.removeClass('vjs-maxbackpull');
	  }

      this.el_.style.height = '0.3em';
      this.el_.style.top = '-0.15em';

      this.loadProgressBar.el_.style.height = '0.3em';
      this.playProgressBar.el_.style.height = '0.3em';

      if(this.el_.getAttribute('zoom') === 'true')
        this.el_.setAttribute('zoom', 'false');
    }

    //Since RAFs call updateToolTip method by themselves in their own fashion, no need for redundant calls  ---  a.video.player
    if( !this.hasClass('vjs-backpulling') && !this.hasClass('vjs-forwardpulling'))
      this.updateToolTip(event);

    this.playProgressBar.el_.style.width = (pull * parseFloat(window.getComputedStyle(this.el_).width)) + 'px';

    if(!this.hasClass('vjs-pullseeking')){
    	let duration = this.player_.duration();
		let newTime = this.calculateDistance(event) * duration;
		// Don't let video end while scrubbing.
	    if (newTime === this.player_.duration()) { newTime = newTime - (1.0/60.0); }

	    // Set new time (tell player to seek to new time)
	    this.player_.currentTime(newTime);
	}
  }

  //RAF method used to animate motion back from the zoomed pullseeking area ---  a.video.player
  pullback(event){
    if(this.hasClass('vjs-backpulling')){
	  //Calculated increment of pixels over a 60fps animation frame ---  a.video.player
	  let change = (1000/60)*(5/200);
	  //INCREMENTED to give the illusion of moving back  ---  a.video.player
	  let backgroundPos = parseFloat(window.getComputedStyle(this.el_).backgroundPosition) + change;
	  let width = parseFloat(window.getComputedStyle(this.el_).width);
	  this.updateToolTip(event);

	  //Further calculations regarding time to prevent backpulling farther than the beginning of the video  --- a.video.player
	  let duration = this.player_.duration();
	  let newTime = this.calculateDistance(event) * duration;
	  newTime = this.player_.currentTime() + ((newTime - this.player_.currentTime() )/ 10);
	  let attrbackpos = parseFloat(this.el_.getAttribute('backpos'));
	  //Timeoffset based on he changes in background position which should be synchronized with time changes  ---  a.video.player
	  let backPosOffset = ( attrbackpos - backgroundPos ) / width;
	  newTime += (backPosOffset * duration);

	  if(newTime >= 0){
	    this.el_.style.backgroundPosition = backgroundPos + 'px 0%';
	    this.playProgressBar.el_.style.backgroundPosition = backgroundPos + 'px 0%';
	    this.el_.setAttribute('timeOffset', backPosOffset);
	    var that = this;
	    //Recall of RAF for continued animation  ---  a.video.player
	    window.requestAnimationFrame(function() {
	      that.pullback(event);
	    });
	  }
	  else{
	    this.addClass('vjs-maxbackpull');
	    this.updateToolTip(event);
	  }
    }
  }

  //RAF method used to animate motion past the zoomed pullseeking area ---  a.video.player
  pullforward(event){
	if(this.hasClass('vjs-forwardpulling')){
	  //Calculated increment of pixels over a 60fps animation frame ---  a.video.player
	  let change = (1000/60)*(5/200);
	  //DECREMENTED to give the illusion of moving forward  ---  a.video.player
	  let backgroundPos = parseFloat(window.getComputedStyle(this.el_).backgroundPosition) - change;
	  let width = parseFloat(window.getComputedStyle(this.el_).width);
	  this.updateToolTip(event);

	  //Further calculations regarding time to prevent forwardpulling farther than the end of the video  --- a.video.player
	  let duration = this.player_.duration();
	  let newTime = this.calculateDistance(event) * duration;
	  newTime = this.player_.currentTime() + ((newTime - this.player_.currentTime() )/ 10);
	  let attrbackpos = parseFloat(this.el_.getAttribute('backpos'));
	  //Timeoffset based on he changes in background position which should be synchronized with time changes  ---  a.video.player
	  let backPosOffset = ( attrbackpos - backgroundPos ) / width;
	  newTime += (backPosOffset * duration);

	  if(newTime <= duration){
	    this.el_.style.backgroundPosition = backgroundPos + 'px 0%';
	    this.playProgressBar.el_.style.backgroundPosition = backgroundPos + 'px 0%';
	    this.el_.setAttribute('timeOffset', backPosOffset);
	    var that = this;
	    //Recall of RAF for continued animation  ---  a.video.player
	    window.requestAnimationFrame(function() {
          that.pullforward(event);
        });
	  }
	  else{
	    this.addClass('vjs-maxforwardpull');
	    this.updateToolTip(event);
	  }
    }
  }

  //Substitute for methods "handleMouseMove" and "update" in MouseTimeDisplay so that an increased accuracy in the range of milliseconds can be displayed while pullseeking  ---  a.video.player
  updateToolTip(event) {
    let duration = this.player_.duration();
    let newTime = this.calculateDistance(event) * duration;
    let position = event.pageX - Dom.findElPosition(this.el().parentNode).left;

    //Stop the mouse time display from going outside the boundaries of the progress holder  ---  a.video.player
    let parentWidth = parseFloat(window.getComputedStyle(this.el_.parentNode).width);
    if(position < 0){
	  position = 0;
    }
    else if(position > parentWidth){
	  position = parentWidth;
    }

    if(this.hasClass('vjs-pullseeking')){
	  newTime = this.player_.currentTime() + ((newTime - this.player_.currentTime() )/ 10);

	  newTime += parseFloat(this.el_.getAttribute('timeOffset')) * duration;

	  //Ensure that when maxpulled for maxforwarded then the time doesnt show negligible misalignment  ---  a.video.player
	  if(this.hasClass('vjs-maxbackpull')){
	    newTime = 0;
	  }
	  else if(this.hasClass('vjs-maxforwardpull')){
		newTime = duration;
	  }
    }

    let time = formatTime(newTime, this.player_.duration());

    this.mouseTimeDisplay.el().style.left = position + 'px';
    if(this.hasClass('vjs-pullseeking')){
	  let ms = Math.floor((newTime - Math.floor(newTime))*1000);

	  //Increased accuracy of milliseconds during pullseeking added here   ---  a.video.player
	  ms = ms < 100? (ms < 10 ? '00' + ms : '0' + ms) : ms;

	  this.mouseTimeDisplay.el().setAttribute('data-current-time', time + '.' + ms);
    }
    else
	  this.mouseTimeDisplay.el().setAttribute('data-current-time', time);

    if (this.mouseTimeDisplay.keepTooltipsInside) {
      let clampedPosition = this.mouseTimeDisplay.clampPosition_(position);
      let difference = position - clampedPosition + 1;
      let tooltipWidth = parseFloat(window.getComputedStyle(this.mouseTimeDisplay.tooltip).width);
      let tooltipWidthHalf = tooltipWidth / 2;

      this.mouseTimeDisplay.tooltip.innerHTML = time;
      this.mouseTimeDisplay.tooltip.style.right = `-${tooltipWidthHalf - difference}px`;
    }
  }

  //Handles time updates upon mouse release while pullseeking  ---  a.video.player
  updateTime(event){
    //Instead of updating the time every time the progress handle is move it is updated only when its let go and the user as decided a time  ---  a.video.player
    let duration = this.player_.duration();
    let newTime = this.calculateDistance(event) * duration;

    newTime = this.player_.currentTime() + ((newTime - this.player_.currentTime() )/ 10);

    newTime += parseFloat(this.el_.getAttribute('timeOffset')) * duration;

    //Ensure that when maxpulled for maxforwarded then the time doesnt show negligible misalignment  ---  a.video.player
    if(this.hasClass('vjs-maxbackpull')){
	  newTime = 0;
    }
    else if(this.hasClass('vjs-maxforwardpull')){
	  newTime = duration;
    }
    // Don't let video end while scrubbing.
    if (newTime === this.player_.duration()) { newTime = newTime - (1.0/60.0); }

    // Set new time (tell player to seek to new time)
    this.player_.currentTime(newTime);
  }

  /**
   * Handle mouse up on seek bar
   *
   * @method handleMouseUp
   */
  handleMouseUp(event) {
	if(this.hasClass('vjs-pullseeking')){
		this.updateTime(event);
	}

    super.handleMouseUp(event);

    this.player_.scrubbing(false);
    if (this.videoWasPlaying) {
      this.player_.play();
    }
    //Remove any state indicating class names upon mouse up	---  a.video.player
    if(this.hasClass('vjs-pullseeking'))
	  this.removeClass('vjs-pullseeking');
    this.player_.removeClass('vjs-pull');
    this.removeClass('vjs-pulling');
    if(this.hasClass('vjs-forwardpulling')){
      this.removeClass('vjs-forwardpulling');
      if(this.hasClass('vjs-maxforwardpull'))
        this.removeClass('vjs-maxforwardpull');
    }
    if(this.hasClass('vjs-backpulling')){
      this.removeClass('vjs-backpulling');
      if(this.hasClass('vjs-maxbackpull'))
        this.removeClass('vjs-maxbackpull');
    }
    //Restore element heights to normal  ---  a.video.player
    this.el_.style.height = '0.3em';
    this.el_.style.top = '-0.15em';
    this.loadProgressBar.el_.style.height = '0.3em';
    this.playProgressBar.el_.style.height = '0.3em';
  }

  /**
   * Move more quickly fast forward for keyboard-only users
   *
   * @method stepForward
   */
  stepForward() {
    this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
  }

  /**
   * Move more quickly rewind for keyboard-only users
   *
   * @method stepBack
   */
  stepBack() {
    this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
  }
}

SeekBar.prototype.options_ = {
  children: [
    'loadProgressBar',
    'mouseTimeDisplay',
    'playProgressBar'
  ],
  'barName': 'playProgressBar'
};

SeekBar.prototype.playerEvent = 'timeupdate';

Component.registerComponent('SeekBar', SeekBar);
export default SeekBar;
