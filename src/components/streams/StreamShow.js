import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { selectedStream } = this.props;

    if (!selectedStream) {
      return <div>Loading....</div>;
    }

    return (
      <div>
        <h1>{selectedStream.title}</h1>
        <h5>{selectedStream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { selectedStream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
