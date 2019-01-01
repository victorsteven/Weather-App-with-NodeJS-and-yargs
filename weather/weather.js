const axios = require('axios');

var getWeather = (lat, lng, callback) => {
    var url = `https://api.darksky.net/forecast/f1c152d89f070016f4a1ec972dd35dcc/${lat},${lng}`;

    axios.get(url).then(res => {
        // console.log('Temperature is: ', res.data.currently.temperature)
        callback(undefined, {
            "temperature": res.data.currently.temperature,
            "actual_temperature": res.data.currently.apparentTemperature
        });
    }
    ).catch(err => {
        // console.log('Unable to fetch weather')
        callback('Unable to fetch weather')

    });
}

module.exports.getWeather = getWeather;
