import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BmeDetail from 'components/builder-index/BmeDetail'

import { leaves, withSlice } from 'utils/builder';
import {
  commentBME,
  deselectBME,
  deselectEnabling,
  selectBME,
  selectEnabling,
} from 'modules/builder';


class ConnectedBmeDetail extends React.Component {
  static propTypes = {
    bmeId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
  };

  render() {
    const { bmeId, initialTab } = this.props;

    return (
      <BmeDetail
        initialTab={initialTab}

        onClose={this.props.onClose}
        onNext={this.props.onNext}
        onPrev={this.props.onPrev}

        onSave={() => this.props.selectBME(bmeId)}
        onCommentChange={(text) => this.props.commentBME(bmeId, text)}
        onDelete={() => this.props.deselectBME(bmeId)}
        onEnablingSelect={(enabling) => this.props.selectEnabling(enabling.id)}
        onEnablingDeselect={(enabling) => this.props.deselectEnabling(enabling.id)}

        bme={this.props.bme}
        comment={this.props.comment}
        selected={this.props.selected}
        selectedEnablings={this.props.selectedEnablings}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    bme: leaves(state.builderAPI.bmeCategories).find(bme => bme.id === ownProps.bmeId),
    comment: state.builder[ownProps.slice].commentedBMEs[ownProps.bmeId],
    selected: state.builder[ownProps.slice].selectedBMEs.includes(ownProps.bmeId),
    selectedEnablings: state.builder[ownProps.slice].selectedEnablings,
  }),
  withSlice({
    commentBME,
    deselectBME,
    deselectEnabling,
    selectBME,
    selectEnabling,
  }),
)(ConnectedBmeDetail);
