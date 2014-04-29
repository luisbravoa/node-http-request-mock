var http = require('http');
var events = require("events");
var sinon = require('sinon');

function httpRequestMock(ops){
  this.req = new events.EventEmitter();
  this.res = new events.EventEmitter();
  this.stub = sinon.stub(http, "request", function(options, callback) {

    if(ops.optionsAssertions) ops.optionsAssertions(options);


    this.res.setEncoding = function() { };
    this.res.statusCode = (ops.statusCode)? ops.statusCode: 200;
    callback(this.res);

    this.responseData = (ops.responseData)? ops.responseData: 'response';

    if(ops.autoRespond !== false){
      this.respond();
    }

    if(ops.write){
      this.req.write = ops.write;
    }else{
      this.req.write = function(){};
    }
    if(ops.end){
      this.req.end = ops.end;
    }else{
      this.req.end = function(){};
    }
    return this.req;
  }.bind(this));

}

httpRequestMock.prototype.fail = function(){
  this.req.emit('error', new Error('Network Error'));
};
httpRequestMock.prototype.respond = function(){
  this.res.emit("data", this.responseData);
  this.res.emit("end");
};
httpRequestMock.prototype.restore = function(){
  this.stub.restore();
}

module.exports = httpRequestMock;