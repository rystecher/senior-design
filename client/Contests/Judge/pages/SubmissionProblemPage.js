/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import Diff from 'react-diff';
import { sendFeedback, getSubmission, deleteSubmission } from '../../ContestActions';
import { withRouter } from 'react-router';
import ReactTable from 'react-table';
import './SubmissionsProblemPage.css';
import styles from 'react-table/react-table.css';

class SubmissionProblemPage extends React.Component {

  /**
   *
   * @param props
   */
    constructor(props) {
        super(props);
        this.state = {
            submissionId: props.params.submissionId,
            value: 'None',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  /**
   * get submission data
   */
  componentDidMount(){
    const subId = this.state.submissionId;
    getSubmission(subId).then(res => {
      const  submission = res.submission;
      const actual = res.actualOutput;
      const expected = res.expectedOutput;
      this.setState({
        submission: res.submission,
        submissionId: subId,
        contestId: submission.contestID,
        teamId: submission.teamID,
        teamName: submission.teamName,
        problemName: submission.problemName,
        problemNumber: submission.problemNumber,
        expectedOutput: expected,
        actualOutput: actual
      });
    });
  }

  /**
   * update the feedback chosen
   * @param event
   */
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

  /**
   * push response/feedback
   * @param args
   */
    handleSubmit(args) {
    // set the feedback field
        this.state.submission.feedback = this.state.value;

    // set correct field:
        this.state.submission.correct = this.state.value == 'Correct';

        if (this.state.value == 'Delete Submission') {
            deleteSubmission(this.state.submissionId);
      // go back to the submissions table
            this.props.router.push(`/contest/${this.state.contestId}/submissions`);
        }
        else if (this.state.value == 'None')
            alert('Please Select an Option');
        else {
            const req = {
                correct: this.state.submission.correct,
                feedback: this.state.value,
            };
            sendFeedback(this.state.submissionId, req);
      // go back to submissions table
            this.props.router.push(`/contest/${this.state.contestId}/submissions`);
        }
    }


  /**
   *
   * @returns {XML}
   */
  render() {
    const teamName = (this.state.teamName != null) ? this.state.teamName : "Loading";
    const problemName = (this.state.problemName != null) ? this.state.problemName : "Loading";

    const output = this.state.expectedOutput;
    const diff = output ? <Diff inputA={this.state.expectedOutput}
                                inputB={this.state.actualOutput}
                                type="chars"
                                ignoreWhitespace="true"/> : null;
    const columns = [{
      header: 'Expected Output',
      accessor: 'expected'
    }, {
      header: 'Actual Output',
      accessor: 'actual'
    }, {
      header: 'Diff',
      accessor: 'diff'
    }];

    const data = [{
      expected: this.state.expectedOutput,
      actual: this.state.actualOutput,
      diff: diff
    }];

    return (
      <div>
        <h2>{teamName}: {problemName}</h2>

        <br></br>

        <form>
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
          <button onClick={this.handleSubmit} >Send Feedback</button>
        </form>
        <br></br>

        <ReactTable
          styles={styles}
          data={data}
          columns={columns}
          showPageSizeOptions={false}
          defaultPageSize={1}
          showPagination={false}
          className='-highlight'
        />

      </div>
    );
    }
}


SubmissionProblemPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        submissionId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(SubmissionProblemPage);
