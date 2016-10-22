assert = require("assert");
superagent = require("superagent");

var apiDomain = 'http://localhost:' + (process.env.PORT || 1337)

var user = {
  "email": "lol@test.com",
  "password": "testingpassword"
}

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
      .get(apiDomain)
      .end(function(res){
        expect(res.status).to.equal(200);
	      done();
    })
  })
  it('should respond to non-existing url with 404',function(){
    superagent
      .get(apiDomain + '/this/path/surely/dont/exist')
      .end(function(res){
        expect(res.status).to.notEqual(200);
	      done();
    })
  })
})

//Test if API is Running
describe('Users', function(){
  it('should create a user ',function(){
    superagent
      .post(apiDomain + '/api_v1/auth/local/register')
      .send(user)
      .end(function(res){
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal(user.email)
      
	      done();
    })
  })
  it('dont create the same user again ',function(){
    superagent
      .post(apiDomain + '/api_v1/auth/local/register')
      .send(user)
      .end(function(res){
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal(user.email)
      
	      done();
    })
  })
})