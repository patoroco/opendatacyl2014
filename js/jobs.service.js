(function () {
    'use strict';
    angular.module('jobs.service', [])
        .factory('jobsService', ['$http', '$cacheFactory', jobsService]);

    var api = 'http://178.62.198.195/api/';

    function jobsService($http, $cacheFactory) {
        return {
            getAllJobs: getAllJobs,
            getJobsWithRegionAndText : getJobsWithRegionAndText
        }

        function getAllJobs() {
            return $http.get(api + 'jobs/');
        }

        function getJobsWithRegionAndText(text, region) {
            //FIXME tener en cuenta region
            return $http.get(api + 'jobs/?search_term=' + text);
        }
    }
})();