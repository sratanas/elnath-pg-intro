var express = require('express');
var pg = require('pg');
var bodyParser = require ('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var config = { //this object tells pg what to do
    database: 'shoe_store', //the name of our database
    host: 'localhost', //where is your database (which computer)
    port: 5432, //the port number for your database, 5432 is default
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000 // 30 seconds to try to connect to our database
};

var pool = new pg.Pool(config);

// var shoes = [{name: 'nike', cost: '75'}]

//for localhost:5000/shoes should return an array of shoe objects
app.get('/shoes', function(req, res){                               
//attempt to connect to database                                //when you're done, we'll close this function with done
pool.connect(function(errorConnectingToDatabase, client, done){ //this is a callback function. try to connect 
        if (errorConnectingToDatabase) {                        //to database and it's going to wait and wait for the database to say 
            //there was an error connecting to the database     //client is what we're actually connecting to the database, postico
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);//sending something went wrong, you don't need to know the details
        
        } else{
            //we connected to the database!!!
            //now we are going to GET things from the DB .gets should have selects in them
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){ // this is the callback function we make after our query runs
                done(); //it just ran, close the connection we don't need it anymore, put it back in the pool
                if(errorMakingQuery){
                    // Query failed. Did you test it in postico?
                    //log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                    
                } else{
                    res.send(result.rows); //this is our array of objects
                }
            }) //test queries in postico first and then copy and paste, semicolon included

        }                

    
    })


    // res.send(shoes);
})


app.listen(port, function(){
    console.log('listening on port', port);
})