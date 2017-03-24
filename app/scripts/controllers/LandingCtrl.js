(function () {
    'use strict';

    function LandingCtrl ($scope, $firebaseArray) {
        console.log('Loading controller...');
        
        var ref = new Firebase('https://blocitoff-63c0d.firebaseio.com/');
        
        $scope.tasks = $firebaseArray(ref);
        
    }
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['$scope', '$firebaseArray', LandingCtrl]);
})();