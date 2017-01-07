/**
 * @file light-box-video.js  ---  a.video.player
 */
import Component from '../component.js';
import * as Dom from '../utils/dom.js';

import Player from '../player.js';

import ExitLightBox from '../top-bar/exit-light-box.js';

/**
 * Class structure for a light box
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LightBoxVideo
 */
class LightBoxVideo extends Component {

  constructor(player, options){
    super(player, options);
    this.initPlayer();
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-light-box-video'
    });

    this.videoEl_ = this.player_.tech_.el_.cloneNode(true);

    this.videoEl_.setAttribute('autoplay','true');

    Dom.removeElClass(this.videoEl_,'vjs-tech');
    Dom.addElClass(this.videoEl_,'video-js');

    let trackEls = this.player_.tech_.htmlTrackEls_;

    for (let i = 0; i < trackEls.length; i++) {
    	this.videoEl_.appendChild(trackEls[i]);
    }

    el.appendChild(this.videoEl_);

    return el;
  }

  initPlayer(){
    this.player_.video_ = new Player(this.videoEl_);

    this.player_.video_.controls(true);

    this.player_.video_.topBar.addChild('exitLightBox');

    this.player_.video_.parentPlayer_ = this.player_;

    this.player_.video_.arrangeLightBox();

    this.player_.video_.currentTime(this.player_.currentTime());
  }
}

Component.registerComponent('LightBoxVideo', LightBoxVideo);
export default LightBoxVideo;
