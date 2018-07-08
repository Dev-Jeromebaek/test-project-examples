import React, { Component } from 'react';

class PhoneForm extends Component {

    state = {
        name: '',
        phone: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // submit 버튼이 있으면 매번 새로고침을 하게 되는게 그 작업을 막아주는 함수
    handleSubmit = (e) => {
        e.preventDefault();
        /*this.props.onCreate({
            name: this.state.name,
            phone: this.state.phone,
        })
        */
       this.props.onCreate(this.state);
       this.setState({
           name: '',
           phone: '',
       })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    name="name" 
                    placeholder="이름" 
                    onChange={this.handleChange} 
                    value={this.state.name}
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