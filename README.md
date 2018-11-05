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

<H2>Files to place in the right directory</H2>
You'll find that I have two .service files: log.service and read.service. These will make sure that the read.py and log.js will run no matter what. Even after a reboot, these files will run without you having to do anything. To make sure you these files will make your app run edit a few lines. You will find that I have put comments in the files for the stuff you have to edit. 
<br/>
After you have edited these lines, copy them to the right directory by typing in the terminal:<br/>
<code>$ sudo cp read.service /lib/systemd/system</code>
<br/> and
<code>$ sudo cp log.service /lib/systemd/system</code>
<br/> 
After that type in the terminal:<br/>
<code>$ sudo systemctl daemon-reload</code><br/>
<code>$ sudo systemctl enable log</code><br/>
<code>$ sudo systemctl start read</code><br/>
<code>$ sudo systemctl status log</code><br/>
<code>$ sudo systemctl status read</code><br/>
