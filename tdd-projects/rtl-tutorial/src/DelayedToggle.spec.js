import React from 'react';
import DelayedToggle from './DelayedToggle';
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  waitForDomChange,
  waitForElementToBeRemoved
} from '@testing-library/react';

describe('<DelayedToggle />', () => {
  //? wait
  //* 콜백 안의 함수가 에러가 발생시키지 않을 때 까지 기다리다가, 대기시간이 timeout을 초과하게되면
  //* 테스트 케이스가 실패. timeout은 기본값 4500mm이며, 이는 다음과 같이 커스터마이징 할 수 있다.
  it('reveals text when toggle is ON', async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    await wait(() => getByText('야호!!'), { timeout: 3000 }); // 콜백 안의 함수가 에러를 발생시키지 않을 때 까지 기다립니다. (기본 timeout은 4500)
  });

  //? waitForElement
  //* 특정 엘리먼트가, 나타났거나, 바뀌었거나, 사라질때까지 대기를 해준다.
  //* 그리고 프로미스가 끝날 때 선택한 엘리먼트를 resolve 한다.
  it('toggles text ON/OFF', async () => {
    const { getByText } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    const text = await waitForElement(() => getByText('ON'));
    expect(text).toHaveTextContent('ON');
  });

  //? waitForDomChange
  //* 검사하고 싶은 엘리먼트를 넣어주면 해당 엘리먼트에서 변화가 발생 할 때까지 기다려준다는 것.
  //* render를 했을때 결과값에 있는 container 를 넣어주면, 사전에 쿼리를 통하여 엘리먼트를 선택하지 않아도 변화가 발생했음을 감지할 수 있다.
  //* 또한 프로미스가 resolve 됐을 땐 mutationList 를 반환하여 DOM이 어떻게 바뀌었는지에 대한 정보를 알 수 있다.
  it('changes something when button is clicked', async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    const mutations = await waitForDomChange({ container });
    console.log(mutations);
  });

  //? waitForElementToBeRemove
  //* 특정 엘리먼트가 화면에서 사라질때까지 기다리는 함수.
  it('removes text when toggle is OFF', async () => {
    const { getByText, container } = render(<DelayedToggle />);
    const toggleButton = getByText('토글');
    fireEvent.click(toggleButton);
    await waitForDomChange({ container }); // ON 이 됨
    getByText('야호!!');
    fireEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => getByText('야호!!'));
  });
});