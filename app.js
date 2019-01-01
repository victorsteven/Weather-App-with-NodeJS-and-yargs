
const yargs = require('yargs');
var weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

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

    //n/b: (err, result){} is the execution of the callback function we defined in the geocode fxn
    geocode.geocodeAddress(argv.address, (err, result) => {
        if(err){
            console.log(err)
        }else{
        // console.log(JSON.stringify(result, undefined, 2));
        console.log(result.address);
        console.log(result.latitude);
        console.log(result.longitude);
        //lets get the temperature for the lat and lng that returns to us:
        weather.getWeather(result.latitude, result.longitude, (err, weatherResult) => {
            if(err){
                console.log(err);
            }
            else if(weatherResult){
                // console.log(JSON.stringify(weatherResult, undefined, 2));
                console.log(`It is currently: ${weatherResult.temperature} but it feels like ${weatherResult.actual_temperature}`);
            }
        });
        }
    });


// weather.getWeather(6.509180799999999, 3.3795046, (err, weatherResult) => {
//     if(err){
//         console.log("Unable to get weather");
//     }
//     else if(weatherResult){
//         console.log(JSON.stringify(weatherResult, undefined, 2));
//     }
// });



