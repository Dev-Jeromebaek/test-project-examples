import React, { Component } from 'react';
import _ from 'lodash';

import SourceObject from './SourceObject';

class SourceObjects extends Component {
  greenFunc = (i) => {
    var _i, _results;
    _results = [];
    for (i = _i = 0; _i <= 2; i = ++_i) {
      _results.push({
        type: 'green',
      });
    }
    return _results;
  };

  blueFunc = (i) => {
    var _i, _results;
    _results = [];
    for (i = _i = 0; _i <= 2; i = ++_i) {
      _results.push({
        type: 'blue',
      });
    }
    return _results;
  };

  objects = () => {
    var i;
    return _.flatten([this.greenFunc(i), this.blueFunc(i)]);
  };

  render() {
    var i, object;
    var _i, _len, _ref1, _results;
    _ref1 = this.objects();
    _results = [];
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      object = _ref1[i];
      _results.push(
        <SourceObjects
          type={object.type}
          index={i + 1}
          children={i + 1}
          onDragStart={this.props.onDragStart}
          onDragStop={this.props.onDragStop}
        />,
      );
    }
    return <div className="dnd-source-objects">{_results}</div>;
  }
}

export default SourceObjects;
