import React, { Component, PropTypes } from 'react';

class BottomComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: '3'
        };
    }
    render() {
        const {
            bottomName
        } = this.props;

        return (
            <div style={{ width: 50, height: 100 }} >{bottomName} {this.state.name}</div>
        );
    }
}

BottomComponent.propTypes = {
    bottomName: PropTypes.string,
};

export default BottomComponent;
