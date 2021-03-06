import React from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { getContestInfo, joinContest, openContest, closeContest } from '../ContestActions';
import './contesthomepage.css';
import { withRouter } from 'react-router';

class ContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.closeContest = this.closeContest.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editContest = this.editContest.bind(this);
        this.goToProblemPage = this.goToProblemPage.bind(this);
        this.join = this.join.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
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

    closeConfirm() {
        if (!this.state.closed && this.state.open) {
            this.setState({
                showDialog: true,
                confirm: this.closeContest,
                confirmText: 'Close',
                noCancel: false,
                text: `You cannot reopen a contest after it is closed.
                    Are you sure want to open the contest?`,
                title: 'Close Contest',
            });
        }
    }

    closeContest() {
        this.closeModal();
        closeContest(this.props.params.contestId);
        this.setState({ closed: true });
    }

    closeModal() {
        this.setState({ showDialog: false });
    }

    editContest() {
        if (!this.state.open) {
            this.props.router.push(`/contest/${this.props.params.contestId}/edit`);
        }
    }

    goToProblemPage(teamId) {
        this.closeModal();
        this.props.router.push(`/contest/${this.props.params.contestId}/problems/${teamId}/1`);
    }

    join() {
        if (!this.joined) {
            this.joined = true;
            const { joinedContest, params, username } = this.props;
            joinContest(params.contestId, username).then((res) => {
                joinedContest(params.contestId);
                this.setState({
                    showDialog: true,
                    confirm: () => this.goToProblemPage(res.teamId),
                    confirmText: 'Get Started!',
                    noCancel: true,
                    text: `You have successfully joined the contest!
                        You can use the navigation bar to see the scoreboard
                        view your submissions or return to the home page. Happy Hacking!
                        `,
                    title: 'Congratulations!',
                });
            });
        }
    }

    openConfirm() {
        if (!this.state.open && !this.state.closed) {
            this.setState({
                showDialog: true,
                confirm: this.openContest,
                confirmText: 'Open',
                noCancel: false,
                text: `You cannot add problems after opening a contest.
                    Are you sure want to open the contest?`,
                title: 'Open Contest',
            });
        }
    }

    openContest() {
        this.closeModal();
        openContest(this.props.params.contestId).then(res => {
            if (res.success) {
                this.setState({ open: true });
            } else {
                Alert.error('Cannot open contest without any problems', {
                    position: 'bottom-right',
                    effect: 'slide',
                });
            }
        });
    }

    render() {
        if (!this.state.name) {
            return null;
        }
        let openClass = this.state.open ? 'active' : '';
        const editClass = this.state.open ? 'disabled' : '';
        let closedClass = '';
        if (!this.state.open) {
            closedClass = 'disabled';
        } else if (this.state.closed) {
            closedClass = 'active';
            openClass = 'disabled';
        }
        return (
            <div>
                <div id='header-banner'>
                    <h1>{this.state.name}</h1>
                    {'admin' !== this.props.userRole ?
                        <h4>Created by {this.state.admin}</h4> : null
                    }
                </div>
                <div className='contest-home'>
                    {'admin' === this.props.userRole ?
                        <div className='btn-wrapper'>
                            <button
                                type='button'
                                className={`btn open ${editClass}`}
                                onClick={this.editContest}
                            >Edit</button>
                            <button
                                type='button'
                                className={`btn open ${openClass}`}
                                onClick={this.openConfirm}
                            >Open</button>
                            <button
                                type='button'
                                className={`btn closed ${closedClass}`}
                                onClick={this.closeConfirm}
                            >Close</button>
                        </div> : null
                    }
                    <ConfirmationDialog
                        showDialog={this.state.showDialog}
                        confirm={this.state.confirm}
                        confirmText={this.state.confirmText}
                        closeModal={this.closeModal}
                        noCancel={this.state.noCancel}
                        text={this.state.text}
                        title={this.state.title}
                    />
                    {'none' === this.props.userRole && !this.state.closed && this.state.open ?
                        <button
                            className='btn btn-secondary join'
                            onClick={this.join}
                        >
                            Join Contest
                        </button> : null
                    }
                    {this.state.about && 0 < this.state.about.length ?
                        <div>
                            <h2>About</h2>
                            <div>{this.state.about}</div>
                        </div> : null
                    }
                    {this.state.rules && 0 < this.state.rules.length ?
                        <div>
                            <h2>Rules</h2>
                            <div>{this.state.rules}</div>
                        </div> : null
                    }
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
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
    username: React.PropTypes.string.isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};

export default withRouter(ContestHome);
