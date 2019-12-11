// src/components/Task.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Task from '../components/Task';

export const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};


//! #1
//! object를 직접 변경할 수 있도록 Konbs 설정
// storiesOf('Task', module)
//   .addDecorator(withKnobs)
//   .add('default', () => {
  //     return <Task task={object('task', { ...task })} {...actions} />;
  //   })
  //   .add('pinned', () => <Task task={{ ...task, state: 'TASK_PINNED' }} {...actions} />)
  //   .add('archived', () => <Task task={{ ...task, state: 'TASK_ARCHIVED' }} {...actions} />)
  //   .add('long title', () => <Task task={{ ...task, title: longTitle }} {...actions} />);
  
  //! #2 
  //! 항상 같은 입력 정보를 Konbs에 직접입력할 순 있지만, 
  //! 이 입력에 대해 고정된 값을 사용하는 것이 좋다. 
  //! 즉, 다음과 같이 변수에 담아 테스트용 입력을 사용하자.

  const longTitle = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not asdasdasdasdasd`;

  // storiesOf('Task', module)
  //   .add('default', () => <Task task={task} {...actions} />)
  //   .add('pinned', () => <Task task={{ ...task, state: 'TASK_PINNED' }} {...actions} />)
  //   .add('archived', () => <Task task={{ ...task, state: 'TASK_ARCHIVED' }} {...actions} />)
  //   .add('long title', () => <Task task={{ ...task, title: longTitle }} {...actions} />);

  //! #3 
  //! asset parameter를 추가.

  storiesOf('Task', module)
    .addDecorator(withKnobs)
    .addParameters({
      assets: [
        "path/to/your/asset.png",
        "path/to/another/asset.png",
        "path/to/yet/another/asset.png"
      ]
    })
    .add('default', () => <Task task={task} {...actions} />)
    .add('pinned', () => <Task task={{ ...task, state: 'TASK_PINNED' }} {...actions} />)
    .add('archived', () => <Task task={{ ...task, state: 'TASK_ARCHIVED' }} {...actions} />)
    .add('long title', () => <Task task={{ ...task, title: longTitle }} {...actions} />);