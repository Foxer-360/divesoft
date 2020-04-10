"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var List_1 = require("../List");
function ServicePointsMap(props) {
    var _a = props.data, title = _a.title, thirdFilter = _a.thirdFilter, addFilterText = _a.addFilterText, mapItems = _a.mapItems;
    return (React.createElement(List_1.default, { data: mapItems }, function (_a) {
        var data = _a.data;
        return (React.createElement("div", { className: 'servicePointsMapWrapper' },
            title ?
                React.createElement("div", { className: "container" },
                    React.createElement("p", { className: 'textDescription servicePointsMapWrapper__title' }, title)) : '',
            React.createElement(Map_1.default, { mapItems: data, thirdFilter: thirdFilter, addFilterText: addFilterText, type: 'service' })));
    }));
}
exports.default = ServicePointsMap;
//# sourceMappingURL=ServicePointsMap.js.map