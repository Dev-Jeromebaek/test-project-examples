import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import React from 'react';

export default class RGLTest extends React.Component {
  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 1 },
      { i: 'b', x: 1, y: 0, w: 2, h: 1 },
      { i: 'c', x: 0, y: 1, w: 1, h: 1 },
      { i: 'd', x: 1, y: 1, w: 1, h: 1 },
      { i: 'e', x: 2, y: 1, w: 1, h: 1 },
      { i: 'f', x: 0, y: 0, w: 1, h: 1 },
      { i: 'g', x: 1, y: 0, w: 1, h: 1 },
      { i: 'h', x: 0, y: 0, w: 1, h: 1 },
      { i: 'i', x: 1, y: 0, w: 1, h: 1 },
      { i: 'j', x: 2, y: 0, w: 1, h: 1 },
    ];

    return (
      <div className="w-100 bg-secondary mt-5">
        <ResponsiveGridLayout
          className="layout"
          layout={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
          rowHeight={400}
          width={1200}
        >
          <div className="rounded bg-white" key="a">
            a
          </div>
          <div className="rounded bg-white" key="b">
            b
          </div>
          <div className="rounded bg-white" key="c">
            c
          </div>
          <div className="rounded bg-white" key="d">
            d
          </div>
          <div className="rounded bg-white" key="e">
            e
          </div>
          <div className="rounded bg-white" key="h">
            h
          </div>
          <div className="rounded bg-white" key="i">
            i
          </div>
          <div className="rounded bg-white" key="j">
            j
          </div>

          {/* <span style={{ background: '#fff', borderRadius: '11px' }} key="f">
            f
          </span> */}
        </ResponsiveGridLayout>
      </div>
    );
  }
}
