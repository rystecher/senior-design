import React from 'react';
import { getCodeForSubmission } from '../../../../ContestActions.js';

class ParticipantSubmissionProblemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getCodeForSubmission(this.props.params.contestId, this.props.params.teamId, this.props.params.submissionId).then(res => {
            this.setState({
                code: res.code,
            });
        });
    }

    render() {
        const text = this.state.code ? this.state.code : ''
        return (
            <textarea rows="50" cols="80">
                text;
            </textarea>
          );
    }
}


ParticipantSubmissionProblemPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        teamId: React.PropTypes.string.isRequired,
        submissionId: React.PropTypes.string.isRequired,
    }).isRequired,
};

export default ParticipantSubmissionProblemPage;
