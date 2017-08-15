import React from 'react';
import classnames from 'classnames';

import Tab from 'components/common/Tab';
import Button from 'components/common/Button';
import groupBy from 'lodash/groupBy';
import EnablingCheckbox from 'components/builder-index/EnablingCheckbox';


const tabs = {
  "info": "Info",
  "enabling-conditions": "Enabling conditions",
  "comment": "Comment",
};

class BmeDetail extends React.Component {
  static defaultProps = {
    initialTab: "info",
  };

  state = {};

  onOverlayClick(e) {
    if (e.currentTarget == e.target) {
      this.props.onClose();
    }
  }

  selectTab(key) {
    this.setState({ activeTab: key });
  }

  onChange(target, e) {
    this.props.onCommentChange(e.target.value);
  }

  activeTab() {
    return this.state.activeTab || this.props.initialTab;
  }

  render() {
    return (
      <div className="c-modal c-builder-bme-detail" onClick={this.onOverlayClick.bind(this)}>
        <div className="content">
          <header>
            <h1 className="c-title -fw-thin -fs-huge">{this.props.bme.name}</h1>

            <div className="c-tabs">
              <div className="row">
                  <ul className="tab-list">
                    {Object.entries(tabs).map(([key, label]) => (
                      <li
                        key={key}
                        className={classnames("tab-item", { "-current": this.activeTab() == key})}
                        onClick={() => this.selectTab(key)}
                      >
                        <span className="literal">{label}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </header>

          <div className="wrapper">
            <div className={`tab-content current-${this.activeTab()}`}>
              <section>
                <h2 className="c-title -fw-light -fs-extrabig">
                  What is it &amp; how does it work?
                </h2>
                <p>{this.props.bme.description}</p>

                <h2 className="c-title -fw-light -fs-extrabig">
                  Real world examples
                </h2>
              </section>

              <section>
                {this.props.bme.enablings.filter(e => e).length == 0 &&
                  <h2 className="c-title -fw-light -fs-extrabig">No enabling conditions for this element</h2>
                }

                {Object.entries(groupBy(this.props.bme.enablings.filter(e => e), enabling => enabling["assessment-value"])).map(([value, enablings]) =>
                  <div key={value}>
                    <h2 className="c-title -fw-light -fs-extrabig">{value}</h2>
                    <ul>
                      {enablings.map(enabling => (
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
                )}
              </section>

              <section>
                <h2 className="c-title -fw-light -fs-extrabig">Comment</h2>

                <textarea
                  placeholder="Add your comment here"
                  value={this.props.comment || ""}
                  onChange={(e) => this.onChange('comment', e)}
                />

                {!this.props.selected &&
                  <div className="unsaved-overlay">
                    <p className="c-text -fw-light -fs-extrabig">Save this business model element to add a comment</p>
                  </div>
                }
              </section>
            </div>
          </div>

          <div className="actions">
            <Button onClick={this.props.onClose} secondary>Close</Button>
            {this.props.selected
              ? <Button onClick={this.props.onDelete} primary>Deselect element</Button>
              : <Button onClick={this.props.onSave} primary>Select element</Button>
            }
          </div>

          <div className="dismiss" onClick={this.props.onClose}>&times;</div>
          {this.props.onPrev && <div className="prev" onClick={this.props.onPrev}></div>}
          {this.props.onNext && <div className="next" onClick={this.props.onNext}></div>}
        </div>
      </div>
    );
  }
}

export default BmeDetail;
