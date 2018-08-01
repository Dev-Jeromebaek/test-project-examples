import React, { Component, PropTypes } from 'react';

class MidComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: '2'
        };
    }
    render() {
        const {
            midName
        } = this.props;

        return (
            <div style={{ width: 50, height: 100 }} >{midName} {this.state.name}</div>
        );
    }
}

MidComponent.propTypes = {
    midName: PropTypes.string,
};

export default MidComponent;
