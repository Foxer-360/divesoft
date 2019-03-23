"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _List = _interopRequireDefault(require("../../../List"));

var _ServiceRowItem = _interopRequireDefault(require("./components/ServiceRowItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Faq = function Faq(props) {
  var title = props.title,
      items = props.items;
  return _react.default.createElement(_List.default, {
    data: items
  }, function (_a) {
    var data = _a.data;
    return _react.default.createElement("div", {
      className: 'faq'
    }, _react.default.createElement("div", {
      className: "container"
    }, _react.default.createElement("div", {
      className: "row faq__list"
    }, _react.default.createElement("div", {
      className: "col-12 col-md-3"
    }, _react.default.createElement("h3", null, title)), _react.default.createElement("div", {
      className: "col-12 col-md-9"
    }, data && data.map(function (item, i) {
      return _react.default.createElement(_ServiceRowItem.default, {
        key: i,
        title: item.title,
        text: item.text
      });
    })))));
  });
};

var _default = Faq;
exports.default = _default;