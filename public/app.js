(function() {
    'use strict';
    angular.module('app', [])
        .controller('LoginCtrl', ['$scope', '$http',
            function($scope, $http) {
                var self = this;
                self.login = function(user) {
                    $http.post('/api/login', user).then(function(data) {
                        self.user = data.data;
                        console.log(self.user);
                    })
                }
            }
        ])
})()
