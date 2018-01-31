import React from 'react';
import PropTypes from  'prop-types';
import classnames from 'classnames';
import flatMap from 'lodash/flatMap';

const depths = [140, 260, 320, 455];
const sizes = [80, 15, 5, 6];

const distanceBetween = (p0, p1) => Math.sqrt((p1.y - p0.y)**2 + (p1.x - p0.x)**2);
const rad2deg = rad => rad * 180 / Math.PI;
const angleBetween = (p0, p1) => Math.atan2(p1.y - p0.y, p1.x - p0.x);
const fitbounds = (angle) => {
  while (angle < -Math.PI) angle += Math.PI*2;
  while (angle > Math.PI) angle -= Math.PI*2;
  return angle;
}

export const leaves = (nodes) => {
  const children = flatMap(nodes, t => t.children || []);

  if (children.length > 0) {
    return leaves(children);
  }

  return nodes;
};


class BME extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    family: PropTypes.string.isRequired,
    angle: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    modifiers: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
  }

  static defaultProps = {
    modifiers: [],
    family: "none",
  }

  render() {
    return (
      <g
        className="radial-chart-animated-group"
        id={this.props.id}
        transform={[
          `rotate(${rad2deg(this.props.angle)} 0 0)`,
          `translate(${this.props.depth} 0)`,
        ].join(" ")}
      >
        <g className={classnames("node", `level-${this.props.level}`, this.props.family, ...this.props.modifiers)}>
          <circle
            cx="0"
            cy="0"
            r={this.props.size}
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
      </g>
    );
  }
}

class Line extends React.Component {
  static defaultProps = {
    modifiers: [],
  }

  render() {
    return (
      <g
        id={this.props.id}
        transform={[
          `rotate(${rad2deg(this.props.parent.angle)} 0 0)`,
          `translate(${this.props.depth} 0)`,
          `rotate(${rad2deg(fitbounds(angleBetween(this.props.parent, this.props.node) - this.props.parent.angle))} 0 0)`,
          `translate(${this.props.r0} 0)`,
          `scale(${distanceBetween(this.props.parent, this.props.node) - this.props.r1 - this.props.r0} 1)`,
        ].join(" ")}
        className={classnames("radial-chart-animated-group", this.props.family, ...this.props.modifiers)}
      >
        <line x1="0" y1="0" x2="1" y2="0" />
      </g>
    );
  }
}

function mkBME(node, level, keyPrefix, angle) {
  return ({
    ...node,
    id: node.id,
    component: BME,
    props: {
      size: sizes[level],
      level,
      family: node.family,
      angle,
      depth: depths[level],
      modifiers: node.modifiers,
      id: `circle-${keyPrefix}-${node.slug}-${node.id}`,
    },
  });
}

function mkLine(parent, child, level, keyPrefix) {
  return {
    component: Line,
    props: {
      parent,
      node: child,
      r0: sizes[level],
      r1: sizes[level + 1],
      depth: depths[level],
      d1: depths[level + 1],
      family: parent.family,
      modifiers: child.modifiers,
      id: `line-${keyPrefix}-${parent.slug}-${parent.id}-${child.id}`,
    },
  };
}

function buildNodes(tree, highlightedFamily, keyPrefix) {
  const isPacked = tree.some(node => leaves([node]).length > 50);

  const withFamily = (node, family) => ({
    ...node,
    family,
    children: node.children ? node.children.map(n => withFamily(n, family)) : [],
  });

  const withPosition = isPacked ? withPackedPosition : withSparsePosition;

  const treeWithFamily = tree.map(n => withFamily(n, n.slug));
  const treeWithPosition = withPosition(treeWithFamily, highlightedFamily);

  const finalNodes = [];
  const finalLines = [];

  const process = (nodes, level) => nodes.forEach((node, i) => {
    finalNodes.push(mkBME(node, level, keyPrefix, node.angle));

    if (node.children) {
      node.children.forEach(child => {
        finalLines.push(mkLine(node, child, level, keyPrefix));
      });
      process(node.children, level + 1);
    }
  });

  process(treeWithPosition, 0);

  return finalLines.concat(finalNodes);
}

function withSparsePosition(tree, highlightedFamily) {
  const familyIndex = highlightedFamily ? tree.findIndex(node => node.family === highlightedFamily) : 0;

  const delta = 2 * Math.PI / tree.length * (-familyIndex - 0.5);

  const withPosition = (nodes, minAngle, maxAngle, level) => nodes.map((node, i) => {
    const sliceSize = (maxAngle - minAngle) / nodes.length;
    const angle = minAngle + sliceSize * (i + 0.5);

    return {
      ...node,
      angle,
      x: depths[level] * Math.cos(angle),
      y: depths[level] * Math.sin(angle),
      children: withPosition(node.children, minAngle + sliceSize * i, minAngle + sliceSize * (i + 1), level + 1),
    };
  });

  return withPosition(tree, delta, delta + 2 * Math.PI, 0);
}

function withPackedPosition(tree, highlightedFamily) {
  let nodeAngles = {};

  if (tree.length == 0) return nodes;

  const rootFamily = highlightedFamily || tree[0].family;

  let nodes = tree;
  for (var i = 0; nodes.length > 0; i++) {
    var offset = (nodes.filter(n => n.family == rootFamily).length - 1) / 2;
    var index = nodes.findIndex(n => n.family == rootFamily);

    nodes.forEach((node, i) => {
      nodeAngles[`${node.type}-${node.id}`] = 2 * Math.PI * (i - index - offset) / nodes.length;
    });

    nodes = flatMap(nodes, n => n.children);
  }

  const withPosition = (nodes, level) => nodes.map(node => {
    const angle = nodeAngles[`${node.type}-${node.id}`];

    return {
      ...node,
      angle,
      x: depths[level] * Math.cos(angle),
      y: depths[level] * Math.sin(angle),
      children: withPosition(node.children, level + 1),
    };
  });

  return withPosition(tree, 0);
}

class RadialChart extends React.Component {
  static defaultProps = {
    selected: [],
    showLegend: false,
  }

  constructor() {
    super();

    this.state = {
      zooming: false,
    }
  }

  nodeClick(node) {
    if (this.props.interactive && node.id && !node["category-type"]) {
      this.props.onClick(node);
    }

    if (this.props.interactive && node.level == 1) {
      if (this.props.family == null) {
        this.props.onFamilyChange(node.family);
      } else if (node.family == this.props.family) {
        this.props.onFamilyChange(null);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interactive) {
      if (nextProps.family !== this.props.family) {
        this.setState({ zooming: true });
      }
    }
  }

  showPopup(node) {
    if (this.props.interactive && node.id && node.level != 1) {
      this.setState({ popup: node });
    }
  }

  hidePopup(node) {
    if (this.props.interactive && this.state.popup && node.id == this.state.popup.id) {
      this.setState({ popup: undefined });
    }
  }

  transitionEnd() {
    this.setState({ zooming: false });
  }

  render() {
    const nodes = buildNodes(this.props.nodes || [], this.props.family, this.props.keyPrefix);

    const nodesY = nodes.filter(n => n.component === BME && n.family === this.props.family).map(node => node.y);

    const maxY = Math.max(0, ...nodesY);
    const minY = Math.min(0, ...nodesY);
    const radius = Math.max(maxY, -minY);

    const scale = this.props.family ? Math.min(depths[depths.length - 1] / radius, 1.8) : 1.0;
    const xOffset = this.props.family ? -400 : 0;

    return (
      <div className={classnames(
        "radial-chart",
        {
          interactive: this.props.interactive,
          thumbnail: this.props.thumbnail,
        },
      )}>
        {!this.props.thumbnail &&
          <div className="row u-flex-center">
            <div className="u-flex u-ml-1 u-mr-1">
              <svg className="radial-chart u-inline-block u-h-bl u-w-bl" viewBox="0 0 34 34">
                <g transform="translate(17,17)">
                  <BME size={5} level={3} angle={0} depth={0} />
                </g>
              </svg>
              <span className="u-inline-block u-h-bl">Element</span>
            </div>

            <div className="u-flex u-ml-1 u-mr-1">
              <svg className="radial-chart u-inline-block u-h-bl u-w-bl" viewBox="0 0 34 34">
                <g transform="translate(17,17)">
                  <BME size={5} level={3} angle={0} depth={0} modifiers={["Success"]} />
                </g>
              </svg>
              <span>Enabling condition applied</span>
            </div>

            <div className="u-flex u-ml-1 u-mr-1">
              <svg className="radial-chart u-inline-block u-h-bl u-w-bl" viewBox="0 0 34 34">
                <g transform="translate(17,17)">
                  <BME size={5} level={3} angle={0} depth={0} selected={true} />
                </g>
              </svg>
              <span>Element selected</span>
            </div>
          </div>
        }

        <div className={classnames("u-relative", `active-${this.props.family || "none"}`)}>
          <svg id="chart" className="u-block" viewBox="0 0 1000 1000">
            <g
              className="radial-chart-zoom-animation-canary"
              transform={`scale(${scale})`}
              onTransitionEnd={() => this.transitionEnd()}
            />
            <g
              className="radial-chart-thumbnail-animation-canary"
              transform={`scale(${this.props.thumbnail ? 1 : 2})`}
              onTransitionEnd={() => this.transitionEnd()}
            />
            <g
              className="radial-chart-animated-group"
              transform={`translate(${xOffset + 500} 500) scale(${scale})`}
            >
              {nodes.map(node => (
                <node.component
                  {...node.props}
                  key={node.props.id}
                  onClick={() => this.nodeClick(node)}
                  onMouseOver={() => this.showPopup(node)}
                  onMouseOut={() => this.hidePopup(node)}
                  selected={node.props.level == 3 && this.props.selected.includes(node.id)}
                />
              ))}
            </g>
          </svg>

          {nodes.filter(node => node.level == 1 && (!this.props.family || node.family == this.props.family)).map(node =>
            <div className={`root-label ${node.family}`} key={`label-${node.id}`} style={{
              opacity: this.state.zooming ? 0 : "",
              position: "absolute",
              top: `${(node.y * scale + 500)/1000.0*100}%`,
              left: `${(node.x * scale + xOffset + 500)/1000.0*100}%`,
            }}>
              <p>{node.name}</p>
            </div>
          )}

          {this.state.popup &&
          <div className={`tooltip ${this.state.popup.family} level-${this.state.popup.level || 4}`} style={{
            position: 'absolute',
            top: `${(this.state.popup.y * scale + 500)/1000.0*100}%`,
            left: `${(this.state.popup.x * scale + 500 + xOffset)/1000.0*100}%`,
          }}>
            <p>{this.state.popup.name}</p>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default RadialChart;
export { BME };
