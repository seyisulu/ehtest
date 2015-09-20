(function () {
  angular.module('eHospital').service('APIRoutes', ['APIBase', function(APIBase) {
      return  {
          login: APIBase + 'users/login',
          logout: APIBase + 'users/logout',
          userlist: APIBase + 'users/',
          instlist: APIBase + 'institutions/',
          studlist: APIBase + 'students/',
          batchlist: APIBase + 'batches/'
      };
  }]);

  function UserSvc ($http, $q, APIRoutes) {
    var UserSvc = {};
    UserSvc.user = false;
    UserSvc.users = [];
    UserSvc.token = false;
    UserSvc.login=function (loginData) {
      var deferred = $q.defer();
      $http({
          method: 'POST', 
          url: APIRoutes.login, 
          cache: false, 
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
          data: $.param(loginData) 
        }).
      success(function (data, status, headers, config) {
        if(!data.error) {
          UserSvc.token = data.token;
          UserSvc.user = data.user;
        }
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        UserSvc.token=false;
        UserSvc.user=false;
        deferred.reject({ error: "An error has occured" });
      });
      return deferred.promise;
    };
    UserSvc.logout=function (loginData) {
      var deferred = $q.defer();
      $http({
          method: 'POST', 
          url: APIRoutes.logout, 
          cache: false, 
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
          data: $.param({token: UserSvc.token}) 
        }).
      success(function (data, status, headers, config) {
        UserSvc.token=false;
        UserSvc.user=false;
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        token=false;
        user=false;
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.getUsers=function (cache) {
      var cache=cache||true;
      var deferred = $q.defer();
      $http({method: 'GET', url: APIRoutes.userlist, cache: false}).
      success(function (data, status, headers, config) {
        UserSvc.users=data;
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.getUser=function (usr) {
      var cache=cache||true;
      var deferred = $q.defer();
      $http({method: 'GET', url: APIRoutes.userlist+usr._id, cache: false}).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.setUser=function (usr) {
      var deferred = $q.defer();
      $http({
        method: 'POST', 
        data: $.param(usr), 
        url: APIRoutes.userlist+usr._id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        cache: false
      }).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.deleteUser=function (uid) {
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        data: { },
        url: APIRoutes.userlist+uid,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        cache: false
      }).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.resetUser=function (payload) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: $.param(payload),
        url: APIRoutes.userlist+payload._id+'/reset',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        cache: false
      }).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.forgetUser=function (payload) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: $.param(payload),
        url: APIRoutes.userlist+'/forget',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        cache: false
      }).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.createUser=function (payload) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: $.param(payload),
        url: APIRoutes.userlist,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        cache: false
      }).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject({});
      });
      return deferred.promise;
    };
    UserSvc.isAdmin=function () {
      if(UserSvc.user)
        return UserSvc.user.admin;
      else
        return false;
    };
    UserSvc.username=function () {
      if(UserSvc.user)
        return UserSvc.user.name;
      else
        return "";
    };
    return UserSvc;
  }
  angular.module('eHospital').factory('UserSvc', UserSvc);

})();