backPackedApp.controller('tripController', function(destinationService, AuthFactory, $http, $window, $routeParams, $location, $scope) {

    console.log('loaded tripController');
    console.log("name1: ", $routeParams.ID);
    var _this = this;
    var authFactory = AuthFactory;
    var currentDestinationName = $routeParams.ID;
    console.log("name1: ", currentDestinationName);

    _this.destinationsList = [];
    // var Destination = require('../models/destination');

    _this.destination = []; // array for holding object passed back from DB with grabSpecificLodgingAndTravel

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
        });
        _this.getDestinations();
    };

    _this.grabSpecificLodgingAndTravel = function(currentDestinationName){ //for pulling up specific info related to the view the user has been brought to

        destinationService.grabSpecificLodgingAndTravel(currentDestinationName).then(function(response){

          console.log(currentDestinationName);
          _this.destination = response.data;
          console.log(response.data);



          // _this.destination.destinationName = response.data.destinationName,
          // _this.destination.lodgingName = response.data.lodgingName,
          // _this.destination.lodgingAddress = response.data.lodgingAddress,
          // _this.destination.lodgingFrom = response.data.lodgingFrom,
          // _this.destination.lodgingTo = response.data.lodgingTo,
          // _this.destination.lodgingResNum = response.data.lodgingResNum,
          // _this.destination.lodgingNote = response.data.lodgingNote,
          // _this.destination.arrivalHow = response.data.arrivalHow,
          // _this.destination.arrivalWhere = response.data.arrivalWhere,
          // _this.destination.arrivalTime = response.data.arrivalTime,
          // _this.destination.arrivalResNum = response.data.arrivalResNum,
          // _this.destination.departureHow = response.data.departureHow,
          // _this.destination.departureWhere = response.data.departureWhere,
          // _this.destination.departureTime = response.data.departureTime,
          // _this.destination.departureResNum = response.data.departureResNum

        });
        // _this.lodgingAndTravelUpdater();
    };

    _this.grabSpecificLodgingAndTravel(currentDestinationName);

    // _this.destinationDeleter = function (destinationName){
    //   console.log(destinationName);
    //   var destinationEntered = {destination: destinationName};
    //   $http.delete('/destinationAdd', destinationEntered)
    // };


    _this.lodgingAndTravelUpdater = function(destinationInfo) { // updates db with new info from form fields on destinationView
        destinationService.lodgingAndTravelUpdater(destinationInfo).then(function(response) {
            console.log(response);
        });
        _this.getDestinations();
    }

    $scope.setRoute = function(route) { // changes view to destination specific view based on which button is clicked
      console.log('Route Fired: ', route);
      $location.path(route);
      // var currentDestinationName =
      // console.log('current destination name: ', currentDestinationName );
      //   _this.grabSpecificLodgingAndTravel(currentDestinationName);
    }


});
