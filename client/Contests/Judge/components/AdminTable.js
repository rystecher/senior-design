/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import Submission from './Submission.js';
import Styles from './Admin.css';

import {fetchSubmissions} from '../../ContestActions.js';

const AdminTable = React.createClass({

  /**
   *
   * @returns {{contest_id: string, submissions: Array}}
   */
  getInitialState() {
    return {
      contest_id: this.props.contestId,
      submissions: [],
    };
  },

  /**
   *
   */
  componentDidMount(){
    fetchSubmissions(this.state.contest_id).then(res => {
      this.setState({
        submissions: res,
      });
    });
  },

  /**
   *
   * @returns {XML}
   */
   render() {

    const submissions = this.state.submissions;
    let contestSubmissions  = null; // if we've fetched submissions, contestSubmissions
                                    // will be an array of <Submission > rows for the table
    if(this.state.submissions.length > 0) {
      contestSubmissions = submissions.map((sub) => <Submission sub={sub} key={sub.cuid}/>);
    }

    return (
      <div>
        <table className={Styles}>
          <tr>
            <th>Team</th>
            <th>Problem Name</th>
            <th>Correct?</th>
            <th>Feedback Given</th>
          </tr>
          {contestSubmissions}
        </table>
      </div>
    );
  }
});

export default AdminTable;
