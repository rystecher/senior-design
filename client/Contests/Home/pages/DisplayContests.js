import React, { PropTypes, Component } from 'react';
import ReactTable from 'react-table'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {getCreatedContests, getJoinedContests} from '../DisplayActions';
import 'react-table/react-table.css'


class DisplayContests extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this.goToContestHomePage = this.goToContestHomePage.bind(this);
    }

    componentDidMount() {
        //console.log(this.props.auth.user.username);
        const username = this.props.auth.user.username;
        getCreatedContests({ username }).then(res => {
            //console.log(res);
            this.setState({ createdContestsID: res.contests});
        });
        getJoinedContests({ username }).then(res => {
            //console.log(res.contests);
            this.setState({ joinedContests: res.contests});
        });
    }

    goToContestHomePage(contestId) {
        this.props.router.push(`/contest/${contestId}/home/`);
    }

    render() {
        const columns = [{
          header: 'Contest name',
          accessor: 'contestName'
        }, {
          header: 'Contest creator username',
          accessor: 'contestAdmin'
        }, {
          header: 'Contest started',
          accessor: 'contestStart'
        }, {
          header: 'Contest id',
          accessor: 'contestId',
          render: ({value, rowValues}) => {
                return <button onClick={(e) => this.goToContestHomePage(rowValues.contestId)}>Contest Home</button>
              }
        }];
        const data = [];

        if (!this.state.createdContestsID && !this.state.joinedContests) {
            return null;
        } else {
            if (this.state.createdContestsID) {
              for (var i=0; i < this.state.createdContestsID.length; i++) {
                data.push({
                  contestName: this.state.createdContestsID[i].name,
                  contestAdmin: this.state.createdContestsID[i].admin,
                  contestStart: (!this.state.createdContestsID[i].closed).toString(),
                  contestId: this.state.createdContestsID[i].cuid
                });
              }
            }
            if (this.state.joinedContests) {
              for (var i=0; i < this.state.joinedContests.length; i++) {
                data.push({
                  contestName: this.state.joinedContests[i].name,
                  contestAdmin: this.state.joinedContests[i].admin,
                  contestStart: (!this.state.joinedContests[i].closed).toString(),
                  contestId: this.state.joinedContests[i].cuid
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
    auth: state.auth
  };
}


export default connect(mapStateToProps)(withRouter(DisplayContests));
