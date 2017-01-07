/**
 * @file rewind-bar.js  ---  a.video.player
 */
import Component from '../../../component.js';

// Required children
import RewindToggle from './rewind-toggle.js';
import Rewind30 from './rewind-30.js';
import Rewind10 from './rewind-10.js';
import Rewind5 from './rewind-5.js';
import PreviousFrame from './previous-frame.js';


/**
 * Container of rewind controls
 *
 * @extends Component
 * @class RewindBar
 */
class RewindBar extends Component {

  constructor(player, options){
    super(player, options);
    this.addSkipRates();
    this.addChild('previousFrame');
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-rewind-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The rewind bar is a group, so it can contain menuitems
    });
  }

  /**
   * Add skip rates based on data-setup values
   *
   * @method addSkipRates
   */
  addSkipRates(){
	let skipRates = this.getSkipRates();

	if(typeof skipRates === 'undefined' || skipRates === null || skipRates.length === 0){
	  this.addChild('rewind10');
	  return;
	}

    let availableRates = [30, 10, 5];

    for(let i = 0; i < availableRates.length; i++) {
      if(skipRates.indexOf(availableRates[i]) !== -1){
        this.addChild('rewind' + availableRates[i]);
      }
    }
  }

  /**
   * Retrieves list of skip rates provided in the data setup attribute
   *
   * @return {Array} Array object populated with skip rate integers
   * @method getSkipRates
   */
  getSkipRates(){
    return this.options_['skipRates'] || (this.options_.playerOptions && this.options_.playerOptions['skipRates']);
  }
}

RewindBar.prototype.options_ = {
  loadEvent: 'rewind',
  children: [
    'rewindToggle'
  ]
};

Component.registerComponent('RewindBar', RewindBar);
export default RewindBar;
