import React from 'react';
import ParticipantTable from '../components/ParticipantTable.js';
import { withRouter } from 'react-router';

class ParticipantPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contestId: props.params.contestId,
      teamId: props.params.teamsId,
    };
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <h1> Your Submissions  </h1>
        <br/>
        <AdminTable contestId={this.state.contestId} teamId={this.state.teamId}/>
      </div>
    );
  }
}

ParticipantPage.propTypes = {
  params: React.PropTypes.shape({
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string.isRequired
  }).isRequired ,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(AdminPage);
