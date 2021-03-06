var express = require('express');
var router = express.Router();
var pool = require('../modules/pool')




//for localhost:5000/shoes should return an array of shoe objects
router.get('/', function (req, res) { //changed app to router when moved
    //attempt to connect to database                                //when you're done, we'll close this function with done
    pool.connect(function (errorConnectingToDatabase, client, done) { //this is a callback function. try to connect 
        if (errorConnectingToDatabase) {                        //to database and it's going to wait and wait for the database to say 
            //there was an error connecting to the database     //client is what we're actually connecting to the database, postico
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);//sending something went wrong, you don't need to know the details

        } else {
            //we connected to the database!!!
            //now we are going to GET things from the DB .gets should have selects in them
            client.query('SELECT * FROM shoes;', function (errorMakingQuery, result) { // this is the callback function we make after our query runs
                done(); //it just ran, close the connection we don't need it anymore, put it back in the pool
                if (errorMakingQuery) {
                    // Query failed. Did you test it in postico?
                    //log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);

                } else {
                    res.send(result.rows); //this is our array of objects
                }
            }) //test queries in postico first and then copy and paste, semicolon included

        }


    })


    // res.send(shoes);
})

router.post('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) { //this is a callback function. try to connect 
        if (errorConnectingToDatabase) {                        //to database and it's going to wait and wait for the database to say 
            //there was an error connecting to the database     //client is what we're actually connecting to the database, postico
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);//sending something went wrong, you don't need to know the details

        } else {
            //we connected to the database!!!
            //now we are going to GET things from the DB .gets should have selects in them
            client.query(`INSERT INTO shoes (name, cost)
                VALUES($1, $2);`, [req.body.name, req.body.cost], function (errorMakingQuery, result) { // this is the callback function we make after our query runs
                    done(); //it just ran, close the connection we don't need it anymore, put it back in the pool
                    if (errorMakingQuery) {
                        // Query failed. Did you test it in postico?
                        //log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);

                    } else {
                        res.sendStatus(201); //this is our array of objects
                    }
                }) //test queries in postico first and then copy and paste, semicolon included

        }


    })


    // res.send(shoes);
})





module.exports = router;