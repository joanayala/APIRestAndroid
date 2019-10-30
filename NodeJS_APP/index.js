//1. Call mysql package
const mysql = require('mysql');
//2. Call express package
const express = require('express');
//3. Call body-parser package
const bodyparser = require('body-parser');
//4. Create a new express app instance
var app = express();

//5. Enable body-parser (json) request
app.use(bodyparser.json());

//Create mysql data base connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'market'
});

//Validate mysql data base connection
mysqlConnection.connect((err) => {
    if(!err)
        console.log('::: Successfull connection :::');
    else
        console.log('::: Data base Connection failed !!! :::' + JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('::: Server is running at port 3000 :::'));

//READ all users in Data Base
app.get('/users',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users',(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});