export default class Theme{

  /**
   * Initiate theme with config
   * @param theme
   */
  constructor(theme, parent){
    this._parent = parent;
    this._items = new Map();
    this._colors = new Map();
    this.setTheme(theme);
  }

  /**
   *  Set theme state
   */
  setTheme(theme){
    for(const item of theme){
      switch(item.key){
        case 'rgb':{
          this._colors.set((item.code == 'color') ? item.id : item.code, {
            r: item.value.split(',')[0],
            g: item.value.split(',')[1],
            b: item.value.split(',')[2]
          })
          break;
        }
        default:{
          if(!this._items.has(item.code)) {
            this._items.set(item.code, theme.filter(other => (other.code == item.code)).map( item => ([item.key, item.value])));
          }
        }
      }
    }
  }

  /**
   * Apply theme to dom object
   */
  applyTheme(dom, code, params){
    //debugger;
    if(this._items.has(code)){
      // debugger;
      return this._parent.Mixins.applyStyle(dom, this.getItem(code), params);
    }
    return dom;
  }

  /**
   * Apply background to dom object
   */
  applyBackground(dom){
    dom.style.background = this.getColorCSS('background');
    return dom;
  }

  /**
   *  Get theme item array
   */
  getItem(code){
    //console.log('getting: ', this._items.get(code));
    return this._items.get(code);
  }

  /**
   * Get color rgb values as object
   */
  getColor(key){
    return this._colors.get(key)
  }

  /**
   * Get color as rgb string (CSS)
   */
  getColorCSS(key){
    const color =  this._colors.get(key);
    return `rgb(${color.r},${color.g},${color.b})`;
  }
}
