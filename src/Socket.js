module.exports = class Socket{
  constructor(parent){
    this._parent = parent;
    this.initSocket();
  }

  /**
   * Init socket events
   */
  initSocket(){
    const me = this;
    this._socketConnected = false;
    if(typeof io == 'undefined'){
      console.log('Socket.io not enabled');
      this._socketEnabled = false;
      this._socket = {
        emit: () => {
          return false;
        }
      }
      me.onLoad({
        board:{name: "test", desc: "desc", width: 2000, height: 2000},
        exists: true,
        items: [
          {id: 1, text: "A", x: 0, y: 0, color: 2, type: "Letter"},
          {id: 2, text: "B", x: 0, y: 0, color: 1, type: "Letter"}
        ],
        theme: [
          {code: "background", id: 1, key: "rgb", value: "255,255,255"},
        {code: "color", id: 1, key: "rgb", value: "32,59,87"},
        {code: "color", id: 2, key: "rgb", value: "79,159,161"},
        {code: "color", id: 3, key: "rgb", value: "0,201,151"},
        {code: "color", id: 4, key: "rgb", value: "183,101,191"},
        {code: "color", id: 5, key: "rgb", value: "255,132,107"},
        {code: "letter", id: 1, key: "fontFamily", value: "'Baloo Bhaina', cursive"},
        {
          code: "letter",
          id: 1,
          key: "textShadow",
          value : "0 1px 0 rgb({[r]-50},{[g]-50},{[b]-50}), 0 2px 0 rgb({[r]-50},{[g]-50},{[b]-50}), 0 3px 0 rgb({[r]-50},{[g]-50},{[b]-50}), 0 4px 0 rgb({[r]-50},{[g]-50},{[b]-50}), 0 5px 0 rgb({[r]-50},{[g]-50},{[b]-50}), 6px 6px 20px rgba(0,0,0,.1)"
        }
        ]
      });
    }
    else{
      this._socketEnabled = true;
      this._socket = io.connect();
      this._socket.on('connect', () => {
        me.onSocketConnected();
      });
        this._socket.on('disconnect', () => {
          me.onSocketDisconnected();
      });
        this._socket.on('error', (err) => {
          me.onSocketError(err);
      });
        this._socket.on('authenticate', (data) => {
          me.onAuthenticate(data);
      })
        this._socket.on('load', (data) => {
          me.onLoad(data);
      })
        this._socket.on('move', (data) => {
          me.onMove(data);
      })
        this._socket.on('add', (data) => {
          me.onAdd(data);
      })
        this._socket.on('noExist', (data) => {
          me._parent.View.askCreate();
      })
        this._socket.on('stats', (data) => {
          me._parent.View.updateStats(data);
      })
    }
  }

  /**
   * On Authenticate
   */
  onAuthenticate(data){
    this._parent.getBoard(data);
  }

  /**
   * On Load
   */
  onLoad(data){
    this._parent.setBoard(data)
  }

  /**
   * On Move
   */
  onMove(data){
    for(const move of data){
      if(move.time) this._parent.View.getItem(move.id).setRemotePosition(move.x, move.y, move.time)
      else this._parent.View.getItem(move.id).setRemotePosition(move.x, move.y)
    }
  }

  /**
   * On Item Add
   */
  onAdd(data){
    this._parent.View.addItem(data);
  }

  /**
   * On Socket Connect
   */
  onSocketConnected(){
    this._socketConnected = true;
    console.log(`${this._parent._id.split('#')[0]}: Connected to socket`);
    this.authenticate();
  }

  /**
   * Authenticate Board
   */
  authenticate(){
    console.log('authenticating');
    this._socket.emit('authenticate', {id: this._parent._id});
  }

  /**
   * On Socket Disconnected
   */
  onSocketDisconnected(){
    this._socketConnected = false;
    console.log(`${this._parent._id}: Socket disconnected`);
  }

  /**
   * On Socket Error
   */
  onSocketError(err){
    this._socketConnected = false;
    console.log(error);
  }
}
