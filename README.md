# object-valid
tiny object validation library

# usage
`npm install object-valid`

```js
var validate = require('object-valid')

var a = {
  x: undefined,
  y: {
    b: false,
    x: 0,
    z: '',
    o: {},
    f: function () {},
    a: [],
    n: null,
    u: undefined
  }
}

var b = {
  x : { y: { z: [1,2,3,4] } },
  y : function () {}
}

validate({ x: '*' }, a) // property x must exist, but can be anything

validate({ y: {
  b: 'boolean',
  x: 'number',
  z: 'string',
  o: 'object',
  f: 'function',
  a: Array.isArray, // type is function name
  u: 'undefined',
  n: function isNull (val) { return val === null }
}}, a)

validate({
  x: { y: { z: arr => Array.isArray(arr) && arr.length > 3 } },
  y: '*' // anything
}, b)
```
