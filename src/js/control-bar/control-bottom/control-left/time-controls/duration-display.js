/**
 * @file duration-display.js
 */
import Component from '../../../../component.js';
import * as Dom from '../../../../utils/dom.js';
import formatTime from '../../../../utils/format-time.js';

/**
 * Displays the duration
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class DurationDisplay
 */
class DurationDisplay extends Component {

  constructor(player, options){
    super(player, options);

    //Fixes the problem of duration time not loading  ---  a.video.player
    this.on(player, 'timeupdate', this.updateContent);
    this.on(player, 'durationchange', this.updateContent);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-duration vjs-time-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-duration-display',
      // label the duration time for screen reader users
      innerHTML: `<span class="vjs-control-text">${this.localize('Duration Time')}</span> 0:00`
    }, {
      // tell screen readers not to automatically read the time as it changes
      'aria-live': 'off'
    });

    el.appendChild(this.contentEl_);
    return el;
  }

  /**
   * Update duration time display
   *
   * @method updateContent
   */
  updateContent() {
    let duration = this.player_.duration();
    if (duration && this.duration_ !== duration) {
      this.duration_ = duration;
      let localizedText = this.localize('Duration Time');
      let formattedTime = formatTime(duration);
      this.contentEl_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${formattedTime}`; // label the duration time for screen reader users
    }
  }

}

Component.registerComponent('DurationDisplay', DurationDisplay);
export default DurationDisplay;
