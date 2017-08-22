import React from 'react';

import Button from 'components/common/Button';


class Sidebar extends React.Component {
  render() {
    if (this.props.readonly) {
      return (
        <div className="c-builder-sidebar">
          <div className="header">
            <Button className="u-w-100" primary onClick={this.props.onShowResultsClick}>Review your results</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="c-builder-sidebar">
        <div className="header">
          <Button className="u-w-100 u-mb-1/2" secondary onClick={this.props.onSolutionsClick}>Select a solution</Button>
          <Button className="u-w-100 u-mb-1/2" secondary onClick={this.props.onEnablingsClick}>Select enabling conditions</Button>
          <Button className="u-w-100" primary onClick={this.props.onShowResultsClick}>Review your results</Button>
        </div>

        <div className="footer">
          <Button className="u-w-100 u-mb-1/2" secondary onClick={this.props.onHelpClick}>Need help?</Button>
          <Button className="u-w-100 u-mb-1/2" secondary onClick={this.props.onResetClick}>Restart project</Button>
          <Button className="u-w-100" secondary onClick={this.props.onSaveClick}>Save current status</Button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
