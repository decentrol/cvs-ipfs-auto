const fs = require("fs");

let ipfs = require('ipfs-api')({host: "localhost", port: 5001, protocol: "http"});


tDate = new Date();
tDate.setHours(23);
tDate.setMinutes(59);
tDate.setSeconds(00);
tDate.setMilliseconds(500);

tMillis = tDate - new Date();

if (tMillis < 0)
  tMillis = tMillis + 24 * 60 * 60 * 1000; // if time is greater than 21:36:00:500 just add 24 hours as it will execute next day

setTimeout(function(){
 

setInterval(function(){


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}
today = dd + '-' + mm + '-' + yyyy;

let cont = fs.readFileSync('loggings/temp_'+today+'.csv');

  cont = new Buffer(cont);
  ipfs.add(cont, function (err, hash) {
    if(err) throw err;
    console.log(hash);

  });

},  24 * 60 * 60 * 1000); //run script every 24 hours 

}, tMillis); //run script at 23:59:00
