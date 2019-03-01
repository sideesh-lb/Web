
var yargs = require('yargs');
const requests = require('request');
var argv = yargs
              .options({
              	a : {
              		demand : true,
              		describe : 'Address to fetch weather',
              		string : true
              	}
              })
              .help()
              .alias('help', 'h')
              .argv;

//console.log(argv);
var adr = argv.a;
adr = encodeURIComponent(adr);

var url= `https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=AIzaSyCVGBo-Fth0YV9eM4hRylbtjTC7Qf1wK2k`;

//url = encodeURIComponent(adr);

requests({
    url : url,
    json : true
}, (error, response, body) => {
	if (body.status === "OK") {
       var lat = body.results[0].geometry.location.lat;
       var lng = body.results[0].geometry.location.lng;
       var _url=`https://api.darksky.net/forecast/de83f44c85dec987f1d7a37be0935098/${lat},${lng}`;

       requests({
       	url : _url,
        json : true
       }, (err,res,bod) => {
       	var temp = bod.currently.temperature;
       	console.log(temp);
       })
       
	}
   console.log(lat);
   console.log(lng);
});

//console.log(url);