module.exports = class Mixins{
  constructor(){
  }

  /**
   * Apply styles to dom object
   */
  applyStyle(dom, style, params){
    const arrayStyle = (typeof style.length != 'undefined') ? style : Object.entries(style);
    for(style of arrayStyle){
      dom.style[style[0]] = this.applyTemplate(style[1], params);
    }
    return dom;
  }

  /**
   * Apply template information
   */
  applyTemplate(value, params){
    if(value.indexOf('[') != -1) value = value.replace(/\[r\]/g, params.r).replace(/\[g\]/g, params.g).replace(/\[b\]/g, params.b);
    if(value.indexOf('{') !=- 1) {
      const regex = value.match(/\{([^}]+)\}/g);
      for (const match of regex) {
        value = value.replace(match, eval(match));
      }
    }
    return value;
  }

  /**
   * Convert css object to string
   */
  convertToCSSString(cssObject){
    const entries = Object.entries(cssObject);
    const cssArray = [];
    console.log(cssObject);
    for(const entry of entries){
      for(let i = 0; i < entry[0].length; i++){
        if(entry[0].charAt(i) === entry[0].charAt(i).toUpperCase()){
          entry[0] = entry[0].slice(0,i)+'-'+entry[0].slice(i, entry[0].length).toLowerCase();
        }
      }
      cssArray.push(entry[0]+': '+entry[1]);
    }
    return cssArray.join('; ');
  }
}