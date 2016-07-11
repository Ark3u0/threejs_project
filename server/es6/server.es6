import Express from 'express';
import http from 'http';
import path from 'path';
import EJS from 'ejs';

import home from './routes/index.js';

import e404 from './errors/404.js';
import errorHandler from './errors/errorHandler.js';

import onError from './listeners/onError.js';
import onListening from './listeners/onListening.js'

import normalizePort from './config/normalizePort.js';

import logger from 'morgan';

/*
 * Application Setup
 */

let app = Express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', EJS.renderFile);

app.use(logger('dev'));
app.use(Express.static(path.join(__dirname, '/resources')));

app.use('/', home);
app.use(e404);

if(app.get('env') === 'development') {
  app.use((error, request, response, next) => errorHandler(true, error, request, response, next));
} else {
  app.use((error, request, response, next) => errorHandler(false, error, request, response, next));
}

/*
 * Server Setup
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', () => onListening(server));


