module.exports = class Component {
  constructor(config, parent){
    this._parent = parent;
    this._id = config.id;
    this._x = config.x;
    this._y = config.y;
    this._type = 'component';
  }

  init(){
    this._defaultClass = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      padding: '0px',
      userSelect: 'none'
    }
  }

  /**
   * Return item as dom object
   */
  getItem(){
    const r = this._parent.Theme.getColor(this._color).r;
    const g = this._parent.Theme.getColor(this._color).g;
    const b = this._parent.Theme.getColor(this._color).b;
    const itemDiv = document.createElement("div");
    const xy = this._parent.View.convertXY(this._x, this._y, 'board');
    itemDiv.id = this._id;
    itemDiv.className = this._type;
    itemDiv.innerHTML = this._text;
    itemDiv.style.top = xy.y;
    itemDiv.style.left = xy.x;
    itemDiv.setAttribute('type', 'component');
    this._parent.Mixins.applyStyle(itemDiv, this._defaultTheme, {r,g,b});
    this._parent.Theme.applyTheme(itemDiv, 'letter', {r,g,b});
    return itemDiv;
  }

  setLocalPosition(x, y){
    this._x = x;
    this._y = y;
    console.log(`${this._type} ${this._id}: x(${Math.floor(x)}) y(${Math.floor(y)})`);
    this._parent.Socket._socket.emit('move', {
      id: this._id,
      x: this._x,
      y: this._y
    })
  }

  setRemotePosition(x, y, time){
    this._x = x;
    this._y = y;
    this.animateSetPosition(time);
    if(typeof this.moveAnimation === 'function') this.moveAnimation();
  }

  animateSetPosition(time){
    const xy = this._parent.View.convertXY(this._x, this._y, 'board');
    $('#'+this._id).animate({
      left: xy.x,
      top: xy.y
    }, time || 200);
  }
}