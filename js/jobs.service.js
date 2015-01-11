(function () {
    'use strict';
    angular.module('jobs.service', [])
        .factory('jobsService', ['$http', '$cacheFactory', jobsService]);

    var api = 'http://178.62.198.195/api/';

    function jobsService($http, $cacheFactory) {
        //FIXME caché
        return {
            getAllJobs: getAllJobs,
            getJobsByRegionAndText : getJobsByRegionAndText,
            getJobById : getJobById
        }

        function getAllJobs() {
            return $http.get(api + 'jobs/');
        }

        function getJobsByRegionAndText(text, region) {
            //FIXME tener en cuenta region
            var criteria = text && region ? ('?search_term=' + text) : ''
            return $http.get(api + 'jobs/' + criteria);
        }

        function getJobById(id) {
            //FIXME sólo buscar por id
            //return $http.get(api + 'jobs/' + id);
            return $http.get(api + 'jobs/');
        }
    }
})();