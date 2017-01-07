/**
 * @file volume-display.js  ---  a.video.player
 */
import Component from '../../component.js';
import * as Dom from '../../utils/dom.js';

//Dependencies required for editability of volume  ---  a.video.player
import * as Events from '../../utils/events.js';
import * as Fn from '../../utils/fn.js';
import document from 'global/document';
import window from 'global/window';

/**
 * Displays the volume
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class VolumeDisplay
 */
class VolumeDisplay extends Component {

  constructor(player, options){
    super(player, options);

    this.on(player, 'volumechange', this.updateContent);
    //Allows the volume to be edited on focus  ---  a.video.player
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
      className: 'vjs-volume-display vjs-control',
      //Changed the inner html structure to allow easy proper access to volume inputs within  ---  a.video.player
      // label the volume for screen reader users
      innerHTML: '<span class="vjs-control-text">Volume Level</span>' + '100%',
    }, {
  	  //Allow volume to be edited using keyboard input  ---  a.video.player
  	  'contenteditable' : 'true'
    });

    return el;
  }

  /**
   * Update volume display
   *
   * @method updateContent
   */
  updateContent() {
    let volume = (this.player_.muted() ? 0 : Math.floor(this.player_.volume() * 100)) + '%';
    let localizedText = this.localize('Volume Level');
    if (volume !== this.volume_) {
      this.volume_ = volume;
      //Due to change in innerHTML structure  ---  a.video.player
      this.el_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${volume}`;
    }
  }

  /**
   * Handle Focus - Add keyboard functionality to element ---  a.video.player
   *
   * @method handleFocus
   */
  handleFocus() {
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
	  if(event.which !== 53){
	    event.preventDefault();
    	event.stopPropagation();
	  }
	  else
	    this.addChar(event);
    }
    else if(event.which === 8 || event.which === 37){
	  if(this.getCaretPosition() === 12)
    	event.preventDefault();
    }
    else if(event.which === 35 || event.which === 39 || event.which === 46){} //Allow these keypresses by doing nothing
    else{
	  this.addChar(event);
    }
  }

  /**
   * Handles proper character input within volume display ---  a.video.player
   *
   * @method addChar
   */
  addChar(event){
	  let str = this.el_.innerHTML.split('</span>');
      if(str.length === 2){
    	let prev = str[1].trim();

    	if(prev === '<br>'){
    	  event.preventDefault();
    	  this.el_.innerHTML = str[0] + '</span> ' + ( this.isVolumeCharPress(event) ? String.fromCharCode(event.keyCode) : '');
    	  this.placeCaretAtEnd();
    	}
    	else if( prev.length > 3 || !this.isVolumeCharPress(event)){
    	  event.preventDefault();
    	}
      }
      else if(str.length > 2){
    	event.preventDefault();
    	this.volumeReset();
      }
  }

  /**
   * Handle volume input: calculates the volume entered and updates currentVolume accordingly ---  a.video.player
   *
   * @method handleInput
   */
  handleInput(event) {
	let input = this.el_.innerHTML;
	let inputParts = input.split('</span>');
	if(inputParts.length === 2){
	  let volumeParts = ((inputParts)[1].trim()).split('%');
	  this.el_.setAttribute('test1',volumeParts.length);
	  if(volumeParts.length > 0 && volumeParts.length <= 2){
		let newVolume;
        let arrayElem = volumeParts[0];
        if(arrayElem.length > 0 && Number.isInteger(Number(arrayElem))){
    	  newVolume = parseInt(arrayElem, 10);
    	  this.el_.setAttribute('test',newVolume);
        }
        else{
    	  this.volumeReset();
    	  return;
        }
	    // Set new volume
	    if(newVolume >= 0 && newVolume <= 100){
    	  this.player_.volume(newVolume/100.0);
	    }
	    else{
    	  this.volumeReset();
	    }

    	this.el_.blur();
	  }
	  else{
		this.volumeReset();
	  }
	}
	else{
	  this.volumeReset();
	}
  }

  /**
   * Resets the volume to original state if incorrect volume was input ---  a.video.player
   *
   * @method volumeReset
   */
  volumeReset() {
    let volume = Math.floor(this.player_.volume() * 100) + '%';
    let localizedText = this.localize('Volume Level');
    this.volume_ = volume;
    this.el_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${volume}`;
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
   * Validates the proper char inputs allowing only digits and '%' characters ---  a.video.player
   *
   * @method isVolumeCharPress
   */
  isVolumeCharPress(event){
    if((event.which >= 48 && event.which <= 57) || event.which === 53)
      return true;
    else
      return false;
  }
}

Component.registerComponent('VolumeDisplay', VolumeDisplay);
export default VolumeDisplay;
