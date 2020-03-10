"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUniqMapControls(data) {
    var uniqCities = [];
    var uniqCountries = [];
    var uniqAddresses = [];
    var propsToArray = function () {
        for (var i = 0; i < data.length; i++) {
            uniqCountries.push(data[i].country);
        }
        for (var i = 0; i < data.length; i++) {
            uniqCities.push(data[i].city);
        }
        var addresses = [];
        for (var i = 0; i < data.length; i++) {
            data[i].address.split(',').map(function (item) { return addresses.push(item.trim()); });
        }
        uniqAddresses = Array.from(new Set(addresses));
    };
    var uniqueArray = function (arr) { return Array.from(new Set(arr)); };
    propsToArray();
    uniqCities = uniqueArray(uniqCities);
    uniqCountries = uniqueArray(uniqCountries);
    uniqAddresses = uniqueArray(uniqAddresses);
    return {
        cities: uniqCities.sort(),
        countries: uniqCountries.sort(),
        addresses: uniqAddresses.sort()
    };
}
exports.default = getUniqMapControls;
//# sourceMappingURL=getUniqMapControls.js.map