/**
 * Created by courtneybolivar on 05/04/2017.
 */
import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateRegisterInput from '../../../../server/controllers/validateRegisterInput';
import validateLoginInput from '../../../../server/controllers/validateLoginInput';
import { login } from '../actions/authActions';
import { connect } from 'react-redux';


class LoginOrRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      invalid: false,
      username_taken: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
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
   * sets username_taken field
   * @param e
   */
  checkUserExists(e) {
    console.log("checking user exists");
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        if (res.data.user.length > 0) {
          this.setState({username_taken:true});
          console.log("username taken!");
        }
      });
    }
  }

  /**
   * tries to register user or sends message that user name is alread
   * taken
   * @param e
   */
  onSubmitRegister(e) {
    e.preventDefault();


    if (this.isValidRegister() && !this.state.username_taken ) {
      this.setState({ errors: {}, isLoading: true });
      console.log("valid register");
      this.props.userRegisterRequest(this.state).then(
        // here is where you redirect
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!',
          });

          // now log the user in: (copied from onSubmitLogin)
          if (this.isValidLogin()) {
            console.log("in is valid login");
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
              (res) => this.context.router.push(`/profile`),
              (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            );
          }
          // end of stuff copied

          this.context.router.push('/login');
        },
        ({ response }) => this.setState({ errors: response.data, isLoading: false })
      );
    }
    else if (this.state.username_taken){
      console.log("invalid username");
      this.props.addFlashMessage({
        type: 'error',
        text: 'This username is already taken. Please try again.',
      });
    }
  }


  /**
   * checks if provided info is a valid account
   */
  isValidLogin() {
    const {errors, isValid} = validateLoginInput(this.state);
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
      console.log("in is valid login");
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.push(`/profile`),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
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

        <TextFieldGroup
          error={errors.identifier}
          label='Username'
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.identifier}
          field='identifier'
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
          <button label='register' onClick={this.onSubmitRegister} disabled={this.state.isLoading || this.state.invalid} className='btn btn-primary btn-lg login'>
            Register
          </button>
          <div className="divider"/>
          <button label='login' onClick={this.onSubmitLogin} disabled={this.state.isLoading || this.state.invalid} className='btn btn-primary btn-lg login'>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginOrRegisterForm.propTypes = {
  userRegisterRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
};

LoginOrRegisterForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginOrRegisterForm);
