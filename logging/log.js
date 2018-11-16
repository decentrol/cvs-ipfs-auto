const thorify = require("thorify").thorify;
const Web3 = require("web3");
const fs = require("fs");
let ipfs = require('ipfs-api')({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
const web3 = thorify(new Web3(), "http://localhost:8669");
var Accounts = require('web3-eth-accounts');



web3.eth.accounts.wallet.add({
    privateKey: 'your from private key',
    address: 'your from address'
});

tDate = new Date();
tDate.setHours(23);
tDate.setMinutes(55);
tDate.setSeconds(00);
tDate.setMilliseconds(00);

tMillis = tDate - new Date();

if (tMillis < 0)
tMillis = tMillis + 24 * 60 * 60 * 1000; // if time is greater than 21:36:00:500 just add 24 hours as it will execute next day

setTimeout(function everyDay(){

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

   	 ipfs.pin.add(ipfsHash[0].hash, function(err){ //pin adding that stuff
     		 if (err) throw err;
     		 console.log('success')

   	 });
     //here was the problem, and this is how I fixed it :)

     web3.eth.sendTransaction({
        from: "your from address",
        to: "your to address",
        value: "0",
        data: '0x' + Buffer.from(ipfsHash[0].hash,'ascii').toString('hex')
      },(error, transactionHash) =>{
            if(error){
                console.error(error);
            }
            else{
              console.log(transactionHash);
              writer.write({ipfsHash: ipfsHash[0].hash, transactionHash}) //store the ipfs hash and txID in a csv file 
            }

        });



        setTimeout(everyDay, 24 * 60 * 60 * 1000); //repeat every 24 hours

  });

}, tMillis); // start on 23:55 hrs
