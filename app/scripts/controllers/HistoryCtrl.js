(function () {
    'use strict';

    function HistoryCtrl($scope, $firebaseArray) {
        console.log('I see you HistoryCtrl ... You are loaded!!!');
        
        /* There's no need for this file in this application. So, I created it
         * and its connections just to keep with the requirements of the
         * checkpoint. Go to LandingCtrl.js for show history functionality */
        
    }
    
    angular
        .module('blocitoff')
        .controller('HistoryCtrl', ['$scope', '$firebaseArray', HistoryCtrl]);
})();