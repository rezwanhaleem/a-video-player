/**
 * @file expand-toggle.js  ---  a.video.player
 */
import document from 'global/document';
import Button from '../button.js';
import Component from '../component.js';

/**
 * Toggle expand video
 *
 * @extends Button
 * @class ExpandToggle
 */
class ExpandToggle extends Button {

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-expand-control ${super.buildCSSClass()}`;
  }

  /**
   * Handles click for expand screen
   *
   * @method handleClick
   */
  handleClick() {
    if(!this.player_.hasClass('vjs-expanded'))
    {
      if(!this.player_.hasClass('vjs-theater-mode'))
      {
        this.player_.el_.parentNode.style.width = '53.782%';
      }
      this.player_.addClass('vjs-expanded');
      this.controlText('Contract');
    }
    else
    {
      if(!this.player_.hasClass('vjs-theater-mode'))
      {
    	  this.player_.el_.parentNode.style.width = '40.337%';
      }
      this.player_.removeClass('vjs-expanded');
      this.controlText('Expand');
    }
  }

}

ExpandToggle.prototype.controlText_ = 'Expand';

Component.registerComponent('ExpandToggle', ExpandToggle);
export default ExpandToggle;
