/******************** DECLARE LIBS AND VARS ********************/
// Add Libs
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const api = express.Router();
if(process.env.NODE_ENV != "production") {
	require('dotenv').config();
}


// Configure app to use body parser for POST
 app.use(cors());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());


/******************** SETUP API ROUTES ********************/

// Handle base route
api.get('/', function(req, res) {
    res.json( { message: 'Welcome to our API, please visit tailgateclub.com' });
});


// Handle sample variable route
api.get('/sample/:someVar', function(req, res) {

    // Make some sample JSON to return to user
    let sampleJSON = {
        'title': 'Welcome to the sample route!',
        'message': `You have selected the route\: ${req.params.someVar}`
    };

    res.json( sampleJSON );
});


api.post('/visited-marker', function(req, res) {
	console.log("POST at /visited-marker");
});


/******************** START SERVER ********************/

// Move all 'router' routes under '/api'
app.use('/api', api);


// Statically serve the dist folder
app.use(express.static(__dirname + '/wlr-site/dist'));


// This route needs to be last
// This will serve the site and pass the path to the Angular app
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/wlr-site/dist/index.html');
});


// Start server
let port = process.env.PORT;
app.listen(port);
console.log('App listening on port: ' + port);
