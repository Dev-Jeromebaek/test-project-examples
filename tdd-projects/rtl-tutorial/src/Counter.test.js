import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('<Counter />', () => {
  it('<Counter /> 스냅샷', () => {
    const utils = render(<Counter />);
    expect(utils.container).toMatchSnapshot();
  });
  it('숫자와 두개 버튼 존재 확인', () => {
    const utils = render(<Counter />);
    utils.getByText('0');
    utils.getByText('+1');
    utils.getByText('-1');
  });
  it('증가 액션 확인', () => {
    const utils = render(<Counter />);
    const number = utils.getByText('0');
    const plusBtn = utils.getByText('+1');
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    expect(number).toHaveTextContent('2'); // jest-dom 의 확장 matcher 사용
    expect(number.textContent).toBe('2'); // textContent 를 직접 비교
  });
  it('감소 액션 확인', () => {
    const utils = render(<Counter />);
    const number = utils.getByText('0');
    const minusBtn = utils.getByText('-1');
    fireEvent.click(minusBtn);
    fireEvent.click(minusBtn);
    expect(number).toHaveTextContent('-2'); // jest-dom 의 확장 matcher 사용
  });
});