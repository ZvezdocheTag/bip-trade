const express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http),
fetch = require('node-fetch');

const bittrex = require('./node.bittrex.api/node.bittrex.api.js');

// DEFAULT SOCKET
var cor = __dirname.slice(0, __dirname.length - 3) + 'public';
app.use(express.static(__dirname + '/'));

var fields = ["currencyPair", "timestamp", "bidBig", "bidPips", "offerBig", "offerPips", "high", "low", "open"]
var cachedData;
var connected = 0;

var interval = setInterval(updateData, 10000);

io.on('connection', function (socket) {
  connected++;
  io.sockets.emit('data', cachedData);
  socket.on('disconnect', function () {
    connected--;
  });
});


const PUBLIC_API_BITTREX = {
  getmarkets: 'getmarkets',
  getcurrencies: 'getcurrencies',
  getticker: 'getticker',
  getmarketsummaries: 'getmarketsummaries',
}
const processData = (fields, valid) => data => {
  // console.log(data)
  return data;
  // data.split("\n").map(row => row.split(",")
  // .reduce((acc, val, i) => { acc[fields[i]] = val; return acc }, {}))
  // .filter(obj => obj.hasOwnProperty(valid))
}


function updateData() {
  fetch(`https://bittrex.com/api/v1.1/public/${PUBLIC_API_BITTREX.getmarketsummaries}`)
    .then(response=> response.json())
    // .then(processData(fields, "timestamp"))
    .then(result => {
      cachedData = result;
      // console.log(result)
      io.sockets.emit('data', result);
  })
}

http.listen(3005, function () {
console.log('listening on: 3005');
});