(function () {
    'use strict';
    angular.module('hosts.service', [])
        .factory('hostsService', ['$location', hostsService]);

    function hostsService($location) {
        return {
            getDomain: getDomain
        }

        function getDomain() {
            var url = $location.host();
            return url.indexOf('localhost') != -1 ? 'http://cyljob.com/api/' : '/api/';
        }

    }
})();