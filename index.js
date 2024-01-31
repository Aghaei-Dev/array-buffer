const buffer = new ArrayBuffer(16)

const view = new Uint32Array(buffer)

console.log(view.BYTES_PER_ELEMENT)

view[0] = 4294967295

view[0] = 4294967296

console.log(view[1], view[2], view[3])
