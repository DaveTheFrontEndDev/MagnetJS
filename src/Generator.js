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

    if (typeof items == 'array') {
      return items;
    }

    return [...Array(items.spawn || 100)].map((item, index) => {

      const location = this.generateLocation();

      const extraValues = {};

      for (const key of Object.keys(items.options)) {
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