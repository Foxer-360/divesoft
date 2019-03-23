import React from 'react';
import List from '../../../List';
import ServiceRowItem from './components/ServiceRowItem';
var Faq = function (props) {
    var title = props.title, items = props.items;
    return (React.createElement(List, { data: items }, function (_a) {
        var data = _a.data;
        return (React.createElement("div", { className: 'faq' },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row faq__list" },
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("h3", null, title)),
                    React.createElement("div", { className: "col-12 col-md-9" }, data && data.map(function (item, i) { return (React.createElement(ServiceRowItem, { key: i, title: item.title, text: item.text })); }))))));
    }));
};
export default Faq;
//# sourceMappingURL=ServiceRow.js.map