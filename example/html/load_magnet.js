import Magnet from './magnet.min.js';

var board = "";

window.onload = function () {
  var boardName = location.href.substr(location.href.lastIndexOf('/') + 1);
  board = new Magnet({ target: 'root', id: boardName });
};