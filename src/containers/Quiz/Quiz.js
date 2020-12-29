import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        id: 1,
        question: 'Color of the sky?',
        rightAnswerId: 3,
        answerState: null,
        answers: [
          {text: 'Black', id: 1},
          {text: 'Red', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Yellow', id: 4},
        ]
      },
      {
        id: 2,
        question: 'Color of the wee?',
        rightAnswerId: 4,
        answers: [
          {text: 'Black', id: 1},
          {text: 'Red', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Yellow', id: 4},
        ]
      }
    ],
    activeQuestion: 0
  };

  onAnswerClickHandler = answerId => {
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: {[answerId]: 'success'}
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          window.console.log('Finished!');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 400);
    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Choose your answers</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;
