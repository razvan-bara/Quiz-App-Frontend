import {QuizForm} from "@/types/quizForm.ts";

export enum AttemptStatus {
    NotStarted,
    Started,
    InProgress,
    Finished
}

export enum AttemptQuestionStatus {
    NotActive,
    Active
}

export interface AttemptAnswer {
    "ID": number,
    "attemptID": number,
    "questionID": number,
    "answerID": number,
    "UUID": string,
    "createdAt": string
}

export interface Attempt {
    "ID": number,
    "status": number,
    "score": number,
    "quizId": number,
    "UUID": string,
    "createdAt": string
}

export interface GetAttemptResponseBody {
    "attemptDTO": Attempt,
    "quizForm": QuizForm
}