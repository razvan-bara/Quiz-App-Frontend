import {QuizQuestion} from "@/types/question.ts";
import {Answer} from "@/types/answer.ts";

export class QuizForm {
    ID: number = 0;
    title: string = "";
    description: string = "";
    uuid: string = "";
    createdAt: string = "";
    publishedAt: string = ""
    questions: QuizQuestion[] = [];

    addQuestion(){
       this.questions.push(new QuizQuestion())
    }

    hasQuestions() : boolean{
        return this.questions.length > 0
    }

    deleteQuestion(index : number){
        this.questions.splice(index, 1)
    }

    deleteAnswerForQuestion(questionIndex: number, index : number){
        this.questions[questionIndex].answers.splice(index, 1)
    }

    hasAtLeastThreeQuestionStored(){
        let count = 0
        for (const q of this.questions) {
            if(q.ID > 0){
                count++
            }

            if(count >= 3){
                return true
            }
        }
        return false
    }

    clone(temp: QuizForm) {
        this.title = temp.title
        this.description = temp.description
        this.createdAt = temp.createdAt
        this.ID = temp.ID
        this.uuid = temp.uuid
        this.publishedAt = temp.publishedAt
        for (let i = 0; i < temp.questions.length; i++) {
            let q = new QuizQuestion()
            let tempQuestion = temp.questions[i]
            q.ID = tempQuestion.ID
            q.title = tempQuestion.title
            q.body = tempQuestion.body
            q.quizID = tempQuestion.quizID
            q.uuid = tempQuestion.uuid
            for (let j = 0; j < tempQuestion.answers.length; j++) {
                let a = new Answer()
                let tempAnswer = tempQuestion.answers[j]
                a.ID = tempAnswer.ID
                a.title = tempAnswer.title
                a.correct = tempAnswer.correct
                a.quizQuestionID = tempAnswer.quizQuestionID
                a.uuid = tempAnswer.uuid
                a.createdAt = tempAnswer.createdAt
                q.answers.push(a)
            }
            this.questions.push(q)
        }
    }
}
