const buffer = new ArrayBuffer(16)

const view = new Uint32Array(buffer)

console.log(view.BYTES_PER_ELEMENT) //4

view[0] = 4294967295
// 1111 1111 1111 1111 1111 1111 1111 1111

view[0] = 4294967296

// 1111 1111 1111 1111 1111 1111 1111 1111
//+0000 0000 0000 0000 0000 0000 0000 0001

//=0000 0000 0000 0000 0000 0000 0000 0000

console.log(view[1], view[2], view[3])


// Convert

const bit16 = new Uint16Array([1, 65535]) // we create a array that contain two 16 bit number

const bit8 = new Uint8Array(bit16) // convert that to 8 bits number

console.log(bit8[0]) //1
// it show one because 1 can represent as a 8 bit  number 0000 0001

console.log(bit8[1]) // 255
// this show 1111 1111 (255) in decimal
// why ? because this is the largest unsigned number that can represent as 8 bit

console.log(bit16[1]) // 65535
// because it can represent as a 16 bit number 1111 1111 1111 1111