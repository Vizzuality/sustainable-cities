import React from 'react';
import classnames from 'classnames';

import EnablingCheckbox from 'components/builder-index/EnablingCheckbox';


class EnablingConditionsSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: null,
    };
  }

  selectTab(key) {
    this.setState({ activeTab: key });
  }

  render() {
    return (
      <div className="c-enabling-conditions-selector">
        <header>
          <h1 className="c-title -fw-thin -fs-huge">Enabling conditions</h1>
          <p>
            Select conditions to lorem ipsum casius tesebe leo risus, pora ac
            consectetur ac, vestibulum at eros. Maecenas sed diam eget risus v
            arius blandit sitamet non posuere velite aliquet.
          </p>

          <div className="c-tabs">
            <div className="row">
                <ul className="tab-list">
                  {this.props.nodes.map((node, i) => (
                    <li
                      key={node.slug}
                      className={classnames("tab-item", { "-current": (this.state.activeTab === null && i === 0) || this.state.activeTab == node.slug})}
                      onClick={() => this.selectTab(node.slug)}
                    >
                      <span className="literal">{node.name}</span>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </header>

        {this.props.nodes.filter((node, i) => (this.state.activeTab === null && i === 0) || this.state.activeTab == node.slug).map(node => (
          <section>
            {node.children.map(subnode => (
              <div>
                <h2 className="c-title -fw-light -fs-bigger">
                  {subnode.name}
                </h2>

                <ul>
                  {subnode.enablings.map(enabling => (
                    <li key={enabling.id}>
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
