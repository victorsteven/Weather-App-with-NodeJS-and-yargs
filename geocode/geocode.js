
const axios = require('axios');
const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodeAddress = encodeURIComponent(address);

    var url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAF9prbVG17Lu847lCX90Un9Avo4RQoAJU&address=${encodeAddress}`;

//using axios:
axios.get(url).then(res => {
    // console.log(res.data)
    if(res.data.status === "ZERO_RESULTS"){
        // callback('Unable to find that address');
        throw new Error('Unable to find that address');
    }else if(res.data.status === "OK"){
        callback(undefined, {
            'latitude': res.data.results[0].geometry.location.lat,
            'longitude': res.data.results[0].geometry.location.lng,
            'address': res.data.results[0].formatted_address
        })
    }
    // console.log('Latitude: ' + res.data.results[0].geometry.location.lat)
    // console.log('Longitude:' + res.data.results[0].geometry.location.lat)
    // console.log('Address: ' + res.data.results[0].formatted_address);
}).catch(err => {
    // console.log(err)
    callback('Unable to connect to google servers');
});

//using request:
// request({
//     url: url,
//     json: true, //convert the json to an object
// }, (error, response, body) => {
//     //we want everything in our object to print in a nicely formatted way
//     // console.log(JSON.stringify(body, undefined, 2));
//     if(error){
//         // console.log('Unable to connect to google servers');
//         //now using callback, and since 'err' is the first argument:
//         callback('Unable to connect to google servers');
//     //now, we check if their error in the response, this has nothing to do with the error object above, because, this time, the google address is correct, the error is what the user types in, maybe a wrong address, so the error is in the response object
//     }else if(body.status === "ZERO_RESULTS"){
//         // console.log('Unable to find that address');
//         //now using callback  and since 'err' is the first argument:
//         callback('Unable to find that address');
//     }else if(body.status === "OK"){
//     // console.log('Latitude: ' + body.results[0].geometry.location.lat)
//     // callback('Latitude: ' + body.results[0].geometry.location.lat)
//     // console.log('Longitude: ' + body.results[0].geometry.location.lng)
//     // callback('Longitude: ' + body.results[0].geometry.location.lng)
//     // console.log('Address: ' + body.results[0].formatted_address);
//     // callback('Address: ' + body.results[0].formatted_address);

//     //best refactor:
//     //the undefined below is because, since an error message is not going to be provided when things go well:
//     callback(undefined, {
//         address: body.results[0].formatted_address,
//         latitude: body.results[0].geometry.location.lat,
//         longitude: body.results[0].geometry.location.lng
//     });
//     }
// });
}


//since module.exports is an object, we define a key called "geocodeAddress" to save our "geocodeAddress" in.

// module.exports.geocodeAddress = geocodeAddress;

//alternatively
module.exports = {
    // geocodeAddress: geocodeAddress
    //or using ES6
    geocodeAddress
};
