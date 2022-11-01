/**
 * @file fast-forward-bar.js  ---  a.video.player
 */
import Component from '../../../../../component.js';

// Required children
import FastForwardToggle from './fast-forward-toggle.js';
import FastForward30 from './fast-forward-30.js';
import FastForward10 from './fast-forward-10.js';
import FastForward5 from './fast-forward-5.js';
import NextFrame from './next-frame.js';

/**
 * Container of fast-forward controls
 *
 * @extends Component
 * @class FastForwardBar
 */
class FastForwardBar extends Component {

  constructor(player, options){
    super(player, options);
    this.addSkipRates();
    this.addChild('nextFrame');
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    return super.createEl('div', {
      className: 'vjs-fast-forward-bar',
      dir: 'ltr'
    }, {
      'role': 'group' // The fast forward bar is a group, so it can contain menuitems
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
	  this.addChild('fastForward10');
	  return;
	}

    let availableRates = [30, 10, 5];

    for(let i = 0; i < availableRates.length; i++) {
      if(skipRates.indexOf(availableRates[i]) !== -1){
        this.addChild('fastForward' + availableRates[i]);
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

FastForwardBar.prototype.options_ = {
  loadEvent: 'fast-forward',
  children: [
    'fastForwardToggle'
  ]
};

Component.registerComponent('FastForwardBar', FastForwardBar);
export default FastForwardBar;
