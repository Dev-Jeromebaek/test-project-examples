import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class GlobalDragAndDrop extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  static get defaultProps() {
    return {
      className: 'layout',
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div className="bg-light my-3">
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 1 }}
          rowHeight={400}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.props.render}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}
