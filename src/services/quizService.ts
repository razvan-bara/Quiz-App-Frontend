import {configureAxiosForQuizAPI} from "@api/api.ts";
import {Quiz} from "@/types/quiz.ts";

const QUIZ_ENDPOINTS = {
    QUIZZES: "quizzes"
}

export async function fetchQuizzes(){
    return await configureAxiosForQuizAPI(QUIZ_ENDPOINTS.QUIZZES).get<Quiz[]>(QUIZ_ENDPOINTS.QUIZZES)
}