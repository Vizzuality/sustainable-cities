import React from 'react';

const depths = [140, 270, 340, 450];
const sizes = [80, 15, 5, 6];

const distanceBetween = (p0, p1) => Math.sqrt((p1.y - p0.y)**2 + (p1.x - p0.x)**2);
const rad2deg = rad => rad * 180 / Math.PI;
const angleBetween = (p0, p1) => Math.atan2(p1.y - p0.y, p1.x - p0.x);
const fitbounds = (angle) => {
  while (angle < -Math.PI) angle += Math.PI*2;
  while (angle > Math.PI) angle -= Math.PI*2;
  return angle;
}

function placeLines(p0, p1, d0, d1, r0, r1) {
  return p1.map(node => {
    var parent = p0.find(p => (p.children || p.bmes || []).map(x=>x.id).includes(node.id));

    return {
      ...node,
      component:"line",
      props: {
        x1:0, y1:0, x2:1, y2:0,
        className: parent.family,
        transform: [
          `rotate(${rad2deg(parent.angle)} 0 0)`,
          `translate(${d0} 0)`,
          `rotate(${rad2deg(fitbounds(angleBetween(parent, node) - parent.angle))} 0 0)`,
          `translate(${r0} 0)`,
          `scale(${distanceBetween(parent, node) - r1 - r0} 1)`
        ].join(" "),
      },
      key: `line-${parent.slug}-${parent.id}-${node.id}`,
    };
  });
}

function place(nodes, size, depth, level) {
  return nodes.map(node => ({
    ...node,
    component: "circle",
    props: {
      cx: 0, cy: 0,
      className: `${node.family} level-${level}`,
      r: size,
      transform: `rotate(${rad2deg(node.angle)} 0 0) translate(${depth} 0)`,
    },
    key: `circle-${node.slug}-${node.id}`,
  }));
}

function positions(nodes, depth, offset) {
  return nodes.map((node, i, self) => ({
    ...node,
    x: depth * Math.cos(2 * Math.PI * (i + offset) / self.length),
    y: depth * Math.sin(2 * Math.PI * (i + offset) / self.length),
    angle: 2 * Math.PI * (i + offset) / self.length,
  }));
}

function buildNodes(tree) {
  let nodes = [];
  var previousPositions = null;

  tree = tree.map(node => ({ ...node, family: node.slug }));

  if (tree.length == 0) return nodes;

  const rootFamily = tree[0].family;
  for (var i = 0; tree.length > 0; i++) {
    var offset = (tree.filter(n => n.family == rootFamily).length - 1) / 2;
    var index = tree.findIndex(n => n.family == rootFamily);

    let p = positions(tree, depths[i], -offset -index);
    nodes = nodes.concat(place(p, sizes[i], depths[i], i));

    tree = tree.map(n =>
      (n.children || n.bmes || []).map(node => ({
        ...node,
        family: n.family,
      }))
    ).reduce((a,b) => a.concat(b), []);

    if (previousPositions) {
      const lines = placeLines(previousPositions, p, depths[i-1], depths[i], sizes[i-1], sizes[i]);
      nodes = nodes.concat(lines);
    }

    previousPositions = p;
  }

  return nodes;
}


class RadialChart extends React.Component {
  constructor() {
    super();

    this.state = {
      scale: 1,
      x: 0,
    }
  }

  nodeClick(slug) {
    console.log(slug);
  }

  render() {
    let nodes = buildNodes(this.props.nodes ||[]);

    return (
      <div className={`active-${this.props.family} radial-chart`}>
        <svg id="chart" viewBox="0 0 1000 1000">
          <g transform={`scale(${this.state.scale})`} onTransitionEnd={() => this.transitionEnd()} />
          <g transform={`translate(${this.state.x + 500} 500) scale(${this.state.scale})`}>
            {nodes.map(node => {
              const Component = node.component;
              return <Component key={node.key} {...node.props} onClick={() => this.nodeClick(node.slug)} />
            })}
          </g>
        </svg>

        {nodes.filter(node => node.level == 1 && node.component == "circle").map(node =>
          <div className={`root-label ${node.family}`} key={`label-${node.id}`} style={{
            opacity: this.state.zooming ? 0 : "",
            position: "absolute",
            top: `${(node.y * this.state.scale + 420)/1000.0*100}%`,
            left: `${(node.x * this.state.scale + 420 + this.state.x)/1000.0*100}%`,
          }}>
            <p>{node.name}</p>
          </div>
        )}

      </div>
    );
  }
}

export default RadialChart;
