const PropTypes = require('prop-types');
const moment = require('moment');

const types = {};

const DatePicker = {
  propTypes: {
    defaultValue: PropTypes.instanceOf(moment), // to set default date, if start time or end time is null or undefined, the date range will be an open interval
    defaultPickerValue: PropTypes.instanceOf(moment), // to set default picker date
    disabledTime: PropTypes.func, // to specify the time that cannot be selected
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // to set the date format, refer to moment.js. When an array is provided, all values are used for parsing and first value is used for formatting.
    renderExtraFooter: PropTypes.func, // render extra footer in panel
    showToday: PropTypes.bool, // whether to show "Today" button
    value: PropTypes.instanceOf(moment), // to set date
    onChange: PropTypes.func, // a callback function, can be executed when the selected time is changing
    onOk: PropTypes.func, // callback when click ok button
  },
  defaultProps: {
    defaultValue: null,
    defaultPickerValue: null,
    disabledTime: null,
    format: 'YYYY-MM-DD',
    renderExtraFooter: null,
    showToday: true,
    value: null,
    onChange: null,
    onOk: null,
  },
};
const MonthPicker = {
  propTypes: {
    defaultValue: PropTypes.instanceOf(moment), // to set default date
    defaultPickerValue: PropTypes.instanceOf(moment), // to set default picker date
    format: PropTypes.string, // to set the date format, refer to moment.js
    monthCellContentRender: PropTypes.func, // Custom month cell content render method
    renderExtraFooter: PropTypes.node, // render extra footer in panel
    value: PropTypes.instanceOf(moment), // to set date
    onChange: PropTypes.func, // a callback function, can be executed when the selected time is changing
  },
  defaultProps: {
    defaultValue: null,
    defaultPickerValue: null,
    format: 'YYYY-MM',
    monthCellContentRender: null,
    renderExtraFooter: null,
    value: null,
    onChange: null,
  },
};
const WeekPicker = {
  propTypes: {
    defaultValue: PropTypes.instanceOf(moment), // to set default date
    defaultPickerValue: PropTypes.instanceOf(moment), // to set default picker date
    format: PropTypes.string, // to set the date format, refer to moment.js
    value: PropTypes.instanceOf(moment), // to set date
    onChange: PropTypes.func, // a callback function, can be executed when the selected time is changing
    renderExtraFooter: PropTypes.node, // render extra footer in panel
  },
  defaultProps: {
    defaultValue: null,
    defaultPickerValue: null,
    format: 'YYYY-MM',
    value: null,
    onChange: null,
    renderExtraFooter: null,
  },
};
const RangePicker = {
  propTypes: {
    defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(moment)), // to set default date
    defaultPickerValue: PropTypes.arrayOf(PropTypes.instanceOf(moment)), // to set default picker date
    disabledTime: PropTypes.func, // to specify the time that cannot be selected
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), // to set the date format, refer to moment.js. When an array is provided, all values are used for parsing and first value is used for formatting.
    ranges: PropTypes.shape({}), // preseted ranges for quick selection
    renderExtraFooter: PropTypes.node, // render extra footer in panel
    separator: PropTypes.string, // set separator between inputs
    value: PropTypes.arrayOf(PropTypes.instanceOf(moment)), // to set date
    onCalendarChange: PropTypes.func, // a callback function, can be executed when the start time or the end time of the range is changing
    onChange: PropTypes.func, // a callback function, can be executed when the selected time is changing
    onOk: PropTypes.func, // callback when click ok button
  },
  defaultProps: {
    defaultValue: null,
    defaultPickerValue: null,
    disabledTime: null,
    format: 'YYYY-MM-DD HH:mm:ss',
    ranges: null,
    renderExtraFooter: null,
    separator: '~',
    value: null,
    onCalendarChange: null,
    onChange: null,
    onOk: null,
  },
};

types.DatePicker = DatePicker;
types.MonthPicker = MonthPicker;
types.WeekPicker = WeekPicker;
types.RangePicker = RangePicker;

module.exports = { types };
