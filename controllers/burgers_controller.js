var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger");
// Create all our routes and set up logic within the routes
router.get("/", function(req,res){
 burger.selectAll(function(data){
     var hdlbrObject = {
         burgers: data
     };
     console.log(hdlbrObject);
     res.render("index", hdlbrObject);
 });
});

router.post("/api/burgers", function(req, res){
    burger.insertOne(
        "burger_name", 
        [req.body.burger_name], 
        function(result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertedId });
    });
});

router.put("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured},
        condition, function(result) {
            if (result.changedRows == 0){
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            else {
                res.status(200).end();
            }
        
    });

});

module.exports = router;