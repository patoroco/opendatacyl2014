(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http','hostsService', emailService]);

    function emailService($http, hostsService) {

        var host = hostsService.getDomain();
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