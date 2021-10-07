const database = require("./database");
const express = require("express");
router = express.Router();

// For easy typing
var magic = database.connection


router.post("/user/login", (req, res) => {

    console.log('/user/login', req.body);

    magic.query(" SELECT * FROM user where user_id = ? and password = ?", [req.body["user_id"], req.body["password"]], (error, results) => {
        if (error) {
            console.error(error); // log error
            res.status(500).end();
        }

        if (results && results.length > 0) {
            // Login successful (200 -> Success)
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results[0]));
        }
        else {
            // Login failed (401 -> Unauthorized)
            res.status(401).end();
        }
    })

});

// // ADD USER
// // The syntax for the .get() method goes like
// // router.get('/route', (req, res))

// router.post('/user/add', (req, res) => {

//     // Request validation to ensure that a new user inputs a string as fullname.
//     if (typeof(req.query.name) != 'string') {
//         console.log(`Invalid user name received: ${req.query.name}`)
//         res.status(400).send("Invalid user name received.");
//         return;
//     }

//     // The syntax for the .query() method goes like....
//     // magic.query('SQL Syntax', (error, results))

//     magic.query(
//         `insert into user (fullname, balance)
//         values ('${req.query.name}', 0.01)`, 
//         (error, results) => {
//             if (error) {
//                 console.log(error);
//                 res.status(500).send("Internal Server Error");
//             } else {
//                 console.log(results);
//                 res.status(200).send("New User Added Successfully!");
//             }
//         }
//     );
// });

module.exports = {
    router
};
