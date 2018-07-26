
var config = {
  id: 'test', // ID of the board (if using sockets)
  target: 'root', // ID of the element to build the board onto
  width: 1000, // Width of the board (px)
  height: 1000, // Height of the board (px)
  items: {
    spawn: 100, // Spawn 100 items to the board
    options: {
      text: ['Toast','is','Food','for','my','belly'], // Text combinations to create the items with.
      color: [1,2,3,4,5], // The themes color unique identifiers.
      type: 'Letter' // The item type
    }
  },
  theme: [
    {code: "background", id: 1, key: "rgb", value: "50,50,50"}, // Set the board background to rgb(50,50,50)
    {code: "color", id: 1, key: "rgb", value: "132,159,187"}, // First theme color
    {code: "color", id: 2, key: "rgb", value: "179,159,161"}, // Second theme color
    {code: "color", id: 3, key: "rgb", value: "110,201,151"}, // Third theme color
    {code: "color", id: 4, key: "rgb", value: "183,101,191"}, // Fourth theme color
    {code: "color", id: 5, key: "rgb", value: "255,132,107"}, // Fifth theme color
    {code: "letter", id: 1, key: "fontFamily", value: "'Baloo Bhaina', cursive"}, // Font family for `letter` component
    // Text shadow for the `letter` component that uses the theme color to build a shade.
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