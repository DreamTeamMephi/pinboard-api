var requireDir = require('require-dir')

module.exports = (app) => {
  var apis = requireDir('./api')
  console.log(apis);
  for (var api in apis) {
    app.use('/api_v1/' + api, apis[api])
  }
}



// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('Api is running!')
// });

// module.exports = router;
