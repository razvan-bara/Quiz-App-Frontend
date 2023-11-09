import {configureAxiosForQuizAPI} from "@api/api.ts";

const QUESTION_ENDPOINTS = {
    QUESTIONS: "questions"
}
export async function deleteQuestion(id : number){
    return await configureAxiosForQuizAPI(QUESTION_ENDPOINTS.QUESTIONS).delete(`${QUESTION_ENDPOINTS.QUESTIONS}/${id}`)
}