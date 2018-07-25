const component = require('./component/index.js')
const View = require('./View.js')
const Theme = require('./Theme.js')
const Events = require('./Events.js')
const Socket = require('./Socket.js')
const Mixins = require('./Mixins.js')
const Generator = require('./Generator')

module.exports = window.Magnet;

window.Magnet = class Magnet {
  constructor(config){
    console.log('Magnet started')
    this.initConfig(config);
    this.initClasses();
  }

  /**
   * Initialise Config
   * @param target
   * @param id
   */
  initConfig(config, id){
    this._root = config.target;
    this._id = config.id ? config.id : 'local';
    this._name = '';
    this._description = '';
    this._config = new Generator(config)
  }

  /**
   * Initialise Classes
   */
  initClasses(){
    this.Mixins = new Mixins(this);
    this.component = component;
    this.View = new View(this);
    this.Socket = new Socket(this);
    this.Events = new Events(this);
  }

  /**
   * Return root dom
   */
  getRoot(){
    return document.getElementById(this._root);
  }

  /**
   * Get Board data
   */
  getBoard(data){
    this.Socket._socket.emit('load');
  }

  /**
   * Set Board from Data
   */
  setBoard(data){
    this.setTheme(data.theme);
    this.setDetails(data.board);
    this.setItems(data.items);
    this.View.fadeIn();
    this.View.fadeInStats();
  }

  /**
   * Set board theme
   */
  setTheme(theme){
    this.Theme = new Theme(theme, this);
    this.View.setTheme();
  }

  /**
   * Set board details
   */
  setDetails(details){
    this._name = details.name;
    this._description = details.desc;
    this.View.setSize(details.width, details.height);
    this.View.setPosition(window.location.hash.split(',')[0].split('#')[1] || 0,window.location.hash.split(',')[1] || 0);
  }

  /**
   * Set board items
   */
  setItems(items){
    for(const item of items){
      this.View.setItem(item.id, new this.component[item.type](item, this));
    }
    this.View.renderItems();
  }
}