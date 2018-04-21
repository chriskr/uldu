#  uldu

<img alt="uldu logo"
     src="https://chriskr.github.io/home/wiking.svg"
     width="90"
     height="90">

Ultra lightweight utility to create DOM nodes.

[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](
  http://www.apache.org/licenses/LICENSE-2.0.txt
)

```js
import {
  TEXT_NODE_NAME,
  createDom,
  render,
  renderClean,
} from 'uldu';
```

A DOM node with some text:
```js
render(['p', 'A paragraph'], document.body);
```
```html
<body>
  <p>A paragraph</p>
</body>
```

Optional attributes:
```js
render(['p', {class: 'foo', id: 'bar'}, 'A paragraph'], document.body);
```
```html
<body>
  <p class="foo" id="bar">A paragraph</p>
</body>
```

Nested nodes:
```js
render(['p', 'This is ', ['b', 'awesome']], document.body);
```
```html
<body>
  <p>This is <b>awesome</b></p>
</body>
```

Document fragments:
```js
render([
  ['p', 'Paragraph 1'],
  ['p', 'Paragraph 2'],
], document.body);
```
```html
<body>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</body>
```

Text nodes:
```js
render([TEXT_NODE_NAME, 'This is really ', ['b', 'awesome']], document.body);
```
```html
<body>This is really <b>awesome</b></body>
```