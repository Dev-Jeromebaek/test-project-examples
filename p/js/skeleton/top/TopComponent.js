import React, { Component, PropTypes } from 'react';

class TopComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: '1'
        };
    }
    render() {
        const {
            topName
        } = this.props;

        return (
            <div style={{ width: 50, height: 100 }} >{topName} {this.state.name}</div>
        );
    }
}

TopComponent.propTypes = {
    topName: PropTypes.string,
};

export default TopComponent;
