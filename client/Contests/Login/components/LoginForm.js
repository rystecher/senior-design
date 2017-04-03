import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateLoginInput from '../../../../server/controllers/validateLoginInput';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const {errors, isValid} = validateLoginInput(this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
              (res) => this.context.router.push(`/users/${this.state.identifier}`),
              //      this.context.router.push(`/users/${this.state.identifier}`);
              (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;

        return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        {errors.form && <div className='alert alert-danger'>{errors.form}</div>}

        <TextFieldGroup
            field='identifier'
            label='Username'
            value={identifier}
            error={errors.identifier}
            onChange={this.onChange}
        />

        <TextFieldGroup
            field='password'
            label='Password'
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type='password'
        />

        <div className='form-group'><button className='btn btn-primary btn-lg' disabled={isLoading}>Login</button></div>
      </form>
    );
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginForm);
