# cvs-ipfs-auto

<H2>Introduction</H2>
<p> I have made the basic set up for a dapp to store datafiles, such as csv, on the blockchain (although at this point blockchain is not implemented yet). The data that I am adding in this project is temperature from my DHT22 and I will be controlling the data from my Raspberry Pi. You need a couple of stuff set up: <br/>
  <br/>
  <ul>
    <li>Node.js installed</li>
    <li>Adafruit DHT: https://github.com/adafruit/Adafruit_Python_DHT </li>
    <li>Filesystem: $ npm install file-system</li>
    <li>CSV writer: $ npm install csv-write-stream</li>
    <li>IPFS: https://ipfs.io (running the daemon is optional, I used infura)</li>
    <li>IPFS api: $npm install ipfs-api</li>
  </ul>
  
<br/>

<H2>Setting stuff up</H2>

