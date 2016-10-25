angular.module('routerApp', []).factory('User', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            
            return $http.get('/users');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(userData) {
            return $http.post('/users', userData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/users/' + id);
        }
    }       

}]);

