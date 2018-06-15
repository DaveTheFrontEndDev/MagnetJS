// import Magnet from './browserify/Magnet.js';
// const Magnet = require('broswerify/Magnet.js');

var board = "";

window.onload = function () {
  var boardName = location.href.substr(location.href.lastIndexOf('/') + 1);
  board = new Magnet({ target: 'root', id: boardName });
};