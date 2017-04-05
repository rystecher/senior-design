import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { getContestInfo, joinContest, openContest, closeContest } from '../../ContestActions';
import './home.css';

export default class ContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.closeConfirm = this.closeConfirm.bind(this);
        this.closeContest = this.closeContest.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    join() {
        if (!this.joined) {
            this.joined = true;
            const { joinedContest, params, username } = this.props;
            joinContest(params.contestId, username).then(() => {
                joinedContest(params.contestId);
            });
        }
    }

    openConfirm() {
        if (!this.state.open && !this.state.closed) {
            this.setState({
                showDialog: true,
                confirm: this.openContest,
                confirmText: 'Open',
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
        let closedClass = '';
        if (!this.state.open) {
            closedClass = 'disabled';
        } else if (this.state.closed) {
            closedClass = 'active';
            openClass = 'disabled';
        }
        return (
            <div>
                <Alert stack={{ limit: 3 }} timeout={2500} />
                <div id='header-banner'>
                    <h1>{this.state.name}</h1>
                    {this.props.userRole !== 'admin' ?
                        <h4>Created by {this.state.admin}</h4> : null
                    }
                </div>
                <div className='contest-home'>
                    {this.props.userRole === 'admin' ?
                        <div className='btn-wrapper'>
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
                        text={this.state.text}
                        title={this.state.title}
                    />
                    {this.props.userRole === 'none' && !this.state.closed ?
                        <button
                            className='btn btn-secondary join'
                            onClick={this.join}
                        >
                            Join Contest
                        </button> : null
                    }
                    {this.state.about && this.state.about.length > 0 ?
                        <div>
                            <h2>About</h2>
                            <div>{this.state.about}</div>
                        </div> : null
                    }
                    {this.state.rules && this.state.rules.length > 0 ?
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
    username: React.PropTypes.string.isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};
