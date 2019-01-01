// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('hey, it worked');
//         reject('rejected promise')
//     }, 2500)
    
// })

// somePromise
// .then(message => console.log('success: ', message), errMessage => console.log("some error", errMessage));
// better:
// somePromise
// .then(message => console.log('success: ', message))
// .catch(err => console.log('some error', err));



var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === "number" && typeof b === "number"){
                resolve(a+b);
            }else{
                reject("The two arguments must be numbers");
            }
        }, 1000)
    })
    // .then(result => console.log("Sum: ", result))
    // .catch(err => console.log(err));
}
// console.log(asyncAdd(2,5));

//or lets put the then in the calling:
// asyncAdd(2,10).then(result => {
//     console.log(result)
// }).catch(err => console.log(err));

// asyncAdd(2,'sw').then(result => {
//     console.log(result)
// }).catch(err => console.log(err));

//now i want to chain two promises:
asyncAdd(2,'4').then(result => {
    // console.log(result)
    return asyncAdd(result, 34)
}).then(res => console.log(res))
//no need to use two catch, because one can catch effectively
.catch(err => console.log(err));
