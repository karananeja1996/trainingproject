var routerApp = angular.module('routerApp', ['ui.router', 'ui.select2']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'views/partial-home-list.html',
            controller: function ($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': {templateUrl: 'views/partial-about.html'},
                'columnTwo@about': {
                    templateUrl: 'views/table-data.html',
                    controller: 'UserCtrl'
                }
            }

        })
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'views/form.html',
            controller: 'NewUserCtrl',
            //resolve:{
            //    promiseObj:  function($http) {
            //        $http.get('/api/users')
            //            .success(function (data) {
            //                $scope.users = data.message;
            //            })
            //            .error(function (data) {
            //                console.log('Error: ' + data);
            //            });
            //        return promiseObj;
            //    }
            //
            //}
        })
        .state('record', {
            url: '/record',
            controller: 'MyCtrl',
            templateUrl: 'views/record.html',

        })
        .state('seerecord', {
            url: '/seerecord',
            controller: 'UserCtrl',
            templateUrl: 'views/seerecord.html',

        })
        .state('edit', {
            url: '/edit/:empId',
            templateUrl: 'views/update.html',
            controller: 'UserCtrl'
        })
        .state('editrecord', {
            url: '/editrecord/:p_id',
            templateUrl: 'views/seerecordupdate.html',
            controller: 'UserCtrl'
        });
});
