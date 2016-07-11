var Express = require('express');
var router = Express.Router();

router.get('/', (request, response, next) => {
  response.render('index.html');
});

module.exports = router;