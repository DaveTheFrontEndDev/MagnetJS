module.exports = class Generator {
  constructor(props){
    this._board = this.generateBoard({
      id: props.id || false,
      name: props.name || false,
      desc: props.desc || false,
      width: props.width || false,
      height: props.height || false
    });
    this._items = this.generateItems(props.items);
    this._theme = this.generateTheme(props.theme);

    return {
      board: this._board,
      items: this._items,
      theme: this._theme,
      exists: true // Required to align with the sockets feature (handles a scenario where the board doesn't yet exist)
    }
  }

  _getDefaultConfig(){
    return {
      target: 'root',
      id: 'default',
      width: 1000,
      height: 1000,
      items: {
        spawn: 500,
        options: {
          text: ['A','B','C','D','E','F'],
          color: [1,2,3,4,5],
          type: 'Letter'
        }
      },
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
    };
  }


  generateBoard(board){
    return Object.assign(
      board,
    {
      name: board.name ? board.name : "Empty",
      desc: board.desc ? board.desc : "No Description",
      width: board.width ? board.width : 2000,
      height: board.height ? board.height : 2000
    })
  }

  generateItems(items) {

    if(!items){
      items = this._getDefaultConfig().items;
    }

    if (typeof items == 'array') {
      return items;
    }

    return [...Array(items.spawn || this._getDefaultConfig().items.spawn)].map((item, index) => {

      const location = this.generateLocation();

      const extraValues = {};

      for (const key of Object.keys(items && items.options)) {
        if (Array.isArray(items.options[key])){
          extraValues[key] = this.pickRandomFromArray(items.options[key]);
        }
        else {
          extraValues[key] = items.options[key];
        }
      }

    return Object.assign(
      {
        id: index
      },
      location,
      extraValues);

  })

  }

  generateTheme(theme){
    if(!theme) return this._getDefaultConfig().theme;
    return theme;
  }

  pickRandomFromArray(array){
    return array[Math.floor(Math.random() * array.length)];
  }

  generateLocation(){
    return {
      x: (Math.floor(Math.random() * (this._board.width + 1))) - (this._board.width / 2),
      y: (Math.floor(Math.random() * (this._board.height + 1))) - (this._board.height / 2)
    }
  }

}