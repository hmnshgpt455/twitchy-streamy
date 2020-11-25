import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  renderStream() {
    const { selectedStream } = this.props;

    return selectedStream ? (
      <div>
        {selectedStream.title}
        {selectedStream.description}
      </div>
    ) : null;
  }

  render() {
    return <div>{this.renderStream()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { selectedStream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
