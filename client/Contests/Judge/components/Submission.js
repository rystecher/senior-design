/**
 * Created by courtneybolivar on 29/03/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './Admin.css';
import { withRouter } from 'react-router';


const Submission = React.createClass({

  render: function () {
    const sub = this.props.sub;
    return (
      <tr>
        <td>{sub.teamName}</td>
        <td><Link to={`/contest/${sub.contestID}/submissions/${sub.cuid}`}>
          {sub.problemName}
        </Link></td>
        <td>{sub.correct}</td>
        <td>{sub.feedback}</td>
      </tr>
    );
  }
});


export default withRouter(Submission);
