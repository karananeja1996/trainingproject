angular.module('routerApp').controller('NewUserCtrl', function ($location,$scope, $http, $stateParams) {
   // console.log("router newuserctrl");
    $scope.formData = {};


    $http.get('/api/locations')
        .success(function (data) {
            $scope.empdetail = data.message;
        })
        .error(function (data) {
            //console.log('Error: ' + data);
        });


    $http.get('/api/designations')
        .success(function (data) {
            $scope.empdetail = data.message;
        })
        .error(function (data) {
            //console.log('Error: ' + data);
        });




});