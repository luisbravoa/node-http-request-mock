var http = require('http');

var mockRequest = require('./httpRequestMock');

stubOptions = {
  statusCode: 200,
  optionsAssertions : function(){
    console.log('initial assertions');
  },
  end: function(){
    console.log('this is the end');
  },
  autoRespond: true,
  responseData: 'custom response'

};

test = new mockRequest(stubOptions);


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
  })
});

req.on('error', function (e) {
  console.log('error: ', e);
});

req.end();
