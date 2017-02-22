var backPackedApp = angular.module('backPacked', ['ngRoute']);

backPackedApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/navList', {
      templateUrl: '/public/views/templates/navList.html',
      controller: 'navListController',
      controllerAs: 'navList',
      // resolve: {
      // _: function ($location,$http) {
      //       $http.get('/loginStatus').then(function(res){
      //         console.log('res.data, logged in =',res.data);
      //         if(res.data){
      //           console.log('user is logged in');
      //           return;
      //         }else {
      //           console.log('user is not logged in');
      //           //send them to the login view
      //           // return false;
      //           return $location.path('/');
      //         }
      //       })
      //     }
      //   }
    })
    .when('/login', {
      templateUrl: '/public/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .when('/dest', {
      templateUrl: '/public/views/templates/destinationView.html',
      controller: 'tripController',
      controllerAs: 'dest',
    })
    .when('/trip', {
      templateUrl: '/public/views/templates/tripView.html',
      controller: 'tripController',
      controllerAs: 'trip',
    })
    .otherwise({
      redirectTo: '/navList',

    });
    $locationProvider.html5Mode(true);
},
])
