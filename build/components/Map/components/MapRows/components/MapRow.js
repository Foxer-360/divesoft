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
var ReactMarkdown = require("react-markdown");
var MapRow = /** @class */ (function (_super) {
    __extends(MapRow, _super);
    function MapRow(props) {
        var _this = _super.call(this, props) || this;
        _this.renderListItem = function () {
            var _a = _this.props, address = _a.address, city = _a.city;
            return [address, city].filter(function (item) { return item && item.trim(); }).map(function (item) { return item.trim(); }).join(', ');
        };
        _this.state = {
            show: false
        };
        return _this;
    }
    MapRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, title = _a.title, text = _a.text, storeChief = _a.storeChief, phone = _a.phone, email = _a.email, web = _a.web;
        var url = web && web.url && web.url.trim && web.url.trim();
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-md-5" },
                React.createElement("h5", { onClick: function () { return _this.setState({ show: !_this.state.show }); } }, title),
                this.state.show ?
                    React.createElement("div", { className: 'mapRow__list__contacts' },
                        storeChief && React.createElement("p", null,
                            "Store chief: ",
                            storeChief),
                        phone && React.createElement("p", null,
                            "Phone: ",
                            React.createElement("a", { href: "tel:" + phone }, phone)),
                        email && React.createElement("p", null,
                            "Email: ",
                            React.createElement("a", { href: "mailto:" + email }, email)),
                        url && React.createElement("p", null,
                            "Web: ",
                            React.createElement("a", { href: url, target: '_blank' }, String(url)))) : ''),
            React.createElement("div", { className: "col-12 col-md-7" },
                React.createElement("div", { onClick: function () { return _this.setState({ show: !_this.state.show }); }, className: "mapRow__list__show " + (this.state.show ? 'mapRow__list__show--minus' : '') }),
                React.createElement("div", { className: 'mapRow__list__item' },
                    React.createElement("p", { onClick: function () { return _this.setState({ show: !_this.state.show }); } }, this.renderListItem()),
                    this.state.show && text && React.createElement(ReactMarkdown, { source: text }))),
            React.createElement("div", { className: 'mapRow__list__divider' })));
    };
    return MapRow;
}(React.Component));
exports.default = MapRow;
//# sourceMappingURL=MapRow.js.map