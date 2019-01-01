//writing both the geocode and the weather code in this file
var axios = require('axios');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    console.log(argv)


    var encodeAddress = encodeURIComponent(argv.address);
    
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAF9prbVG17Lu847lCX90Un9Avo4RQoAJU&address=${encodeAddress}`;

    
    // axios.get(geocodeUrl).then(res => {
    //     if(res.data.status === "ZERO_RESULTS"){
    //         // callback('Unable to find that address');
    //         console.log('Unable to find that address');
    //     }else if(res.data.status === "OK"){

    //         var lat = res.data.results[0].geometry.location.lat;
    //         var lng = res.data.results[0].geometry.location.lng;
    //         var address = res.data.results[0].formatted_address;
    //         console.log('Address: ', address);

    //         var weatherUrl = `https://api.darksky.net/forecast/f1c152d89f070016f4a1ec972dd35dcc/${lat},${lng}`;

    //         return axios.get(weatherUrl).then(res => {
    //             var temperature = res.data.currently.temperature;
    //             var actual_temperature = res.data.currently.apparentTemperature;

    //             console.log(`Its currently ${temperature}. It feels like ${actual_temperature}`)
    //         }).catch(err => console.log('Unable to fetch weather information'));
    //     }
    // }).catch(err => {
    //     console.log('Unable to connect to google servers');
    // });


    //Second option:

    axios.get(geocodeUrl).then(res => {
        if(res.data.status === "ZERO_RESULTS"){
            console.log('Unable to find that address');
            // throw new Error('Unable to find that address');
        }
        var lat = res.data.results[0].geometry.location.lat;
        var lng = res.data.results[0].geometry.location.lng;
        var address = res.data.results[0].formatted_address;
        console.log('Address: ', address);

        var weatherUrl = `https://api.darksky.net/forecast/f1c152d89f070016f4a1ec972dd35dcc/${lat},${lng}`;

        return axios.get(weatherUrl);
    })
    .then(res => {
        var temperature = res.data.currently.temperature;
        var actual_temperature = res.data.currently.apparentTemperature;

        console.log(`Its currently ${temperature}. It feels like ${actual_temperature}`)
    })
    .catch(e => {
        if(e.code === "ENOTFOUND"){
            console.log('Unable to connect to google servers');
        }
        else{
            console.log('Unable to fetch weather information');
        }
    });