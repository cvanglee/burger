var orm = require("../config/orm");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res){
            cb(res)
        });
    },

    // variable col and val are the column and values to put into the column
    insertOne: function(col, val, cb){
        orm.insertOne("burgers", col, val, function(res) {
            cb(res);
        });
    },

    updateOne: function(burgerObj, condition, cb){
        orm.updateOne("burgers", burgerObj, condition, function(res){
            cb(res);
        });
    }
}

module.exports = burger;