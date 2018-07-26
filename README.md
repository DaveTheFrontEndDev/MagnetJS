![Magnet JS](docs/resources/magnetjs-title.gif)

MagnetJS
=========

_An open source javascript library that allows you to create interactive fridge magnets._

__Live Example:__ [www.online-fridge.com/example](http://www.online-fridge.com/example)

__Live Example (with dark theme):__ [www.online-fridge.com/codetheme](http://www.online-fridge.com/codetheme)

## Overview

MagnetJS is an open source javascript library for creating and interacting with virtual fridge magnets.

The library can be used in local mode _(local movement of magnets)_, or using the [online-fridge.com](http://www.online-fridge.com) api (anybody can move the magnets in real-time).

It is designed to be modular and include other components in the future (for example post-it notes).

See the [Quick Start](#quick-start) section to get started.

## Quick Start

To get started using MagnetJS, include the library.

```html
<script src="magnet.min.js"></script>
```

Add a target to your website (this is where you board will be built).

```html
<div id="root" />
```

Create your board (`target:` is the 'id' of your target element)

```javascript
const board = new Magnet({ target: 'root' });
```

After the dom has loaded, mount the board.

```javascript
window.onload = () => {
  board.mount();
};
```

And Vualá!!

![MagnetJS Example](docs/resources/magnetjs-example.gif)

## Making changes

To make changes to the library and test it out.

```console
npm install
```

And run the example app:

```console
npm start
```

The files that load the board are in `example/html/.`.

## Methods

### mount()

Mounts the board to the target (set in config). This must only be called once the DOM has loaded.

## Config

All values apart from the target are optional, however if you include a theme or item config they must be complete.

### id

The `id:` value is __not__ the target element for your board. This is used to identify the board when using online mode (see [Online Mode](#Online-Mode)). The board can also be viewed by visiting www.online-fridge.com/{id here}.

### target

The `target:` value mounts the board to the DOM element with that id. In the example this is `"root"`.

### width

In pixels, the width of the board (not target element).

### height

In pixels, the height of the board (not target element).

### items

This contains the config for items on the board, they can come in one of two formats.

#### items -> Array

Array of items (for example, a letter item config as described [here](src/component/Letter.README.md))

#### items -> Object

Items config, this is the information that is required to generate items.

##### spawn

The number of components to generate for the board.

##### options

An object containing options for the items. These are defined in the component config (for example [here](src/component/Letter.README.md)).

### theme

An array of styles to be used as a theme for the board and its content.

If the structure of this config seems a little odd it is because it must also mimic the database structure for the use of the [online-fridge.com](http://www.online-fridge.com) api.

Each style is a javascript object with the following structure:

#### code

This value should be one of the following:

* `background` - This means to set the style to the background of the board, this can be an rgb value for example.

* `color` - This is to create a specific theme color that can be uniquely defined per item (see item 'color' values in the Letter component [README](src/component/Letter.README.md))

* Component name, e.g `letter` - This means a style to set for a specific item

#### id

This value should always be 1 unless it the style object has `code: 'color'`. If it has a 'color' code then it should increment per value and be used as a unique identifier for each color.

#### key

This value must be one of the following:

* The key in css ['key / value pairs'](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) but with camelCase instead of css hyphen-case.

* `rgb`, which would convert into an rgb color value. This is then handled differently depending on the `code` value of the style object. For example, the `background` code will set this value as the background.

#### value

This will the one of the following:

* The value in css ['key / value pairs'](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax). This value can also perform calculations on the color value of its item. To do this you should use the following syntax:

```
    key: "textShadow",
    value : "0 10px 0 rgb({[r]-50},{[g]-50},{[b]-50})"
```

This is the same as an [es6 template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) but without the `$` and assuming that the rbg values are storage as variable with the name `r`, `g` and `b`. This allows you also use variations of the rgb color values.

### Example config

```javascript
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
```

## Online Mode

To enable the use of the [online-fridge.com api](http://www.online-fridge.com) you must:

Load socket.io from online-fridge.com

```html
<script src="http://www.online-fridge.com/socket.io/socket.io.js"></script>
```

Include the id of the board you want to access in the config.

```javascript
const board = new Magnet({
 target: 'root',
 id: 'example'
});
```

## Compatibility

Browser support could stretch back further but will need further testing to confirm.

| Device  | Browser | Version     |
|---------|---------|-------------|
| Mobile  | Safari  | IOS 11.4.0+ |
| Mobile  | Chrome  | 67.0.x+     |
| Desktop | Chrome  | 67.0.x+     |
| Desktop | Safari  | 11.1+       |
| Desktop | Firefox | 40.0.2+     |

## FAQ

### Why did you make this?

For fun.... mostly. This was also my project for familiarising myself with sockets and javascript modules.

### Why did you not choose canvas?

The decision for not using canvas was based on the idea that anybody can add to their own components. As DOM is more common  I decided to not use canvas.

## What I would like to change

- There is some ambiguity between how classes are accessed, I would like to re-evaluate the class structure with [SOLID](https://deviq.com/solid/) design.

- I would like to look at better alternative ways to load css, the current method of dynamically adding stylesheets to the webpage is probably not the bet option.

- Move the config initialisation out of the socket class, this is more of a TODO as a result from originally not designing it to work offline.

- Make this compatible for modern javascript libraries like ReactJS and VueJS. I started this project early on in my career as a developer and was not fully aware of these technologies and their importance at the time.