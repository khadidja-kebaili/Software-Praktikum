const mysql = require("mysql");
var db;

connectDatabase = () => {
    if(!db){
        db = new mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "chatsystem"
        });

        db.connect(err => {
            if(!err){
                console.log("Database is connected");
            }else{
                console.log("Error connecting to database");
                throw err;
            }
        })
    }
}