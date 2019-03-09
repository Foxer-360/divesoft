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
import * as React from 'react';
import Media from '@source/partials/Media';
import Link from '@source/partials/Link';
import List from '../List';
var NewsAndEvents = /** @class */ (function (_super) {
    __extends(NewsAndEvents, _super);
    function NewsAndEvents(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    NewsAndEvents.prototype.render = function () {
        var _a = this.props.data, newsAndEvents = _a.newsAndEvents, title = _a.title, showMore = _a.showMore;
        return (React.createElement(List, { data: newsAndEvents }, function (_a) {
            var data = _a.data;
            return (React.createElement("div", { className: 'newsAndEvents' },
                React.createElement("div", { className: 'container' },
                    title && React.createElement("h3", null, title),
                    React.createElement("div", { className: 'newsAndEvents__list row' }, data.map(function (item, i) { return (React.createElement("div", { key: i, className: 'newsAndEvents__list__item col' },
                        React.createElement("div", { className: "row" }, item.img && React.createElement(Media, { type: 'image', data: item.img })),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: 'newsAndEvents__list__item__content' },
                                React.createElement("p", null,
                                    React.createElement("span", { style: { color: '#e50000' } }, item.day),
                                    "/ ",
                                    item.mounthAndYear),
                                React.createElement("h4", null, item.title),
                                React.createElement("p", null, item.text),
                                React.createElement(Link, { url: item.url && item.url.url }, "More information"))))); })))));
        }));
    };
    return NewsAndEvents;
}(React.Component));
export default NewsAndEvents;
//# sourceMappingURL=NewsAndEvents.js.map