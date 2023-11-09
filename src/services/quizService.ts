import {configureAxiosForQuizAPI} from "@api/api.ts";
import {Quiz} from "@/types/quiz.ts";
import {QuizForm} from "@/types/quizForm.ts";

const QUIZ_ENDPOINTS = {
    QUIZZES: "quizzes"
}

export async function fetchQuizzes(){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).get<Quiz[]>(QUIZ_ENDPOINTS.QUIZZES)
}

export async function addNewQuiz(quizForm : QuizForm){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).post<Quiz[]>(QUIZ_ENDPOINTS.QUIZZES, quizForm)
}

export async function editExistingQuiz(quizForm : QuizForm, quizID : number){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).put<QuizForm>(`${QUIZ_ENDPOINTS.QUIZZES}/${quizID}`, quizForm)
}

export async function fetchCompleteQuiz(quizID : number){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).get<QuizForm>(`${QUIZ_ENDPOINTS.QUIZZES}/${quizID}`)
}