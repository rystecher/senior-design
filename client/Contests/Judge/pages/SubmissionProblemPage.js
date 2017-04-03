/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import ConfirmLink from 'react-confirm-dialog';
import Diff from 'react-diff';

export default class SubmissionProblemPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {value: 'Correct'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * push response/feedback
   * @param args
   */
  handleSubmit(args) {

  }



  render() {

    const expectedOutput = "15.00 15.00 \
    6.25 3.75 \
    3.75 6.25 \
    16.25 13.75 \
    13.75 16.25";
    const submission = "15.00 15.00 \
    7.25 3.75 \
    3.35 6.25 \
    16.00 13.75 \
    13 16.25";

    return (
      <div>
        <h1>Submissions Table for Admin</h1>
        <br></br>

        <form>
          <label>
            Select feedback for this submission:
            <select value={this.state.value} onChange={this.handleChange} >
              <option value="Correct">Correct</option>
              <option value="Bad Math">Bad Math</option>
              <option value="Bad Format">Bad Format</option>
              <option value="Compiler Error">Compiler Error</option>
              <option value="Delete Submission">Delete Submission</option>
            </select>
          </label>
          <ConfirmLink action={this.handleSubmit}
                       confirmText="Send"
                       cancelText="Cancel"
                       confirmMessage={"Are you sure you want to send: " + this.state.value + "?"}>
            <a href="#">Send Feedback</a>
          </ConfirmLink>
        </form>


        <br></br>
        <table>
          <tr>
            <th>Expected Output</th>
            <th>User Output</th>
            <th>Diff</th>
          </tr>
          <tr>
            <td>
              {expectedOutput}
            </td>
            <td>
              {submission}
            </td>
            <td>
              <Diff inputA={expectedOutput} inputB={submission} type="chars" ignoreWhitespace="true"/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
