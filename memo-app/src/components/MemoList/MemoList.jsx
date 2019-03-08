import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { media, transitions } from 'lib/style-utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Memo from './Memo';

const Wrapper = styled.div`
  display: block;
  margin-top: 0.5rem;
  font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */

  ${media.mobile`
        margin-top: 0.25rem;
    `}

  .memo-enter {
    animation: ${transitions.stretchOut} 0.3s ease-in;
    animation-fill-mode: forwards;
  }

  .memo-leave {
    animation: ${transitions.shrinkIn} 0.15s ease-in;
    animation-fill-mode: forwards;
  }
`;

const MemoList = ({ memos, onOpen }) => {
  const memoList = memos.map((memo) => <Memo key={memo.get('id')} memo={memo} onOpen={onOpen} />);
  return (
    <Wrapper>
      <ReactCSSTransitionGroup
        transitionName="memo"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={150}
      >
        {memoList}
      </ReactCSSTransitionGroup>
    </Wrapper>
  );
};

MemoList.propTypes = {
  memos: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.body,
    }),
  ),
  onOpen: PropTypes.func,
};

export default MemoList;
