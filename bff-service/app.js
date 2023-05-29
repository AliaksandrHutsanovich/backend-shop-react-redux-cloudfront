var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, './.env')
});

const cartRouter = require('./routes/cartService');
const importRouter = require('./routes/importService');
const orderRouter = require('./routes/orderService');
const productRouter = require('./routes/productService');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));

app.use('/cartService', cartRouter);
app.use('/importService', importRouter);
app.use('/orderService', orderRouter);
app.use('/productService', productRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
