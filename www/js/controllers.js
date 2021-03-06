angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('AddBRCtrl', function ($scope, $http) {
    $scope.data = {};

    $scope.findByName = function () {
        $http.get("http://www.dvdfr.com/api/search.php?title=" + $scope.data.search + "&produit=" + $scope.data.type)
             .then(function (result) {
                 $x2js = new X2JS();
                 $jsonObj = $x2js.xml_str2json(result.data);
                 console.log(result.data);
                 $scope.dvds = $jsonObj.dvds.dvd;
             });
    };
})

.controller('MovieCtrl', function ($scope, $http, $stateParams, $rootScope, $window) {
    $http.get("http://www.dvdfr.com/api/dvd.php?id=" + $stateParams.movieID)
    //$http.get("http://172.22.0.10/xml.xml")
         .then(function (result) {
             $x2js = new X2JS();
             $jsonObj = $x2js.xml_str2json(result.data);
             console.log($jsonObj);
             $scope.data = $jsonObj.dvd;
             $scope.data.acteurs = "";
             for (i = 0; i < $jsonObj.dvd.stars.star.length; i++) {
                 switch ($jsonObj.dvd.stars.star[i]._type) {
                     case 'Réalisateur':
                         $scope.data.realisateur = $jsonObj.dvd.stars.star[i].__text;
                     case 'Acteur':
                         $scope.data.acteurs += $jsonObj.dvd.stars.star[i].__text + '<br/>';
                 }
                 console.log(i + " - " + $jsonObj.dvd.stars.star[i]._type);
             }
             $http.get("http://www.omdbapi.com/?t=" + $jsonObj.dvd.titres.fr + "&y=&plot=short&r=json")
                .then(function (result) {
                    $scope.imdb = result.data;
                });
         });

})

.controller('HomeCtrl', function ($scope, $location) {
    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'up';
});
