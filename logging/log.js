
const fs = require("fs");
let ipfs = require('ipfs-api')({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var csvWriter = require('csv-write-stream')
var writer = csvWriter()

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
today = dd + '-' + mm + '-' + yyyy; //define today's date

writer.pipe(fs.createWriteStream('hash_'+today+'.csv')) //here is where the hash will go

let cont = fs.readFileSync('temp_'+today+'.csv'); //Get the log data file

  cont = new Buffer(cont); //convert the log data file (defined as cont) to a buffer
  ipfs.add(cont, function (err, ipfsHash) {
    if(err) throw err;
    writer.write({ipfsHash:ipfsHash[0].hash}) //here was the problem, and this is how I fixed it :)


    ipfs.pin.add(ipfsHash[0].hash, function(err){ //pin adding that stuff 
      if (err) throw err;
      console.log('success')

    } );

  });




}, 24 * 60 * 60 * 1000); //24 hour loop
}, tMillis); // start on 23:59 hrs


