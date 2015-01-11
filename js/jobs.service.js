(function () {
    'use strict';
    angular.module('jobs.service', [])
        .factory('jobsService', ['$http', '$cacheFactory', jobsService]);

    var api = 'http://178.62.198.195/api/';

    function jobsService($http, $cacheFactory) {
        //FIXME caché
        return {
            getAllJobs: getAllJobs,
            getJobsByRegionAndText: getJobsByRegionAndText,
            getJobById: getJobById
        }

        function getAllJobs() {
            return $http.get(api + 'jobs/');
        }

        function getJobsByRegionAndText(region, text, when) {
            //FIXME tener en cuenta region y when
            //FIXME count
            var criteria = text ? ('?search_term=' + text) : '';
            //FIXME procesar when (whenever, month, day, week)
            return $http.get(api + 'jobs/' + criteria);
        }

        function getJobById(id) {
            //FIXME sólo buscar por id
            //return $http.get(api + 'jobs/' + id);
            return $http.get(api + 'jobs/');
        }
    }
})();