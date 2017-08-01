import React from 'react';
import classnames from 'classnames';

class EnablingConditionsSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "stakeholder-actor",
    };
  }

  selectTab(key) {
    this.setState({ activeTab: key });
  }

  render() {
    const tabs = {
      actor: "Actor",
      context: "Context",
      project: "Project",
      other: "Other",
    };

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
                  {this.props.nodes.map(node => (
                    <li
                      key={node.slug}
                      className={classnames("tab-item", { "-current": this.state.activeTab == node.slug})}
                      onClick={() => this.selectTab(node.slug)}
                    >
                      <span className="literal">{node.name}</span>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </header>

        {this.props.nodes.filter(node => node.slug == this.state.activeTab).map(node => (
          <section>
            {node.children.map(subnode => (
              <div>
                <h2 className="c-title -fw-light -fs-bigger">
                  {subnode.name}
                </h2>

                <ul>
                  {subnode.enablings.map(enabling => (
                    <li>{enabling.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        <div className="dismiss" onClick={() => this.props.onClose()}>Done</div>
      </div>
    );
  }
}

export default EnablingConditionsSelector;
