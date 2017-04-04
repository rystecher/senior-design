import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ContestNavigator from './ContestNavigator';
import { getUserRole } from './ContestActions';

class ContestWrapper extends React.Component {

    constructor(props) {
        super(props);
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
        }
    }

    getUserRoleWrapper(contestId) {
        const { username } = this.props.auth.user;
        getUserRole(contestId, username).then(res => {
            if (res.userRole) {
                this.setState({ userRole: res.userRole, teamId: res.teamId });
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
        const page = this.props.location.pathname.split('/')[3];
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
                {childrenWithProps}
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
