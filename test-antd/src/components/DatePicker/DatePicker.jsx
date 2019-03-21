import React from 'react';
import './DatePicker.scss';
import { DatePicker as AntdDatePicker } from 'antd';

const DatePicker = props => <AntdDatePicker {...props} />;
const MonthPicker = props => <AntdDatePicker.MonthPicker {...props} />;
const WeekPicker = props => <AntdDatePicker.WeekPicker {...props} />;
const RangePicker = props => <AntdDatePicker.RangePicker {...props} />;

DatePicker.RangePicker = RangePicker;
DatePicker.MonthPicker = MonthPicker;
DatePicker.WeekPicker = WeekPicker;

export default DatePicker;
