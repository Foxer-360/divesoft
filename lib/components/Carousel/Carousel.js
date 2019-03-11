"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../../../lib/partials/Button"));

var _Slider = _interopRequireDefault(require("../../../lib/partials/Slider"));

var _Media = _interopRequireDefault(require("../../../lib/partials/Media"));

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

var Carousel =
/** @class */
function (_super) {
  __extends(Carousel, _super);

  function Carousel(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      galleryItems: _this.galleryItems()
    };
    return _this;
  }

  Carousel.prototype.galleryItems = function () {
    var slides = this.props.data.slides;
    var images = [];

    if (slides) {
      slides.map(function (slide, i) {
        if (slide.image) {
          images.push(React.createElement("div", {
            className: 'carousel__images__img'
          }, React.createElement("div", {
            className: 'container'
          }, React.createElement("div", {
            className: "carousel__images__img__content " + (slide.isCentred ? 'center' : '')
          }, slide.subTitle && React.createElement("h2", {
            style: slide.isBackgroundBlack ? {
              color: 'white'
            } : {}
          }, slide.subTitle), slide.title && React.createElement("h1", {
            style: slide.isBackgroundBlack ? {
              color: 'white'
            } : {}
          }, slide.title), slide.description && React.createElement("p", null, slide.description), slide.buttonTitle && React.createElement("div", {
            className: 'carousel__images__img__content__btnHolder',
            style: slide.isCentred ? {
              margin: '0 auto'
            } : {}
          }, React.createElement(_Button.default, {
            classes: (slide.isBackgroundBlack ? '' : 'btn--bordered') + " \n                                  " + (slide.isCentred ? 'btn--center' : ''),
            url: slide.url
          }, slide.buttonTitle)))), React.createElement(_Media.default, {
            key: i,
            type: 'image',
            data: slide.image
          })));
        }
      });
    }

    return images;
  };

  Carousel.prototype.render = function () {
    return React.createElement(_List.default, {
      data: this.state.galleryItems
    }, function (_a) {
      var data = _a.data;
      return React.createElement(_Slider.default, {
        delay: 10000,
        slides: data,
        autoplay: true,
        showDots: true,
        showArrows: true
      });
    });
  };

  return Carousel;
}(React.Component);

var _default = Carousel;
exports.default = _default;