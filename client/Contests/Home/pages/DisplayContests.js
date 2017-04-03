import React, { PropTypes, Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCreatedContests, getJoinedContests, getJoinableContests } from '../DisplayActions';
import 'react-table/react-table.css'


class DisplayContests extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.goToContestHomePage = this.goToContestHomePage.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.auth.user.username);
    const username = this.props.auth.user.username;
    getCreatedContests(username).then(res => {
      //console.log(res);
      this.setState({createdContests: res.contests});
    });
    getJoinedContests(username).then(res => {
      //console.log(res.contests);
      this.setState({joinedContests: res.contests});
    });
    getJoinableContests(username).then(res => {
      //console.log(res.contests);
      this.setState({joinableContests: res.contests});
    });
  }

  goToContestHomePage(contestId) {
    this.props.router.push(`/contest/${contestId}/home/`);
  }

  render() {
    const columns = [{
      header: 'Contest name',
      accessor: 'contestName',
    }, {
      header: 'Contest creator username',
      accessor: 'contestAdmin',
    }, {
      header: 'Contest started',
      accessor: 'contestStart',
      header: 'Contest creator',
      accessor: 'contestAdmin'
    }, {
      header: 'Contest status',
      accessor: 'contestStart'
    }, {
      header: 'Your status',
      accessor: 'userStatusWithContest'
    }, {
      header: 'Contest home page',
      accessor: 'contestId',
      render: ({rowValues}) => {
        return <button onClick={(e) => this.goToContestHomePage(rowValues.contestId)}>Take me to this contest</button>
      }
    }];
    const data = [];

    if (!this.state.createdContests && !this.state.joinedContests && !this.state.joinableContests) {
      return null;
    } else {
        if (this.state.createdContests) {
          for (var i = 0; i < this.state.createdContests.length; i++) {
            data.push({
              contestName: this.state.createdContests[i].name,
              contestAdmin: this.state.createdContests[i].admin,
              contestStart: (this.state.createdContests[i].closed) ? 'Closed' : 'Started',
              userStatusWithContest: 'Created',
              contestId: this.state.createdContests[i].cuid
            });
          }
        }
        if (this.state.joinedContests) {
          for (var i = 0; i < this.state.joinedContests.length; i++) {
            data.push({
              contestName: this.state.joinedContests[i].name,
              contestAdmin: this.state.joinedContests[i].admin,
              contestStart: (this.state.joinedContests[i].closed) ? 'Closed' : 'Started',
              userStatusWithContest: 'Joined',
              contestId: this.state.joinedContests[i].cuid
            });
          }
        }
        if (this.state.joinableContests) {
          for (var i = 0; i < this.state.joinableContests.length; i++) {
            data.push({
              contestName: this.state.joinableContests[i].name,
              contestAdmin: this.state.joinableContests[i].admin,
              contestStart: (this.state.joinableContests[i].closed) ? 'Closed' : 'Started',
              userStatusWithContest: 'Not Joined',
              contestId: this.state.joinableContests[i].cuid
            });
          }
        }
      }
      return (
        <div>
          <h1>My Contests</h1>
          <ReactTable data={data} columns={columns}/>
        </div>
      );
    }
}

DisplayContests.propTypes = {
    auth: React.PropTypes.object.isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(withRouter(DisplayContests));
