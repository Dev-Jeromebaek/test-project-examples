import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.scss';
import { PageHeader as AntdPageHeader, Icon, Tabs } from 'antd';
import { Tag2 } from '../../components/Tag2';

const propTypes = {
  // custom title text
  title: PropTypes.node,
  // custom subTitle text
  subTitle: PropTypes.node,
  // custom back icon, if false the back icon will not be displayed
  backIcon: PropTypes.node,
  // Tag list next to title
  tags: PropTypes.arrayOf(PropTypes.object),
  // Operating area, at the end of the line of the title line
  extra: PropTypes.arrayOf(PropTypes.node),
  // PageHeader's footer, generally used to render TabBar
  footer: PropTypes.node,
  // back icon click event
  onBack: PropTypes.func,
};
const defaultProps = {
  title: 'Title',
  subTitle: undefined,
  backIcon: <Icon type="arrow-left" />,
  tags: [],
  extra: undefined, // [<Button key="3">Operation</Button>, <Button key="2">Operation</Button>, <Button key="1" type="primary">Primary</Button>]
  footer: undefined, // <Tabs defaultActiveKey="1"> <TabPane tab="Details" key="1" /> <TabPane tab="Rule" key="2" /> </Tabs>
  onBack: () => window.history.back(),
};

const PageHeader = ({ title, subTitle, backIcon, tags, extra, footer, onBack }) => {
  const tagList =
    tags.length !== 0 ? (
      <>
        {tags.map((item) => (
          <Tag2 key={item.id} text={item.text} color={item.color} />
        ))}
      </>
    ) : (
      undefined
    );
  return (
    <AntdPageHeader
      title={title}
      subTitle={subTitle}
      backIcon={backIcon}
      tags={tagList}
      extra={extra}
      footer={footer}
      onBack={onBack}
    />
  );
};

PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

export default PageHeader;
