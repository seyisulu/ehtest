(function () {
  'use strict';

  angular.module('eHospital', ['ngMaterial', 'ngProgress', 'ngRoute'])
      .config(['$routeProvider','$httpProvider', function ($routeProvider,$httpProvider) {
    $routeProvider.when('/', 
                        {'templateUrl': '/views/partials/home.ejs', controller: 'IndexCtrl', controllerAs: 'index'});
    $routeProvider.when('/dash', 
                        {'templateUrl': '/views/partials/prescriptions.ejs', controller: 'PCtrl', controllerAs: 'prescriptions'});
    $routeProvider.otherwise({redirectTo: '/'});
  }])
    .config( function( $mdIconProvider ){
      $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
    });

  angular.module('eHospital').constant('APIBase', 'http://localhost:3030/');

  //Filters
  angular.module('eHospital').filter('getByProperty', function() {
    return function(propertyName, propertyValue, collection) {
      var i=0, len=collection.length;
      for (; i<len; i++) {
        if (collection[i][propertyName] == +propertyValue) {
          return collection[i];
        }
      }
      return null;
    };
  });

  //Directives
  angular.module('eHospital').directive('curYear', [ function() {
    return function(scope, elm, attrs) {
      elm.text((new Date).getFullYear().toString());
    };
  }]);
})();