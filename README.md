![Magnet JS](docs/resources/magnetjs-title.gif)

MagnetJS
=========

_An open source javascript library that allows you to create interactive fridge magnets._

Live Example: [www.online-fridge.com/example](www.online-fridge.com/example)

Live Example (with dark theme): [www.online-fridge.com/codetheme](www.online-fridge.com/codetheme)

## Overview

MagnetJS is an open source javascript library for creating and interacting with virtual fridge magnets.

The library can be used in local mode _(magnets only)_, or using the [online-fridge.com](www.online-fridge.com) api.

It is designed to be modular and include other components in the future (for example post-it notes).

See the __[Quick Start](#Quick Start)__ section to get started.

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

## Config

## Compatibility

## FAQ

### Why did you make this?

For fun.... mostly. This was also my project for familiarising myself with sockets and javascript modules.

### Why did you not choose canvas?

The decision for not using canvas was based on the idea that anybody can add to their own components. As DOM is more common  I decided to not use canvas.