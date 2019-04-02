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
import React from 'react';
import SearchResults from '../SearchResults';
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (value) {
            _this.setState({
                searchQuery: value,
            });
        };
        _this.unFocusSearch = function () {
            _this.setState({
                searchFocus: false,
            });
        };
        _this.focusSearch = function () {
            _this.searchInput.current.focus();
            _this.setState({
                searchFocus: true,
            });
        };
        _this.searchInput = React.createRef();
        _this.state = {
            searchFocus: false,
            searchQuery: '',
            value: ''
        };
        return _this;
    }
    Search.prototype.render = function () {
        var _this = this;
        var _a = this.state, searchFocus = _a.searchFocus, value = _a.value, searchQuery = _a.searchQuery;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'search' },
                React.createElement("div", { className: "container" },
                    React.createElement("input", { type: "text", placeholder: 'search', ref: this.searchInput, onFocus: function () { return _this.focusSearch(); }, onBlur: function () { return _this.unFocusSearch(); }, onChange: function (e) { return _this.handleChange(e.target.value); }, defaultValue: '' }),
                    value.length > 0 && (React.createElement("div", { className: 'textSearch__clear', onClick: function () {
                            _this.searchInput.current.value = '';
                            _this.handleChange('');
                        } }, "X")))),
            React.createElement(SearchResults, { searchQuery: this.state.searchQuery, active: this.state.searchQuery && this.state.searchQuery.length > 0, handleSearch: this.handleChange, languageCode: 'en' })));
    };
    return Search;
}(React.Component));
export default Search;
//# sourceMappingURL=Search.js.map