import React from 'react';
import { createContest } from '../../ContestActions';
import { withRouter } from 'react-router';
import './create_contest.css';
import { connect } from 'react-redux';

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
        createContest({
            name, about, rules, teams: [], admin: username,
        }).then((res) => {
            if (res.contest.cuid) {
                this.props.router.push(`/contest/${res.contest.cuid}/problems/add`);
            }
        });
    }

    updateField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
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
                    <textarea name='about'
                        value={this.state.about}
                        onChange={this.updateField}
                    >
                    </textarea>
                    <h2>Rules</h2>
                    <textarea name='rules'
                        value={this.state.rules}
                        onChange={this.updateField}
                    >
                    </textarea>
                    <div>
                        <button
                            id='submit'
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
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(withRouter(CreateContest));
