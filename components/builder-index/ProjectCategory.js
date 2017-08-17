import React from 'react';
import PropTypes from 'prop-types';

import SummarySection from 'components/builder-index/SummarySection';


class ProjectCategory extends React.Component {
  static propTypes = {
    bmeDescription: PropTypes.func.isRequired,
  };

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
            readonly={this.props.readonly}
            bmeDescription={this.props.bmeDescription}
          />)}
        </div>}
      </div>
    );
  }
}

export default ProjectCategory;
