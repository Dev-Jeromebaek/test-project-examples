import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {
  // 수정 모드라는 것을 만들기 위한 state.editing
  state = {
    // 값이 true 일 경우 input 태그, false일 경우 div태그로 값을 보여주기만 할것임.
    editing: false,
    name: '',
    phone: ''
  };

  handleRemove = () => {
    // 비구조화 할당을 통해 부모 Component에서 전달받은 info 와 onRemove함수를 정의.
    const { info, onRemove } = this.props;
    // 정의된 onRemove함수를 통해 실질적으로 handleRemove() 함수가 실행될 부모 Component에 id값을 전달.
    onRemove(info.id);
  };

  // 수정을 위한 함수 선언
  // editing 값을 반전 시켜줄 것임.
  // input태그에 기본 값을 적용 시키고 싶을 땐 아래 함수에서 로직을 작성해 주어야 함.
  handleToggleEdit = () => {
    // 1. editing값이 true 에서 false로 전환될 때 하는 작업은,
    // 부모 컴포넌트에서 전달받은 onUpdate() 함수를 사용하여 부모 컴포넌트에 내가 업데이트 하겠다는 것을 알림.

    // 2. editing값이 false 에서 true로 전활될 때 하는 작업은,
    // props로 받아왔던 info 안에 있는 name과 phone값을 state에 넣어주는 작업을 진행.

    // 비구조화 할당 방식을 통해 info값과 onUpdate()함수 값에 대한 레퍼런스를 만들어줌
    const { info, onUpdate } = this.props;
    // 1. true 에서 false로 전환 될 때 ( 수정 모드 x )
    if (this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
      // 2. false 에서 true로 전환 될 때 ( 수정 모드 o )
    } else {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    this.setState({
      editing: !this.state.editing
    });
  };

  // 수정모드에서 input값이 변경되는 것에 대한 처리!
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // 성능 최적화를 위한 함수(불필요한 리렌더링을 막아준다!)
  shouldComponentUpdate(nextProps, nextState) {
    // 기본값은 return true;

    // state가 변경될 때는 언제나 업데이트를 해줄 것임.
    if (this.state !== nextState) {
      return true;
    }
    // props로 받아온 info 값이 달라졌다면 return false;
    return this.props.info !== nextProps.info;
    // 이 함수 선언 후 create, update, remove 작업한 함수를 실행시켜보자.
    // 변경된 부분만 렌더링 된 것을 확인할 수 있다.
  }

  render() {
    // 비구조화 할당으로 info라는 값을 부모 컴포넌트에서 받아올 것이고,
    // 그 info안의 name, phone, id 값을 사용하겠다는 의미.
    const { name, phone, id } = this.props.info;
    // handleRemove()함수를 정의해주지 않았을 때 부모 컴포넌트에서 전달받은 onRemove만 사용하여 값을 부모 컴포넌트에 전달.
    const { onRemove } = this.props;

    // editing 이라는 값을 state에서 가져와 레퍼런스를 만듬.
    const { editing } = this.state;

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    console.log(name);

    return (
      <div style={style}>
        {/* 수정 모드 상태에 따른 태그 변경 후 기존의 값을 input 값에 넣어줌. 
            input 값을 넣어주기 위해 state에 name값과 phone값을 선언해줌. 
        */}
        {editing ? (
          <Fragment>
            <div>
              <input
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
            <div>
              <input
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <b>{name}</b>
            </div>
            <div>{phone}</div>
          </Fragment>
        )}
        {/* 해당 Component에서 handleRemove()함수를 정의해줄때 사용하는 방법 */}
        <button onClick={this.handleRemove}>삭제1</button>
        {/* 해당 Component에서 handleRemove()함수를 정의해 주지 않고 props.info의 id값으로 단순히 전달해주는 방법. */}
        <button onClick={() => onRemove(id)}>삭제2</button>

        {/* 수정 버튼 누를 시 수정 모드로 변경! 수정모드로 변경될 경우 수정버튼 -> 적용버튼으로 변경 */}
        <button onClick={this.handleToggleEdit}>
          {editing ? '적용' : '수정'}
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
