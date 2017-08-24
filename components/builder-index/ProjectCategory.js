import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SummarySection from 'components/builder-index/SummarySection';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import DropdownTreeSelect from 'react-dropdown-tree-select';


class Select extends React.Component {
  state = {
    expanded: false,
  }

  onTrigger = () => this.setState({ expanded: !this.state.expanded });

  onClick = (item) => {
    this.onTrigger();
    this.props.onChange(item);
  }

  render() {
    return (
      <div className="dropdown">
        <div
          className={classnames("dropdown-trigger", { "-placeholder": !this.props.selected })}
          onClick={this.onTrigger}
        >
          {this.props.selected ? this.props.selected.name : this.props.placeholder}
        </div>

        {this.state.expanded && (
          <ul className="dropdown-content">
            {this.props.data.map(item => (
              <li key={item.id} className="dropdown-item" onClick={() => this.onClick(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

class AddCustomElementModal extends React.Component {
  state = {};

  setMainCategory = (category) => this.setState({ category, subcategory: null, subsubcategory: null });
  setSubCategory = (subcategory) => this.setState({ subcategory, subsubcategory: null });
  setSubSubCategory = (subsubcategory) => this.setState({ subsubcategory });

  add = () => {
    this.props.onAdd({
      category: this.state.subsubcategory.id,
      name: this.state.name,
      comment: this.state.comment,
    });
  }

  render() {
    return (
      <div className="u-w-100 u-pt-4 u-pl-4 u-pr-4 u-pb-1/2">
        <h1 className="c-title -fw-thin -fs-huge">Add custom element</h1>

        <div className="u-flex u-mt-2">
          <div className="u-w-100">
            <div className="c-text -fw-light -fs-bigger u-mb-1/2">Category</div>
            <Select
              placeholder="Select"
              onChange={this.setMainCategory}
              selected={this.state.category}
              data={this.props.bmeTree}
            />
          </div>
          <div className="u-w-100 u-ml-2">
            <div className="c-text -fw-light -fs-bigger u-mb-1/2">Sub-Category</div>
            <Select
              placeholder="Select"
              onChange={this.setSubCategory}
              selected={this.state.subcategory}
              data={this.state.category ? this.state.category.children : []}
            />
          </div>
          <div className="u-w-100 u-ml-2">
            <div className="c-text -fw-light -fs-bigger u-mb-1/2">Sub-Category</div>
            <Select
              placeholder="Select"
              onChange={this.setSubSubCategory}
              selected={this.state.subsubcategory}
              data={this.state.subcategory ? this.state.subcategory.children : []}
            />
          </div>
        </div>

        <div className="u-mt-2">
          <div className="c-text -fw-light -fs-bigger">Title</div>
          <input
            className="input-text u-w-100 u-mt-1"
            placeholder="Write here"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="u-mt-2">
          <div className="c-text -fw-light -fs-bigger">Comment</div>
          <textarea
            className="u-w-100 u-mt-1"
            placeholder="Describe how your project might use this element"
            onChange={(e) => this.setState({ comment: e.target.value })}
          />
        </div>

        <div className="actions">
          <Button secondary onClick={this.props.onClose}>Close</Button>
          <Button primary onClick={this.add}>Add element</Button>
        </div>
      </div>
    );
  }
}

class ProjectCategory extends React.Component {
  static propTypes = {
    bmeDescription: PropTypes.func.isRequired,
  };

  state = { modal: { addCustomElement: true } };

  showAddCustomElement = () => this.setState({ modal: { addCustomElement: true } });

  onAdd = (params) => {
    this.setState({ modal: { addCustomElement: false } });
    this.props.onAddCustomElement(params);
  }

  render() {
    return (
      <div className="solution-category">
        {this.props.category.children.length == 0 &&
            <div className="row columns">
              <h2 className="c-title -fw-thin -fs-huge u-mt-1">No elements selected</h2>
            </div>
        }

        {<div className="solution-category-list">
          {this.props.category.children.map(child => <SummarySection
            key={child.id}
            parent={this.props.category}
            category={child}
            onCommentChange={this.props.onCommentChange}
            onBMEDisplay={this.props.onBMEDisplay}
            onDeleteCustomElement={this.props.onDeleteCustomElement}
            readonly={this.props.readonly}
            bmeDescription={this.props.bmeDescription}
          />)}
        </div>}

        {!this.props.readonly && <div className="row columns u-mt-2">
          <button
            className="c-custom-bme-button"
            onClick={this.showAddCustomElement}
          >Add custom element</button>
        </div>}

        <Modal
          open={!this.props.readonly && this.state.modal.addCustomElement}
          toggleModal={v => this.setState({ modal: { addCustomElement: v } })}
        >
          <AddCustomElementModal
            bmeTree={this.props.bmeTree}
            onAdd={this.onAdd}
            onClose={v => this.setState({ modal: { addCustomElement: false } })}
          />
        </Modal>
      </div>
    );
  }
}

export default ProjectCategory;
