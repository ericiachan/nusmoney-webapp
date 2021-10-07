const mysql = require("mysql");
require("dotenv").config();

const properties = {
    host: `${process.env.DBHOST}`,
    port: process.env.DBPORT,
    user: `${process.env.DBUSER}`,
    password: `${process.env.DBPASS}`,
    database: `${process.env.DBNAME}`,
};

var connection = mysql.createConnection(properties)


// Now we have to actually CONNECT to the damn databse with the .connect() method on the connection we defined
// This sucker takes a callback function that has the err argument (it's just the way it is)
// We can pass this err to whatever by describing the function
connection.connect((error) => {
    if (error) {
        console.log(`Couldn't connect to the MySQL Server. Error: ${error}`)
    }
    else {
        console.log("Connected to MySQL successfully!")
    }
});

// Now we export the connection object so it can be used elsewhere
module.exports = {
    connection 
};
