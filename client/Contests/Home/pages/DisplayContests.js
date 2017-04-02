import React, { PropTypes, Component } from 'react';
import ReactTable from 'react-table'
import { connect } from 'react-redux';
import {getCreatedContests} from '../DisplayActions';
import 'react-table/react-table.css'


class DisplayContests extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
        //console.log(this.props.auth.user.username);
        const username = this.props.auth.user.username;
        getCreatedContests({ username }).then(res => {
            //console.log(res);
            this.setState({ createdContestsID: res.contests});
        });
    }

    render() {
        if (!this.state.createdContestsID) {
            return null;
        } else {
        const columns = [{
          header: 'Contest name',
          accessor: 'contestName'
        }, {
          header: 'Contest creator username',
          accessor: 'contestAdmin'
        }, {
          header: 'Contest started',
          accessor: 'contestStart'
        }];
        const data = [];
        for (var i=0; i < this.state.createdContestsID.length; i++) {
          data.push({
            contestName: this.state.createdContestsID[0].name,
            contestAdmin: this.state.createdContestsID[0].admin,
            contestStart: (!this.state.createdContestsID[0].closed).toString()
          });
        };

        //console.log(data);

        return (
            <div>
                <h1>My Contests</h1>
                <ReactTable data={data} columns={columns}/>
            </div>
        );
    }
  }
}

DisplayContests.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}


export default connect(mapStateToProps)(DisplayContests);
