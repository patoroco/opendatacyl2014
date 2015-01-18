(function () {
    'use strict';
    angular.module('parse.service', [])
        .factory('parseService', ['$http', parseService]);

    function parseService($http) {

        var colors = ['#F2E300', '#7FB61D', '#0172B6', '#E42334', '#003956', '#840461', '#EF8200', '#006138', '#01737D'];

        return {
            getCSV: getCSV
        }

        function getCSV(url, keys, enabled) {
            return $http.get("pages/csv/" + url).then(function (response) {
                var elements = [];
                var file = CSVToArray(response.data, ',');

                for (var column = 1; column < file[0].length; column++) {
                    var values = [];
                    var text_x = [];
                    for (var row = 0; row < file.length; row++) {
                        values.push([row, parseFloat(file[row][column])]);
                        text_x.push(file[row][0]);
                    }
                    elements.push({
                        "key": keys[column - 1],
                        "values": values,
                        "color": colors[column - 1],
                        "text_x": text_x,
                        "disabled": enabled ? enabled[column - 1] : false
                    });
                }
                return elements;
            })
        };

        function CSVToArray(strData, strDelimiter) {
            // Check to see if the delimiter is defined. If not,
            // then default to comma.
            strDelimiter = (strDelimiter || ",");

            // Create a regular expression to parse the CSV values.
            var objPattern = new RegExp(
                (
                    // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
            );


            // Create an array to hold our data. Give the array
            // a default empty first row.
            var arrData = [[]];

            // Create an array to hold our individual pattern
            // matching groups.
            var arrMatches = null;


            // Keep looping over the regular expression matches
            // until we can no longer find a match.
            while (arrMatches = objPattern.exec(strData)) {

                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[1];

                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (
                    strMatchedDelimiter.length &&
                    strMatchedDelimiter !== strDelimiter
                ) {

                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push([]);

                }

                var strMatchedValue;

                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[2]) {

                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    strMatchedValue = arrMatches[2].replace(
                        new RegExp("\"\"", "g"),
                        "\""
                    );

                } else {

                    // We found a non-quoted value.
                    strMatchedValue = arrMatches[3];

                }


                // Now that we have our value string, let's add
                // it to the data array.
                arrData[arrData.length - 1].push(strMatchedValue);
            }

            // Return the parsed data.
            return ( arrData );
        }
    }
})();