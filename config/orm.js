var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Object for all our SQL statement functions.
var orm = {
// this gets the whole table
    selectAll: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
// this inserts into the table
    insertOne: function(table, col, values, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (?) ";

        console.log(queryString);

        connection.query(queryString,values,function(err,result){
            if (err) throw err;

            cb(result);
        });
    },
// this updates one burger
    updateOne: function(table, burgerObj, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(burgerObj);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;

            cb(result);
        })
    }

}

module.exports = orm;