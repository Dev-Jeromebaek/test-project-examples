import React from 'react';
import PropTypes from 'prop-types';
import './Select.scss';
import { Select as AntdSelect } from 'antd';

// const { Option as AntOption, OptGroup  } = AntdSelect;

const propTypes = {
  size: PropTypes.string,
  disabled: PropTypes.bool,
  // list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
};
const defaultProps = {
  size: 'default',
  disabled: false,
  // list: [],
};

// const Select = (props) => {
//   const data =
//     props.list.length !== 0 ? (
//       props.list.map((item) => (
//         <AntdSelect.Option key={item.value} value={item.value}>
//           {item.value}
//         </AntdSelect.Option>
//       ))
//     ) : (
//       <div>Empty</div>
//     );
//   return <AntdSelect {...props}>{data}</AntdSelect>;
// };

const Select = (props) => <AntdSelect {...props}>{props.children ? props.children : ''}</AntdSelect>;

const Option = (props) => <AntdSelect.Option {...props}>{props.children ? props.children : ''}</AntdSelect.Option>;

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

Select.Option = Option;

export default Select;
