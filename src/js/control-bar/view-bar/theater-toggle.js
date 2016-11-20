/**
 * @file theater-toggle.js  ---  a.video.player
 */
import document from 'global/document';
import Button from '../button.js';
import Component from '../component.js';

//Imports needed for addElClass or removeElClass methods ---  a.video.player
import * as Dom from '../utils/dom.js';

/**
 * Toggle theater mode
 *
 * @extends Button
 * @class TheaterToggle
 */
class TheaterToggle extends Button {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-theater-control ${super.buildCSSClass()}`;
  }

  /**
   * Handles click for theater mode
   *
   * @method handleClick
   */
  handleClick() {
    if(!this.player_.hasClass('vjs-theater-mode'))
    {
      Dom.addElClass(this.player_.el_.parentNode.parentNode, 'vjs-theater-background');
	  this.player_.el_.parentNode.style.width = '67.6899%';
	  Dom.addElClass(this.player_.el_.parentNode, 'vjs-theater-container');
	  this.player_.addClass('vjs-theater-mode');
      this.controlText('Normal View');
    }
    else
    {

      Dom.removeElClass(this.player_.el_.parentNode.parentNode, 'vjs-theater-background');
      if(this.player_.hasClass('vjs-expanded'))
      {
    	  this.player_.el_.parentNode.style.width = '53.782%';
      }
      else
      {
    	  this.player_.el_.parentNode.style.width = '40.337%';
      }
      Dom.removeElClass(this.player_.el_.parentNode, 'vjs-theater-container');
      this.player_.removeClass('vjs-theater-mode');
      this.controlText('Theater Mode');
    }
  }

}

TheaterToggle.prototype.controlText_ = 'Theater View';

Component.registerComponent('TheaterToggle', TheaterToggle);
export default TheaterToggle;
