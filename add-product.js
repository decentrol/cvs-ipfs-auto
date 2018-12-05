const thorify = require("thorify").thorify;
const Web3 = require("web3");
let ipfs = require('ipfs-api')({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const jsonfile = require('jsonfile');
var fs = require('fs');
const web3 = thorify(new Web3(), "http://127.0.0.1:8669");
var Accounts = require('web3-eth-accounts');

web3.eth.accounts.wallet.add({
    privateKey: 'private',
    address: 'address'
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var uuid = guid();
var productName = 'This is a test product';
var temp = '24.5'
var humidity = '70.4'
var age = '08 weeks'
var harvestDate = '30-12-2022'
var location = 'The Netherlands'

var data = [productName, temp, humidity, age, harvestDate, location]

const file = 'products/'+uuid+'.json'

const obj = { UUID: uuid, Product_Name: productName, Temperature: temp, Humidity: humidity, Age: age, Harvest_Date: harvestDate, Location: location }

jsonfile.writeFile(file, obj, function (err) {
  if (err) console.error(err)
  let cont = fs.readFileSync('products/'+uuid+'.json'); //Get the log data file

  cont = new Buffer(cont);

  ipfs.add(cont, function (err, ipfsHash) {
    if(err) throw err;
    console.log(ipfsHash);
     ipfs.pin.add(ipfsHash[0].hash, function(err){ //pin adding that stuff
         if (err) throw err;
         console.log('success')

     });
     //here was the problem, and this is how I fixed it :)

     web3.eth.sendTransaction({
        from: "your-address",
        to: "an address",
        value: "0",
        data: '0x' + Buffer.from(ipfsHash[0].hash,'ascii').toString('hex')
      },(error, transactionHash) =>{
            if(error){
                console.error(error);
            }
            else{
              console.log(transactionHash);
            }

        });

  });

})
