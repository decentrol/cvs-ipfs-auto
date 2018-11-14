const thorify = require("thorify").thorify;
const Web3 = require("web3");
const fs = require("fs");
let ipfs = require('ipfs-api')({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
const web3 = thorify(new Web3(), "http://localhost:8669");
var Accounts = require('web3-eth-accounts');




web3.eth.accounts.wallet.add({
    privateKey: '0x455571852e8156eb093e9f541e35b5a6077acd85289b04b863735df106f99716',
    address: '0xa8e4FC2333cCabA7A6D591fc99b27be7D89E0a75'
});

tDate = new Date();
tDate.setHours(18);
tDate.setMinutes(02);
tDate.setSeconds(20);
tDate.setMilliseconds(500);

tMillis = tDate - new Date();

if (tMillis < 0)
tMillis = tMillis + 24 * 60 * 60 * 1000; // if time is greater than 21:36:00:500 just add 24 hours as it will execute next day



//setTimeout(function(){
  //setInterval(function(){
//web3.eth.accounts.privateKeyToAccount(0x22936069064cb70984a41d4c1fc71058ce2e7fd4c178fc4cdc260c59d4ac1add);
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

   	 });

     web3.eth.sendTransaction({
        from: "0xa8e4FC2333cCabA7A6D591fc99b27be7D89E0a75",
        to: "0x5484A0373709CfdE968670666e2A7370B32DdadF",
        value: "0",
        data: '0x' + Buffer.from(ipfsHash[0].hash,'ascii').toString('hex')
        },(error, result) =>{
            if(error){
                console.error(error);
            }
            else{
              console.log(result);
            }
        });

  });


//}, 60 * 1000); //24 hour loop
//}, tMillis); // start on 23:59 hrs
