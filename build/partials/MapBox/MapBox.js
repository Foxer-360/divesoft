"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function MapBox(props) {
    var title = props.title, country = props.country, address = props.address, city = props.city, email = props.email, phone = props.phone, service = props.service, storeChief = props.storeChief, text = props.text, web = props.web, name = props.name, position = props.position, keywords = props.keywords, onClick = props.onClick;
    var url = web && web.url && web.url.trim && web.url.trim();
    return (React.createElement("div", { className: 'mapBox' },
        React.createElement("div", { className: 'mapBox--close', onClick: function () { return onClick(); } }),
        title && React.createElement("h3", null, title),
        name && React.createElement("h3", null, name),
        keywords && React.createElement("p", null, keywords),
        country && React.createElement("h4", null,
            country,
            ' ',
            React.createElement("span", { style: { color: '#6c6c6c', fontSize: '1.6rem' } }, city)),
        address && React.createElement("h5", null, address),
        position && React.createElement("h5", null, position),
        React.createElement("div", { className: 'mapBox__info' },
            phone && React.createElement("p", null,
                "Phone: ",
                React.createElement("a", { href: "tel:" + phone }, phone)),
            email && React.createElement("p", null,
                "Email: ",
                React.createElement("a", { href: "mailto:" + email }, email)),
            url && React.createElement("p", null,
                "Web: ",
                React.createElement("a", { href: url, target: '_blank' }, String(url))),
            storeChief && React.createElement("p", null,
                "Store chief: ",
                storeChief),
            service && React.createElement("p", null,
                "Service: ",
                service),
            text && React.createElement("p", null, text))));
}
exports.MapBox = MapBox;
exports.default = MapBox;
//# sourceMappingURL=MapBox.js.map