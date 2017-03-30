import React, { PropTypes, Component } from 'react';
import ReactTable from 'react-table'
import { connect } from 'react-redux';
import {getCreatedContests} from '../DisplayActions';


class DisplayContests extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
        console.log(this.props.auth.user.username);
        const username = this.props.auth.user.username;
        getCreatedContests({ username }).then(res => {
            const { createdContestsID } = res;
            this.setState({ createdContestsID });
        });
    }

    render() {
        if (!this.state.createdContestsID) {
            return null;
        } else {
        const columns = [{
          title: 'Contest Name', dataIndex: 'contestName', key:'contestName', width: 100,
        }];
        const data = this.state.createdContestsID;
        console.log(data[0]);
        return (
            <div>
                <h1>Contests Created</h1>
                <ReactTable columns={columns} data={data}/>
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
