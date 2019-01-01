var request = require('request');

var geocodeAddress = (address) => {

    

    return new Promise((resolve, reject) => {

    var encodeAddress = encodeURIComponent(address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAF9prbVG17Lu847lCX90Un9Avo4RQoAJU&address=${encodeAddress}`
    
    request({
        url: url,
        json: true, //convert the json to an object
    }, (error, response, body) => {
        if(error){
            // callback('Unable to connect to google servers');
            reject('Unable to connect to google servers');
        }else if(body.status === "ZERO_RESULTS"){
            // callback('Unable to find that address');
            reject('Unable to find that address')
        }else if(body.status === "OK"){
        // callback(undefined, {
        //     address: body.results[0].formatted_address,
        //     latitude: body.results[0].geometry.location.lat,
        //     longitude: body.results[0].geometry.location.lng
        // });
        resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
        });
        }
    });
    })
}

geocodeAddress("0000").then(location => {
    console.log(JSON.stringify(location, undefined, 2))
}).catch(err => console.log('Error: ', err))