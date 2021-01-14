import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/ui/button/Button';
import {createControl} from '../../form/formFramework';
import Input from '../../components/ui/input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

function createOptionControl(number) {
  return createControl({
    label: `Enter an option ${number}`,
    errorMessage: 'Field can\'t be empty'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter a question',
      errorMessage: 'Field can\'t be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  changeHandler = (value, controlName) => {

  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + idx}>
          <Input
            key={idx}
            value={control.value}
            label={control.label}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          { idx === 0 ? <hr/> : null }
        </Auxiliary>
      )
    })
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creation</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <select name="" id=""></select>
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Add Question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
            >
              Create Test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
