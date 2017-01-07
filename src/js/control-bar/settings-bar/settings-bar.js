/**
 * @file settings-bar.js  ---  a.video.player
 */
import Component from '../../component.js';

// Required children
import ChaptersButton from './text-track-controls/chapters-button.js';
import DescriptionsButton from './text-track-controls/descriptions-button.js';
import SubtitlesButton from './text-track-controls/subtitles-button.js';
import CaptionsButton from './text-track-controls/captions-button.js';
import AudioTrackButton from './audio-track-controls/audio-track-button.js';
import PlaybackRateMenuButton from './playback-rate-menu/playback-rate-menu-button.js';
import CustomControlSpacer from './spacer-controls/custom-control-spacer.js';
import SettingsToggle from './settings-toggle.js';

/**
 * Container of settings controls
 *
 * @extends Component
 * @class SettingsBar
 */
class SettingsBar extends Component {

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-settings-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The settings bar is a group, so it can contain menuitems
    });
  }
}

SettingsBar.prototype.options_ = {
  loadEvent: 'play',
  children: [
	'settingsToggle',
	'customControlSpacer',
    'playbackRateMenuButton',
    'chaptersButton',
    'descriptionsButton',
    'subtitlesButton',
    'captionsButton',
    'audioTrackButton'
  ]
};

Component.registerComponent('SettingsBar', SettingsBar);
export default SettingsBar;
