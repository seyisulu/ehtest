(function () {
  'use strict';
  
  function HomeCtrl ($rootScope, $scope, UserSvc) {
    $rootScope.activePage = 'home';
    $rootScope.homeLoaded = 0;
    $scope.isOpen = false;
    $scope.selectedMode = 'md-fling';
    $scope.selectedDirection = 'up';
  }
  angular.module('eHospital').controller('HomeCtrl', HomeCtrl);
  
  function DialogController($scope, $rootScope, $mdDialog) {
    $scope.nd='';
    $scope.np='';
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $rootScope.nd=$scope.nd;
      $rootScope.np=$scope.np;
      $mdDialog.hide(answer);
    };
  }
  
  function PrescribeController($scope, $rootScope, $http, $mdDialog) {
    $scope.p = {number:'',drugs:[{drugname:'',drugdosage:'',drugtimes:'',drugfrequency:'day'}]};
    $scope.drugfrequency = "day";

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $http.post('/api/medications', {
        doctor: $rootScope.doctornumber,
        patient: $scope.p.number,
        drugs: $scope.p.drugs
      })
      .success(function(response) {
        console.log("Post Success: ");
        console.log(response);
        $rootScope.previous = response;        
      })
      .error(function(response){
        console.log("Error: "+response);
      });
      $mdDialog.hide(answer);
    };
    $scope.addDrug = function() {
      $scope.p.drugs.push({drugname:'',drugdosage:'',drugtimes:'',drugfrequency:'day'});
    };
    $scope.remDrug = function() {
      if($scope.p.drugs.length>1) {
         $scope.p.drugs.pop();
      }
    };
  }
    
  function IndexCtrl ($rootScope, $scope, $mdDialog, $http, UserSvc) {
    $rootScope.activePage = 'home';
    $rootScope.homeLoaded = 0;
    $scope.imagePath = 'img/ehospital-banner.png';
    $scope.hospitalist = [];

    $http.get("/api/hospitals")
    .success(function(response){
      console.log("Hospital list success:");
      console.log(response);
      $scope.hospitalist = response;
    });

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
        console.log($rootScope.nd);
        $http.post('/', {
            doctor: $rootScope.nd,
            password: $rootScope.np,
            newsignup: true
          })
          .success(function(){
            // No error: authentication OK
            console.log("Signup successful!");
            $rootScope.loginState = true;
            $rootScope.doctornumber = $rootScope.dn;
            location.hash='/dash';
          })
          .error(function(){
            // Error: authentication failed
            console.log($rootScope.dn + ' Unsucessful signup');
          });

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
        $http.post('/', {
            doctor: $rootScope.nd,
            password: $rootScope.np,
            newsignup: false
          })
          .success(function(){
            // No error: authentication OK
            console.log("Login successful!");
            $rootScope.loginState = true;
            $rootScope.doctornumber = $rootScope.dn;
            $http.get("/api/medications", {params: {doctor: $rootScope.doctornumber}})
              .success(function(response) {
                console.log("Get Success: ");
                console.log(response);
                $rootScope.previous = response;
              });
            location.hash='/dash';
          })
          .error(function(){
            // Error: authentication failed
            console.log($rootScope.dn + ' Unsucessful login');
          });
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
    
  function PCtrl ($rootScope, $scope, UserSvc) {
    $rootScope.activePage = 'prescriptions';
    $rootScope.homeLoaded = 0;
  }
  angular.module('eHospital').controller('PCtrl', PCtrl);
    
  function BarCtrl ($rootScope, $scope, $mdDialog, $http, UserSvc) {
    $scope.isOpen = false;
    $scope.selectedDirection = 'left';
    $scope.selectedMode = 'md-fling';
    

    $scope.goHome = function(ev) {
      location.hash = '/home';
      console.log('home');
    };
    
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
        $http.post('/', {
            doctor: $rootScope.nd,
            password: $rootScope.np,
            newsignup: true
          })
          .success(function(){
            // No error: authentication OK
            console.log("Signup successful!");
            $rootScope.loginState = true;
            $rootScope.doctornumber = $rootScope.dn;
            location.hash='/dash';
          })
          .error(function(){
            // Error: authentication failed
            console.log($rootScope.dn + ' Unsucessful signup');
          });
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
        $http.post('/', {
            doctor: $rootScope.nd,
            password: $rootScope.np,
            newsignup: false
          })
          .success(function(){
            // No error: authentication OK
            console.log("Login successful!");
            $rootScope.loginState = true;
            $rootScope.doctornumber = $rootScope.dn;
                console.log($rootScope.doctornumber);
            $http.get("/api/medications", {params: {doctor: $rootScope.doctornumber}})
              .success(function(response) {
                console.log("Get Success: ");
                console.log(response);
                $rootScope.previous = response;
              });
            location.hash='/dash';
          })
          .error(function(){
            // Error: authentication failed
            console.log($rootScope.dn + ' Unsucessful login');
          });     
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