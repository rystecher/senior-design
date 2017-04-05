/**
 * Created by courtneybolivar on 05/04/2017.
 */
import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import validateRegisterInput from '../../../../server/controllers/validateRegisterInput';

class LoginOrRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      invalid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateRegisterInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    console.log("checking user exists");
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user.length > 0) {
          // if (res.user.length > 0) {
          errors[field] = field + ' already taken';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onSubmit(e) {
    console.log("label: " + e.getLabel());



    /*
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      // console.log(this.state);
      this.props.userRegisterRequest(this.state).then(
        // here is where you redirect
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!',
          });
          this.context.router.push('/login');
        },
        ({ response }) => this.setState({ errors: response.data, isLoading: false })
      );
    } */
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          error={errors.username}
          label='Username'
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
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
          <button label='register' disabled={this.state.isLoading || this.state.invalid} className='btn btn-primary btn-lg'>
            Register
          </button>
          <button label='login' disabled={this.state.isLoading || this.state.invalid} className='btn btn-primary btn-lg'>
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
};

LoginOrRegisterForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default LoginOrRegisterForm;
