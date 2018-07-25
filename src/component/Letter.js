const Component = require('./Component.js')

module.exports = class Letter extends Component{
  constructor(config, parent){
    super(config, parent);
    this._text = config.text;
    this._color = config.color;
    this._type = 'letter';
    if(!this._parent.View.hasClass(this._type)) this.init();
    this.initCustom();
  }

  init(){
    /**
     * Add parent default class information
     */
    super.init();
    /**
     * Insert custom default class information
     */
    this._defaultClass = Object.assign({
      fontStyle: 'normal',
      fontSize: '40px',
      lineHeight: '40px',
      color: 'rgb([r],[g],[b])',
      height: '40px',
      outline: '1px solid transparent'
    },this._defaultClass);
    /**
     * Dynamically insert class
     */
    this._parent.View.addCSSClass(this._type, this._defaultClass);
  }

  initCustom(){
    this._defaultTheme = {
      color: 'rgb([r],[g],[b])'
    };
  }

  moveAnimation(){
    const pulse = document.createElement('div');
    const me = this;
    pulse.id = 'pulse_'+this._id;
    pulse.className = 'pulse';
    pulse.style.borderColor = `rgb(${this._parent.Theme.getColor(this._color)})`;
    document.getElementById(this._id).appendChild(pulse);
    setTimeout(() => { document.getElementById(me._id).removeChild(pulse); },10000);
  }

}