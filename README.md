node-http-request-mock
=================

Install

    $ npm install node-http-request-mock

Very simple node.js module that allows you to mock http requests. 

    require('node-http-request-mock');

    var ops = {
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

    var mock = new mockRequest(ops);

    /*
    *  Now do some testing ...
    */

    // if the autoRespond is in false:
    mock.respond();
    // or
    mock.fail();

    // when you're done
    mock.restore();

