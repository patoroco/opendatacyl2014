(function () {
    'use strict';
    angular.module('jobs.service', [])
        .factory('jobsService', ['$http', '$cacheFactory', jobsService]);

    var api = 'http://178.62.198.195/api/';

    function jobsService($http, $cacheFactory) {
        //FIXME caché
        return {
            getJobsByRegionAndText: getJobsByRegionAndText,
            getJobById: getJobById
        }

        function getJobsByRegionAndText(region, text, when) {
            //FIXME tener en cuenta region y when
            //FIXME count
            var date = calculateDate(when);
            var criteria = (region || text || date) ? ('?search_term=' + text) : '';
            //FIXME procesar when (whenever, month, day, week)
            return $http.get(api + 'jobs/' + criteria);
        }

        function getJobById(id) {
            //FIXME sólo buscar por id
            //return $http.get(api + 'jobs/' + id);
            return $http.get(api + 'jobs/');
        }

        function calculateDate(when) {
            var date = new Date();
            if (when === 'day') {
                date.setDate(date.getDate() - 1);
            } else if (when === 'week') {
                date.setDate(date.getDate() - 7);
            } else if (when === 'month') {
                date.setMonth(date.getMonth() - 1);
            } else {
                return null;
            }
            return date;
        }
    }
})();