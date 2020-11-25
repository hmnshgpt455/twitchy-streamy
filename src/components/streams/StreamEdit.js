import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  renderStream() {
    const { selectedStream } = this.props;

    return selectedStream ? (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(selectedStream, 'title', 'description')}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }

  render() {
    return <div>{this.renderStream()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { selectedStream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream,
})(StreamEdit);
