import {Answer} from "@/types/answer.ts";

export class Question {
    ID: number = 0;
    title: string = "";
    body: string = "";
    quizID: number = 0;
    uuid: string = "";

    constructor() {
    }
}

export class QuizQuestion {
    ID: number = 0;
    title: string = "";
    body: string = "";
    quizID: number = 0;
    uuid: string = "";
    answers : Answer[] = [];
    constructor() {
    }

    addAnswer(){
        this.answers.push(new Answer())
    }

    hasAnswers() : boolean{
        return this.answers.length > 0
    }
}