import React from 'react';
import classnames from 'classnames';

import EnablingCheckbox from 'components/builder-index/EnablingCheckbox';


class EnablingConditionsSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: 0,
    };
  }

  selectTab(key) {
    this.setState({ activeTab: key });
  }

  render() {
    const isActive = (index) => this.state.activeTab === index;

    return (
      <div className="c-enabling-conditions-selector">
        <header>
          <h1 className="c-title -fw-thin -fs-huge">Enabling conditions</h1>
          <p>
            Select some enabling conditions, which provide context to your specific city's situation. This will change how the elements are shown on the interactive chart:
          </p>

          <div className="c-tabs">
            <div className="row">
                <ul className="tab-list">
                  {(this.props.nodes || []).map((node, i) => (
                    <li
                      key={node.slug}
                      className={classnames("tab-item", { "-current": isActive(i)})}
                      onClick={() => this.selectTab(i)}
                    >
                      <span className="literal">{node.name}</span>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </header>

        {this.props.nodes.length == 0 && <section>
          <h2 className="c-title -fw-light -fs-bigger">No enabling conditions available</h2>
        </section>}

        {(this.props.nodes || []).filter((node, i) => isActive(i)).map(node => (
          <section key={node.id}>
            {(node.children || []).map(subnode => (
              <div key={subnode.id}>
                <h2 className="c-title -fw-light -fs-bigger">
                  {subnode.name}
                </h2>

                <ul>
                  {(subnode.children || []).map(enabling => (
                    <li
                      key={enabling.id}
                      onMouseEnter={() => this.props.onEnablingHover(enabling)}
                      onMouseLeave={() => this.props.onEnablingHover({})}
                    >
                      <EnablingCheckbox
                        checked={this.props.selectedEnablings.includes(enabling.id)}
                        enabling={enabling}
                        onChange={(_, checked) => checked ? this.props.onEnablingDeselect(enabling) : this.props.onEnablingSelect(enabling)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        <div className="c-dismiss -arrow" onClick={() => this.props.onClose()}>Done</div>
      </div>
    );
  }
}

export default EnablingConditionsSelector;
