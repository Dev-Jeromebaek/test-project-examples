import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  // default값을 정의할 때는 꼭 static 키워드를 작성해 주어야 함.
  // 혹시 부모 Component에서 data 라는 값이 전달 되지 않은 상황을 방지.
  static defaultProps = {
    data: []
  };

  render() {
    const { data, onRemove, onUpdate } = this.props;
    // data 안에 있는 info 라는 것을 PhoneInfo component에 전달 해줄 것임.
    // 여기서 key값이 필요한데 아래 상황처럼 component를 여러개 랜더링 하게 될 때,
    // 고유값을 정해줌으로써 나중에 업데이트 성능을 최적화 시켜준다(?)

    // 그런데 만약 props에서 data라는 값이 전달되지 않은 상황이라면
    // Cannot read property 'map' of undefined 라는 에러를 발생시키는데,
    // 이에 대한 해결 방법은 아래와같이 data가 없을경우 null로 리턴하여 더이상 진행시키지 않겠다고 선언 해주는 것과,
    // defaultProps를 설정해주는 방법이 있음.
    if (!data) return null;

    console.log('rendering list');

    // Remove!!!!!!!!!!! 받아온 onRemove값을 바로 PhoneInfo Component에 전달!
    const list = data.map(info => (
      <PhoneInfo
        onRemove={onRemove}
        onUpdate={onUpdate}
        info={info}
        key={info.id}
      />
    ));
    // 배열 렌더링 할때의 key 값이란?
    // key 값이 없다면?
    // ['a', 'b', 'c', 'd'] 라는 배열이 있다고 가정했을 때,
    // 기본적으로 a b c d 순으로 component가 생성된다면,
    // 이때 ['a', 'b', 'z', 'c', 'd'] 해당 배열처럼 중간데 z라는 값이 들어가게 된다면,
    // 컴포넌트 전체의 순서가 바뀌고 a b z c d 순으로 component가 생성된다.
    // 또 ['b', 'z', 'c', 'd'] 해당 배열처럼 a가 사라진다면,
    // 전체의 순서가 변경되고, 5개였던 component의 마지막 하나는 값이 없기때문에 사라지게된다.

    // key 값이 있다면?
    // 배열의 값이 변경되었을 때 기존에 있던 다른 component들은 영향을 받지않고
    // 새로 생기거나 삭제되는 값의 component에만 독립적으로 영향을 주게된다.

    // 물론 key 값이 없어도 렌더링 되긴 하지만 react에서 key값이 없다는 warning이 발생하여 key 값을 정해주길 권한다.
    // 이때 단순히 배열의 index가 key값으로 생성되어 사용된다.

    // key값과 index값이 다른 점이란?
    // 예를들어 component를 제거할 때 상황에 key값과 index가 다르게 작동 하게되는 것을 확인 해볼 예정.

    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
