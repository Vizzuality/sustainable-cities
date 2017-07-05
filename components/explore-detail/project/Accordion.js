import React from 'react';
import Proptypes from 'prop-types';

// components

export default class Accordion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { header, title, content } = this.props;

    return (
      <div className="c-accordion">
        {header && <div className="row">
          <div className="column small-12">
            <div className="accordion-header">
              {header({ isOpen, title, onClickButton: () => this.toggle() })}
            </div>
          </div>
        </div>}
        {isOpen && <div className="accordion-content">
          {content}
        </div>}
      </div>
    );
  }
}

Accordion.propTypes = {
  header: Proptypes.oneOfType([
    Proptypes.element,
    Proptypes.func
  ]),
  content: Proptypes.element.isRequired,
  isOpen: Proptypes.bool,
  title: Proptypes.string
};

Accordion.defaultProps = {
  isOpen: false
};
