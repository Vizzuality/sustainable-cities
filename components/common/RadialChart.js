import React from 'react';
import PropTypes from  'prop-types';
import classnames from 'classnames';

const depths = [140, 260, 320, 485];
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

class Node extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    family: PropTypes.string.isRequired,
    angle: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
  }

  render() {
    return (
      <g
        transform={`rotate(${rad2deg(this.props.angle)} 0 0) translate(${this.props.depth} 0)`}
      >
        <circle
          cx="0"
          cy="0"
          r={this.props.size}
          className={classnames(this.props.family, `level-${this.props.level}`)}
          onClick={this.props.onClick}
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}
        />
        {this.props.selected &&
          <circle
            cx="0"
            cy="0"
            r={this.props.size + 4}
            className="selected"
          />
        }
      </g>
    );
  }
}

function place(nodes, size, depth, level) {
  return nodes.map(node => ({
    ...node,
    component: Node,
    props: {
      size: size,
      level: level,
      family: node.family,
      angle: node.angle,
      depth: depth,
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

  nodeClick(node) {
    if (node.id && !node["category-type"]) {
      this.props.onClick(node);
    }
  }

  showPopup(node) {
    if (node.id && !node["category-type"]) {
      this.setState({ popup: node });
    }
  }

  hidePopup(node) {
    if (this.state.popup && node.id == this.state.popup.id) {
      this.setState({ popup: undefined });
    }
  }

  render() {
    let nodes = buildNodes(this.props.nodes ||[]);

    return (
      <div className={`active-${this.props.family} radial-chart`}>
        <svg id="chart" viewBox="0 0 1000 1000">
          <g transform={`scale(${this.state.scale})`} onTransitionEnd={() => this.transitionEnd()} />
          <g transform={`translate(${this.state.x + 500} 500) scale(${this.state.scale})`}>
            {nodes.map(node => (
              <node.component
                {...node.props}
                key={node.key}
                onClick={() => this.nodeClick(node)}
                onMouseOver={() => this.showPopup(node)}
                onMouseOut={() => this.hidePopup(node)}
                selected={node.props.level == 3 && this.props.selected.includes(node.id)}
              />
            ))}
          </g>
        </svg>

        {nodes.filter(node => node.level == 1).map(node =>
          <div className={`root-label ${node.family}`} key={`label-${node.id}`} style={{
            opacity: this.state.zooming ? 0 : "",
            position: "absolute",
            top: `${(node.y * this.state.scale + 420)/1000.0*100}%`,
            left: `${(node.x * this.state.scale + 420 + this.state.x)/1000.0*100}%`,
          }}>
            <p>{node.name}</p>
          </div>
        )}

        {this.state.popup &&
        <div className={`tooltip ${this.state.popup.family}`} style={{
          position: 'absolute',
          top: `${(this.state.popup.y * this.state.scale + 500)/1000.0*100}%`,
          left: `${(this.state.popup.x * this.state.scale + 500 + this.state.x)/1000.0*100}%`,
        }}>
          <p>{this.state.popup.name}</p>
        </div>
        }
      </div>
    );
  }
}

export default RadialChart;
