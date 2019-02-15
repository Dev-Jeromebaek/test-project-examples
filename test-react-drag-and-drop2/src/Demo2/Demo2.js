import React, { Component } from 'react';

import DropTargets from './DropTargets';
import SourceObjects from './SourceObjects';

class Demo2 extends Component {
  state = {
    currentDragItem: null,
  };

  onDragStart = (details) => {
    this.setState({
      currentDragItem: details,
    });
  };

  onDragStop = () => {
    this.setState({
      currentDragItem: null,
    });
  };

  onDrop = (target) => {
    this.setState({
      lastDrop: {
        source: this.state.currentDragItem,
        target: target,
      },
    });
  };

  dropDescription = () => {
    let drop;
    if ((drop = this.state.lastDrop)) {
      return <p className="drop-description">{`Dropped source ${drop.source.type}-${drop.source.index} on target ${drop.target.index}`}</p>;
    }
  };

  render() {
    return (
      <div className={`dnd-example ${this.state.currentDragItem ? 'dragging' : void 0}`}>
        <SourceObjects onDragStart={this.onDragStart} onDragStop={this.onDragStop} />
        <DropTargets currentDragItem={this.state.currentDragItem} onDrop={this.onDrop} />
      </div>
    );
  }
}

export default Demo2;
