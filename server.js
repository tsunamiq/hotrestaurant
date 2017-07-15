var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tables = [{
        name: "Jim Smith",
        phone: "710-538-9643",
        email: "jim@jim.com",
        ui: "2182"
    },
    {
        name: "Joe Black",
        phone: "829-964-7165",
        email: "joeblack@gmail.com",
        ui: "0284"
    },
    {
        name: "Ron Howard",
        phone: "927-083-8296",
        email: "ron@univeral.com",
        ui: "0287"
    }
]

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// view reserve tables
app.get("/api/view", function(req,res) {
    var shortTable = [];
    for(var i=0; i< 4 ; i++){
        shortTable.push(tables[i]);
    }
    console.log("reserve list JSON:" + shortTable)
    res.json(shortTable);
});

//  view waitlist
app.get("/api/waitlist", function(req,res) {
    var shortTable = [];
    for(var i=4 ;i< tables.length ; i++){
        shortTable.push(tables[i]);
    }
    res.json(shortTable);
    console.log("waitlist JSON:" + shortTable)
});


// Create New Reservation - takes in JSON input
app.post("/api/reservation", function(req, res) {
    var newReservation = req.body;

    // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    tables.push(newReservation);

    console.log(tables)


    res.json(tables);
    console.log('------------------------------------');
    console.log(tables);
    console.log('------------------------------------');
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});