module.exports = class Events{
  constructor(parent){
    this._parent = parent;
    this._startX = 0;
    this._startY = 0;
    this._focus = false;
    this._component = false;
    this.initEvents();
  }

  initEvents(){
    const board = document.getElementById(`${this._parent._id}_board`);
    const me = this;
    board.addEventListener("mousedown", (e) => {
      const id = e.target.id;
      const component = (e.target.getAttribute('type') == 'component');
      me.startDrag({
        id,
        component,
        x: e.x,
        y: e.y
      });
    });
    board.addEventListener("mouseup", (e) => {
      this.stopDrag({
        x: e.x,
        y: e.y
      });
    });
    board.addEventListener("mousemove", (e) => {
      if(this._focus) this.moveItem({
        x: e.x,
        y: e.y
      })
    });
    board.addEventListener("mouseleave", (e) => {
      if(this._focus) this.mouseLeave()
    });
    board.addEventListener("touchstart", (e) => {
      const id = e.changedTouches[0].target.id;
      const component = (e.changedTouches[0].target.getAttribute('type') == 'component');
      me.startDrag({
        id,
        component,
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      });
    });
    board.addEventListener("touchmove", (e) => {
      if(this._focus) this.moveItem({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    })
  });
    board.addEventListener("touchend", (e) => {
        this.stopDrag({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
      });
    board.addEventListener("touchcancel", (e) => {
      if(this._focus) this.mouseLeave()
  });
  });
  }

  startDrag(conf){
    const item = document.getElementById(conf.id);
    this._offsetX = conf.x;
    this._offsetY = conf.y;
    this._startX = parseInt(item.style.left.split('px')[0]);
    this._startY = parseInt(item.style.top.split('px')[0]);
    this._focus = conf.id;
    this._component = conf.component;
  }

  moveItem(conf){
    const board = document.getElementById(`${this._parent._id}_board`);
    const left = parseInt(window.getComputedStyle(board,null).getPropertyValue("left").split('px')[0]);
    const right = parseInt(window.getComputedStyle(board,null).getPropertyValue("right").split('px')[0]);
    const top = parseInt(window.getComputedStyle(board,null).getPropertyValue("top").split('px')[0]);
    const bottom = parseInt(window.getComputedStyle(board,null).getPropertyValue("bottom").split('px')[0]);
    const xDir = this._lastX - conf.x;
    const yDir = this._lastY - conf.y;

    if(((left < (this._parent.View._width / 2) || xDir > 0 ) && (right < ((this._parent.View._width / 2))) || xDir < 0 ) || this._component) document.getElementById(this._focus).style.left = this._startX + (conf.x - this._offsetX);
    if(((top < (this._parent.View._width / 2) || yDir > 0 ) && (bottom < ((this._parent.View._width / 2))) || yDir < 0 ) || this._component) document.getElementById(this._focus).style.top = this._startY + (conf.y - this._offsetY);


    if(!this._component) {
      if (parseInt(window.getComputedStyle(board, null).getPropertyValue("left").split('px')[0]) > (this._parent.View._width / 2)) {
        document.getElementById(this._focus).style.left = (this._parent.View._width / 2)
      }

      if (parseInt(window.getComputedStyle(board, null).getPropertyValue("top").split('px')[0]) > (this._parent.View._height / 2)) {
        document.getElementById(this._focus).style.top = (this._parent.View._height / 2)
      }

      if ((parseInt(window.getComputedStyle(board, null).getPropertyValue("right").split('px')[0]) > (this._parent.View._width / 2))) {
        document.getElementById(this._focus).style.left = -((this._parent.View._width / 2)) + this._parent.View._wrapperX
      }

      if ((parseInt(window.getComputedStyle(board, null).getPropertyValue("bottom").split('px')[0]) > (this._parent.View._height / 2))) {
        document.getElementById(this._focus).style.top = -((this._parent.View._height / 2)) + this._parent.View._wrapperY
      }
    }

    this._lastX = conf.x;
    this._lastY = conf.y;
  }

  stopDrag(conf){
    const x = this._startX + (conf.x - this._offsetX);
    const y = this._startY + (conf.y - this._offsetY);
    const newXY = this._parent.View.convertXY(x, y, 'component');
    if(this._component) this._parent.View.getItem(this._focus).setLocalPosition(newXY.x, newXY.y);
    else{
      const left = document.getElementById(this._focus).style.left.split('px')[0];
      const top = document.getElementById(this._focus).style.top.split('px')[0];
      const boardXY = this._parent.View.getPosition();
      window.location.hash = boardXY.x+','+boardXY.y;
    }
    this._focus = false;
  }

  mouseLeave(){
    document.getElementById(this._focus).style.left = this._startX;
    document.getElementById(this._focus).style.top = this._startY;
    this._focus = false;
    // $('#'+this._focus).animate({
    //   left: this._startX,
    //   top: this._startY
    // }, 200);
  }
}
