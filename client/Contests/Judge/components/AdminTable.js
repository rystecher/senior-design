/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import { withRouter } from 'react-router';
import {fetchSubmissions} from '../../ContestActions.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../Home/pages/display-contests.css';

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

  goProblemView(cuid) {
    this.props.router.push(`/contest/${this.state.contestID}/submissions/${cuid}`);
  },

  /**
   *
   * @returns {XML}
   */
   render() {

    const columns = [{
      header: 'Team Name',
      accessor: 'teamName'
    }, {
      header: 'Problem Name',
      accessor: 'problemName'
    }, {
      header: 'Feedback',
      accessor: 'feedback'
    }];

    const submissions = this.state.submissions;
    let data  = [];
    if(this.state.submissions.length > 0) {
      submissions.forEach((submission) => {
        data.push({
          teamName: submission.teamName,
          problemName: submission.problemName,
          feedback: submission.feedback,
          cuid: submission.cuid
        });
      });
    }

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          showPageSizeOptions={false}
          defaultPageSize={10}
          className='-highlight'
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                this.goProblemView(rowInfo.row.cuid);
              },
            };
          }}
        />
      </div>
    );
  }
});

export default withRouter(AdminTable);
