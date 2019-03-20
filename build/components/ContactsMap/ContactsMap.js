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
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
export var GoogleMapsApiKey = 'AIzaSyCSpatDLsxXguzdvuwbTrK3TulOh10MULI';
import List from '../List';
import Marker from './components/Marker';
import MapStyles from './components/MapStyles';
import ContactRow from './components/ContactRow';
var ContactsMap = /** @class */ (function (_super) {
    __extends(ContactsMap, _super);
    function ContactsMap(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () { return _this.getUniqControlProps(); };
        _this.state = {
            countrySelectedValue: '',
            citySelectedValue: '',
            associationSelectedValue: '',
            mapCenter: { lat: 50, lng: 14 },
            cities: [],
            countries: [],
            associations: []
        };
        return _this;
    }
    ContactsMap.prototype.getUniqControlProps = function () {
        var uniqCities = [];
        var uniqCountries = [];
        var uniqAssociations = [];
        var mapItems = this.props.data.mapItems;
        var propsToArray = function () {
            for (var i = 0; i < mapItems.length; i++) {
                uniqCountries.push(mapItems[i].country);
            }
            for (var i = 0; i < mapItems.length; i++) {
                uniqCities.push(mapItems[i].city);
            }
            for (var i = 0; i < mapItems.length; i++) {
                uniqAssociations.push(mapItems[i].association);
            }
        };
        var uniqueArray = function (arr) { return Array.from(new Set(arr)); };
        propsToArray();
        uniqCities = uniqueArray(uniqCities);
        uniqCountries = uniqueArray(uniqCountries);
        uniqAssociations = uniqueArray(uniqAssociations);
        return this.setState({
            cities: uniqCities,
            countries: uniqCountries,
            associations: uniqAssociations
        });
    };
    ContactsMap.prototype.defineLocation = function (loc, type) {
        var mapItems = this.props.data.mapItems;
        for (var i = 0; i < mapItems.length; i++) {
            if (mapItems[i][type] === loc) {
                switch (type) {
                    case 'country':
                        this.setState({
                            citySelectedValue: mapItems[i].city,
                            associationSelectedValue: mapItems[i].association
                        });
                        break;
                    case 'city':
                        this.setState({
                            countrySelectedValue: mapItems[i].country,
                            associationSelectedValue: mapItems[i].association
                        });
                        break;
                    case 'association':
                        this.setState({
                            countrySelectedValue: mapItems[i].country,
                            citySelectedValue: mapItems[i].city
                        });
                        break;
                    default: break;
                }
                return {
                    lat: mapItems[i].lat,
                    lng: mapItems[i].lng
                };
            }
        }
    };
    ContactsMap.prototype.onSelectChange = function (event, type) {
        var safeSearchTypeValue = event.currentTarget.value;
        switch (type) {
            case 'country':
                this.setState({ countrySelectedValue: safeSearchTypeValue });
                this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
                break;
            case 'city':
                this.setState({ citySelectedValue: safeSearchTypeValue });
                this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
                break;
            case 'association':
                this.setState({ associationSelectedValue: safeSearchTypeValue });
                this.setState({ mapCenter: this.defineLocation(safeSearchTypeValue, type) });
                break;
            default: return;
        }
    };
    ContactsMap.prototype.renderControls = function () {
        var _this = this;
        var _a = this.state, cities = _a.cities, countries = _a.countries, associations = _a.associations;
        return (React.createElement("div", { className: 'map__controls' },
            React.createElement("div", { className: 'container' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-12 col-md-4" },
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", { onChange: function (e) { return _this.onSelectChange(e, 'country'); }, value: this.state.countrySelectedValue }, countries && countries.map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })))),
                    React.createElement("div", { className: "col-12 col-md-4" },
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", { onChange: function (e) { return _this.onSelectChange(e, 'city'); }, value: this.state.citySelectedValue }, cities && cities.map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); })))),
                    React.createElement("div", { className: "col-12 col-md-4" },
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", { onChange: function (e) { return _this.onSelectChange(e, 'association'); }, value: this.state.associationSelectedValue }, associations && associations.map(function (item, i) { return (React.createElement("option", { key: i, value: item }, item)); }))))))));
    };
    ContactsMap.prototype.renderRows = function () {
        var mapItems = this.props.data.mapItems;
        var associations = this.state.associations;
        var resultRows = [];
        // name: string;
        // position: string;
        // email: string;
        // phone: string;
        // web: LooseObject;
        for (var i = 0; i < associations.length; i++) {
            var composedRows = [];
            for (var j = 0; j < mapItems.length; j++) {
                if (mapItems[j].association === associations[i]) {
                    composedRows.push({
                        name: mapItems[j].name,
                        position: mapItems[j].position,
                        email: mapItems[j].email,
                        phone: mapItems[j].phone,
                        web: mapItems[j].web
                    });
                }
            }
            resultRows.push(React.createElement(ContactRow, { key: i, title: associations[i], rows: composedRows }));
        }
        return resultRows;
    };
    ContactsMap.prototype.render = function () {
        var _this = this;
        var _a = this.props.data, title = _a.title, mapItems = _a.mapItems;
        return (React.createElement(List, { data: mapItems }, function (_a) {
            var data = _a.data;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { width: '100%', position: 'relative' } },
                    title ? React.createElement("h2", { style: { paddingBottom: '30px', textAlign: 'center' } }, title) : '',
                    React.createElement("section", { className: 'map' },
                        _this.renderControls(),
                        mapItems && (React.createElement(GoogleMapReact, { yesIWantToUseGoogleMapApiInternals: true, bootstrapURLKeys: { key: GoogleMapsApiKey }, defaultCenter: { lat: 50, lng: 14 }, center: _this.state.mapCenter, defaultZoom: 5, options: {
                                scrollwheel: false,
                                styles: MapStyles
                            } }, data && data.map(function (item, i) { return (React.createElement(Marker, { key: i, lat: item.lat, lng: item.lng })); }))))),
                _this.renderRows()));
        }));
    };
    return ContactsMap;
}(React.Component));
export default geolocated()(ContactsMap);
//# sourceMappingURL=ContactsMap.js.map