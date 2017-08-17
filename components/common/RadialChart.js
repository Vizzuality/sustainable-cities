import React from 'react';
import PropTypes from  'prop-types';
import classnames from 'classnames';

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
        id={this.props.id}
        transform={`rotate(${rad2deg(this.props.angle)} 0 0) translate(${this.props.depth} 0)`}
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
        className={classnames(this.props.family, ...this.props.modifiers)}
      >
        <line x1="0" y1="0" x2="1" y2="0" />
      </g>
    );
  }
}

function placeLines(p0, p1, d0, d1, r0, r1, keyPrefix) {
  return p1.map(node => {
    var parent = p0.find(p => (p.children || p.bmes || []).map(x=>x.id).includes(node.id));

    return {
      component: Line,
      props: {
        parent,
        node,
        r0,
        r1,
        depth: d0,
        family: parent.family,
        modifiers: node.modifiers,
        id: `line-${keyPrefix}-${parent.slug}-${parent.id}-${node.id}`,
      },
    };
  });
}

function place(nodes, size, depth, level, keyPrefix) {
  return nodes.map(node => ({
    ...node,
    component: BME,
    props: {
      size: size,
      level: level,
      family: node.family,
      angle: node.angle,
      depth: depth,
      modifiers: node.modifiers,
      id: `circle-${keyPrefix}-${node.slug}-${node.id}`,
    },
  }));
}

function positions(nodes, depth, offset) {
  return nodes.map((node, i, self) => {
    const angle = 2 * Math.PI * (i + offset) / self.length;

    return {
      ...node,
      angle,
      x: depth * Math.cos(angle),
      y: depth * Math.sin(angle),
    }
  });
}

function buildNodes(tree, family, keyPrefix) {
  let nodes = [];
  let lines = [];
  var previousPositions = null;

  tree = tree.map(node => ({ ...node, family: node.slug }));

  if (tree.length == 0) return nodes;

  const rootFamily = family || tree[0].family;
  for (var i = 0; tree.length > 0; i++) {
    var offset = (tree.filter(n => n.family == rootFamily).length - 1) / 2;
    var index = tree.findIndex(n => n.family == rootFamily);

    let p = positions(tree, depths[i], -offset -index);
    nodes = nodes.concat(place(p, sizes[i], depths[i], i, keyPrefix));

    tree = tree.map(n =>
      (n.children || n.bmes || []).map(node => ({
        ...node,
        family: n.family,
      }))
    ).reduce((a,b) => a.concat(b), []);

    if (previousPositions) {
      lines = lines.concat(placeLines(previousPositions, p, depths[i-1], depths[i], sizes[i-1], sizes[i], keyPrefix));
    }

    previousPositions = p;
  }

  return lines.concat(nodes);
}


class RadialChart extends React.Component {
  static defaultProps = {
    selected: [],
    showLegend: false,
  }

  constructor() {
    super();

    this.state = {
      scale: 1,
      x: 0,
      zooming: false,
    }
  }

  nodeClick(node) {
    if (this.props.interactive && node.id && !node["category-type"]) {
      this.props.onClick(node);
    }

    if (this.props.interactive && node.level == 1) {
      if (this.state.family == null) {
        this.setState({
          x:-400,
          scale: 1.5,
          family: node.family,
          zooming: true,
        });
      } else if (node.family == this.state.family) {
        this.setState({
          x: 0,
          scale: 1,
          family: null,
          zooming: true,
        });
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
    let nodes = buildNodes(this.props.nodes || [], this.state.family, this.props.keyPrefix);

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
              <span>Success factor</span>
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

        <div className={classnames("u-relative", `active-${this.state.family || "none"}`)}>
          <svg id="chart" className="u-block" viewBox="0 0 1000 1000">
            <g transform={`scale(${this.state.scale})`} onTransitionEnd={() => this.transitionEnd()} />
            <g transform={`translate(${this.state.x + 500} 500) scale(${this.state.scale})`}>
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

          {nodes.filter(node => node.level == 1 && (!this.state.family || node.family == this.state.family)).map(node =>
            <div className={`root-label ${node.family}`} key={`label-${node.id}`} style={{
              opacity: this.state.zooming ? 0 : "",
              position: "absolute",
              top: `${(node.y * this.state.scale + 500)/1000.0*100}%`,
              left: `${(node.x * this.state.scale + this.state.x + 500)/1000.0*100}%`,
            }}>
              <p>{node.name}</p>
            </div>
          )}

          {this.state.popup &&
          <div className={`tooltip ${this.state.popup.family} level-${this.state.popup.level || 4}`} style={{
            position: 'absolute',
            top: `${(this.state.popup.y * this.state.scale + 500)/1000.0*100}%`,
            left: `${(this.state.popup.x * this.state.scale + 500 + this.state.x)/1000.0*100}%`,
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
