(function () {
    'use strict';

    function LandingCtrl($scope, $firebaseArray) {
        var activeRef = firebase.database().ref().child('active_tasks');
        
        $scope.active_tasks = $firebaseArray(activeRef);
        
        $scope.task_text = '';
        $scope.priority = '';
        
        $scope.addTask = function () {
            if ($scope.task_text == '' || $scope.priority == '') {
                alert('Please enter a new task and set its priority.');
            } else {
                $scope.active_tasks.$add({
                    task_text: $scope.task_text,
                    dateAdded: (new Date()).toLocaleString(),
                    expDate: new Date(new Date().getTime() + 1*24*60*60*1000).toLocaleString(),
                    status_active: true,
                    compChecked: false,
                    expChecked: false,
                    priority: $scope.priority
                }).then(function(activeRef) {

                    $scope.task_text = '';
                    $scope.priority = '';
                });
            }
        };
                                
        $scope.completedTask = function(task) {
            //console.log("The status of the task is: " + task.status_active);            
            //console.log("The status of the completed checkbox is: " + task.compChecked);            
            angular.forEach($scope.active_tasks, function(value, key) {
                //console.log(value);
                //console.log(key);
                if(value.$id == task.$id) {
                    activeRef.child(task.$id).update({ status_active: false, compChecked: true });
                    //console.log(task.$id + " " + " " + value.$id);
                    //console.log(task.status_active + " " + " " + value.status_active);
                }
            });
        };
        
        $scope.deleteTask = function(task) {
            $scope.active_tasks.$remove(task);
        };

        $scope.isTaskExpired = function() {
            $scope.active_tasks.$loaded().then(function() {
                angular.forEach($scope.active_tasks, function(task) {
                                        
                    if (task.expDate <= new Date().toLocaleString()) {
                        task.status_active = false;
                        task.expChecked = true;                         
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
            angular.forEach($scope.active_tasks, function(value, key) {
                if(value.$id == task.$id) {
                    activeRef.child(task.$id).update({ status_active: true, compChecked: false });
                }
            });
        };
        
        $scope.reactivateExpTask = function (task) {
            task.status_active = true;
        };        
    }
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['$scope', '$firebaseArray', LandingCtrl]);
})();