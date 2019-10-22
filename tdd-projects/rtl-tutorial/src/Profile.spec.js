import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="jeromeBaek" name="백승엽" />);
    expect(utils.container).toMatchSnapshot();
  });
  it('shows the props correcly', () => {
    const utils = render(<Profile username="jeromeBaek" name="백승엽" />);
    utils.getByText('jeromeBaek');  // jeromeBaek 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText('(백승엽)');  // (백승엽) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText(/백/);  // 정규식 /백/ 을 통과하는 엘리먼트가 있는지 확인
  });
});