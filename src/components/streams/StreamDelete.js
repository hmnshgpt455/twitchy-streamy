import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  renderActions() {
    const { deleteStream, selectedStream } = this.props;

    return (
      <>
        <button
          className="ui button negative"
          onClick={() => deleteStream(selectedStream.id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    const { selectedStream } = this.props;
    if (!selectedStream) {
      return 'Are you sure you want to delete the stream ?';
    }

    return `Are you sure you want to delete the stream with title : ${selectedStream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { selectedStream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream,
})(StreamDelete);
