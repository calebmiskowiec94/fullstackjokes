var express = require ('express');
var router = express.Router();//standard line of code for ALL route files
//var app = require('app.js');
var pool = require('../modules/pool.js')//pg.Pool(config);//this part gets moved to message.js////here is the defined pool
//here is where pool is getting the info(module) from pool.js
//all this gets put in its own file

//var pg = require('pg');//this is a module for connecting to database. this is NOT the database
//after you define and require pg ^^^^ create the config obj v v v v 

//EVERY PATHH HAS RESPONSE


//var config ={
    //choose database name
    //database: 'betelgeuse',
    // host...someday will be different when we dont want it to be local
    //host:'localhost',
    //special port for postgress 5432
    //port: 5432,
    //set the pool(max) //number of connections allowed at one time
    //max: 10,
    //idleTimeoutMillis: 3000//will try to connect for 3000 ms (30seconds)
    //next define the pool with the config obj in the the params Pool has a capital P in the assignment
//};
//var pool = //pg.Pool(config);//this part gets moved to message.js////here is the defined pool




router.post('/', function(req, res){//notice how router.post connects
    //to var router = express.router
	console.log('message post was hit!');

 
    //add insert query//moved down

    pool.connect(function(errorConnectionToDatabase, client, done){
        //what is in the params should be null, because then it will skip to else which will
        //run the database
        if(errorConnectionToDatabase){
            //when connection to database fails
            //log error/
            console.log("you failed at connecting to databaze",errorConnectionToDatabase)
            res.sendStatus(500);//dont forgot to res.sendStatus the 500 error!
//           V V V V V V V V    addd insert query    V V V V V V V V V
        }else{
            //when connection to database is successful
            //needs to have function in the params as well as the query needss a third param, the 2nd param ($1,$2) 
            //saves the info from the third param[req.body.name,req.body.message]
            //so the second param is like the new variables
            client.query('INSERT INTO jokes (author, joke, punchline)VALUES($1,$2,$3);',[req.body.author,req.body.joke,req.body.punchline],function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('error making database query');
                    res.sendStatus(500);
                }else{
                    res.send(result.rows);
                }
            })//the varieable client comes from??(something to do with pg?)
        }
    })

});


//});

router.get('/', function(req, res) {
    //add select query//that takes in a function(callback function)
    pool.connect(function(errorConnectionToDatabase, client, done){
        //what is in the params should be null, because then it will skip to else which will
        //run the database
        if(errorConnectionToDatabase){
            //when connection to database fails
            //log error/
            console.log("you failed at connecting to databaze",errorConnectionToDatabase)
            res.sendStatus(500);//dont forgot to res.sendStatus the 500 error!

        }else{
            //when connection to database is successful
            //needs to have function in the params as well as the query
            client.query('SELECT * FROM jokes;',function(errorMakingQuery, result){
                if(errorMakingQuery){
                    console.log('error making database query');
                    res.sendStatus(500);
                }else{
                    res.send(result.rows);
                }
            })//the varieable client comes from??(something to do with pg?)
        }
    })

});
module.exports = router;//matches var router = express.router to get
//router off the page



///do all routes need to have a catch all wack?
//or do routes ever have a specific path?

///getting to the databass
//1 establish the connection between server and database
//were gonn crate a pool that establishes how many connecions can go to the databass so it doesnt overwelm