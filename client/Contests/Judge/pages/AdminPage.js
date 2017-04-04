/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import AdminTable from '../components/AdminTable.js';
import { withRouter } from 'react-router';

class AdminPage extends React.Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      contestId: props.params.contestId,
    };
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <h1> Welcome to the Admin Page </h1>
        <br/>
        <AdminTable contestId={this.state.contestId}/>
      </div>
    );
  }
}

AdminPage.propTypes = {
  params: React.PropTypes.shape({
    contestId: React.PropTypes.string.isRequired
  }).isRequired ,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(AdminPage);

