import React from 'react';
import { withRouter } from 'react-router';
import {fetchSubmissionsForTeam} from '../../../../ContestActions.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../../../Home/pages/display-contests.css';


const ParticipantTable = React.createClass({

  getInitialState() {
    return {
      contest_id: this.props.contestId,
      team_id: this.props.teamId,
      submissions: [],
    };
  },

  /**
   *
   */
  componentDidMount(){
    fetchSubmissionsForTeam(this.state.contest_id, this.state.team_id).then(res => {
      this.setState({
        submissions: res.submissions,
      });
    });
  },

  goProblemView(cuid) {
    this.props.router.push(`/contest/${this.state.contest_id}/submissions/${this.state.team_id}/${cuid}`);
  },

   render() {
    const columns = [{
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

export default withRouter(ParticipantTable);
