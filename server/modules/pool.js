var pg = require('pg');//this is a module for connecting to database. this is NOT the database
//after you define and require pg ^^^^ create the config obj v v v v 
var config ={
    //choose database name
    database: 'jokes',
    // host...someday will be different when we dont want it to be local
    host:'localhost',
    //special port for postgress 5432
    port: 5432,
    //set the pool(max) //number of connections allowed at one time
    max: 10,
    idleTimeoutMillis: 3000//will try to connect for 3000 ms (30seconds)
    //next define the pool with the config obj in the the params Pool has a capital P in the assignment
};

module.exports = pg.Pool(config);//here is the defined module