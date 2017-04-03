/**
 * Created by courtneybolivar on 29/03/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './Admin.css';

export const Submission = React.createClass({

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
    const link = "/submission/" + sub.cuid; //sub.teamName + sub.problemName;
    // somewhere (team name/problem name) is a link sends user to that problem's problem page
    // send response
    return (
      <tr>
        <td>{sub.teamName}</td>
        <td><Link to={`/contest/${sub.contestId}/submissions/${sub.cuid}`} >{sub.problemName}</Link></td>
        <td>{sub.correct}</td>
        <td>{sub.feedback}</td>
      </tr>
    );
  }
});

export default Submission;
