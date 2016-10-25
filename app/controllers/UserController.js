var BaseController = require("./BaseController");
//var common = require('./commonController');
//var User = require('../models/user');
var jwt = require('jsonwebtoken');
//var db = require('../../config/db');
var EmployeeModel = new (require("../models/EmployeeModel"));

module.exports = BaseController.extend({
    name: "userCtrl",
    content: null,
    seerecord: function (req, res) {
        EmployeeModel.seerecord(function (err, result) {
            res.json({status: true, message: result});
        });
    },
    UserList: function (req, res) {
        EmployeeModel.Userlist(function (err, result) {
            res.json({status: true, message: result});
        });
//        User.find(function (err, users) {
//            if (err)
//                res.send(err);
//
//            res.json({status: true, message: users});
//        });
    },
    doUserByid: function (req, res, next) {
        console.log("douserbyid started");
        EmployeeModel.Userdetails(req, function (err, result) {
            if (result.length > 0) {
                res.json({status: true, message: result[0]});
            }

        });
    },
    doseerecord: function (req, res, next) {
        console.log("I ma here", req);
        EmployeeModel.doseerecord(req, function (err, result) {
            if (result.length > 0) {
                res.json({status: true, message: result});
            }

        });
    },
    /**
     *
     *
     * */
    dosignup: function (req, res, next) {
        console.log(req.body);
        var self = this;
        EmployeeModel.registerEmp(req.body, function (err, results, fields) {
            if (err) {
                res.status(400);
                res.send(self.createResponse({
                    status: false,
                    message: err.message
                }));
            } else if (results.insertId > 0) {
                res.status(200);
                console.log("statreredd regist4r");
                res.json({status: true, message: 'user created!'});
            }
        });

//        var self = this;
//        var join_date=new Date();
//            global.db.query('INSERT INTO employees (sf_id, address, email,first_name,last_name,mobile,city,state,designation,department,status,join_date) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?)', [req.body.sf_id, req.body.address, req.body.email,req.body.first_name,req.body.last_name,req.body.mobile,req.body.city,req.body.state,req.body.designation,req.body.department,1,join_date], function (err, result) {
//                if (err)
//                    res.send(err);
//
//                res.json({status: true, message: 'user created!'});
//            });


    },
    doprojectemp: function (req, res, next) {
        var self = this;
        EmployeeModel.registerproject(req.body, function (err, results, fields) {
            if (err) {
                res.status(400);
                res.send(self.createResponse({
                    status: false,
                    message: err.message
                }));
            } else if (results.insertId > 0) {
                res.status(200);
                console.log("register project");
                res.json({status: true, message: 'user created!'});
            }
        });




    },
    dorecord: function (req, res, next) {
        console.log(req.body);
        var self = this;
        /*  EmployeeModel.registerEmp(req.body, function (err, results, fields) {
         if (err) {
         res.status(400);
         res.send(self.createResponse({
         status: false,
         message: err.message
         }));
         } else if (results.insertId > 0) {
         res.status(200);
         console.log("statreredd regist4r");
         res.json({status: true, message: 'user created!'});
         }
         });
         //        var self = this;
         //        var join_date=new Date();
         //            global.db.query('INSERT INTO employees (sf_id, address, email,first_name,last_name,mobile,city,state,designation,department,status,join_date) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?)', [req.body.sf_id, req.body.address, req.body.email,req.body.first_name,req.body.last_name,req.body.mobile,req.body.city,req.body.state,req.body.designation,req.body.department,1,join_date], function (err, result) {
         //                if (err)
         //                    res.send(err);
         //
         //                res.json({status: true, message: 'user created!'});
         //            });*/


    },
    UpdateUser: function (req, res) {
        EmployeeModel.Userdetails(req.params, function (err, result) {
            if (result.length > 0) {
                EmployeeModel.updateEmp(req.body, function (err, results, fields) {
                    if (err) {
                        res.status(400);
                        res.send(self.createResponse({
                            status: false,
                            message: err
                        }));
                    } else {
                        console.log("happening what");
                        EmployeeModel.Userdetails(req.params, function (err, resultemp) {
                            if (resultemp.length > 0) {
                                res.json({status: true, message: resultemp[0]});
                            }

                        });
                    }
                });
            }

        });

    },
    getLocation:function(req,res) {
        EmployeeModel.getLocation(function (err, result) {
            console.log(result);
            if (err) {
                res.json({status: false, result: [], message: err});
            } else {
                res.json({status: true, result: result, message: 'Location found'});
            }

        });
    },

    getDesignation:function(req,res) {
        EmployeeModel.getDesignation(function (err, result) {
            console.log(result);
            if (err) {
                res.json({status: false, result: [], message: err});
            } else {
                res.json({status: true, result: result, message: 'Designation found'});
            }

        });
    },
    getperson:function(req,res) {
        EmployeeModel.getperson(function (err, result) {
            console.log(result);
            if (err) {
                res.json({status: false, result: [], message: err});
            } else {
                res.json({status: true, result: result, message: 'project found'});
            }

        });
    },
    getproject:function(req,res) {
        EmployeeModel.getproject(function (err, result) {
            console.log(result);
            if (err) {
                res.json({status: false, result: [], message: err});
            } else {
                res.json({status: true, result: result, message: 'project found'});
            }

        });
    },

    DeleteUser: function (req, res) {

        EmployeeModel.deleteEmp(req.params, function (err, result) {
            if (err) {
                res.status(400);
                res.send(self.createResponse({
                    status: false,
                    message: err.message
                }));
            } else {
                EmployeeModel.Userlist(function (err, resultlist) {
                    res.json({status: true, message: resultlist});
                });
            }

        });
    },


    seerecorddelete: function (req, res) {

        EmployeeModel. seerecorddelete(req.params, function (err, result) {
            if (err) {
                res.status(400);
                res.send(self.createResponse({
                    status: false,
                    message: err.message
                }));
            } else {
                EmployeeModel.seerecord(function (err, resultlist) {
                    res.json({status: true, message: resultlist});
                });
            }
        });
    },
    seerecordupdate: function (req, res) {
        console.log(req.params);
        console.log("aaaaaaaaaaaaagggaaaaaaaaa"+res+req);
        EmployeeModel.seerecord(req.params, function (err, result) {
            console.log("aaaaaaaaaaaaaaaaaaaaaa"+req);
            if (result.length > 0) {
                EmployeeModel.seerecordupdate(req.body, function (err, results, fields) {
                    if (err) {
                        res.status(400);
                        res.send(self.createResponse({
                            status: false,
                            message: err
                        }));
                    } else {
                        console.log("happening what"+req.params);
                        EmployeeModel.seerecord(req.params, function (err, resultemp) {
                            if (resultemp.length > 0) {
                                res.json({status: true, message: resultemp[0]});
                            }

                        });
                    }
                });
            }

        });

    },

})