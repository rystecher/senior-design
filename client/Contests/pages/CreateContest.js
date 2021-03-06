import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { createContest } from '../ContestActions';
import { withRouter } from 'react-router';
import './createcontest.css';
import { connect } from 'react-redux';
import ContestNavigator from '../ContestNavigator';

class CreateContest extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.updateField = this.updateField.bind(this);
        this.state = { name: '', about: '', rules: '' };
    }

    submit() {
        const { username } = this.props.auth.user;
        const { name, about, rules } = this.state;
        if (0 === name.length) {
            Alert.warning('Cannot create contest without a name', {
                position: 'bottom-right',
                effect: 'slide',
            });
        } else {
            createContest({
                name, about, rules, teams: [], admin: username,
            }).then((res) => {
                if (res.contest.cuid) {
                    this.props.router.push(`/contest/${res.contest.cuid}/problems/add`);
                }
            });
        }
    }

    updateField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <Alert stack={{ limit: 3 }} timeout={2500} />
                <ContestNavigator
                    contestId='wont be used'
                    page='none'
                    username={this.props.auth.user.username}
                    userRole='none'
                />
                <div id='header-banner'>
                    <input
                        placeholder='Contest Name'
                        name='name'
                        type='text' value={this.state.name}
                        onChange={this.updateField}
                    />
                </div>
                <div className='contest-home'>
                    <h2>About</h2>
                    <textarea
                        name='about'
                        value={this.state.about}
                        onChange={this.updateField}
                    >
                    </textarea>
                    <h2>Rules</h2>
                    <textarea
                        name='rules'
                        value={this.state.rules}
                        onChange={this.updateField}
                    >
                    </textarea>
                    <div>
                        <button
                            className='btn create'
                            onClick={this.submit}
                        >
                            Create Contest
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

CreateContest.propTypes = {
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

export default connect(mapStateToProps)(withRouter(CreateContest));
