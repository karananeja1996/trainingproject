
// app/routes.js
var path = require('path');
// grab the nerd model we just created
var User = require('./controllers/UserController');
var express = require('express');
var router = express.Router();
module.exports = function (app) {
    router.get('/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });
    router.route('/users')
        .post(function (req, res, next) {
            console.log('Hello theree are you getting caled?');
            User.dosignup(req, res, next);

        })
        .get(function (req, res) {
            User.UserList(req, res);
        })


    router.route('/seerecord')
        /*  .post(function (req, res, next) {
         console.log('Hello theree are you getting caled?');
         User.dosignup(req, res, next);
         */
        .get(function (req, res) {
            User.seerecord(req, res);
        })
    ;
    router.route('/users/:user_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/users/:user_id)
        .get(function (req, res) { console.log("reach routes"+req.params);
            User.doUserByid(req.params, res);
        })
        // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
        .put(function (req, res) {
            // use our bear model to find the bear we want
            User.UpdateUser(req, res);
        })
        .delete(function (req, res) {
            User.DeleteUser(req, res);
        });
    router.route('/seerecord/:p_id')
        /*  .post(function (req, res, next) {
         console.log('Hello theree are you getting caled?');
         User.dosignup(req, res, next);
         */
        .get(function (req, res) {
            console.log("getttttttttttttttttttt"+req.params);
            User.doseerecord(req.params, res);

        })
        .put(function (req, res) {
            // use our bear model to find the bear we want
            console.log("on the routehhhhhhhhhhhhhhhs putt"+req);
            User.seerecordupdate(req, res);
        })
        .post(function (req, res) {
            console.log("postttttttttttttttt"+req);
            User.seerecorddelete(req, res);
        });
    /* .get(function (req, res) {
     User.Location(req, res);
     });*/
    // Apis to process locations
    router.route('/recordlist') //recordlist of project n employee
        .post(function (req, res, next) {
            User.doprojectemp(req, res, next);

        })

    router.route('/locations')
        .get(function (req, res) {
            User.getLocation(req, res);

        })

    router.route('/designations')
        .get(function (req, res) {
            User.getDesignation(req, res);
        })
    router.route('/emplist')               ///api to get emp on recordpage
        .get(function (req, res) {
            console.log("router project started");
            User.getperson(req, res);
        })
    router.route('/project')
        .get(function (req, res) {
            console.log("router project started");
            User.getproject(req, res);
        })
// on routes that end in /users/:user_id
// ----------------------------------------------------

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    app.use('/api', router);


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile( "./public/index.html");
    });

};