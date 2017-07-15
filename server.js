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
        routeName: "jimsmith",
        name: "Jim Smith",
        phone: "710-538-9643",
        email: "jim@jim.com",
        ui: "2182"
    },
    {
        routeName: "joeblack",
        name: "Joe Black",
        phone: "829-964-7165",
        email: "joeblack@gmail.com",
        ui: "0284"
    },
    {
        routeName: "jimsmith",
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

// Get all Tables
app.get("/api/view", function(tables) {
    res.json(tables);
});


// Create New Reservation - takes in JSON input
app.post("/api/reservation", function(req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    tables.push(newReservation);

    res.json(tables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});