import React from 'react';
import PropTypes from 'prop-types';
import './Tag2.scss';
import { Tag as AntdTag } from 'antd';

const propTypes = {
  // Whether the Tag can be closed
  closable: PropTypes.bool,
  // Color of the Tag options: magenta, red, volcano, orange, gold, lime, green, cyan, blue, geekblue, purple, custom: #f50, #2db7f5, #87d068, #108ee9
  color: PropTypes.string,
  // what goes inside the tag
  text: PropTypes.string,
  // Callback executed when tag is closed
  onClose: PropTypes.func,
  // Whether the Tag is closed or not
  visible: PropTypes.bool,
};
const defaultProps = {
  closable: false,
  color: null,
  text: '',
  onClose: e => console.log(e),
  visible: true,
};

// checkableTag
const checkPropTypes = {
  // Checked status of Tag
  checked: PropTypes.bool,
  // Callback executed when Tag is checked/unchecked
  onChange: PropTypes.func,
};
const checkDefaultProps = {
  checked: false,
  onChange: checked => console.log(checked),
};

const Tag2 = props => {
  const { text } = props;
  return <AntdTag {...props}>{text}</AntdTag>;
};
const CheckableTag = props => {
  const { text } = props;
  return <AntdTag.CheckableTag {...props}>{text}</AntdTag.CheckableTag>;
};

Tag2.propTypes = propTypes;
Tag2.defaultProps = defaultProps;
CheckableTag.propTypes = { ...propTypes, ...checkPropTypes };
CheckableTag.defaultProps = { ...defaultProps, ...checkDefaultProps };

Tag2.CheckableTag = CheckableTag;

export default Tag2;
