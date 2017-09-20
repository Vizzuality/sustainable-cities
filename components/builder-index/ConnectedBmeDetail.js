import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BmeDetail from 'components/builder-index/BmeDetail';

import { leaves, withSlice } from 'utils/builder';
import {
  commentBME,
  deselectBME,
  deselectEnabling,
  selectBME,
  selectEnabling
} from 'modules/builder';


function ConnectedBmeDetail(props) {
  const {
    bmeId,
    initialTab,
    onClose,
    onNext,
    onPrev,
    bme,
    comment,
    selected,
    selectedEnablings
  } = props;

  return (
    <BmeDetail
      initialTab={initialTab}

      onClose={onClose}
      onNext={onNext}
      onPrev={onPrev}

      onSave={() => props.selectBME(bmeId)}
      onCommentChange={text => props.commentBME(bmeId, text)}
      onDelete={() => props.deselectBME(bmeId)}
      onEnablingSelect={enabling => props.selectEnabling(enabling.id)}
      onEnablingDeselect={enabling => props.deselectEnabling(enabling.id)}

      bme={bme}
      comment={comment}
      selected={selected}
      selectedEnablings={selectedEnablings}
    />
  );
}

ConnectedBmeDetail.propTypes = {
  bmeId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  bme: PropTypes.object,
  initialTab: PropTypes.string,
  selectBME: PropTypes.func,
  commentBME: PropTypes.func,
  deselectBME: PropTypes.func,
  selectEnabling: PropTypes.func,
  deselectEnabling: PropTypes.func,
  comment: PropTypes.string,
  selected: PropTypes.bool,
  selectedEnablings: PropTypes.array
};

export default connect(
  (state, ownProps) => ({
    bme: leaves(state.builderAPI.bmeCategories).find(bme => bme.id === ownProps.bmeId),
    comment: state.builder[ownProps.slice].commentedBMEs[ownProps.bmeId],
    selected: state.builder[ownProps.slice].selectedBMEs.includes(ownProps.bmeId),
    selectedEnablings: state.builder[ownProps.slice].selectedEnablings
  }),
  withSlice({
    commentBME,
    deselectBME,
    deselectEnabling,
    selectBME,
    selectEnabling
  }),
)(ConnectedBmeDetail);
