import React from 'react';
import Dialog from './Dialog';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'components|Dialog',
  component: Dialog,
  parameters: {
    docs: {
      inlineStories: false,
      // Docs 탭을 열었을 때 Docs 화면 자체를 다 가려버리는 상황을 방지
      // 이렇게 되면 Docs 부분에서 스토리를 보여줄 때
      // iframe 을 사용하게 되면서 컴포넌트가 영역 밖에 렌더링 되는 이슈가 해결 됩니다.
    },
  },
  decorators: [withKnobs],
};

export const dialog = () => {
  const title = text('title', '결제 성공');
  const description = text('description', '결제가 성공적으로 이루어졌습니다.');
  const visible = boolean('visible', true);
  const confirmText = text('confirmText', '확인');
  const cancelText = text('cancelText', '취소');
  const cancellable = boolean('cancellable', false);

  return (
    <Dialog
      title={title}
      description={description}
      visible={visible}
      confirmText={confirmText}
      cancelText={cancelText}
      cancellable={cancellable}
    />
  );
};

dialog.story = {
  name: 'Default',
};

export const cancellable = () => {
  return (
    <Dialog
      title='포스트 삭제'
      description='포스트를 정말로 삭제하시겠습니까?'
      visible={true}
      confirmText='삭제'
      cancellable
    />
  );
};

export const customContent = () => {
  return (
    <Dialog visible={true} hideButtons>
      Custom Content
    </Dialog>
  );
};
