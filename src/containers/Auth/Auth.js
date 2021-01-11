import React, {Component} from 'react';
import classes from './Auth.module.css';
import Input from './../../components/ui/input/Input';
import Button from './../../components/ui/button/Button';

export default class Auth extends Component {
  enterHandler = () => {

  };

  signUpHandler = () => {

  };

  submitHandler = event => {
    event.preventDefault();
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
            <Input
              label="Email"
            />
            <Input
              label="Password"
              errorMessage="Test"
            />
            <Button
              type="success"
              onClick={this.enterHandler}
            >
              Enter
            </Button>
            <Button
              type="primary"
              onClick={this.signUpHandler}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
