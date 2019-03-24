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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import dateFns from 'date-fns';
import Responsive from 'react-responsive';
import Button from '@source/partials/Button';
import MapComponent from './Map/components/MapComponent';
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.onDateClick = function (day) {
            _this.setState({
                selectedDate: day
            });
        };
        _this.nextMonth = function () {
            _this.setState({
                currentMonth: dateFns.addMonths(_this.state.currentMonth, 1)
            });
        };
        _this.prevMonth = function () {
            _this.setState({
                currentMonth: dateFns.subMonths(_this.state.currentMonth, 1)
            });
        };
        _this.state = {
            switch: true,
            currentMonth: new Date(),
            selectedDate: new Date(),
            dates: _this.props.data.dates || []
        };
        return _this;
    }
    Calendar.prototype.renderHeader = function () {
        var dateFormat = 'MMMM YYYY';
        return (React.createElement("div", { className: "calendar__header row flex-middle" },
            React.createElement("div", { className: "col col-start", onClick: this.prevMonth },
                React.createElement("div", { className: "icon icon--left" })),
            React.createElement("div", { className: "col col-center" },
                React.createElement("h3", null, dateFns.format(this.state.currentMonth, dateFormat))),
            React.createElement("div", { className: "col col-end", onClick: this.nextMonth },
                React.createElement("div", { className: "icon icon--right" }))));
    };
    Calendar.prototype.renderDays = function () {
        var dateFormat = 'dddd';
        var days = [];
        var startDate = dateFns.startOfWeek(this.state.currentMonth);
        var Mobile = function (props) { return React.createElement(Responsive, __assign({}, props, { maxWidth: 767 })); };
        var Default = function (props) { return React.createElement(Responsive, __assign({}, props, { minWidth: 768 })); };
        for (var i = 0; i < 7; i++) {
            days.push(React.createElement("div", { className: "col col-center", key: i }, dateFns.format(dateFns.addDays(startDate, i), dateFormat)));
        }
        return (React.createElement("div", { className: "calendar__days" },
            React.createElement("div", { className: "row" }, days)));
    };
    Calendar.prototype.renderCells = function () {
        var _this = this;
        var _a = this.state, currentMonth = _a.currentMonth, selectedDate = _a.selectedDate;
        var monthStart = dateFns.startOfMonth(currentMonth);
        var monthEnd = dateFns.endOfMonth(monthStart);
        var startDate = dateFns.startOfWeek(monthStart);
        var endDate = dateFns.endOfWeek(monthEnd);
        var dateFormat = 'D';
        var rows = [];
        var rKey = 0;
        var days = [];
        var day = startDate;
        var formattedDate = '';
        while (day <= endDate) {
            var _loop_1 = function (i) {
                formattedDate = dateFns.format(day, dateFormat);
                var cloneDay = day;
                var myFormatOfDate = day.getDate() + "." + (day.getMonth() + 1) + "." + day.getFullYear();
                days.push(React.createElement("div", { className: "col cell " + (!dateFns.isSameMonth(day, monthStart)
                        ? 'disabled'
                        : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''), key: i, onClick: function () { return _this.onDateClick(dateFns.parse(cloneDay)); } },
                    React.createElement("span", { className: "number" }, formattedDate),
                    React.createElement("span", { className: "bg" }, formattedDate),
                    this_1.state.dates && this_1.state.dates.map(function (item, j) {
                        if (item.date === myFormatOfDate && dateFns.isSameMonth(day, monthStart)) {
                            return (React.createElement("div", { className: 'cell__content', key: j },
                                React.createElement("p", null, item.text),
                                React.createElement(Button, { url: item.url }, "See details")));
                        }
                    })));
                day = dateFns.addDays(day, 1);
            };
            var this_1 = this;
            for (var i = 0; i < 7; i++) {
                _loop_1(i);
            }
            rows.push(React.createElement("div", { key: 'row' + (++rKey).toString(), className: "row" }, days));
            days = [];
        }
        return React.createElement("div", { className: "calendar__body" }, rows);
    };
    Calendar.prototype.renderControls = function () {
        var _this = this;
        return (React.createElement("div", { className: 'calendar__controls' },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("span", { className: 'calendar__controls__selectLabel' }, "Select date:"),
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", null,
                                React.createElement("option", null, "Date")))),
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("span", { className: 'calendar__controls__selectLabel' }, "Search keyword:"),
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", null,
                                React.createElement("option", null, "Keywords")))),
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement("span", { className: 'calendar__controls__selectLabel' }, "Select country:"),
                        React.createElement("div", { className: 'select' },
                            React.createElement("select", null,
                                React.createElement("option", null, "Country")))),
                    React.createElement("div", { className: "col-12 col-md-3" },
                        React.createElement(Button, null, "Search events"))),
                React.createElement("div", { className: 'calendar__controls__switch' },
                    React.createElement("button", { className: "\n                calendar__controls__switch__btn \n                " + (this.state.switch ?
                            'calendar__controls__switch__btn--active' : ''), onClick: function () { return _this.setState({
                            switch: !_this.state.switch
                        }); } }, "Calendar"),
                    React.createElement("button", { className: "\n                calendar__controls__switch__btn \n                " + (!this.state.switch ?
                            'calendar__controls__switch__btn--active' : ''), onClick: function () { return _this.setState({
                            switch: !_this.state.switch
                        }); } }, "Map")))));
    };
    Calendar.prototype.renderMobileView = function () {
        var _this = this;
        var _a = this.state, currentMonth = _a.currentMonth, selectedDate = _a.selectedDate;
        var monthStart = dateFns.startOfMonth(currentMonth);
        var monthEnd = dateFns.endOfMonth(monthStart);
        var startDate = dateFns.startOfWeek(monthStart);
        var endDate = dateFns.endOfWeek(monthEnd);
        var dateFormat = 'D';
        var resultView = [];
        var rKey = 0;
        var days = [];
        var day = startDate;
        var formattedDate = '';
        var daysOfTheWeek = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ];
        var getDayofTheWeek = function (key) { return React.createElement("p", null, daysOfTheWeek[key]); };
        while (day <= endDate) {
            var _loop_2 = function (i) {
                var cloneDay = day;
                var myFormatOfDate = day.getDate() + "." + (day.getMonth() + 1) + "." + day.getFullYear();
                formattedDate = dateFns.format(day, dateFormat);
                if (dateFns.isSameMonth(day, monthStart)) {
                    days.push(React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-2" }, getDayofTheWeek(i)),
                        React.createElement("div", { className: "col-10" },
                            React.createElement("div", { className: "row mobileCell " + (!dateFns.isSameMonth(day, monthStart)
                                    ? 'disabled'
                                    : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''), key: i, onClick: function () { return _this.onDateClick(dateFns.parse(cloneDay)); } },
                                React.createElement("span", { className: "mobileCell__number" }, formattedDate),
                                React.createElement("span", { className: "mobileCell__bg" }, formattedDate),
                                this_2.state.dates && this_2.state.dates.map(function (item, j) {
                                    if (item.date === myFormatOfDate && dateFns.isSameMonth(day, monthStart)) {
                                        return (React.createElement("div", { className: 'mobileCell__content', key: j },
                                            React.createElement("p", null, item.text),
                                            React.createElement(Button, { url: item.url }, ">")));
                                    }
                                })))));
                }
                day = dateFns.addDays(day, 1);
            };
            var this_2 = this;
            for (var i = 0; i < 7; i++) {
                _loop_2(i);
            }
            resultView.push(React.createElement("div", { key: 'col' + (++rKey).toString(), className: 'calendar__mobileBody__week' }, days));
            days = [];
        }
        return React.createElement("div", { className: "calendar__mobileBody" }, resultView);
    };
    Calendar.prototype.render = function () {
        var Mobile = function (props) { return React.createElement(Responsive, __assign({}, props, { maxWidth: 767 })); };
        var Default = function (props) { return React.createElement(Responsive, __assign({}, props, { minWidth: 768 })); };
        return (React.createElement("div", { className: 'calendar' },
            this.renderControls(),
            this.state.switch ?
                React.createElement("div", { className: "container calendar__container" },
                    this.renderHeader(),
                    React.createElement(Default, null,
                        this.renderDays(),
                        this.renderCells()),
                    React.createElement(Mobile, null, this.renderMobileView())) :
                React.createElement(MapComponent, { controls: false, items: this.state.dates })));
    };
    return Calendar;
}(React.Component));
export default Calendar;
//# sourceMappingURL=Calendar.js.map