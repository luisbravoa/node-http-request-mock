var http = require('http');

var mockRequest = require('./index');

stubOptions = {
  statusCode: 200,
  optionsAssertions : function(){
    console.log('initial assertions');
  },
  end: function(){
    console.log('this is the end');
  },
  write: function(){
    console.log('this is the write method');
  },
  autoRespond: true,
  responseData: '{"what":"ever"}'
};

var mock = new mockRequest(stubOptions);

// Now do some testing...

var options = {
  hostname: 'example.com',
  port: 80,
  path: '/path/',
  method: 'GET'
};
var req = http.request(options, function (res) {
  var status = res.statusCode;
  var buffer = null;

  res.on('data', function (chunk) {
    if (buffer === null) {
      buffer = chunk;
    } else {
      buffer = Buffer.concat([buffer, chunk]);
    }
  });

  res.on('end', function () {
      console.log('Success! ' + buffer);
  });
});

req.on('error', function (e) {
  console.log('error: ', e);
});

req.end();
