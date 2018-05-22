// TASKS
//  * Style block creation unit
//  * Fix board layout init numbers
//  * Speed up pegs issue. Delete that function.
//  * Change color dropdowns to colored select tiles
//  * Make it so that if you drop a brick on a taken slot and there's a not-taken one nearby, it will snap to that one.
//  * Address window resizing
//  * Restrict grabbing if a brick is surrounded.
//  * Size grid with a dial
//  * Be able to hilight and drag structures of blocks
//  * Color box on hover
//  * Actually pick up brick



angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', '$window', function($scope, $window, $index){
      return mainController($scope, $window, $index)
  }]) // end MainCtrl
	.directive("brick", Brick)
	.directive("slot", Slot);
//// other controllers

