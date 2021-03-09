const mysql = require('mysql');

// conect db //
const mysqlConnection = mysql.createConnection({
    host: 'localhost', // default
    user: 'root', // default
    password: '', // default
    database: 'biblioteca'
});

mysqlConnection.connect(function(err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;