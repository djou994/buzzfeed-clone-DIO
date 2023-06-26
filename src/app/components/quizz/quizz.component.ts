import {Component, OnInit} from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
  title:string = "";

  questions:any = "";
  selectedQuestion:any = "";

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  ngOnInit() {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex+=1;

    if (this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex];
    }else {
      const finalAnswer:string = await this.checkResult();
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(){
    return this.answers.reduce((previous, current, i, array) => {
      if (array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    });
  }

}
