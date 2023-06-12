//set up the server
const express = require( "express" );
const logger = require("morgan");
const db = require("./db/db_connection");
const app = express();
const port = 3000;
const DEBUG = true;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/views/index.html" );
// });
app.get( "/", ( req, res ) => {
    res.render('index');
});

const read_visualizer_all_sql = `
    SELECT amount,menu_name, price, menu_id
    FROM menu m
`

// define a route for the visualizer list page
app.get( "/visualizer", ( req, res ) => {
    // res.sendFile( __dirname + "/views/visualizer.html" );
    db.execute(read_visualizer_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = { menuorder : results };
            res.render('visualizer', data);
        }
    });
});


const read_details_all_sql = `
    SELECT 
        m.menu_name, m.menu_desc, m.price, m.order_type, m.amount, GROUP_CONCAT(a.addons_type SEPARATOR ', ') AS addons
    FROM menu m
    LEFT JOIN addons a 
        ON m.menu_id = a.menu_id
    WHERE m.menu_id = ?
    GROUP BY m.menu_id 
    ORDER BY m.menu_id
`
// define a route for the visualizer detail page
app.get( "/visualizer/:id", ( req, res, next ) => {
    // res.sendFile( __dirname + "/views/detail.html" );
    db.execute(read_details_all_sql, [req.params.id], (error, results) => {
         if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            const addons = results[0].addons ? results[0].addons.split(', ') : [];            
            let data = {menu: results[0], addons: addons}; // results is still an array, get first (only) element, array of addons is also passed in
            res.render('detail', data); 
        }
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
});