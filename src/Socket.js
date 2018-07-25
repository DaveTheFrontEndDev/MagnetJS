const Generator = require('./Generator');

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
      console.info('Socket.io not enabled, generating static board');
      this._socketEnabled = false;
      this._socket = {
        emit: () => {
          return false;
        }
      }
      const generatedBoard = this._parent._config;
      me.onLoad(generatedBoard);
    }
    else{
      this._socketEnabled = true;
      this._socket = io.connect('ws://www.online-fridge.com');
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
