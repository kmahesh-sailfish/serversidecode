/**
 * Created by rubhu on 5/27/2016.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var jwt = require('express-jwt');
var cors = require('cors');
var http = require('http');
var mysql = require('mysql');


// poll connection
var pool=mysql.createPool({
    host:'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'aijbfeiq5kmvkzlw',
    password:'bp7cx96zdg8lvzhz',
    database:'cvs13rho3vyr63do',
    ConnectionLimit:20
});

var app = express();

//setting the view enginee
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
dotenv.load();
app.use(function (req, res, next) {

    // Website you wish to allow to connect

    res.setHeader('Access-Control-Allow-Origin','*');


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    res.setHeader('Access-Control-Expose-Headers', 'Authorization, header-a');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// middle layer load
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// server side  authentication
var authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

userRouter = require('./routes/users')(pool);

app.get('/',function(req,res){
    res.send('welcome to Api exprees..');

});
app.get('/admin',function(req,res){
    pool.query("select* from usertypes",function(err,rows,fields){
        if(!err){
            res.send(rows[0]);
        }
        else
        {
            console.log('Error while performing Query');
        }
    });

});
app.use('/api',authenticate);
app.use('/api/admin',userRouter);
app.use('/api/all',userRouter);
app.use(redirectUnmatched);

function redirectUnmatched(req,res){
    console.log("No route matched - redirctUnmatched");
    res.status(404).send('404 Error :No Rows Found');

}
var port = process.env.PORT || 3300;
http.createServer(app).listen(port, function (err) {
    console.log('listening in http://localhost:' + port);
});


module.exports = app;