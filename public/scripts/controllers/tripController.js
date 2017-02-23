backPackedApp.controller('tripController', function (destinationService, AuthFactory, $http, $window) {
  console.log('loaded tripController');
  var _this = this;
  var authFactory = AuthFactory;

  _this.destinationsList = [];
  // var Destination = require('../models/destination');
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load


  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which will update our NavController
      },

      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      });
  };

  _this.getDestinations = function(){
    destinationService.searchDestinations().then(function(response){
    _this.destinationsList = response.data;

    });
  };

  _this.getDestinations();

  _this.destinationAdder = function (destinationName){ //adds new destination to DB
    destinationService.destinationAdder(destinationName).then(function(response){
    console.log(destinationName);

  });
  };


  // _this.destinationDeleter = function (destinationName){
  //   console.log(destinationName);
  //   var destinationEntered = {destination: destinationName};
  //   $http.delete('/destinationAdd', destinationEntered)
  // };


  _this.lodgingAndTravelAdder = function (destinationInfo){
    destinationService.lodgingAndTravelAdder(destinationInfo).then(function(response){
      console.log(response); //how do I attach this to the DB object with the correct destinationName?
    });
  }
});
