(function () {
    'use strict';
    angular.module('hosts.service', [])
        .factory('hostsService', ['$location', hostsService]);

    function hostsService($location) {
        return {
            getHost: getHost
        }

        function getHost() {
            var url = $location.host();
            var www = url.indexOf('www') != -1 ? 'www' : '';
            return www + url.indexOf('cyljob.es') != -1 ? 'cyljob.es' : 'cyljob.com';
        }

    }
})();