(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http', emailService]);

    var api = 'http://178.62.198.195/api/';

    function emailService($http) {
        return {
            sendEmailWithCriteria : sendEmailWithCriteria,
            sendContactEmail : sendContactEmail,
            unsubscribe : unsubscribe
        }

        function sendEmailWithCriteria(email, region, text) {
            //FIXME apuntarme a emails
            return $http.post(api + 'email/');
        }

        function sendContactEmail(email, name, text) {
            //FIXME enviar a emails
            return $http.post(api + 'email/');
        }

        function unsubscribe(email, text) {
            //FIXME dessuscribir a emails
            return $http.post(api + 'email/');
        }
    }
})();