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
var helpers_1 = require("../../../../helpers");
var ImgWithFallback = /** @class */ (function (_super) {
    __extends(ImgWithFallback, _super);
    function ImgWithFallback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createVariantIfDoesNotExist = function () {
            var _a = _this.props, recommendedSizes = _a.recommendedSizes, originalData = _a.originalData;
            if (recommendedSizes) {
                fetch(helpers_1.readEnvVariable('REACT_APP_MEDIA_LIBRARY_SERVER') + "/createDimension", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: originalData.id,
                        width: parseInt(recommendedSizes.width, 10),
                        height: parseInt(recommendedSizes.height, 10),
                    }),
                })
                    .then(function (response) {
                    // this.getSizedUrl();
                })
                    .catch(function () {
                    console.error("There was an error creating variant");
                });
            }
        };
        _this.getSizedUrl = function () {
            var _a = _this.props, sizes = _a.recommendedSizes, originalData = _a.originalData, baseUrl = _a.baseUrl, hash = _a.hash, originalSrc = _a.originalSrc;
            if (sizes && sizes.width && sizes.height) {
                var filename = originalData.filename.split(".");
                filename[0] = filename[0] + "_" + sizes.width + "_" + sizes.height;
                filename = filename.join(".");
                return baseUrl + originalData.category + hash + "_" + filename;
            }
            return originalSrc;
        };
        _this.handleError = function (event) {
            var originalSrc = _this.props.originalSrc;
            _this.createVariantIfDoesNotExist();
            event.target.src = originalSrc;
        };
        return _this;
    }
    ImgWithFallback.prototype.render = function () {
        var _this = this;
        var _a = this.props, alt = _a.alt, recommendedSizes = _a.recommendedSizes, originalSrc = _a.originalSrc;
        var resizable = !originalSrc.includes('.svg');
        return (React.createElement("div", { className: "mediaRatio", style: {
                paddingTop: (parseInt(recommendedSizes ? recommendedSizes.width : 1, 10) /
                    parseInt(recommendedSizes ? recommendedSizes.height : 1, 10)) *
                    100 + "%",
            } },
            React.createElement("img", { alt: alt, className: "mediaImage inner", src: resizable ? this.getSizedUrl() : originalSrc, onError: this.handleError, onErrorCapture: this.handleError, onContextMenu: function () {
                    _this.createVariantIfDoesNotExist();
                } })));
    };
    return ImgWithFallback;
}(React.Component));
exports.default = ImgWithFallback;
//# sourceMappingURL=ImgWithFallback.js.map