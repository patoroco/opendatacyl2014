(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http','$location', emailService]);

    function emailService($http, $location) {

        var host = $location.host().indexOf('cyljob.es') != -1 ? 'cyljob.es' : 'cyljob.com';
        var api = 'http://' + host + '/api/';

        return {
            sendEmailWithCriteria: sendEmailWithCriteria,
            sendContactEmail: sendContactEmail,
            unsubscribe: unsubscribe
        }

        function sendEmailWithCriteria(email, region, text) {
            return $http.post(api + 'email/');
        }

        function sendContactEmail(email, name, text) {
            return $http.post(api + 'email/');
        }

        function unsubscribe(email, text) {
            return $http.post(api + 'email/');
        }
    }
})();