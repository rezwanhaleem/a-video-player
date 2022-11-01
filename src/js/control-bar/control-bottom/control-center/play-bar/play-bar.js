/**
 * @file play-bar.js  ---  a.video.player
 */
import Component from '../../../../component.js';

// Required children
import RewindBar from './rewind-bar/rewind-bar.js';
import PlayToggle from './play-toggle.js';
import FastForwardBar from './fast-forward-bar/fast-forward-bar.js';


/**
 * Container of play controls
 *
 * @extends Component
 * @class PlayBar
 */
class PlayBar extends Component {

  constructor(player, options){
    super(player, options);
    this.on( player, 'mouseleave', this.handleMouseOut);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-play-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The play bar is a group, so it can contain menuitems
    });
  }

  handleMouseOut(){
    if(this.fastForwardBar.fastForwardToggle.hasClass('vjs-fast-forwarding')){
      this.fastForwardBar.fastForwardToggle.removeClass('vjs-fast-forwarding');
    }

    if(this.rewindBar.rewindToggle.hasClass('vjs-rewinding')){
      this.rewindBar.rewindToggle.removeClass('vjs-rewinding');
    }
  }
}

PlayBar.prototype.options_ = {
  loadEvent: 'play',
  children: [
    'rewindBar',
    'playToggle',
    'fastForwardBar'
	]
};

Component.registerComponent('PlayBar', PlayBar);
export default PlayBar;
