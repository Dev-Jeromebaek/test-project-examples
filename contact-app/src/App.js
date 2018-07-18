import React, { Component } from 'react';

import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  // 데이터를 추가할 때마다 각 값의 고유한 id 값을 주려함.
  // id값을 setState하지 않은 이유는 id값은 랜더링 되는 값이 아니기 때문에 궂이 setState를 통해 넣어줄 필요가 없다.
  // setState를 하는 이유는 어떤 값이 수정됐을 때 리랜더링을 하기 위함인데 id 값은 그럴 필요가 없기 때문에...;
  id = 3;

  state = {
    information: [
      {
        id: 0,
        name: '백승엽',
        phone: '010-0000-0001'
      },
      {
        id: 1,
        name: 'Jerome',
        phone: '010-0000-0002'
      },
      {
        id: 2,
        name: 'Jerome.Baek',
        phone: '010-0000-0003'
      }
    ],
    // keyword는 이름으로 전화번호 찾기 기능을 만들기 위한 값.
    keyword: ''
  };

  // 값 입력 Create
  handleCreate = data => {
    //순서 1
    // PhoneForm Component로 전달해준 handleCreate에서 변경한 값을 확인하는 console
    console.log(data);

    //순서 3
    // 비구조 할당 문법을 사용하여 this.state.information의 값을 information 으로 변경 후 간단하게 사용할 예정.
    const { information } = this.state;

    // 순서 2
    // 자식 컴포넌트에서 전달받은 값을 이곳 state에 넣어 수정시킬 예정.
    // 여기서 react의 불변성의 대한 정의가 나오게 되는데
    // 값을 변경하게 될때는 항상 setState()함수를 실행시켜 값을 변경 시켜 주어야 하고,
    // 내부의 배열이나 객체를 변경하게 될 떄에는 기존의 배열이나 객체를 수정하지 않고 그것을 기반으로
    // 새로운 배열 혹은 객체를 만들어서 값을 주입해 주어야 함.
    // 그래서 push() 가 아닌 배열의 내장함수인 concat() 를 사용.
    this.setState({
      // information에 값을 넣는 방법 1
      // 방법 1
      // information: this.state.information.concat(data),
      // id: this.id++
      // 방법 2
      // information: information.concat({
      //   ...data,
      //   id: this.id++
      // })
      // 방법 3
      information: information.concat(
        Object.assign({}, data, {
          id: this.id++
        })
      )
    });
  };

  // 값 삭제 Remove
  // 불변성을 유지하기 위해 배열 내장함수인 .slice() 혹은 .filter() 함수를 사용하여 값을 삭제한다.
  handleRemove = id => {
    // 삭제하기위한 고유 key값인 id를 parameter로 받아온 뒤 그 값으로 삭제할 예정.
    // 비구조화 할당을 통해 information이라는 레퍼런스 생성
    const { information } = this.state;

    this.setState({
      // infomation의 info 값 중 info.id의 값이 parameter로 전달받은 id 값이 아닌 데이터들만 보여달라 라는 의미.(말이 어렵군..)
      information: information.filter(info => info.id !== id)
    });
    // 해당 만들어진 Remove함수를 PhoneInfoList 로 전달해줄 예정.
    // 전달 받은 Component에서는 받아온 onRemove값을 바로 PhoneInfo에 전달.
    // 삭제는 list에서 하는 것이기 때문?ㅋㅋ
  };

  // 값 수정
  // 값 수정 역시 삭제와 마찬가지로 불변성을 유지하기 위해 배열 내장 함수인 .slice() 와 .map()을 사용하여 값을 수정한다.
  // 수정상황에선 두가지 값을 가져와서 수정할 것임.
  // 바꾸려고 하는 값의 id와 어떤 값으로 바꿀지엔 대한 값을 가져옴.
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        // information안에 info 값을 parameter로 가져와서 infomation배열중 id 값이 parameter로 전달받은 id 값과 같을 경우
        // 해당 id에 ...data로 data 값을 넣어준다.
        info => {
          if (info.id === id) {
            return {
              id,
              ...data
            };
          }
          // 만약 id 값이 일치하지 않는다면 info를 그대로 넣어줌.
          return info;
        }
      )
    });
  };

  // 이름으로 전화번호 찾기 기능을 만들기 위한 handleChange() 함수 정의
  // keyword 변경 기능 함수
  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />

        {/* 검색 기능을 위한 input 태그 */}
        <input
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="이름을 검색하세요..."
        />

        {/* 자식 컴포넌트의 handleCreate를 통해 setState된 information 값을 확인 하기위한 코드작성 */}
        {JSON.stringify(this.state.information)}

        <PhoneInfoList
          // 주석처리한 부분은 기본 리스트 보여주는 data
          // data={this.state.information}

          // 검색 기능을 위해 검색 한 리스트만 렌더링
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
