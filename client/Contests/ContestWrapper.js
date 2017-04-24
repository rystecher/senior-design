import React from 'react';
import { connect } from 'react-redux';
import ContestNavigator from './ContestNavigator';
import MessageAlert from './MessageAlert';
import { getUserRole, hasNewMessage } from './ContestActions';
import { Link } from 'react-router';
import './contest.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class ContestWrapper extends React.Component {

    constructor(props) {
        super(props);
        console.log();
        this.getUserRoleWrapper = this.getUserRoleWrapper.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.getUserRoleWrapper(this.props.params.contestId);
    }

    componentWillReceiveProps(nextProps) {
        const { contestId } = nextProps.params;
        if (this.props.params.contestId !== contestId) {
            this.setState({ userRole: null });
            this.getUserRoleWrapper(contestId);
            if (this.chatIntervId) {
                clearInterval(this.chatIntervId);
            }
        }
    }

    componentWillUnmount() {
        if (this.chatIntervId) {
            clearInterval(this.chatIntervId);
        }
    }

    onNewMessage(teamId) {
        if (this.getPage() !== 'submissions') {
            this.setState({ contentTemplate: MessageAlert });
            Alert.info('You have a ', {
                position: 'bottom-right',
                customFields: {
                    contestId: this.props.params.contestId,
                },
                onClose: () => { this.setState({ contentTemplate: null }); },
            });
        }
    }

    getPage() {
        try {
            return this.props.children.props.route.page;
        } catch (error) {
            return '';
        }
    }

    getUserRoleWrapper(contestId) {
        const { username } = this.props.auth.user;
        getUserRole(contestId, username).then(res => {
            if (res.userRole) {
                this.setState({ userRole: res.userRole, teamId: res.teamId });
                if (res.userRole === 'admin') {
                    const intervalFunc = () => hasNewMessage(contestId).then(res2 => {
                        if (res2.newMessage) {
                            this.onNewMessage(res2.newMessage);
                        }
                    });
                    intervalFunc();
                    this.chatIntervId = setInterval(intervalFunc, 5000);
                }
            } else {
                this.setState({ err: 'Failed to get user role' });
            }
        });
    }

    getForbiddenComponent() {
        return (
            <div>
                <h4 className='hidden-text'>
                    This is not the page you are looking for.<br />
                    Move along. Move along...<br /><br />
                    <Link to={'/profile'}>Return to Home Page</Link>
                </h4>
            </div>
        );
    }

    render() {
        const { username } = this.props.auth.user;
        if (!this.state.userRole) {
            return null;
        }
        const page = this.getPage();
        const childrenProps = {
            joinedContest: this.getUserRoleWrapper,
            getForbiddenComponent: this.getForbiddenComponent,
            username,
            userRole: this.state.userRole,
        };
        const childrenWithProps = React.cloneElement(this.props.children, childrenProps);
        return (
            <div className='contest-container'>
                <ContestNavigator
                    contestId={this.props.params.contestId}
                    page={page}
                    teamId={this.state.teamId}
                    username={username}
                    userRole={this.state.userRole}
                />
                <div className='contest-child-container'>
                    {childrenWithProps}
                </div>
                <Alert stack={{ limit: 1 }} timeout={5000} contentTemplate={this.state.contentTemplate} />
            </div>
        );
    }
}

ContestWrapper.propTypes = {
    auth: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
    location: React.PropTypes.shape({
        pathname: React.PropTypes.string.isRequired,
    }).isRequired,
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(ContestWrapper);
