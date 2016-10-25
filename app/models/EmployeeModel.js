var Model = require("./BaseModel"),
    model = new Model();

var EmployeeModel = model
    .extend({

//for; accesing location
        getLocation:function(callback){
            var sql = "SELECT * FROM ??";
            var fieldAndValue = ['locn'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;
            global.db.query(sql, function (err, results, fields) {
                //console.log("getLocations data", results);
                callback(err, results);
            });
        },
        getDesignation:function(callback){
            var sql = "SELECT * FROM ??";
            var fieldAndValue = ['designations'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;
            global.db.query(sql, function (err, results, fields) {
                callback(err, results);
            });
        },
        getperson:function(callback){
            //console.log("getproject STARTED")
            var sql = "SELECT * FROM ??";
            var fieldAndValue = ['employee'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;
            global.db.query(sql, function (err, results, fields) {
               // console.log("getprojects data", results);
                callback(err, results);
            });
        },
        getproject:function(callback){
           // console.log("getproject STARTED")
            var sql = "SELECT * FROM ?? WHERE status=1";
            var fieldAndValue = ['project'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;
            global.db.query(sql, function (err, results, fields) {
             //   console.log("getprojects data", results);
                callback(err, results);
            });
        },

       doseerecord: function (data, callback) {
            //console.log("reach query-", data.p_id);
            var sql = "SELECT project.name,employee.emp_name ,record.p_id,record.emp_id FROM record INNER JOIN employee ON ( employee.id = record.emp_id ) INNER JOIN project ON ( record.p_id = project.id )  WHERE ?? =?";
            var fieldAndValue = [ 'p_id', data.p_id];
           // console.log("here in employee do see record "+data.p_id);

            sql = global.db.format(sql, fieldAndValue);
            //console.log(sql);
            var self = this;
            global.db.query(sql, function (err, results, fields) {
              //  console.log('result', results);
              //  console.log('err', err);
                callback(err, results, fields);
            });
        },
        seerecord: function (callback) {

            var sql = "SELECT project.name, GROUP_CONCAT( employee.emp_name ) AS emp, record.p_id ,record.emp_id FROM record INNER JOIN employee ON " +
                "( employee.id = record.emp_id ) INNER JOIN project ON ( record.p_id = project.id ) WHERE project.status =1 and record.status=1 GROUP BY name";
            var fieldAndValue = ['record','employee','project'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;

            global.db.query(sql, function (err, results, fields) {
               console.log('put here on employeemodel  ');
                callback(err, results, fields);
            });
        },
        Userlist: function (callback) {

            var sql = "SELECT employee.emp_name, employee.id, designations.design, employee.type_id, locn.locn FROM ?? INNER JOIN ?? ON ( employee.locn_id = locn.locn_id )INNER JOIN ?? ON ( employee.design_id = designations.id ) ";
            var fieldAndValue = ['employee','locn','designations'];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;

            global.db.query(sql, function (err, results, fields) {
         //       console.log('result of user data is herrreeee  ', results);
                callback(err, results, fields);
            });
        },
        Userdetails: function (data, callback) {
         //   console.log("---", data);
            var sql = "SELECT * FROM ??  WHERE ?? =?";
            var fieldAndValue = ['employee', 'id', data.user_id];

            sql = global.db.format(sql, fieldAndValue);

            var self = this;
            global.db.query(sql, function (err, results, fields) {
                callback(err, results, fields);
            });
        },

        registerRecord:function (req, callback) {
            var join_date = new Date();
            var post = {};
            post.p_id = req.emp_name;

            post.design_id = req.design;

            post.type_id = req.type_id ;
            ;
            post.locn_id =req.locn
            //post.locn="delhi";
            //  console.log(post.type_id);
            var sql = "INSERT INTO employee SET ?";
            global.db.query(sql, post, function (err, results, fields) {
                callback(err, results, fields);
            });
        },
        registerproject:function (data, callback) {
            var sql = "INSERT INTO record (p_id, emp_id) values";
            if(data){
                for(i=0 ; i < data.selectedTags.length ; i++) {
                   // console.log('selected tags are ', data.selectedTags[i]);
                    sql += "(" +data.design+","+data.selectedTags[i]+"),";
                }
                sql = sql.slice(0, -1);
                global.db.query(sql, function (err, results, fields) {
                   // console.log('affected rows ', results);
                    callback(err, results, fields);
                });
            }
        },
        registerEmp: function (req, callback) {
            var join_date = new Date();
            var post = {};
            post.emp_name = req.emp_name;

            post.design_id = req.design;

            post.type_id = req.type_id ;
            ;
            post.locn_id =req.locn
            //post.locn="delhi";
            //  console.log(post.type_id);
            var sql = "INSERT INTO employee SET ?";
            global.db.query(sql, post, function (err, results, fields) {
                callback(err, results, fields);
            });
        },
        desgnList: function(req, callback){
        },
        updateEmp: function (req, callback) {
            var post = {emp_name: req.emp_name, design_id: req.design_id, type_id: req.type_id,locn_id: req.locn_id};
            var condition = {id: req.id};
          //  console.log(post);
            global.db.query('UPDATE employee SET ? WHERE ?', [post, condition], function (err, result, fields) {
              //  console.log('==========hellllooo===========');
               // console.log(err);
                callback(err, result, fields);
            });
        },
        deleteEmp: function (req, callback) {
            global.db.query('DELETE FROM employee WHERE id = ?', [req.user_id], function (err, result,fields) {
                    callback(err, result, fields);
                }
            );

        },
        seerecorddelete: function (data, callback) {
         //   console.log('datasssssssssss', 'UPDATE project SET status=0 WHERE id ='+data.p_id);
            global.db.query('UPDATE project SET status=0 WHERE id ='+data.p_id, function (err, result,fields) {
                    callback(err, result, fields);
                }
            );

        },
        seerecordupdate: function (req, callback) {
            var post = {emp_id: req.emp_id,  p_id: req.p_id};
            var condition = {p_id: req.p_id,emp_id:req.p_id};
           console.log("aaaaaaaaaaallllllllreq print"+req);
            global.db.query('UPDATE record SET status=0 WHERE p_id ='+data.p_id, function (err, result, fields) {
            //    console.log('==========hellllooo===========');
            //    console.log(err);
                callback(err, result, fields);
            });
        },
        ////


    });


module.exports = EmployeeModel;
