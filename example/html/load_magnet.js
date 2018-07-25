// import Magnet from './browserify/Magnet.js';
// const Magnet = require('broswerify/Magnet.js');

var board = "";

var config = {
  target: 'root',
  id: 'test',
  width: 1000,
  height: 1000,
  items: {
    spawn: 100,
    options: {
      text: ['Toast','is','Food','for','my','belly'],
      color: [1,2,3,4,5],
      type: 'Letter'
    }
  },
  theme: [
    {code: "background", id: 1, key: "rgb", value: "255,100,255"},
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

window.onload = function () {

  board = new Magnet(config);

};