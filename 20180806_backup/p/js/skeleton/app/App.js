import React, { Component } from 'react';
import TopComponent from 'skeleton/top/TopComponent';
import MidComponent from 'skeleton/mid/MidComponent';
import BottomComponent from 'skeleton/bottom/BottomComponent';

class App extends Component {
    constructor() {
        super();
        this.state = {
            world: '세상',
            topName: '상단',
            midName: '중간',
            bottomName: '하단',
        };
    }

    render() {
        return (
            <div>
                <div>Hello {this.state.world}!</div>
                <TopComponent {...this.state} />
                <MidComponent {...this.state} />
                <BottomComponent {...this.state} />
            </div>
        );
    }
}

export default App;
