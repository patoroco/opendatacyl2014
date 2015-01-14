(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http', emailService]);

    var api = 'http://cyljob.com/api/';

    function emailService($http) {
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