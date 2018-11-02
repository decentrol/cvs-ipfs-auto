const fs = require("fs");

let ipfs = require('ipfs-api')({host: "localhost", port: 5001, protocol: "http"}); //require ipfs-api which can be installed using npm command line.

 
setInterval(function(){

//run this piece of code every 24 hours 
// getting today's date with the following lines
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

let cont = fs.readFileSync('temp_'+today+'.cvs'); //the name of the cvs file that we want to push out to the ipfs network
 
    
  cont = new Buffer(cont);
  ipfs.add(cont, function (err, hash) {
    if(err) throw err;
    console.log(hash);

  });
//the hash is returned on the console log. I don't really get the piece of code above but it works, lol 
}, 24 * 60 * 60 * 1000);
