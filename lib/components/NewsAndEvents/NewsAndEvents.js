"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Media = _interopRequireDefault(require("../../../lib/partials/Media"));

var _Link = _interopRequireDefault(require("../../../lib/partials/Link"));

var _List = _interopRequireDefault(require("../List"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var NewsAndEvents =
/** @class */
function (_super) {
  __extends(NewsAndEvents, _super);

  function NewsAndEvents(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  NewsAndEvents.prototype.render = function () {
    var _a = this.props.data,
        newsAndEvents = _a.newsAndEvents,
        title = _a.title,
        showMore = _a.showMore;
    return React.createElement(_List.default, {
      data: newsAndEvents
    }, function (_a) {
      var data = _a.data;
      return React.createElement("div", {
        className: 'newsAndEvents'
      }, React.createElement("div", {
        className: 'container'
      }, title && React.createElement("h3", null, title), React.createElement("div", {
        className: 'newsAndEvents__list row'
      }, data.map(function (item, i) {
        return React.createElement("div", {
          key: i,
          className: 'newsAndEvents__list__item col'
        }, React.createElement("div", {
          className: "row"
        }, item.img && React.createElement(_Media.default, {
          type: 'image',
          data: item.img
        })), React.createElement("div", {
          className: "row"
        }, React.createElement("div", {
          className: 'newsAndEvents__list__item__content'
        }, React.createElement("p", null, React.createElement("span", {
          style: {
            color: '#e50000'
          }
        }, item.day), "/ ", item.mounthAndYear), React.createElement("h4", null, item.title), React.createElement("p", null, item.text), React.createElement(_Link.default, {
          url: item.url && item.url.url
        }, "More information"))));
      }))));
    });
  };

  return NewsAndEvents;
}(React.Component);

var _default = NewsAndEvents;
exports.default = _default;