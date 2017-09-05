import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import GridItem from 'components/common/GridItem';

// This value won't be a constant when we'll look at making the app
// responsive
const ITEMS_PER_PAGE = 4;

export default class GridSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0
    };
  }

  getPaginatedItems() {
    return this.props.items
      .slice(this.state.page * ITEMS_PER_PAGE, (this.state.page + 1) * ITEMS_PER_PAGE)
      .map(item => (
        <div className="column small-6 medium-3" key={item.id}>
          <GridItem
            image={item.image}
            imageLayout={this.props.layout || item.layout}
            title={item.title}
            subtitle={item.subtitle}
            link={item.link}
            placeholder={item.placeholder}
            onClick={this.props.onClick || item.onClick}
          />
        </div>
      ));
  }

  getPageCount() {
    return Math.ceil(this.props.items.length / ITEMS_PER_PAGE);
  }

  getLayout() {
    return this.props.layout
      || (this.props.items.length && this.props.items[0].imageLayout)
      || GridItem.defaultProps.imageLayout;
  }

  goToNextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  goToPreviousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    return (
      <div className="c-grid-slider row align-stretch">
        { this.state.page !== 0 && (
          <button
            type="button"
            className={classnames('button', '-previous', `-${this.getLayout()}`)}
            aria-label="Previous page"
            onClick={() => this.goToPreviousPage()}
          >
            <div className="image" />
          </button>
        )}

        { this.state.page !== this.getPageCount() - 1 && (
          <button
            type="button"
            className={classnames('button', '-next', `-${this.getLayout()}`)}
            aria-label="Next page"
            onClick={() => this.goToNextPage()}
          >
            <div className="image" />
          </button>
        )}

        {this.getPaginatedItems()}
      </div>
    );
  }
}

GridSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(GridItem.propTypes)).isRequired,
  layout: GridItem.propTypes.imageLayout, // eslint-disable-line react/no-unused-prop-types
  onClick: GridItem.propTypes.onClick
};
