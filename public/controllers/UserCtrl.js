angular.module('routerApp').controller('UserCtrl', function ($location,$scope, $http, $stateParams) {
    $scope.formvalue = {};
    var pid = $stateParams.p_id;
    var empid = $stateParams.empId;
    $scope.init =function(){
        console.log('initializing scope');
        $scope.name='';
        $scope.formvalue = {};
        $scope.a = {};

        $scope.seeRecord();
        $scope.seeRecordDetail(pid);
    }

    $scope.SelectedEmployee = [];
    $scope.ListEmployee = [];



    $scope.SelectedCountries = [];
    $scope.ListEmployee = [];

    $scope.projectdetail = [];

    /*$http.get('/api/project')
     .success(function (data) {
     // console.log(data)
     if(data.status){
     $scope.project = data.result;
     }else{
     $scope.project = [];
     }

     })
     .error(function (data) {
     console.log(data);
     console.log('Error: ' + data);
     });*/
    if (empid != undefined) {
        $http.get('/api/users/' + empid)
            .success(function (data) {
                $scope.empdetail = data.message;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    } else {
   /*     $http.get('/api/seerecord/' + pid)
            .success(function (data) {
                console.log("asdasdasd",data);
                $scope.projectdetail = data.message;
                //  console.log('projectdetail ' + $scope.projectdetail);
                var ProductArray = [];
                for (var i = 0 ;i<=$scope.projectdetail.length;++i) {
                    ProductArray.push($scope.projectdetail[i].emp_id);
                }
                console.log( $scope.projectdetail.length);
                console.log(  ProductArray);
                //preselect value
                $scope.formvalue.selectedTags = ProductArray;
            })
            .error(function (data) {
                //  console.log('Error: ' + data);
            });*/

        $http.get('/api/users')
            .success(function (data) {
                $scope.users = data.message;
            })
            .error(function (data) {

                console.log('Error: ' + data);
            });
        $http.get('/api/designations')
            .success(function (data) {
                // console.log(data)
                if(data.status){
                    $scope.designations = data.result;
                }else{
                    $scope.designations = [];
                }

            })
            .error(function (data) {
                console.log(data);
                console.log('Error: ' + data);
            });
        $http.get('/api/locations')
            .success(function (data) {
                // console.log(data)
                if(data.status){
                    $scope.locations = data.result;
                }else{
                    $scope.locations = [];
                }

            })
            .error(function (data) {
                console.log(data);
                console.log('Error: ' + data);
            });
        /*   $http.get('/api/project')
         .success(function (data) {
         // console.log(data)
         if(data.status){
         $scope.project = data.result;
         }else{
         $scope.project = [];
         }

         })
         .error(function (data) {
         console.log(data);
         console.log('Error: ' + data);
         });*/
    }

    $scope.seeRecord = function () {
        $http.get('/api/seerecord')
            .success(function (data) {
                $scope.record = data.message;

            })
            .error(function (data) {

                console.log('Error: ' + data);
            });
    }

    $scope.seeRecordDetail = function (pid) {
        $http.get('/api/seerecord/' + pid)
            .success(function (data) {
                console.log("asdasdasd",data.message[1]);
                $scope.projectdetail = data.message;
                //  console.log('projectdetail ' + $scope.projectdetail);
                console.log("arratyhjgh 777777777777777777777777777777"+ $scope.projectdetail.length);
                var ProductArray = [];
                for (var i = 0 ;i<$scope.projectdetail.length;++i) {
                    ProductArray.push($scope.projectdetail[i].emp_id);
                }
             //   console.log("arratyhjgh"+ $scope.projectdetail.length);
                console.log(  ProductArray);
                //preselect value
                $scope.formvalue.selectedTags = ProductArray;
            })
            .error(function (data) {
                //  console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.processForm = function () {
        // console.log('processForm processForm processForm');
        console.log($scope.formvalue);
        //console.log('name = ',$scope.a.name1);
        //return false;
        $http.post('/api/users/', $scope.formvalue)
            .success(function (data) {
                $scope.formvalue = {}; // clear the form so our user is ready to enter another
                $scope.users = data;
                alert("Employee created successfully ");
                $location.path('/about');
            })
            .error(function (data) {
                console.log('Error: ',data );
            });
    };
    $scope.updateForm = function () {
        $http.put('/api/users/'+$scope.empdetail.id, $scope.empdetail)
            .success(function (data) {
             console.log(data);
                $scope.empdetail = {}; // clear the form so our user is ready to enter another
                $scope.empdetail = data.message;
                alert("Employee updated successfully");
                $location.path('/about');
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.updateRecord = function () {
        console.log("project id  ", $scope.projectdetail[0].p_id);
        console.log("selected employee ", $scope.formvalue.selectedTags);
        $http.put('/api/seerecord/'+  $scope.projectdetail[0].p_id ,$scope.formvalue.selectedTags)
            .success(function (data) {
              console.log("check 11111111111111111");
                $scope.empdetail = {}; // clear the form so our user is ready to enter another
                $scope.empdetail = data.message;
               // alert("project  updated successfully");
              //  $location.path('/about');
                console.log("Karan at user");
            })

            .error(function (data) {
                console.log("check 22222222222222222"+ $scope.formvalue.selectedTags);
            });
    };


    // delete a todo after checking it
    $scope.deleteUser = function (id) {
        $http.delete('/api/users/' + id)
            .success(function (data) {
                $scope.users = data.message;
                alert("Employee deleted successfully");
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.seerecorddelete= function (id) {
        $http.post('/api/seerecord/'+id)
            .success(function (data) {
                $scope.formvalue = {}; // clear the form so our user is ready to enter another
                $scope.users = data;
                alert("Employee deleted successfully ");
                // $location.path('/about');
            })
            .error(function (data) {
                console.log('Error: ',data );
            });
    };


//project record of employees.......
    $scope.insertRecord = function () {
        // console.log('processForm processForm processForm');
        console.log($scope.formvalue);
        //console.log('name = ',$scope.a.name1);
        //return false;
        $http.post('/api/users/', $scope.formvalue)
            .success(function (data) {
                $scope.formvalue = {}; // clear the form so our user is ready to enter another
                $scope.users = data;
                alert("Employee created successfully ");
                // $location.path('/about');
            })
            .error(function (data) {
                console.log('Error: ',data );
            });
    };

    $scope.init();
});