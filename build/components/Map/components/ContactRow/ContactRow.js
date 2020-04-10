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
var ContactRow = /** @class */ (function (_super) {
    __extends(ContactRow, _super);
    function ContactRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            numberOfPage: 1
        };
        return _this;
    }
    ContactRow.prototype.render = function () {
        var _a = this.props, title = _a.title, rows = _a.rows;
        return (React.createElement("div", { className: 'contactRow' },
            React.createElement("div", { className: 'container' },
                React.createElement("div", { className: "row contactRow__divider" },
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("h3", null, title)),
                    React.createElement("div", { className: "col-12 col-md-9" },
                        React.createElement("div", { className: 'row' }, rows && rows.map(function (item, i) { return (React.createElement("div", { key: i, className: 'contactRow__item col-12 col-md-4' },
                            item.name && React.createElement("h5", null, item.name),
                            item.position && React.createElement("span", null, item.position),
                            item.web && item.web.url && item.web.url.trim()
                                && React.createElement("p", null,
                                    "W: ",
                                    React.createElement("a", { href: item.web.url, target: "_blank" }, item.web.url)),
                            item.email && React.createElement("p", null,
                                "M: ",
                                React.createElement("a", { href: "mailto:" + item.email }, item.email)),
                            item.phone && React.createElement("p", null,
                                "P: ",
                                React.createElement("a", { href: "tel:" + item.phone }, item.phone)))); })))))));
    };
    return ContactRow;
}(React.Component));
exports.default = ContactRow;
//# sourceMappingURL=ContactRow.js.map