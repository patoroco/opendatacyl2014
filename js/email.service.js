(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http', emailService]);

    var api = 'http://178.62.198.195/api/';

    function emailService($http) {
        return {
            sendEmailWithCriteria : sendEmailWithCriteria
        }

        function sendEmailWithCriteria(email, region, text) {
            //FIXME apuntarme a emails
            return $http.post(api + 'email/');
        }
    }
})();