(function () {
    'use strict';
    angular.module('email.service', [])
        .factory('emailService', ['$http', 'hostsService', emailService]);

    function emailService($http, hostsService) {

        return {
            sendEmailWithCriteria: sendEmailWithCriteria,
            sendContactEmail: sendContactEmail,
            unsubscribe: unsubscribe
        }

        function sendEmailWithCriteria(email, region, text) {
            return $http({
                method: 'POST',
                url: hostsService.getDomain() + 'subscriptions/',
                data: $.param({
                    email: email,
                    province: region,
                    search_term: text
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        function unsubscribe(email, why) {
            return $http({
                method: 'DELETE',
                url: hostsService.getDomain() + 'subscriptions/',
                data: $.param({
                    email: email,
                    why: why
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }

        function sendContactEmail(email, name, text) {
            return $http.post(hostsService.getDomain() + 'email/');
        }
    }
})();