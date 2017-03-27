(function () {
    'use strict';

    function LandingCtrl($scope, $firebaseArray) {
        var activeRef = firebase.database().ref().child('active_tasks');
        var inactiveRef = firebase.database().ref().child('inactive_tasks');
        
        $scope.active_tasks = $firebaseArray(activeRef);
        $scope.inactive_tasks = $firebaseArray(inactiveRef);
        
        $scope.addTask = function () {
            $scope.active_tasks.$add({
                task_text: $scope.task_text,
                date: (new Date()).getDate(),
                priority: $scope.priority
            }).then(function(activeRef) {
                
                $scope.task_text = '';
                $scope.priority = '';
            });
        };
                
        $scope.completedTask = function(task) {            
            $scope.inactive_tasks.$add(task);
            $scope.active_tasks.$remove(task);
            $scope.compChecked = true;
        };
        
        $scope.deleteTask = function(task) {
            $scope.active_tasks.$remove(task);
        };

        $scope.isTaskExpired = function() {
            $scope.active_tasks.$loaded().then(function(){
                angular.forEach($scope.active_tasks, function(task) {
                    if (task.date === task.date + 1) {
                        $scope.inactive_tasks.$add(task);
                        $scope.active_tasks.$remove(task);
                        $scope.expChecked = true;
                    }
                })
            });
        };
        
        $scope.currentTaskList = true;
        $scope.historyTaskList = false;
        
        $scope.showHistory = function() {
            $scope.currentTaskList = false;
            $scope.historyTaskList = true;
        };
        
        $scope.showCurrentTasks = function() {
            $scope.currentTaskList = true;
            $scope.historyTaskList = false;            
        };
        
        $scope.reactivateCompTask = function (task) {
            $scope.active_tasks.$add(task);
            $scope.inactive_tasks.$remove(task);
            $scope.task.compChecked = false;
        };
        
        $scope.reactivateExpTask = function (task) {
            $scope.inactive_tasks.$add(task);
            $scope.active_tasks.$remove(task);
        };
        
    }
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['$scope', '$firebaseArray', LandingCtrl]);
})();