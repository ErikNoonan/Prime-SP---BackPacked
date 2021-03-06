backPackedApp.controller('tripController', function(destinationService, AuthFactory, $http, $window, $routeParams, $location, $scope) {

    console.log('loaded tripController');
    console.log("name1: ", $routeParams.ID);
    var _this = this;
    var authFactory = AuthFactory;
    var currentDestinationName = $routeParams.ID;
    console.log("name1: ", currentDestinationName);

    _this.destinationsList = [];
    // var Destination = require('../models/destination');

    _this.destination = []; // array for holding object passed back from DB with grabSpecificDestinationInfo

    _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load


    _this.logout = function() {
        authFactory.logout()
            .then(function(response) { // success
                    authFactory.setLoggedIn(false);
                    _this.username = '';
                    $window.location.href = '/'; // forces a page reload which will update our NavController
                },

                function(response) { // error
                    _this.message.text = 'Unable to logout';
                    _this.message.type = 'error';
                });
    };

    _this.getDestinations = function() {//get request for list of destinations in tripView
        destinationService.searchDestinations().then(function(response) {
            _this.destinationsList = response.data;
        });
    };

    _this.getDestinations();

    // $scope.setRoute();


    _this.destinationAdder = function(destinationName) { //adds new destination to DB
        destinationService.destinationAdder(destinationName).then(function(response) {
            console.log(destinationName);
            _this.getDestinations();
        });
    };

    _this.grabSpecificDestinationInfo = function(currentDestinationName){ //for pulling up specific info related to the view the user has been brought to

        destinationService.grabSpecificDestinationInfo(currentDestinationName).then(function(response){

          console.log(currentDestinationName);
          _this.destination = response.data;
          console.log(response.data);
        });

    };

    _this.grabSpecificDestinationInfo(currentDestinationName);

    // _this.destinationDeleter = function (destinationName){
    //   console.log(destinationName);
    //   var destinationEntered = {destination: destinationName};
    //   $http.delete('/destinationAdd', destinationEntered)
    // };


    _this.destinationInfoUpdater = function(destinationInfo) { // updates db with new info from form fields on destinationView
        destinationService.destinationInfoUpdater(destinationInfo).then(function(response) {
            console.log(response);
        });
    }

    $scope.setRoute = function(route) { // changes view to destination specific view based on which button is clicked
      console.log('Route Fired: ', route);
      $location.path(route);
      // var currentDestinationName =
      // console.log('current destination name: ', currentDestinationName );
      //   _this.grabSpecificDestinationInfo(currentDestinationName);
    }


    _this.addNewToDo = function(){
      _this.destination[0].toDos.push(_this.newToDo);
      _this.destinationInfoUpdater(_this.destination[0]);
      _this.newToDo={};
    }

});
