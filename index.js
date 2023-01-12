const startupDebugger = require('debug')('app:startup');
const dbDebbuger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);
app.use('/',home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


app.set('view engine', 'pug');
app.set('views', './views');

if(app.get('env') === 'production'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled....');
}

dbDebbuger('Conncected to database...');

app.use(logger);

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening ${port} ...`);
});
