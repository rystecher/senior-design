import React from 'react';
import Alert from 'react-s-alert';
import { updateContestInfo, getContestInfo } from '../ContestActions';
import { withRouter } from 'react-router';

class EditContestPage extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.updateField = this.updateField.bind(this);
        this.state = { name: '', about: '', rules: '', loading: true };
    }

    componentDidMount() {
        getContestInfo(this.props.params.contestId).then(res => {
            if (res.name) {
                const { about, name, rules, open } = res;
                this.setState({ about, name, rules, open, loading: false });
            }
        });
    }

    submit() {
        const { name, about, rules } = this.state;
        if (name.length === 0) {
            Alert.warning('Cannot create contest without a name', {
                position: 'bottom-right',
                effect: 'slide',
            });
        } else {
            updateContestInfo(this.props.params.contestId, {
                name, about, rules,
            }).then(() => {
                this.props.router.push(`/contest/${this.props.params.contestId}/home`);
            });
        }
    }

    updateField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        if (this.props.userRole !== 'admin') {
            return this.props.getForbiddenComponent();
        }
        if (this.state.loading) {
            return null;
        }
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
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

EditContestPage.propTypes = {
    getForbiddenComponent: React.PropTypes.func.isRequired,
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};

export default (withRouter(EditContestPage));
