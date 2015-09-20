(function () {
  'use strict';
  
  function HomeCtrl ($rootScope, $scope, UserSvc) {
    $rootScope.activePage = 'home';
    $rootScope.homeLoaded = 0;
    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';
  }
  angular.module('eHospital').controller('HomeCtrl', HomeCtrl);
  
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  
  function PrescribeController($scope, $mdDialog) {
    $scope.p = {number:'',drugs:[{name:'',dosage:'',times:''}]};
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    $scope.addDrug = function() {
      $scope.p.drugs.push({name:'',dosage:'',times:''});
    };
    $scope.remDrug = function() {
      if($scope.p.drugs.length>1) {
         $scope.p.drugs.pop();
      }
    };
  }
    
  function IndexCtrl ($rootScope, $scope, $mdDialog, UserSvc) {
    $rootScope.activePage = 'home';
    $rootScope.homeLoaded = 0;
    $scope.imagePath = 'img/ehospital-banner.png';
    
    $scope.showRegister = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/partials/loginregister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {//Success
        $scope.status = 'Registering...';
        console.log($scope.status);
      }, function() {
        $scope.status = 'Cancelled.';
        console.log($scope.status);
      });
    };
    $scope.showLogin = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/partials/loginregister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'Logging in...';
        console.log($scope.status);     
      }, function() {
        $scope.status = 'Cancelled.';
        console.log($scope.status);
      });
    };
    

    $scope.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Hospital ",
            background: ""
          });
    function buildGridModel(tileTmpl){
      var it, results = [ ];
      for (var j=0; j<6; j++) {
        it = angular.extend({},tileTmpl);
        it.icon  = it.icon + (j+1);
        it.title = it.title + (j+1);
        it.span  = { row : 1, col : 1 };
        switch(j+1) {
          case 1:
            it.background = "red";
            //it.span.row = it.span.col = 2;
            break;
          case 2: it.background = "green";         break;
          case 3: it.background = "darkBlue";      break;
          case 4:
            it.background = "lightPurple";
            //it.span.col = 2;
            break;
          case 5:
            it.background = "yellow";
            //it.span.row = it.span.col = 2;
            break;
          case 6: it.background = "pink";          break;
        }
        results.push(it);
      }
      return results;
    }
    
  }
  angular.module('eHospital').controller('IndexCtrl', IndexCtrl);
    
  function CardCtrl ($rootScope, $scope, UserSvc) {
    $rootScope.activePage = 'card';
    $rootScope.homeLoaded = 0;
    $scope.imagePath = 'img/ehospital-banner.png';
  }
  angular.module('eHospital').controller('CardCtrl', CardCtrl);
    
  function BarCtrl ($rootScope, $scope, $mdDialog, UserSvc) {
    $scope.isOpen = false;
    $scope.selectedDirection = 'left';
    $scope.selectedMode = 'md-fling';
    
    $scope.showRegister = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/partials/loginregister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {//Success
        $scope.status = 'Registering...';
        console.log($scope.status);
      }, function() {
        $scope.status = 'Cancelled.';
        console.log($scope.status);
      });
    };
    $scope.showLogin = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/partials/loginregister.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'Logging in...';
        console.log($scope.status);     
      }, function() {
        $scope.status = 'Cancelled.';
        console.log($scope.status);
      });
    };
    $scope.prescribe = function(ev) {
      $mdDialog.show({
        controller: PrescribeController,
        templateUrl: '/views/partials/prescribe.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'Precribing...';
        console.log($scope.status);     
      }, function() {
        $scope.status = 'Cancelled.';
        console.log($scope.status);
      });
    };
  }
  angular.module('eHospital').controller('BarCtrl', BarCtrl);
    
})();