/**
 * Created by courtneybolivar on 29/03/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './Admin.css';

export const Submission = React.createClass({
  /*
   changes the current problem text
   */
  handleSelect: function (){
    console.log("option selected");
  },

// takes in:
  /*
   cuid: { type: 'String', required: true },
   teamName: { type: 'String', required: true },
   teamID: { type: 'String', required: true },
   contestID: { type: 'String', required: true },
   problemName: { type: 'String', required: true },
   problemNumber: { type: 'Number', required: true },
   correct: { type: 'Boolean', required: true},
   hadStdError: { type: 'Boolean', required: true},
   feedback: String,     --> feed back users get in messenger
   expectedOutput: [String],
   actualOutput: [String],
   */

  render: function () {
    const sub = this.props.sub;

    // somewhere (team name/problem name) is a link sends user to that problem's problem page
    // send response
    return (
      <tr>
        <td>{sub.teamName}</td>
        <td><Link to="/create-contest">{sub.problemName}</Link></td>
        <td>{sub.correct}</td>
        <td>{sub.feedback}</td>
        <td>
          <select onSelect={this.handleSelect()}>
            <option value="0">0: Timed Out</option>
            <option value="0">1: Compiler Error</option>
            <option value="1">2: Bad Math</option>
            <option value="2">3: Bad Format</option>
            <option value="3">4: Correct</option>
            <option value="3">5: Discard this submission</option>
          </select>
        </td>
        <td>Send</td>
      </tr>
    );
  }
});

export default Submission;
