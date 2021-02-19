import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/ui/button/Button';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Input from '../../components/ui/input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/Select/Select';
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

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

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: +option1.value},
        {text: option2.value, id: +option2.value},
        {text: option3.value, id: +option3.value},
        {text: option4.value, id: +option4.value}
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  };

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
    this.props.finishCreateQuiz();
  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const ctrl = {...formControls[controlName]};

    ctrl.touched = true;
    ctrl.value = value;
    ctrl.valid = validate(ctrl.value, ctrl.validation);

    formControls[controlName] = ctrl;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  };

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + idx}>
          <Input
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
    const select = <Select
      label="Choose right answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />;

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creation</h1>
          <form onSubmit={this.submitHandler}>

            { this.renderControls() }

            { select }

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add a Question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Create a Test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
