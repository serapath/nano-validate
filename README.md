# object-valid
tiny deep object validation library

# usage
`npm install object-valid`

```js
var validate = require('object-valid')

/******************************************************************************
  define type tester
******************************************************************************/
var spec_Ax = {
  x: function isAnything (x) { return true } // property x must exist, but can be anything
}

var spec_Ay = {
  y: {
    b: function isFunction (x) { return typeof x === 'boolean'},
    x: function isFunction (x) { return typeof x === 'number'},
    z: function isFunction (x) { return typeof x === 'string'},
    o: function isObject (x) { return typeof x === 'object' && x !== null },
    f: function isFunction (x) { return typeof x === 'function'},
    a: Array.isArray, // type is function name
    u: function isUndefined (x) { return x === undefined },
    n: function isNull (x) { return x === null }
  }
}

var spec_B = {
  x: { y: { z: function array3 (x) { return Array.isArray(x) && x.length > 3 } } },
  y: function isAnything (x) { return true }
}

var typeAx = validate(spec_Ax)
var typeAy = validate(spec_Ay)
var typeB = validate(spec_B)

/******************************************************************************
  some objects
******************************************************************************/
var A = {
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

var B = {
  x : { y: { z: [1,2,3,4] } },
  y : function () {}
}
/******************************************************************************
  validate objects
******************************************************************************/
typeAx(A) // throws if object doesnt pass specification
typeAy(A) // throws if object doesnt pass specification
typeB(B) // throws if object doesnt pass specification

```

# related
* [x-is](https://www.npmjs.com/package/x-is) can be used to define an object spec

# inspired by
* [object-validate](https://www.npmjs.com/package/object-validate)
