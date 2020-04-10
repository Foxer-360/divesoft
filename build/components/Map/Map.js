"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var google_map_react_1 = require("google-map-react");
var react_geolocated_1 = require("react-geolocated");
exports.GoogleMapsApiKey = 'AIzaSyDCmyHYLT_dFcUvglVGT5BINiLFXwT0GGA';
var Marker_1 = require("./components/Marker");
var MapRows_1 = require("./components/MapRows");
var ContactRow_1 = require("./components/ContactRow");
var MapBox_1 = require("../../partials/MapBox");
var MapStyles_1 = require("./components/MapStyles");
var getUniqMapControls_1 = require("../../helpers/getUniqMapControls");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.closeMapBox = function () {
            _this.setState({
                showBox: !_this.state.showBox,
                mapZoom: _this.state.defaultMapZoom,
                mapCenter: _this.state.defaultMapCenter
            });
        };
        _this.resetFilters = function () {
            _this.setState({
                countrySelectedValue: 'all',
                citySelectedValue: 'all',
                serviceSelectedValue: 'all',
                addFilterSelectedValue: 'all',
                showBox: false
            });
        };
        _this.apiIsLoaded = function (map, maps) {
            _this.setState({ map: map });
        };
        _this.state = {
            countrySelectedValue: 'all',
            citySelectedValue: 'all',
            serviceSelectedValue: 'all',
            addFilterSelectedValue: 'all',
            defaultMapCenter: {
                lat: 50,
                lng: 14
            },
            defaultMapZoom: 5,
            mapCenter: {
                lat: 50,
                lng: 14
            },
            mapZoom: 5,
            cities: [],
            countries: [],
            addFilters: [],
            currrentEmail: '',
            currentPhone: '',
            currentTitle: '',
            currentAddress: '',
            currentCountry: '',
            currentCity: '',
            currentService: '',
            showBox: false,
            lat: 0,
            lng: 0,
            web: null,
            text: '',
            storeChief: '',
            name: '',
            position: '',
            map: {}
        };
        _this.setMapBox = _this.setMapBox.bind(_this);
        return _this;
    }
    Map.prototype.readLatLng = function (item) {
        return {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng)
        };
    };
    Map.prototype.setMapBox = function (item) {
        this.setState({
            lat: item.lat,
            lng: item.lng,
            currrentEmail: item.email,
            currentPhone: item.phone,
            currentTitle: item.title,
            currentAddress: item.address,
            currentCountry: item.country,
            currentCity: item.city,
            currentService: item.service,
            web: item.web,
            storeChief: item.storeChief,
            text: item.text,
            name: item.name,
            position: item.position,
            showBox: item ? true : !this.state.showBox,
            mapZoom: 14,
            mapCenter: this.readLatLng(item)
        });
    };
    Map.prototype.renderServiceRows = function (mapItems) {
        var _this = this;
        var countries = getUniqMapControls_1.default(mapItems).countries;
        var resultRows = [];
        for (var i = 0; i < countries.length; i++) {
            var composedRows = [];
            for (var j = 0; j < mapItems.length; j++) {
                if (mapItems[j].country === countries[i]) {
                    if (mapItems[j].country === this.state.countrySelectedValue || this.state.countrySelectedValue === 'all') {
                        if (mapItems[j].city === this.state.citySelectedValue || this.state.citySelectedValue === 'all') {
                            if (mapItems[j].addFilter && mapItems[j].addFilter.includes(this.state.addFilterSelectedValue)
                                || mapItems[j].addFilter === this.state.addFilterSelectedValue
                                || this.state.addFilterSelectedValue === 'all') {
                                composedRows.push({
                                    city: mapItems[j].city,
                                    service: mapItems[j].service,
                                    country: mapItems[j].country,
                                    title: mapItems[j].title,
                                    text: mapItems[j].text,
                                    address: mapItems[j].address,
                                    storeChief: mapItems[j].storeChief,
                                    email: mapItems[j].email,
                                    phone: mapItems[j].phone,
                                    web: mapItems[j].web,
                                    addFilter: mapItems[j].addFilter,
                                    lat: mapItems[j].lat,
                                    lng: mapItems[j].lng,
                                    name: mapItems[j].name,
                                    position: mapItems[j].position,
                                });
                            }
                        }
                    }
                }
            }
            if (this.state.countrySelectedValue === countries[i] || this.state.countrySelectedValue === 'all') {
                if (composedRows.some(function (item) { return item.addFilter && item.addFilter.includes(_this.state.addFilterSelectedValue); })
                    || mapItems.addFilter === this.state.addFilterSelectedValue
                    || this.state.addFilterSelectedValue === 'all') {
                    resultRows.push(React.createElement(MapRows_1.default, { key: i, title: countries[i], items: composedRows.reverse(), open: this.setMapBox }));
                }
            }
        }
        return resultRows;
    };
    Map.prototype.renderContactRows = function (mapItems) {
        var services = getUniqMapControls_1.default(mapItems).services;
        var resultRows = [];
        for (var i = 0; i < services.length; i++) {
            var composedRows = [];
            for (var j = 0; j < mapItems.length; j++) {
                if (mapItems[j].service === services[i]) {
                    if (mapItems[j].service === this.state.serviceSelectedValue || this.state.serviceSelectedValue === 'all') {
                        composedRows.push({
                            name: mapItems[j].name,
                            position: mapItems[j].position,
                            email: mapItems[j].email,
                            phone: mapItems[j].phone,
                            web: mapItems[j].web
                        });
                    }
                }
            }
            if (this.state.serviceSelectedValue === services[i] || this.state.serviceSelectedValue === 'all') {
                resultRows.push(React.createElement(ContactRow_1.default, { key: i, title: services[i], rows: composedRows }));
            }
        }
        return resultRows;
    };
    Map.prototype.defineLocation = function (loc, type, mapItems) {
        var _loop_1 = function (i) {
            if (mapItems[i][type] === loc) {
                switch (type) {
                    case 'country':
                        this_1.setState({
                            citySelectedValue: 'all',
                            countrySelectedValue: mapItems[i].country,
                            mapZoom: 6
                        });
                        break;
                    case 'city':
                        this_1.setState({
                            countrySelectedValue: mapItems[i].country,
                            mapZoom: 11
                        });
                        break;
                    case 'service':
                        this_1.setState({
                            countrySelectedValue: mapItems[i].country,
                            citySelectedValue: mapItems[i].city,
                            mapZoom: 15
                        });
                        break;
                    default: break;
                }
                if (mapItems[i].lat > 85) {
                    var countryMapItems = mapItems.filter(function (item) { return item.country === mapItems[i].country && item.lat < 85; });
                    if (countryMapItems.length === 0) {
                        return { value: this_1.state.mapCenter };
                    }
                    return { value: {
                            lat: parseFloat(countryMapItems[0].lat),
                            lng: parseFloat(countryMapItems[0].lng)
                        } };
                }
                return { value: {
                        lat: parseFloat(mapItems[i].lat),
                        lng: parseFloat(mapItems[i].lng)
                    } };
            }
        };
        var this_1 = this;
        for (var i = 0; i < mapItems.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    Map.prototype.filterCities = function (country, mapItems) {
        var filteredCities = [];
        mapItems.forEach(function (item) {
            // tslint:disable-next-line: no-unused-expression
            item && item.country && item.city && item.country === country ? filteredCities.push(item.city) : '';
        });
        return filteredCities;
    };
    Map.prototype.filterCountries = function (addFilter, mapItems) {
        var filteredCountries = [];
        mapItems.forEach(function (item) {
            item && item.addFilter && item.country && item.addFilter.includes(addFilter)
                ? filteredCountries.push(item.country)
                // tslint:disable-next-line: no-unused-expression
                : '';
        });
        var uniqFilteredCountries = Array.from(new Set(filteredCountries));
        return uniqFilteredCountries;
    };
    Map.prototype.filterAddFilter = function (country, mapItems, addFilter) {
        var filteredAddFilter = [];
        mapItems.forEach(function (item) {
            item && item.country && item.addFilter && item.country.trim() === country.trim()
                ? addFilter.map(function (i) { return item.addFilter.includes(i) ? filteredAddFilter.push(i) : null; })
                // tslint:disable-next-line: no-unused-expression
                : '';
        });
        var uniqFilteredAddFilter = Array.from(new Set(filteredAddFilter));
        return uniqFilteredAddFilter;
    };
    Map.prototype.onSelectChange = function (event, mapItems, type) {
        var safeSearchTypeValue = event.currentTarget.value;
        switch (type) {
            case 'country':
                this.setState({
                    showBox: false,
                    countrySelectedValue: safeSearchTypeValue,
                    mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
                });
                break;
            case 'city':
                this.setState({
                    showBox: false,
                    citySelectedValue: safeSearchTypeValue,
                    mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
                });
                break;
            case 'service':
                this.setState({
                    showBox: true,
                    serviceSelectedValue: safeSearchTypeValue,
                    mapCenter: this.defineLocation(safeSearchTypeValue, type, mapItems)
                });
                break;
            case 'addFilter':
                this.setState({
                    showBox: false,
                    addFilterSelectedValue: safeSearchTypeValue,
                });
                break;
            default: return;
        }
    };
    Map.prototype.renderControls = function (mapItems) {
        var _this = this;
        var _a = getUniqMapControls_1.default(mapItems), countries = _a.countries, addFilters = _a.addFilters;
        var cities = this.filterCities(this.state.countrySelectedValue, mapItems).sort();
        var filteredCountries = this.filterCountries(this.state.addFilterSelectedValue, mapItems).sort();
        var filteredAddFilter = this.filterAddFilter(this.state.countrySelectedValue, mapItems, addFilters).sort();
        return (React.createElement("div", { className: 'mapControls' },
            React.createElement("div", { className: 'container' },
                React.createElement("div", { className: "row justify-content-center" },
                    this.props.thirdFilter && React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", { onChange: function (e) { return _this.onSelectChange(e, mapItems, 'addFilter'); }, value: this.state.addFilterSelectedValue },
                                this.state.addFilterSelectedValue === 'all' &&
                                    React.createElement("option", { key: "addFilterSelectedValue" }, this.props.addFilterText),
                                this.state.countrySelectedValue === 'all'
                                    ? addFilters && addFilters.map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })
                                    : addFilters && this.orderByAlphabet(filteredAddFilter).map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })))),
                    React.createElement("div", { className: "col-12 col-md-4 col-lg-3" },
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", { value: this.state.countrySelectedValue, onChange: function (e) { _this.onSelectChange(e, mapItems, 'country'); } },
                                this.state.countrySelectedValue === 'all' &&
                                    React.createElement("option", { key: "countrySelectedValue" }, "Select country"),
                                this.state.addFilterSelectedValue === 'all'
                                    ? countries && this.orderByAlphabet(countries).map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })
                                    : filteredCountries && this.orderByAlphabet(filteredCountries).map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })))),
                    this.state.countrySelectedValue !== 'all' &&
                        React.createElement("div", { className: "col-12 col-md-4 col-lg-3" },
                            React.createElement("div", { className: 'select' },
                                React.createElement("select", { onChange: function (e) { return _this.onSelectChange(e, mapItems, 'city'); }, value: this.state.citySelectedValue },
                                    this.state.citySelectedValue === 'all' &&
                                        React.createElement("option", { key: "citySelectedValue" }, "Select city"),
                                    cities && cities.map(function (item, i) { return (
                                    // item.children === this.state.countrySelectedValue
                                    React.createElement("option", { key: i, value: item }, item)); })))),
                    React.createElement("div", { className: "col-12 col-md-4 col-lg-3" },
                        React.createElement("button", { className: 'btn', onClick: function () { return _this.resetFilters(); } }, "reset filters"))))));
    };
    Map.prototype.orderByAlphabet = function (item) {
        item.sort();
        return item;
    };
    Map.prototype.render = function () {
        var _this = this;
        var _a = this.props, mapItems = _a.mapItems, type = _a.type;
        // FOR TESTS
        // for (let i = 0; i < mapItems.length; i++) {
        //   mapItems[i].service = mapItems[i].association;
        // }
        return (React.createElement(React.Fragment, null,
            this.renderControls(mapItems),
            React.createElement("section", { className: 'map' },
                this.state.showBox &&
                    React.createElement(MapBox_1.default, { web: this.state.web, text: this.state.text, city: this.state.currentCity, service: this.state.currentService, storeChief: this.state.storeChief, email: this.state.currrentEmail, phone: this.state.currentPhone, title: this.state.currentTitle, address: this.state.currentAddress, country: this.state.currentCountry, name: this.state.name, position: this.state.position, onClick: function () { return _this.closeMapBox(); } }),
                React.createElement(google_map_react_1.default, { yesIWantToUseGoogleMapApiInternals: true, bootstrapURLKeys: { key: exports.GoogleMapsApiKey }, defaultCenter: this.state.defaultMapCenter, center: this.state.mapCenter, defaultZoom: this.state.defaultMapZoom, zoom: this.state.mapZoom, options: {
                        scrollwheel: false,
                        styles: MapStyles_1.default
                    }, onGoogleApiLoaded: function (_a) {
                        var map = _a.map, maps = _a.maps;
                        return _this.apiIsLoaded(map, maps);
                    } }, mapItems && mapItems
                    .filter(function (item) { return Math.abs(item.lng) && Math.abs(item.lat)
                    && (item.country === _this.state.countrySelectedValue || _this.state.countrySelectedValue === 'all')
                    && (item.city === _this.state.citySelectedValue || _this.state.citySelectedValue === 'all')
                    && (item.addFilter === _this.state.addFilterSelectedValue
                        || item.addFilter && item.addFilter.includes(_this.state.addFilterSelectedValue)
                        || _this.state.addFilterSelectedValue === 'all'); })
                    .map(function (item, i) {
                    return (React.createElement(Marker_1.default, { key: i, lat: parseFloat(item.lat), lng: parseFloat(item.lng), onClick: function () { return _this.setMapBox(item); } }));
                }))),
            React.createElement("div", { className: 'mapRows' }, type === 'service' ? this.renderServiceRows(mapItems) : this.renderContactRows(mapItems))));
    };
    return Map;
}(React.Component));
exports.default = react_geolocated_1.geolocated()(Map);
//# sourceMappingURL=Map.js.map