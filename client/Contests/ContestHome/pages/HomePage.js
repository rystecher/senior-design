import React from 'react';
import { getContestInfo, joinContest, openContest, closeContest } from '../../ContestActions';
import './home.css';

export default class ContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.closeContest = this.closeContest.bind(this);
        this.join = this.join.bind(this);
        this.openContest = this.openContest.bind(this);
        this.state = {};
    }

    componentDidMount() {
        getContestInfo(this.props.params.contestId).then(res => {
            if (res.name) {
                const { about, admin, name, rules, open, closed } = res;
                this.setState({ about, admin, closed, name, rules, open });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.contestId !== this.props.params.contestId) {
            getContestInfo(nextProps.params.contestId).then(res => {
                if (res.name) {
                    const { about, admin, name, rules, open, closed } = res;
                    this.setState({ about, admin, closed, name, rules, open });
                }
            });
        }
    }

    closeContest() {
        if (!this.state.closed && this.state.open) {
            closeContest(this.props.params.contestId);
            this.setState({ closed: true });
        }
    }

    join() {
        if (!this.joined) {
            this.joined = true;
            const { joinedContest, params, username } = this.props;
            joinContest(params.contestId, username).then(() => {
                joinedContest(params.contestId);
            });
        }
    }

    openContest() {
        if (!this.state.open) {
            openContest(this.props.params.contestId);
            this.setState({ open: true });
        }
    }

    render() {
        if (!this.state.name) {
            return null;
        }
        const openClass = this.state.open ? 'active' : '';
        const closedClass = this.state.closed ? 'active' : '';
        return (
            <div>
                <div id='header-banner'>
                    <h1>{this.state.name}</h1>
                    {this.props.userRole !== 'admin' ?
                        <h4>Created by {this.state.admin}</h4> : null
                    }
                </div>
                <div className='contest-home'>
                    {this.props.userRole === 'admin' ?
                        <div className='btn-group' role='group' aria-label='...'>
                            <button
                                type='button'
                                className={`btn btn-secondary open ${openClass}`}
                                onClick={this.openContest}
                            >Open</button>
                            <button
                                type='button'
                                className={`btn btn-secondary closed ${closedClass}`}
                                onClick={this.closeContest}
                            >Close</button>
                        </div> : null
                    }
                    {this.props.userRole === 'none' ?
                        <button
                            className='btn btn-secondary join'
                            onClick={this.join}
                        >
                            Join Contest
                        </button> : null
                    }
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
    joinedContest: React.PropTypes.func.isRequired,
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
    }).isRequired,
    username: React.PropTypes.string.isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};
