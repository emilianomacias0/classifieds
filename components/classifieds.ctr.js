(function(){
	"use strict";

	angular
		.module("ngClassifieds")
		.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory,$mdSidenav, $mdToast, $mdDialog){
			classifiedsFactory.getClassifieds().then(function(classifieds){

				$scope.classifieds = classifieds.data;
				$scope.categories = getCategories($scope.classifieds);
				
			});

			var contact = {
				name : "Emiliano Macias",
				phone: "1567-92-54",
				email: "emiliano@mail.com"
			}

				$scope.openSidebar = function(){
					$mdSidenav("left").open();
				}

				$scope.closeSidebar = function(){
					$mdSidenav("left").close();
					$scope.classified = {};
				}
				
				$scope.saveClassified = function(classified){
					if(classified){
						$scope.editing = false;
						classified.contact = contact;
						$scope.classifieds.push(classified);
						$scope.classified = {};
						$scope.closeSidebar();
				     	showToast('Classified Saved!');	
   							}
				}

				$scope.editClassified = function(classified){
					$scope.editing = true;
					$scope.openSidebar();
					$scope.classified=classified;
				}

				$scope.saveEdit = function(){
					$scope.editing = false;
					$scope.closeSidebar();
					showToast('Edit Saved!');
					}

				$scope.deleteClassified = function(event,classified){

					var confirm = $mdDialog.confirm()
					.title("Are you shure you want to delete "+ classified.title + "?")
					.ok("Yes")
					.cancel("No")
					.targetEvent(event);

					$mdDialog.show(confirm).then(function(){
						var index = $scope.classifieds.indexOf(classified);
						$scope.classifieds.splice(index,1);
						showToast("The classified has been")
					},function(){

					});

					
					
				}


				function showToast(message){
					$mdToast.show(
					      $mdToast.simple()
					        .textContent(message)
					        .position('top , right')
					        .hideDelay(3000)
   						 );	
				}

				function getCategories(classifieds){
					var categories = [];
					angular.forEach(classifieds,function(item){
						angular.forEach(item.categories,function(category){
							categories.push(category);
						});
					});

					return _.uniq(categories);
				}
		});
})();