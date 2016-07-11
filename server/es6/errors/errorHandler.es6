module.exports = (isDevEnv, error, request, response, next) => {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error: (isDevEnv ? error : {})
  });
};