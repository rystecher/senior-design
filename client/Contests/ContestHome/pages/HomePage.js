import React from 'react';
import { getContestInfo, joinContest } from '../../ContestActions';
import { connect } from 'react-redux';
import './home.css';

class ContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.join = this.join.bind(this);
        this.state = {};
    }

    componentDidMount() {
        getContestInfo(this.props.params.contest_id).then(res => {
            if (res.name) {
                const { name, about, rules } = res;
                this.setState({ name, about, rules });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.contest_id !== this.props.params.contest_id) {
            getContestInfo(this.props.params.contest_id).then(res => {
                let { name, about, rules } = res;
                this.setState({ name, about, rules });
            });
        }
    }

    join() {
        const { auth, params } = this.props;
        console.log(params.contest_id, auth.user.username);
        joinContest(params.contest_id, auth.user.username);
    }


    render() {
        const { userRole, admin } = this.state;
        if (!this.state.name) {
            return null;
        }
        return (
            <div>
                <div id='header-banner'>
                    <h1>{this.state.name}</h1>
                    {userRole && userRole !== 'admin' ?
                        `<h3>Created by ${this.admin}</h3>` : null
                    }
                </div>
                <div className='contest-home'>
                    <button
                        onClick={this.join}
                    >
                        Join Contest
                    </button>
                    <h2>About</h2>
                    <div>{this.state.about}</div>
                    <h2>Rules</h2>
                    <div>{this.state.rules}</div>
                </div>
            </div>
        );
    }
}

ContestHome.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(ContestHome);
