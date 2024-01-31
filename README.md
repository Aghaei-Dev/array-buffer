# ArrayBuffer And binary arrays

## Binary? what is that ?

Binary describes a numbering scheme in which there are only two possible values for each digit . 0 or 1!
Since the binary system uses only two digits or bits and represents numbers using varying patterns of 1s and 0s, it is known as a base-2 system. Here, 1 refers to "on" or "true," while 0 refers to "off" or "false."

> An example:
> So, for the binary number 01101000, the decimal value is calculated as the following: 8 + 32 + 64 = 104

---

> Wait a minute i thoughts its a Web development article !
> Yes it is , but wait its the base . so listen to what im saying.

## When we meet Binary in the Web?

binary data mostly while dealing with files (create, upload, download). Another typical use case is image processing.
That’s all possible in JavaScript, and binary operations are high-performant.
for example telegram convert everything to bytes and dealing with bytes for performance!
another usage : its an advanced usage we cant talk about it here :) see the end of article if you are so interested.

### The basic binary object

```js
const buffer = new ArrayBuffer(16) // create a buffer of length 16
console.log(buffer.byteLength) // 16
```

> This code allocates a contiguous memory area of 16 bytes and pre-fills it with zeroes.

its an array of bytes.we can't manipulate this array directly with `array[index]`.so how we can ?!first we must create one of the typed array objects or a DataView object which represents the buffer in a specific format and the use that for reading the data or writing in that array.

this constructor `ArrayBuffer(n)`make an array of bytes with the given length.

## View Objects

we said before we can't manipulate a buffer array directly .
so we need this **_View Object_**.
A view object does not store anything on its own. It’s the **eyeglasses** that give an interpretation of the bytes stored in the `ArrayBuffer`.

some of those :

- `Uint8Array` – treats each byte in ArrayBuffer as a separate number, with possible values from 0 to 255 (a byte is 8-bit, so it can hold only that much). Such value is called a “8-bit unsigned integer”.
- `Uint16Array` – treats every 2 bytes as an integer, with possible values from 0 to 65,535. That’s called a “16-bit unsigned integer”.
- `Uint32Array` – treats every 4 bytes as an integer, with possible values from 0 to 4,294,967,295. That’s called a “32-bit unsigned integer”.
- `Float64Array` – treats every 8 bytes as a floating point number with possible values from 5.0x10-324 to 1.8x10308.

```js
const buffer = new ArrayBuffer(16) //buffer with 16 byte
// U represent unsigned
// see the below to understand whats the different of signed and unsigned
// i mean fro example Uint8Array and Int8Array
const view = new Uint32Array(buffer)

console.log(view.BYTES_PER_ELEMENT) // 4

view[0] = 4294967295 // writing the max number it can hold
// why this number is the max ?
// consider a 32 bit register it has the maximum this value
// 1111 1111 1111 1111 1111 1111 1111 1111
// if all of bits are set we have this 4294967295 number
// notice this , its unsigned value it means +4294967295
// if we want e negative value we decrease the range -2,147,483,648 to 2,147,483,647.
// its exactly the half of the number of above .
 the highest bit used for sign

view[0] = 4294967296
// what you guess ? what is the number it hold? its 0
// why? if a register become full i mean 11111111
// every bits become 1 after adding one what happen ?
// its become 0 . its the rule
// consider this example :
// 1111 a four bit register if we add 0001 we have this 0000 .
// the hight value bit is carry and came out from register

console.log(view[1], view[2], view[3]) // they are zero yet. we never touch them!
```

### Notice

If another TypedArray is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.

```js
const bit16 = new Uint16Array([1, 65535]) // we create a array that contain two 16 bit number

const bit8 = new Uint8Array(bit16) // convert that to 8 bits number

console.log(bit8[0]) //1
// it show one because 1 can represent as a 8 bit  number 0000 0001

console.log(bit8[1]) // 255
// this show 1111 1111 (255) in decimal
// why ? because this is the largest unsigned number that can represent as 8 bit

console.log(bit16[1]) // 65535
// because it can represent as a 16 bit number 1111 1111 1111 1111
```

> What is a Register ? do You remember your lessons in the university ? register can hold digitized data i mean 0 and 1 . the simplest and fastest data storage in your computer.

```js
console.log(Uint16Array.BYTES_PER_ELEMENT) // 2 bytes per integer
// byteLength = array length * Uint16Array.BYTES_PER_ELEMENT (here 2)
// look this 16 bit number 1111 1111 1111 1111 its `two` BYTES

console.log(Uint32Array.BYTES_PER_ELEMENT) // 4 bytes per integer
// byteLength = array length * Uint32Array.BYTES_PER_ELEMENT (here 4)
// for a 32 bit number its 4 BYTES
```

```js
const array = new Uint32Array() // creates a zero-length typed array
console.log(array) // ArrayBuffer(0)
```

## TypedArray Methods

We can iterate with `map`, `slice`, `find`,`reduce` etc.
there is no `Contact` or `splice`. we said it has fixed length . so we have not `pop`,`push`,`shift` and `unShift`,
we cant remove an item from a typed Array we can just assign zero to that item.
two Additional methods:
`arr.set(fromArr, [offset])` copies all elements from fromArr to the arr, starting at position offset (0 by default).
`arr.subArray([begin, end])` creates a new view of the same type from begin to end (exclusive). That’s similar to slice method (that’s also supported), but doesn’t copy anything – just creates a new view, to operate on the given piece of data.

## ArrayBuffer VS Array

- there aren't same things.they are totally different .
- It has a fixed length, we can’t increase or decrease it by adding item or removing just like ordinary arrays.
- It takes exactly that much space in the memory.
- its store just raw bytes

---

## Here I Mean :D

in three js (its a library for using WebGL easier. if i want say simple for 3D works)
we can create our own Geometry . if you don't understand what is geometry i can's say anymore.
in this example we create a geometry and render it with `Float32Array`

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
//! hard way
// // 1
// // x
// // y
// // z
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// // 2
// // x
// // y
// // z
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // 3
// // x
// // y
// // z
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

// 9 for the three vertices
// x,y,z  - x,y,z - x,y,z
const geometry = new THREE.BufferGeometry()

const count = 50
//count * x,y,z * three vertices
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //   cube.rotation.y = elapsedTime / 2

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
```
