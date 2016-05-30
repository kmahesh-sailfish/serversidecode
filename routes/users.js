/**
 * Created by rubhu on 5/27/2016.
 */
var express = require('express');
var request = require('request');



var routes = function(pool){
    var userRouter = express.Router();

    userRouter.route('/all').get(function(req,res){
        try{
            var query= "select * from usertypes";
            if(query !=0){
                res.send(query[0]);
            }
        }
        catch (err) {

            return res.status(401).send({message: err.message});
        }
    });
    userRouter.route('/admin').get(function(req,res){
        try{
            var query= "select * from usertypes";
            if(query !=0){
                res.send(query[0]);
            }
        }
        catch (err) {

            return res.status(401).send({message: err.message});
        }
    });
    return userRouter;
};
module.exports =routes;
