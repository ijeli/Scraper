//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//initialize Express app
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//connecting to MongoDB
mongoose.connect('mongodb://admin:QDuNw2mDPAGCtUs@ds163842.mlab.com:63842/heroku_q3cpp1h6');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});

var controller = require('./controller/controller.js');
app.use('/', controller);


var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT);
});