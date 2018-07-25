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

  makeAnimation(item, value, to, duration){
    const start = item.style[value].split('px')[0];
    const change = to - start;
    const increment = 10;
    let currentTime = 0;
    const easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    var animateScroll = function(){
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      // console.log(value, (parseFloat(start) + parseFloat(val)), val, duration, currentTime);
      item.style[value] = currentTime == duration ? to : (parseFloat(start) + parseFloat(val));
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();

  }
}