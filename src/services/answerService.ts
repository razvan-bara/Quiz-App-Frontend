import {configureAxiosForQuizAPI} from "@api/api.ts";

const ANSWERS_ENDPOINTS = {
    ANSWERS: "answers"
}

export async function deleteAnswer(id : number){
    return await configureAxiosForQuizAPI(ANSWERS_ENDPOINTS.ANSWERS).delete(`${ANSWERS_ENDPOINTS.ANSWERS}/${id}`)
}