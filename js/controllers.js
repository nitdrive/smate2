/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SchoolMateControllerModule = angular.module('schoolmate.controllers', ['ngStorage']);

SchoolMateControllerModule.controller('UserAppHomeCtrl', function ($scope,userService,$rootScope,$localStorage) {

        
	 if(!navigator.onLine)
	 {
		
		alert("You Must be connected to the Internet to use this App");
		
	 }
         $scope.toggleUserLogin = function() {

                 location.href = "#user/login/";
         }
         $scope.toogleUserRegistration = function() {
   
                 $localStorage.count = 2;
                 $localStorage.a = [];
		 $localStorage.result = [];
                 location.href = "#user/register/p1";
                 
         }
	$scope.toogleAdminLogin = function() {


		location.href = "#admin/login";
	}
    })
.controller('UserAppLoginCtrl', function ($scope,userService,$stateParams,$window) {
          
         
         $stateParams.logindetails = [];
         

        $scope.Login = function(){

   
              passData(this.username,this.password,function($stateParams,userService){
                       
                        
                       $stateParams.logindetails.push(this.username);
                       $stateParams.logindetails.push(this.password);
                       console.log("Login View Loaded from scope username:"+this.username.value+"-"+this.password.value);
                      // alert("Inside Callback with state:"+$stateParams.logindetails[0].value);
		       console.log("Login View Loaded with state:"+$stateParams.logindetails[0].value);
                   
                      userService.loginUser($stateParams.logindetails[0].value,$stateParams.logindetails[1].value).success(function (response) {
		                var currentuser = [];
				globaldata = response;
                                
				if(globaldata[0].uname != null)
                                {
				  $scope.currentUser = globaldata[0].uname;
                                  $window.sessionStorage.setItem("current-user",$stateParams.currentuser);
                                  currentuser.push(globaldata[0].uname);
                                  //alert("Welcome "+globaldata[0].name);

                                  location.href = "#/user/userhome/"+globaldata[0].firstName;
                                  location.reload();
				  console.log("From Response:"+globaldata[0].firstName);
                                  
                                }
				else
                                {
				  alert("Login Failed for username: "+$stateParams.logindetails[0].value);
				  console.log("From Response-Login failed:"+$stateParams.logindetails[0].value);
				}
			    })

              });
       }
       

       function passData(username,password,callback)
       {
         // alert("Login Triggered for:"+"username:"+username+"password:"+password);  
          callback($stateParams,userService);
       } 
        
         
          
     

     	 
        
    })

.controller('UserAppRegisterCtrl', function ($scope,userService,$stateParams,$window,$localStorage) {
          
         $scope.display = false;
         $scope.checkPassword = function(pass,cpass) {
                
         
                 $scope.display = false;
                 if(typeof pass!='undefined' && typeof cpass!='undefined')
                 {
                   
		         if(pass != cpass)
		         {
		             
		             $scope.display = !$scope.display;
		             $scope.displayMessage = "Passwords Do Not Match";
		             $scope.displayPane = {'background-color':'orange'};
                             flag = false;
		         }
		         else
		         {
		             
		               //$scope.display = !$scope.display;
		              $scope.displayMessage = "Passwords Match";
		             // $scope.displayPane = {'background-color':'lightgreen'};
                              flag = true;
		         }
                 
                  return flag;
                }
                else
                {
              
                  alert("Password fields cannot be empty");
                  return false;
                }

         }
    
         $scope.counter = 1;
         
         $scope.RegisterE = function(){
             
              $scope.counter = ($scope.counter + 1);
	      return $scope;
         } 

         $scope.register = function(result) {
   
                 //alert("Register Triggered");
                
                 var user_data = result;
                
                             
                
                 passData(user_data,function(userService){
                   
                 
                      

                       //alert("Inside Callback with state:"+user_data);
		       console.log("Register View Loaded with state for:"+user_data);
                   
                      userService.registerUser(user_data).success(function (response) {
		             
				globaldata = response;
                                console.log("Response:"+globaldata);
				if(globaldata!='undefined')
                                {
				  
                                  location.href = "#/user/register/success";
				  
				  console.log("From Response:"+globaldata);
                                  
                                }
				else
                                {
				  alert("Registration Failed");
				  console.log("Registration Failed");
				}
			    })

              });


         }


       	function passData(user_data,callback)
        {
          // alert("Login Triggered for:"+"username:"+username+"password:"+password);  
           callback(userService);
        } 
        
        revisitPageNum = 0,pivot=0;  
        
        $scope.saveandforwardData = function(user)
        {
           $scope.$storage = $localStorage;
          // alert("a"+($scope.$storage.count));

	   // Revisit route path logic
           if(revisitPageNum > 0)
           {
            alert("In Revisit");
               /*var userdata = $scope.$storage.a;
                for(var i= (userdata.length);i>=(revisitPageNum);i--)
                {
                    $localStorage.a.pop();
                    
                }
               
		$scope.$storage.a.push(user);
		*/
                revisitPageNum = revisitPageNum + 1;
                location.href = "#/user/register/p"+revisitPageNum;
                $scope.$storage.count = revisitPageNum+1;
              
               // if($scope.$storage.count == pivot)
                revisitPageNum = 0;
                
                
                return;
	   }
           else
	   {
            // alert("In Normal");
		
                   $scope.$storage.a.push(user);
                   
		   if($scope.$storage.count == 4)
		   {
			console.log(user);
		

			if(!this.checkPassword(this.pass,user.cpass))
			{ 
			 
		            return;
			}
			
		   }
		   if($scope.$storage.count == 7)
		   {
                     alert("Here");
		        if(!confirm("Form will be submitted now.To confirm click 'Confirm' or to make any changes click on 'Cancel'"))
		        {
		          //$scope.changeSavetoUpdate = "updateandforwardData(user,user.pageNumber)"; 
		          location.href = "#/user/register/p1";
		          $scope.$storage.a = [];
		          $scope.$storage.count = 2;
			  return;
		        }
			else
			{
			 
			  //alert("Registration Successful");
		         // $scope.$storage.a = [];
			 // $scope.$storage.count = 2;
			 
		          var temp = $scope.$storage.a;
		          var result = {};
		          for(var i=0;i<temp.length-1;i++)
			  {
				var temp1 = temp[i]; 
				var temp2 = temp[i+1];
			       for(var key in temp1) result[key]=temp1[key];
			       for(var key in temp2) result[key]=temp2[key];
			
		          }
		         
		          $scope.$storage.result = result;
		          return this.register(result);
		          
		          
		          //location.href = "#/user/register/success";
		         // location.reload();
		         
		      }


	          }
                  location.href = "#/user/register/p"+$scope.$storage.count;
          
                   $scope.$storage.count = $scope.$storage.count + 1;
                   
                   return;
           }
           
          
          
           
           
           
        }

       
	$scope.previous = function()
        {
           $scope.$storage = $localStorage;
           
           $scope.$storage.count = $scope.$storage.count - 1;
           if($scope.$storage.count >= 2)
               revisitPageNum =  $scope.$storage.count - 1; //min val will be 1
           alert(revisitPageNum);
           location.href = "#/user/register/p"+revisitPageNum;
           //$scope.$storage.a[revisitPageNum-1] = {};  
           
      
        }

       $scope.loadValues = function(){

           $scope.$storage = $localStorage;
           var index = ($scope.$storage.count-1);
              if($scope.$storage.a[index]!='undefined')
	      {
		$scope.data = $scope.$storage.a[index];
                return $scope.data;
	      }
              else
              {
                
 		return $scope.data;
              }

       }
         
        

       

      
 
    })

.controller('UserAppUserHomeCtrl', function ($rootScope,$scope,$stateParams,$window) {
  
            
           
          
	    if (! $window.sessionStorage.justOnce) {
		$window.sessionStorage.setItem("justOnce", "true");
		$window.location.reload();
	    }
    
     $scope.logout = function(){
   
        $window.sessionStorage.setItem("current-user",null);
        $window.sessionStorage.setItem("justOnce", "false");
        $window.location = "#user/login/";
        location.reload();
        $scope.current_user_name = null;
           

     }
     
     $scope.current_user_name = $stateParams.currentuser;
     console.log("UserAppUserHomeCtrl:"+$stateParams.currentuser);
         
    })

.controller('TestCtrl', function ($scope,$window) {
  
            
           
          
	   
     console.log("TestCtrl: Log");
         
    });


