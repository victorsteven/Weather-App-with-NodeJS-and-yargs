//modelling async:

setTimeout(() => {
    console.log('Inside of callback')
}, 2000)

setTimeout(() => {
    console.log('Second of callback')
}, 0)

//this prints first
console.log('finish');