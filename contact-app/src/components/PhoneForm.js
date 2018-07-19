import React, { Component } from 'react';

class PhoneForm extends Component {
  input = null;
  //16버전이상
  /*
    input = React.createRef();
    */
  state = {
    name: '',
    phone: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    // 기본적으로 html의 form속성으로 submit을 하게 되면 페이지를 refresh를 하게 되는데,
    // react는 refresh가 필요없기 때문에,
    // submit 작업을 수정해 주어야 함.

    // 아래는 submit 버튼이 있으면 매번 새로고침을 하게 되는게 그 작업을 막아주는 함수
    // 원래 해야되는 작업을 하지않게 방지시켜주는 함수이다.
    e.preventDefault();

    /*this.props.onCreate({
        name: this.state.name,
        phone: this.state.phone,
    })
    */

    // 원래는 위에 방식으로 하는 것이 맞지만 간단히 아래 방법처럼 적용시킬 수도 있다.
    this.props.onCreate(this.state);

    // 데이터를 부모 컴포넌트에 전달 후 input값을 초기화 시켜주는 작업
    this.setState({
      name: '',
      phone: ''
    });

    // 그리고 input으로 포커스를 맞춤.
    this.input.focus();
    //16버전이상
    /*this.input.current.focus();*/
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
          // ref는 Dom에 직접적으로
          ref={ref => (this.input = ref)}
          //16버전이상
          /*ref={this.input}*/
        />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={this.handleChange}
          value={this.state.phone}
        />
        <button type="submit">등록</button>
        <div>
          {this.state.name} {this.state.phone}
        </div>
      </form>
    );
  }
}

export default PhoneForm;
