"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUniqMapControls(data) {
    var uniqCities = [];
    var uniqCountries = [];
    var uniqServices = [];
    var uniqAddFilters = [];
    var propsToArray = function () {
        for (var i = 0; i < data.length; i++) {
            uniqCountries.push(data[i].country);
            uniqCities.push(data[i].city);
            uniqServices.push(data[i].service);
            if (data && data[i] && data[i].addFilter) {
                data[i].addFilter.split(',').map(function (item) { return uniqAddFilters.push(item.trim()); });
            }
        }
    };
    var uniqueArray = function (arr) { return Array.from(new Set(arr)); };
    propsToArray();
    uniqCities = uniqueArray(uniqCities);
    uniqCountries = uniqueArray(uniqCountries);
    uniqServices = uniqueArray(uniqServices);
    uniqAddFilters = uniqueArray(uniqAddFilters);
    return {
        cities: uniqCities.sort(),
        countries: uniqCountries.sort(),
        services: uniqServices.sort(),
        addFilters: uniqAddFilters.sort()
    };
}
exports.default = getUniqMapControls;
//# sourceMappingURL=getUniqMapControls.js.map