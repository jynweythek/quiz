import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/ui/button/Button';

export default class QuizCreator extends Component {
  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creation</h1>
          <form onSubmit={this.submitHandler}>
            <input type="text"/>
            <hr/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
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
