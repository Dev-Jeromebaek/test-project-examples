import React, { Component } from 'react';

class App extends Component {
  state = {
    input: '',
    check: true,
  };

  handleKeyChange = (e) => {
    const { value } = e.target;
    if (this.state.check) {
      this.setState({
        input: value,
      });
    }
  };

  isNumberKey = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('숫자 아님');
      return this.setState({
        check: false,
      });
    }

    // Textbox value
    const value = e.target.value;

    // 소수점(.)이 두번 이상 나오지 못하게
    const pattern0 = /^\d*[.]{1,}\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가
    if (pattern0.test(value)) {
      if (charCode === 46) {
        console.log('소수점이 이미 존재');
        return this.setState({
          check: false,
        });
      }
    }

    // 1000 이하의 숫자만 입력가능
    const pattern1 = /^\d{3,}$/; // 현재 value값이 3자리 숫자이면 . 만 입력가능
    if (pattern1.test(value)) {
      if (charCode !== 46) {
        console.log('숫자가 1000이 넘어감');
        return this.setState({
          check: false,
        });
      }
    }

    // 소수점 둘째자리까지만 입력가능
    const pattern2 = /^\d*[.]\d{2,}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가
    if (pattern2.test(value)) {
      console.log('소수점 두자리가 넘어감');
      return this.setState({
        check: false,
      });
    }
    return this.setState({
      check: true,
    });
  };
  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.handleKeyChange.bind(this)} onKeyPress={this.isNumberKey.bind(this)} />
      </div>
    );
  }
}

export default App;
