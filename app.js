angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', function($scope){
		$scope.award = "a word";
	}])
	.directive("brick", Brick)
	.directive("slot", Slot);
//// other controllers