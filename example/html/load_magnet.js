
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
    {code: "background", id: 1, key: "rgb", value: "50,50,50"},
    {code: "color", id: 1, key: "rgb", value: "132,159,187"},
    {code: "color", id: 2, key: "rgb", value: "179,159,161"},
    {code: "color", id: 3, key: "rgb", value: "110,201,151"},
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

const board = new Magnet({ target: 'root' });

window.onload = function () {
  board.mount();
};