/**
 * @file settings-toggle.js  ---  a.video.player
 */
import Component from '../../component.js';
import * as Events from '../../utils/events.js';
import * as Fn from '../../utils/fn.js';
import document from 'global/document';
/**
 * Displays the Settings Toggle
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class SettingsToggle
 */
class SettingsToggle extends Component {

  constructor(player, options){
    super(player, options);

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
      className: 'vjs-settings-toggle vjs-control'
    });

    return el;
  }

  /**
   * Handle Focus
   *
   * @method handleFocus
   */
  handleFocus() {
    Events.on(document, 'keydown', Fn.bind(this, this.handleKeyPress));
  }

  /**
   * Handle KeyPress (document level)
   *
   * @method handleKeyPress
   */
  handleKeyPress(event) {

  }
}

SettingsToggle.prototype.controlText_ = 'Settings';

Component.registerComponent('SettingsToggle', SettingsToggle);
export default SettingsToggle;
