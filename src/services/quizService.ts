import {configureAxiosForQuizAPI} from "@api/api.ts";
import {Quiz} from "@/types/quiz.ts";
import {QuizForm} from "@/types/quizForm.ts";

const QUIZ_ENDPOINTS = {
    QUIZZES: "quizzes"
}

export async function fetchQuizzes(status : string){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).get<Quiz[]>(`${QUIZ_ENDPOINTS.QUIZZES}?status=${status}`)
}

export async function addNewQuiz(quizForm : QuizForm, saveMode : string){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).post<QuizForm>(`${QUIZ_ENDPOINTS.QUIZZES}?saveMode=${saveMode}`, quizForm)
}

export async function editExistingQuiz(quizForm : QuizForm, quizID : number, saveMode : string){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).put<QuizForm>(`${QUIZ_ENDPOINTS.QUIZZES}/${quizID}?saveMode=${saveMode}`, quizForm)
}

export async function fetchCompleteQuiz(quizID : number){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).get<QuizForm>(`${QUIZ_ENDPOINTS.QUIZZES}/${quizID}`)
}