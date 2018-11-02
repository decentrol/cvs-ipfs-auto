const fs = require("fs");

let ipfs = require('ipfs-api')({host: "localhost", port: 5001, protocol: "http"});


setInterval(function() {
    // your code goes here...

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

let cont = fs.readFileSync('kaas_'+today+'.csv');

  cont = new Buffer(cont);
  ipfs.add(cont, function (err, hash) {
    if(err) throw err;
    console.log(hash);

  });


}, 24 * 60 * 60 * 1000);
