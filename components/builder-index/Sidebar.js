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
          <div className="u-relative">
            <div className="tutorial-popup-cover tutorial-cover--solution" />
            <Button className="tutorial-popup-button u-w-100 u-mb-1/2" secondary={this.props.tutorialStep != "solution"} onClick={this.props.onSolutionsClick}>
              Select a solution
            </Button>
            <div className="tutorial-popup tutorial-popup--solution">
              <p>
                Start here selecting what type of solution is your project. It
                will change the elements you can select on the chart.
              </p>

              <div>
                <Button className="u-mr-1/2" primary onClick={this.props.onSolutionsClick}>Select</Button>
                <Button secondary onClick={this.props.onTutorialSkip}>Skip</Button>
              </div>
            </div>
          </div>
          {/*<div className="u-relative">
            <div className="tutorial-popup-cover tutorial-cover--enabling-condition" />
            <Button className="tutorial-popup-button u-w-100 u-mb-1/2" secondary={this.props.tutorialStep != "enabling-condition"} onClick={this.props.onEnablingsClick}>Select enabling conditions</Button>
            <div className="tutorial-popup tutorial-popup--enabling-condition">
              <p>
                Now add some enabling conditions related with your project o know what elements would be affected
              </p>

              <div>
                <Button className="u-mr-1/2" primary onClick={this.props.onEnablingsClick}>Select</Button>
                <Button secondary onClick={this.props.onTutorialSkip}>Skip</Button>
              </div>
            </div>
          </div>*/}
          <Button className="u-w-100" secondary onClick={this.props.onShowResultsClick}>Review your results</Button>

        </div>

        <div className="u-relative">
          <div className="tutorial-popup-cover tutorial-cover--bme" />
          <div className="tutorial-popup tutorial-popup--bme">
            <p>
              Now you are ready to start adding elements to your project.
            </p>

            <div>
              <Button primary onClick={this.props.onTutorialSkip}>Start</Button>
            </div>
          </div>
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
