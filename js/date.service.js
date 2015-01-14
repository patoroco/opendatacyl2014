(function () {
    'use strict';
    angular.module('date.service', [])
        .factory('dateService', [dateService]);

    function dateService() {
        return {
            differenceBetweenDays: differenceBetweenDays
        }

        function differenceBetweenDays(date) {
            if (date) {
                var milliseconds = new Date() - Date.parse(date);
                var seconds = milliseconds / (360000 * 24);
                var days = seconds / 24;
                var moment = Math.floor(days);
                if (moment == 1) {
                    return 'Ayer';
                } else if (moment == 0) {
                    return 'Hoy';
                } else {
                    return 'hace ' + Math.floor(days) + ' días';
                }
            }
        }
    }
})();