// Add Libs
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
if(process.env.NODE_ENV != "production") {
	require('dotenv').config();
}


// Configure app to use body parser for POST
 app.use(cors());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());


// Handle base route
router.get('/', function(req, res) {
    res.json( { message: 'Welcome to our API, please visit tailgateclub.com' });
});


// Handle sample variable route
router.get('/sample/:someVar', function(req, res) {

    // Make some sample JSON to return to user
    let sampleJSON = {
        'title': 'Welcome to the sample route!',
        'message': `You have selected the route\: ${req.params.someVar}`
    };

    res.json( sampleJSON );
});


// Move all 'router' routes under '/api'
app.use('/api', router);


// Start server
let port = process.env.PORT;
app.listen(port);
console.log('App listening on port: ' + port);
