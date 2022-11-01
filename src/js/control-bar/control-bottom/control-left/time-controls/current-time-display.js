/**
 * @file current-time-display.js
 */
import Component from '../../../../component.js';
import * as Dom from '../../../../utils/dom.js';
import formatTime from '../../../../utils/format-time.js';

//Dependencies required for editability of current time  ---  a.video.player
import * as Events from '../../../../utils/events.js';
import * as Fn from '../../../../utils/fn.js';
import document from 'global/document';
import window from 'global/window';

/**
 * Displays the current time
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class CurrentTimeDisplay
 */
class CurrentTimeDisplay extends Component {

  constructor(player, options){
    super(player, options);

    this.on(player, 'timeupdate', this.updateContent);
    //Allows the current time to be edited on focus  ---  a.video.player
    this.on('focus', this.handleFocus);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-current-time vjs-current-time-display vjs-time-control vjs-control',
      //Changed the inner html structure to allow easy proper access to time inputs within  ---  a.video.player
      // label the current time for screen reader users
      innerHTML: '<span class="vjs-control-text">Current Time</span>' + '0:00',
    }, {
      // tell screen readers not to automatically read the time as it changes
      'aria-live': 'off',
  	  //Allow time to be edited using keyboard input  ---  a.video.player
  	  'contenteditable' : 'true'
    });

    return el;
  }

  /**
   * Update current time display
   *
   * @method updateContent
   */
  updateContent() {
    // Allows for smooth scrubbing, when player can't keep up.
    let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
    let localizedText = this.localize('Current Time');
    let formattedTime = formatTime(time, this.player_.duration());
    if (formattedTime !== this.formattedTime_) {
      this.formattedTime_ = formattedTime;
      //Due to change in innerHTML structure  ---  a.video.player
      this.el_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${formattedTime}`;
    }
  }

  /**
   * Handle Focus - Add keyboard functionality to element ---  a.video.player
   *
   * @method handleFocus
   */
  handleFocus() {
	this.videoWasPlaying = !this.player_.paused();
	this.player_.pause();
    Events.on(document, 'keydown', Fn.bind(this, this.handleKeyPress));
    Events.on(document, 'paste', Fn.bind(this, this.preventAction));
  }

  /**
   * Handle unwanted key presses or events ---  a.video.player
   *
   * @method preventAction
   */
  preventAction(event) {
	  event.preventDefault();
  }

  /**
   * Handle KeyPress (document level) - Trigger click when Space or Enter key is pressed  ---  a.video.player
   *
   * @method handleKeyPress
   */
  handleKeyPress(event) {
    // Support Enter (13) key operation to fire a click event
    if (event.which === 13) {
      event.preventDefault();
      this.handleInput(event);
    }
    else if(event.ctrlKey || event.shiftKey){
	  if(event.which !== 59){
	    event.preventDefault();
    	event.stopPropagation();
	  }
	  else
	    this.addChar(event);
    }
    else if(event.which === 8 || event.which === 37){
	  if(this.getCaretPosition() === 13)
    	event.preventDefault();
    }
    else if(event.which === 35 || event.which === 39 || event.which === 46){} //Allow these keypresses by doing nothing
    else{
	  this.addChar(event);
    }
  }

  /**
   * Handles proper character input within current time display ---  a.video.player
   *
   * @method addChar
   */
  addChar(event){
	  let str = this.el_.innerHTML.split('</span>');
      if(str.length === 2){
    	let prev = str[1].trim();

    	if(prev === '<br>'){
    	  event.preventDefault();
    	  this.el_.innerHTML = str[0] + '</span> ' + ( this.isTimeCharPress(event) ? String.fromCharCode(event.keyCode) : '');
    	  this.placeCaretAtEnd();
    	}
    	else if( prev.length > 7 || !this.isTimeCharPress(event)){
    	  event.preventDefault();
    	}
      }
      else if(str.length > 2){
    	event.preventDefault();
    	this.timeReset();
      }
  }

  /**
   * Handle time input: calculates the time entered and updates currentTime accordingly ---  a.video.player
   *
   * @method handleInput
   */
  handleInput(event) {
	let input = this.el_.innerHTML;
	let inputParts = input.split('</span>');
	if(inputParts.length === 2){
	  let timeParts = ((inputParts)[1].trim()).split(':');
	  if(timeParts.length > 0 && timeParts.length <= 3){
		let newTime = 0, multiplier = 1;
	    while (timeParts.length > 0) {
	      let arrayElem = timeParts.pop();
	      if(arrayElem.length > 0 && Number.isInteger(Number(arrayElem))){
	    	newTime += multiplier * parseInt(arrayElem, 10);
	        multiplier *= 60;
	      }
	      else{
	    	this.timeReset();
    	    if (this.videoWasPlaying) {
    		  this.player_.play();
    	    }
    	    return;
	      }
        }
		// Don't let video end while scrubbing.
	    if (newTime === this.player_.duration()) { newTime = newTime - 0.1; }

	    // Set new time (tell player to seek to new time)
	    this.player_.currentTime(newTime);

    	this.el_.blur();
	  }
	  else{
		this.timeReset();
	  }
	}
	else{
	  this.timeReset();
	}

    if (this.videoWasPlaying) {
	  this.player_.play();
    }
  }

  /**
   * Resets the time to original state if incorrect time was input ---  a.video.player
   *
   * @method timeReset
   */
  timeReset() {
	let time = (this.player_.scrubbing()) ? this.player_.getCache().currentTime : this.player_.currentTime();
  	let localizedText = this.localize('Current Time');
  	let formattedTime = formatTime(time, this.player_.duration());
  	this.formattedTime_ = formattedTime;
  	this.el_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${formattedTime}`;
  }

  /**
   * Resets the caret position to the end of the div ---  a.video.player
   *
   * @method placeCaretAtEnd
   */
  placeCaretAtEnd() {
    this.el_.focus();
    if (typeof window.getSelection !== 'undefined'
        && typeof document.createRange !== 'undefined') {
      var range = document.createRange();
      range.selectNodeContents(this.el_);
      range.collapse(false);
  	  var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== 'undefined') {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(this.el_);
      textRange.collapse(false);
      textRange.select();
    }
  }

  /**
   * Returns the position of the caret within the div ---  a.video.player
   *
   * @method getCaretPosition
   */
  getCaretPosition(){
    var caretOffset = 0;
    var doc = this.el_.ownerDocument || this.el_.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection !== 'undefined') {
	  sel = win.getSelection();
	  if (sel.rangeCount > 0) {
	    var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(this.el_);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ( (sel = doc.selection) && sel.type !== 'Control') {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(this.el_);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

  /**
   * Validates the proper char inputs allowing only digits and ':' characters ---  a.video.player
   *
   * @method isTimeCharPress
   */
  isTimeCharPress(event){
    if((event.which >= 48 && event.which <= 57) || event.which === 59)
      return true;
    else
      return false;
  }
}

Component.registerComponent('CurrentTimeDisplay', CurrentTimeDisplay);
export default CurrentTimeDisplay;
