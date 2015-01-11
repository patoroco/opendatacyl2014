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
            //FIXME procesar when (whenever, month, day, week)
            //FIXME results_per_page page
            return $http.get(api + 'jobs/', {
                params: {province: region, search_term: text, publish_date: date}
            });
        }

        function getJobById(id) {
            return $http.get(api + 'jobs/' + id);
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