(function () {
    'use strict';

    function LandingCtrl ($scope, $firebaseArray) {
        var ref = firebase.database().ref().child('tasks');        
        $scope.tasks = $firebaseArray(ref);
        
        $scope.addTask = function () {
            $scope.tasks.$add({
                task_text: $scope.task_text,
                priority: $scope.priority
            }).then(function(ref) {
                var id = ref.key;
                console.log('Added New Task ' + id);
                
                $scope.task_text = '';
                $scope.priority = '';
                
            });
        };
    }
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['$scope', '$firebaseArray', LandingCtrl]);
})();