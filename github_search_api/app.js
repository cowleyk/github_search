var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flatCache = require('flat-cache');
var reposRouter = require('./routes/repos');
var detailsRouter = require('./routes/details');

var app = express();
let cache = flatCache.load('productsCache');

let flatCacheMiddleware = (req,res, next) => {
  let key =  '__express__' + req.originalUrl || req.url
  let cacheContent = cache.getKey(key);
  if( cacheContent){
      res.send( cacheContent );
  }else{
      res.sendResponse = res.send
      res.send = (body) => {
          cache.setKey(key,body);
          cache.save();
          res.sendResponse(body)
      }
      next()
  }
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/repos', flatCacheMiddleware, reposRouter);
app.use('/details', flatCacheMiddleware, detailsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
