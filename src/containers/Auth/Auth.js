import React, {Component} from 'react';
import classes from './Auth.module.css';
import Input from './../../components/ui/input/Input';
import Button from './../../components/ui/button/Button';
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    formValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  enterHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  signUpHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = event => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  onChangeHandler = (event, ctrlName) => {
    const formControls = {...this.state.formControls};
    const ctrl = {...formControls[ctrlName]};

    ctrl.value = event.target.value;
    ctrl.touched = true;
    ctrl.valid = this.validateControl(ctrl.value, ctrl.validation);

    formControls[ctrlName] = ctrl;
    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid
    })
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((ctrlName, idx) => {
      const ctrl = this.state.formControls[ctrlName];
      return (
        <Input
          key={ctrlName + idx}
          value={ctrl.value}
          type={ctrl.type}
          label={ctrl.label}
          valid={ctrl.valid}
          touched={ctrl.touched}
          shouldValidate={!!ctrl.validation}
          errorMessage={ctrl.errorMessage}
          onChange={event => this.onChangeHandler(event, ctrlName)}
        />
      )
    })
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form
            className={classes.AuthForm}
            onSubmit={this.submitHandler}
          >
            { this.renderInputs() }
            <Button
              type="success"
              onClick={this.enterHandler}
              disabled={!this.state.isFormValid}
            >
              Enter
            </Button>
            <Button
              type="primary"
              onClick={this.signUpHandler}
              disabled={!this.state.isFormValid}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
