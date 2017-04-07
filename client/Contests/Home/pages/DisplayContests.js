import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { getCreatedContests, getJoinedContests, getJoinableContests } from '../DisplayActions';
import 'react-table/react-table.css';
import './display-contests.css';
import { logout } from '../.././Login/actions/authActions';
import ContestNavigator from '../../ContestNavigator';

function getContestStatus(contest) {
    let status = 'Not started';
    if (contest.closed) {
        status = 'Closed';
    } else if ('number' === typeof contest.start) {
        status = 'Open';
    }
    return status;
}

class DisplayContests extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.goToContestHomePage = this.goToContestHomePage.bind(this);
        this.columns = [{
            header: 'Contest name',
            accessor: 'contestName',
        }, {
            header: 'Admin',
            accessor: 'contestAdmin',
        }, {
            header: 'Status',
            accessor: 'contestStart',
        }, {
            header: 'Role',
            accessor: 'userStatusWithContest',
        }];
    }

    componentDidMount() {
        const username = this.props.auth.user.username;
        getCreatedContests(username).then(res => {
            this.setState({ createdContests: res.contests });
        });
        getJoinedContests(username).then(res => {
            this.setState({ joinedContests: res.contests });
        });
        getJoinableContests(username).then(res => {
            this.setState({ joinableContests: res.contests });
        });
    }

    goToContestHomePage(contestId) {
        this.props.router.push(`/contest/${contestId}/home/`);
    }

    logout(e) {
        this.props.logout();
    }

    render() {
        const data = [];
        let loading = false;
        if (!this.state.createdContests || !this.state.joinedContests || !this.state.joinableContests) {
            loading = true;
        } else {
            const addContestRows = (contests, userStatus) => {
                contests.forEach((contest) => {
                    data.push({
                        contestName: contest.name,
                        contestAdmin: contest.admin,
                        contestStart: getContestStatus(contest),
                        userStatusWithContest: userStatus,
                        contestId: contest.cuid,
                    });
                });
            };
            if (this.state.createdContests) {
                addContestRows(this.state.createdContests, 'Creator');
            }
            if (this.state.joinedContests) {
                addContestRows(this.state.joinedContests, 'Participant');
            }
            if (this.state.joinableContests) {
                addContestRows(this.state.joinableContests, 'None');
            }
        }
        return (
            <div className='profile-container'>
                <ContestNavigator
                    contestId='wont be used'
                    page='none'
                    username={this.props.auth.user.username}
                    userRole='none'
                />
                <button
                    className='btn create'
                    onClick={() => this.props.router.push('/create-contest')}
                >Create Contest
                </button>
                <ReactTable
                    data={data}
                    columns={this.columns}
                    loading={loading}
                    showPageSizeOptions={false}
                    defaultPageSize={10}
                    showFilters
                    className='-highlight'
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                if (rowInfo) {
                                    this.goToContestHomePage(rowInfo.row.contestId);
                                }
                            },
                        };
                    }}
                />
            </div>
        );
    }
}

DisplayContests.propTypes = {
    auth: React.PropTypes.object.isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { logout })(withRouter(DisplayContests));
