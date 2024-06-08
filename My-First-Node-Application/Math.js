const add = (a,b) => {
    console.log(a+b);
}

const sub = (a,b) => {
    console.log(a - b)
}

// module.exports = {
//     addFn: add,
//     subFn: sub
// }

/* another syntax */

module.exports = {
    add,
    sub
}