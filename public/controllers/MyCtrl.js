
function MyCtrl($scope, $compile, $http,$timeout) {
    $scope.noResultsTag = null;

    $scope.tags = [];
    $scope.prolist= [];

    //select2 Options, data is what is ahown in the dropdown
    $scope.select2Options = {
    };

    $http.get('/api/emplist')
        .success(function (data) {
            //console.log("here the console front end", data);
            if(data.status){
                $scope.tags = data.result;
            }else{
                $scope.tags = [];
            }
            $scope.select2Options.data = data.result;
        })
        .error(function (data) {
            console.log(data);
            console.log('Error: ' + data);});
    $http.get('/api/project')
        .success(function (data) {
            //console.log("here the console front end", data);
            if(data.status){
                $scope.prolist = data.result;
            }else{
                $scope.prolist = [];
            }

        })
        .error(function (data) {
            console.log(data);
            console.log('Error: ' + data);});
    // when submitting the add form, send the text to the node API
    $scope.processprojectemp = function () {
        // console.log('processForm processForm processForm');
        //console.log($scope.formvalue);
        //console.log('name = ',$scope.a.name1);
        //return false;
        $http.post('/api/recordlist/', $scope.formvalue)
            .success(function (data) {
                /*
                 $scope.formvalue = {}; // clear the form so our user is ready to enter another
                 */
                $scope.users = data;
                alert("Employee aloted project ");
                //  $location.path('/about');
            })
            .error(function (data) {
                console.log('Error: ',data );
            });
    };
    /*$scope.select2Options = {
     formatNoMatches: function(term) {
     //console.log("Term: " + term);
     var message = '<a ng-click="addTag()">Add tag:"' + term + '"</a>';
     if(!$scope.$$phase) {
     $scope.$apply(function() {
     $scope.noResultsTag = term;
     });
     }

     //$scope.testModel2=[3];
     $scope.formvalue.selectedTags = [3];
     return message;
     }
  /*  $scope.seeRecordDetail = function (pid) {
        console.log("I ma ere toooo");
        return false;
        $http.get('/api/seerecord/' + pid)
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
            });
    };*/
   // console.log($scope.formvalue.selectedTags)

    $scope.addTag = function() {
        $scope.tags.push({
            id: $scope.tags.length,
            name: $scope.noResultsTag
        });
    };

    $scope.$watch('noResultsTag', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
            $timeout(function() {
                var noResultsLink = $('.select2-no-results');
                console.log(noResultsLink.contents());
                $compile(noResultsLink.contents())($scope);
            });
        }
    }, true);
}


routerApp.controller('MyCtrl',["$scope","$compile","$http","$timeout",MyCtrl]);