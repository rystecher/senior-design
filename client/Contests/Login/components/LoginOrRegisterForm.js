/**
 * Created by courtneybolivar on 05/04/2017.
 */
import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateRegisterInput from '../../../../server/controllers/validateRegisterInput';
import validateLoginInput from '../../../../server/controllers/validateLoginInput';
import { login } from '../actions/authActions';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


class LoginOrRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.isValidRegister = this.isValidRegister.bind(this);
        this.isValidLogin = this.isValidLogin.bind(this);
    }

  /**
   * updates when user enters info
   * @param e
   */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

  /**
   *
   */
    isValidRegister() {
        const { errors, isValid } = validateRegisterInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

  /**
   * tries to register user or sends message that user name is alread
   * taken
   * @param e
   */
    onSubmitRegister(e) {
        e.preventDefault();

        if (this.isValidRegister()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userRegisterRequest(this.state).then(
            () => {
              // log user in
                if (this.isValidLogin()) {
                    this.setState({ errors: {}, isLoading: true });
                    this.props.login(this.state).then(
                      () => this.context.router.push(`/profile`),
                      (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                    );
                }
            },
            ({ response }) => {
                this.setState({ errors: response.data, isLoading: false });
                Alert.warning(this.state.errors.username, {
                    position: 'bottom-right',
                    effect: 'slide',
                });
            }
          );
        }
    }


  /**
   * checks if provided info is a valid account
   */
    isValidLogin() {
        const { errors, isValid } = validateLoginInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

  /**
   *
   * @param e
   */
    onSubmitLogin(e) {
        e.preventDefault();
        if (this.isValidLogin()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                () => {
                    this.context.router.push(`/profile`);
                },
              (err) => {
                  this.setState({ errors: err.response.data.errors, isLoading: false });
                  Alert.warning(this.state.errors.form, {
                      position: 'bottom-right',
                      effect: 'slide',
                  });
              }
          );
        }
    }

  /**
   *
   * @returns {XML}
   */
    render() {
        const { errors } = this.state;
        return (
            <form>
                <Alert stack={{ limit: 3 }} timeout={2500} />
                <TextFieldGroup
                    error={errors.username}
                    label='Username'
                    onChange={this.onChange}
                    value={this.state.username}
                    field='username'
                />

                <TextFieldGroup
                    error={errors.password}
                    label='Password'
                    onChange={this.onChange}
                    value={this.state.password}
                    field='password'
                    type='password'
                />
                <div className='form-group'>
                    <button label='register' onClick={this.onSubmitRegister} disabled={this.state.isLoading} className='login-btn btn-primary btn-lg'>
                      Register
                    </button>
                    <div className='divider' />
                    <button label='login' onClick={this.onSubmitLogin} disabled={this.state.isLoading} className='login-btn btn-primary btn-lg'>
                      Login
                    </button>
                </div>
            </form>
      );
    }
  }

LoginOrRegisterForm.propTypes = {
    userRegisterRequest: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
};

LoginOrRegisterForm.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginOrRegisterForm);
