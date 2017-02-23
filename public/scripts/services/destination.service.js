backPackedApp.service('destinationService', function($http) {

  this.searchDestinations = function() {
      return $http({
        method: 'GET',
        url: '/destination',
        data: {}
      }).then(function(response) {
          console.log('Got response from DB', response);
          return response;
      }).catch(function(err) {
          console.log('Error getting data from DB', err);
      });
  };

    // lodging and travel services
    //create
    this.destinationAdder = function (destinationName){
      // var destName = destinationName.toString();
      return $http({
          method: 'POST',
          url: '/destination',
          data: {destinationName : destinationName}
      }).then(function(response) {
          console.log('Added: ', response);
          return response;
      }).catch(function(err) {
          console.log('Error adding destination', err);
          return;
      });
    }


    this.lodgingAndTravelUpdater = function(destinationInfo) {
      console.log(destinationInfo);
        return $http({
            method: 'PUT',
            url: '/destination',
            data: destinationInfo
        }).then(function(response) {
            console.log('Added: ', response);
            return response;
        }).catch(function(err) {
            console.log('Error adding destination', err);
            return;
        });
    };

    // //update
    // this.updateLodgingAndTravel = function(destinationInfo) {
    //     return $http({
    //         method: 'PUT',
    //         url: '/destination/' + destination._id,
    //         data: destinationInfo
    //     }).then(function(response) {
    //         console.log('Got response from DB', response);
    //         return response;
    //     }).catch(function(err) {
    //         console.log('Error updating', err);
    //     });
    // };

    this.deleteLodgingAndTravel = function(destinationInfo) {
        return $http({
            method: 'DELETE',
            url: '/destination/' + destination._id,
            data: destinationInfo
        }).then(function(response) {
            console.log('Ready to remove: ', response);
            return response;
        }).catch(function(err) {
            console.log('Error deleting', err);
        });
    };
    // end lodging and travel services


    // To-Do services
    this.addToDo = function(toDo) {
        return $http({
            method: 'POST',
            url: '/destination',
            data: toDo
        }).then(function(response) {
            console.log('Added: ', response);
            return response;
        }).catch(function(err) {
            console.log('Error adding a thing to do', err);
            return;
        });
    };

    this.updateToDo = function(toDo) {
        return $http({
            method: 'PUT',
            url: '/destination/' + destination._id + toDo._id,
            data: toDo
        }).then(function(response) {
            console.log('Got response from DB', response);
            return response;
        }).catch(function(err) {
            console.log('Error updating', err);
        });
    };

    this.deleteToDo = function(toDo) {
        return $http({
            method: 'DELETE',
            url: '/destination/' + destination._id + toDo._id,
            data: toDo
        }).then(function(response) {
            console.log('Ready to remove: ', response);
            return response;
        }).catch(function(err) {
            console.log('Error deleting', err);
        });
    };


});
