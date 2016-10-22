assert = require("assert");
superagent = require("superagent");

var apiDomain = 'http://localhost:' + (process.env.PORT || 1337)

//Test if Mocha is working
describe('Mocha', function() {
  describe('Is Running', function() {
    it('is running', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


//Test if API is Running
describe('API', function(){
  it('should respond to GET with 200',function(){
    superagent
      .get('')
      .end(function(res){
        expect(res.status).to.equal(200);
	done();
    })
  })
})
