module.exports = class View{
  constructor(me){
    this._parent = me;
    this._items = new Map();
    this._classNames = new Set();
    this.initCSS();
    this.buildDOM();
    this.setWrapperSize();
    this.setEvents();
  }

  /**
   * Initialise CSS Objects
   */
  initCSS(){
    this._wrapperCSS = {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }

    this._boardCSS = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'white'
    }
  }

  /**
   * Build DOM
   */
  buildDOM(){
    const root = document.getElementById(this._parent._root);
    const wrapper = document.createElement("div");
    wrapper.id = `${this._parent._id}_wrapper`;
    wrapper.className = "wrapper";
    this._parent.Mixins.applyStyle(wrapper, this._wrapperCSS);
    const board = document.createElement("div");
    board.id = `${this._parent._id}_board`;
    this._parent.Mixins.applyStyle(board, this._boardCSS);
    const stats = document.createElement('div');
    stats.id = 'members';
    stats.className = 'statsToggle';
    const spinner = document.createElement('div');
    const dot1 = document.createElement('div');
    const dot2 = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'spinner';
    dot1.className = 'dot1';
    dot2.className = 'dot2';
    spinner.appendChild(dot1);
    spinner.appendChild(dot2);
    wrapper.appendChild(board);
    console.log('removed');
    root.innerHTML = '';
    debugger;
    console.log('adding');
    root.appendChild(wrapper);
    root.appendChild(stats);
    root.appendChild(spinner);
  }

  /**
   * Add Item
   */
  addItem(item){
    console.log('adding item');
    this.setItem(item.id, new this._parent.component[item.type](item, this._parent));
    this.renderItems();
  }

  /**
   * Ask To Create Board (If Board doesn't exist)
   */
  askCreate(){
    const me = this;
    const message = document.createElement("div");
    message.className = "message";
    message.innerHTML = `
    Fridge "${this._parent._id}" is available!<br>
    `
    const button = document.createElement("button");
    button.innerHTML = 'Create';
    message.id = 'message';
    button.addEventListener('click', () => {
      console.log('clicked', document.getElementsByClassName('message'));
      document.getElementsByClassName('message').outerHTML = '';
      document.getElementById(`${this._parent._id}_board`).removeChild(document.getElementById('message'));
      me._parent.Socket._socket.emit('start', {id: me._parent._id});
    });

    message.appendChild(button);

    document.getElementById(`${this._parent._id}_board`).appendChild(message);
    this.fadeIn();
  }

  /**
   * Set View Events (Resize window etc)
   */
  setEvents(){
    const me = this;
    window.onresize = function(event) {
      me.setWrapperSize();
      me.loadPosition();
    };
  }

  /**
   * Set Board size
   */
  setSize(width, height){
    this._width = width;
    this._height = height;
    const board = document.getElementById(`${this._parent._id}_board`);
    board.style.width = this._width+'px';
    board.style.height = this._height+'px';
    board.style.margin = `-${this._height / 2}px -${this._width / 2}px`;
  }

  /**
   * Set board Position
   */
  setPosition(x, y){
    this._x = x;
    this._y = y;
    this.loadPosition();
  }

  /**
   * Get board position
   */
  getPosition(){
    const board = document.getElementById(`${this._parent._id}_board`);
    return {
      x: Math.floor((parseInt(board.style.left.split('px')[0]) - (this._wrapperX / 2))),
      y: Math.floor(parseInt(board.style.top.split('px')[0]) - (this._wrapperY / 2))
    }
  }

  setWrapperSize(){
    const wrapper = document.getElementById(`${this._parent._id}_wrapper`);
    this._wrapperX = document.getElementById(this._parent._root).offsetWidth;
    this._wrapperY = document.getElementById(this._parent._root).offsetHeight;
  }

  loadPosition(){
    const board = document.getElementById(`${this._parent._id}_board`);
    board.style.top = `${parseInt((this._wrapperY / 2)) + parseInt(this._y)}px`;
    board.style.left = `${parseInt((this._wrapperX / 2)) + parseInt(this._x)}px`;
  }

  setTheme(){
    this._parent.Theme.applyBackground(document.getElementById(`${this._parent._id}_board`));
  }

  setItem(id, object){
    this._items.set(id, object)
  }

  getItem(id){
    return this._items.get(parseInt(id));
  }

  convertXY(x, y, target){
    if(target == 'board') {
      const board = document.getElementById(`${this._parent._id}_board`);
      return {
        x: x + (parseInt(board.style.width.split('px')[0]) / 2),
        y: y + (parseInt(board.style.height.split('px')[0]) / 2),
      }
    }
    else{
      const board = document.getElementById(`${this._parent._id}_board`);
      return {
        x: x - (parseInt(board.style.width.split('px')[0]) / 2),
        y: y - (parseInt(board.style.height.split('px')[0]) / 2),
      }
    }
  }

  updateStats(stats){
    document.getElementById('members').innerHTML = stats.members+' Online';
  }

  hideLoad(){
    document.getElementById('spinner').style.display = 'none';
  }

  /**
   * Fade the board into view
   */
  fadeIn(){
    document.getElementsByClassName('wrapper')[0].style.opacity = 1;
  }

  fadeInStats(){
    document.getElementsByClassName('statsToggle')[0].style.opacity = 1;
  }

  renderItems(){
    this.hideLoad();
    for(const item of [...this._items.values()]){
      if(!document.getElementById(item.getItem().id)) {
        const board = document.getElementById(`${this._parent._id}_board`);
        const itemDiv = item.getItem();
        board.appendChild(itemDiv);
      }
    }
  }

  /**
   * Create a css class from an object
   */
  addCSSClass(className, classDetails){
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.${className} { ${this._parent.Mixins.convertToCSSString(classDetails)} }`;
    document.getElementsByTagName('head')[0].appendChild(style);
    this._classNames.add(className);
  }

  /**
   * Has the class been dynamicaly loaded?
   */
  hasClass(className){
    return this._classNames.has(className);
  }
}