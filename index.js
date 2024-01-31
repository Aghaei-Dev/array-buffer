const array = new ArrayBuffer(2)
const view = new Int16Array(array)
view[0] = 29128
view[1] = 22

console.log(view)
