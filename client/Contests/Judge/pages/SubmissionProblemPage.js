import React from 'react';
import Diff from 'react-diff';
import { sendFeedback, getSubmission, deleteSubmission } from '../../ContestActions';
import { withRouter } from 'react-router';

class SingleSubmissionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 'None' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getSubmission(this.props.params.submissionId).then(res => {
            if (res.submission) {
                this.setState({
                    submission: res.submission,
                    contestId: res.submission.contestID,
                    expectedOutput: res.expectedOutput,
                    actualOutput: res.actualOutput,
                });
            }
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(args) {
        if (this.state.value === 'Delete Submission') {
            deleteSubmission(this.props.params.submissionId);
            this.props.router.push(`/contest/${this.state.contestId}/submissions`);
        } else if (this.state.value === 'None') {
            alert('Please Select an Option');
        } else {
            sendFeedback(this.props.params.submissionId, {
                correct: this.state.value === 'Correct',
                feedback: this.state.value,
            });
            this.props.router.push(`/contest/${this.state.contestId}/submissions`);
        }
    }

    render() {
        const output = this.state.expectedOutput;
        const diff = output ?
            <Diff
                inputA={this.state.expectedOutput}
                inputB={this.state.actualOutput}
                type='chars'
                ignoreWhitespace='true'
            /> : null;

        return (
            <div className='single-submission-container'>
                <label>
                    Select feedback for this submission:
                    <select value={this.state.value} onChange={this.handleChange} >
                        <option value='None'>Please Select</option>
                        <option value='Correct'>Correct</option>
                        <option value='Bad Math'>Bad Math</option>
                        <option value='Bad Format'>Bad Format</option>
                        <option value='Compiler Error'>Compiler Error</option>
                        <option value='Delete Submission'>Delete Submission</option>
                    </select>
                </label>
                <button className='btn' onClick={this.handleSubmit}>Send Feedback</button>
                <table className='diff-table'>
                    <tbody>
                        <tr>
                            <th>Expected Output</th>
                            <th>User Output</th>
                            <th>Diff</th>
                        </tr>
                        <tr>
                            <td>{this.state.expectedOutput}</td>
                            <td>{this.state.actualOutput}</td>
                            <td>{diff}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


SingleSubmissionPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        submissionId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(SingleSubmissionPage);
