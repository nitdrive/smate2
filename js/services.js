var SchoolMateServiceModule =  angular.module('schoolmate.services', []);
    SchoolMateServiceModule.factory('userService', function($ionicLoading,$rootScope,$http,$window) {
                                     

    var userAPIService = {};

    userAPIService.loginUser = function(username,pass) {

       $rootScope.notify();
       var form = {uname: username, password: pass};
       console.log("In User Login Service with details Uname:"+username+" Pass:"+pass+" form-username:"+form.uname+" and form-password:"+form.password);
       return $http.post('http://52.2.139.70:3000/user/login',form);

    }

    userAPIService.registerUser = function(user_data) {

     	$rootScope.notify();
    	console.log("In User Register Service with details Uname:"+user_data.uname+" Pass:"+user_data.cpass);
     	return $http.post('http://52.2.139.70:3000/user/register',user_data);
    }

   userAPIService.listUserDetails = function($scope) {
   
      return $http({
        method: 'GET', 
        params: {uname:$scope.username,password:$scope.password,sessionkey:$scope.username},
        url: 'http://127.0.0.1:3000/user/search'
      });
    }
   
   $rootScope.hide = function () {
            $ionicLoading.hide();
        };
   
    $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
  
    $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 100);
        };

    return userAPIService;
  });
