(function () {
    'use strict';
    angular.module('jobs.service', [])
        .factory('jobsService', ['$http', jobsService]);

    var api = 'http://cyljob.com/api/';

    function jobsService($http) {
        return {
            getJobsByRegionAndText: getJobsByRegionAndText,
            getJobById: getJobById
        }

        function getJobsByRegionAndText(region, text, when, page) {
            var date = calculateDate(when);
            return $http.get(api + 'jobs/', {
                params: {province: region, search_term: text, publish_date: date, page: page}
            });
        }

        function getJobById(id) {
            return $http.get(api + 'jobs/' + id, { cache: true});
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
                return undefined;
            }
            return date;
        }
    }
})();