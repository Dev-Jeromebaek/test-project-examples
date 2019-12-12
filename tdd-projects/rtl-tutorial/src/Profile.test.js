import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matched snapshot', () => {
    const utils = render(<Profile username="seungyeob" name="승엽" />);
    expect(utils.container).toMatchSnapshot();
  });
  it('shows the props correctly', () => {
    const utils = render(<Profile username="seungyeob" name="승엽" />);
    utils.getByText('seungyeob'); // seungyeob 라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText('(승엽)'); // (승엽) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText(/엽/); // 정규식 /엽/ 을 통과하는 엘리먼트가 있는지 확인
  });
});