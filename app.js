import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import config from './config.json';
import bunyan from 'bunyan';
import session from 'express-session';
import seqStore from 'connect-session-sequelize';

global.log = bunyan.createLogger({
  name: 'pinboard-api',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

global.sequelize = new Sequelize('pinboard', 'postgres',config.postgres_password, {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const PORT = process.env.PORT || 3000

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//My own middleware for testing purposes
app.use((req, res, next) => {
    log.info({ req: req }, 'start request');  // <-- this is the guy we're testing
    next();
});


//Setting for postgres session storage
let SequelizeStore = seqStore(session.Store);

let store = new SequelizeStore({
    db: sequelize
});
store.sync();

//middleware for sessions
app.use(session({
  secret: 'FluffyFox',
  store: store,
  saveUninitialized: true,
  resave: false,
  proxy: true // if you do SSL outside of node. 
}))

require('./utils/passport')(app)
require('./routes/')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

log.info(`API started on ${PORT}`)

app.listen(PORT)



