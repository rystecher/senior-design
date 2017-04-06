import React from 'react';
import Diff from 'react-diff';
import { sendFeedback, getSubmission, deleteSubmission } from '../../ContestActions';
import { withRouter } from 'react-router';
import ReactTable from 'react-table';
import Alert from 'react-s-alert';
import './single-submission.css';
import styles from 'react-table/react-table.css';

class SingleSubmissionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 'None', loading: true };
        this.columns = [{
            header: 'Expected Output',
            accessor: 'expected',
        }, {
            header: 'Actual Output',
            accessor: 'actual',
        }, {
            header: 'Diff',
            accessor: 'diff',
        }];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getSubmission(this.props.params.submissionId).then(res => {
            if (res.submission) {
                this.setState({
                    submission: res.submission,
                    contestId: res.submission.contestID,
                    teamName: res.submission.teamName,
                    problemName: res.submission.problemName,
                    problemNumber: res.submission.problemNumber,
                    expectedOutput: res.expectedOutput,
                    actualOutput: res.actualOutput,
                    loading: false,
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
            Alert.warning('Please select a feedback message', {
                position: 'bottom-right',
                effect: 'slide',
            });
        } else {
            sendFeedback(this.props.params.submissionId, {
                correct: this.state.value === 'Correct',
                feedback: this.state.value,
            }).then(() => this.props.router.push(`/contest/${this.state.contestId}/submissions`));
        }
    }

    render() {
        const teamName = this.state.teamName || '';
        const problemName = this.state.problemName || '';
        const diff = this.state.expectedOutput ?
            <Diff
                inputA={this.state.expectedOutput}
                inputB={this.state.actualOutput}
                type='chars'
                ignoreWhitespace='true'
            /> : null;
        const data = [{
            expected: this.state.expectedOutput,
            actual: this.state.actualOutput,
            diff,
        }];

        return (
            <div className='single-submissions-container'>
                <h2>{teamName}: {problemName}</h2>
                <div className='feedback-container'>
                    <div className='input-group'>
                        <select value={this.state.value} onChange={this.handleChange} >
                            <option value='None'>Please Select</option>
                            <option value='Correct'>Correct</option>
                            <option value='Bad Math'>Bad Math</option>
                            <option value='Bad Format'>Bad Format</option>
                            <option value='Compiler Error'>Compiler Error</option>
                            <option value='Delete Submission'>Delete Submission</option>
                        </select>
                        <span className='input-group-btn'>
                            <button
                                onClick={this.handleSubmit}
                                className='btn'
                                type='button'
                            >Send</button>
                        </span>
                    </div>
                </div>
                <ReactTable
                    loading={this.state.loading}
                    styles={styles}
                    data={data}
                    columns={this.columns}
                    showPageSizeOptions={false}
                    defaultPageSize={1}
                    showPagination={false}
                />
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
