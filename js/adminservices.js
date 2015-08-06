var SchoolMateAdminServiceModule =  angular.module('schoolmate.adminservices', []);
   SchoolMateAdminServiceModule.factory('adminService', function($ionicLoading,$rootScope,$http,$window) {
                                     

    var adminAPIService = {};

    adminAPIService.loginAdmin = function(aid,pass) {

       $rootScope.notify();
       var form = {aid: aid, password: pass};
       console.log("In Admin Login Service with details admin Uname:"+aid+" Admin Pass:"+pass+" form-username:"+form.aid+" and form-password:"+form.password);
       return $http.post('http://52.2.139.70:3000/admin/login',form);

    }

    adminAPIService.resetPassword = function(admin_data) {

     	$rootScope.notify();
    	console.log("In Admin Reset Password Service with details Uname:"+admin_data.uname+" Pass:"+admin_data.cpass);
     	return $http.post('http://52.2.139.70:3000/admin/reset',admin_data);
    }

   adminAPIService.listUserDetails = function(aid) {
   
       var params = {aid:aid,semester:"FALL 2015",sessionkey:aid};
    
      return $http.get('http://52.2.139.70:3000/admin/userlist',params);
        
    }


   adminAPIService.draw = function(userlist) {

    return $http({
        method: 'GET', 
        params: {aid:aid,semester:"FALL 2015",sessionkey:aid},
        url: 'http://52.2.139.70:3000/admin/userlist'
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

    return adminAPIService;
  });
