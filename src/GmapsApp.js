
const request = require('request');
var busID=10;
request('https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid='+busID, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  //console.log(body.explanation);
});