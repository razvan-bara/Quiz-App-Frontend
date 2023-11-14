import {configureAxiosForQuizAPI} from "@api/api.ts";
import {Attempt, AttemptStatus, AttemptWithQuiz, GetAttemptResponseBody} from "@/types/attempt.ts";
import {Answer} from "@/types/answer.ts";

const ATTEMPT_ENDPOINTS = {
    QUIZ_ATTEMPTS: "quizzes/:quizID/attempts",
    QUIZ_ATTEMPT: "quizzes/:quizID/attempts/:attemptID",
    QUIZ_ATTEMPT_ANSWERS: "quizzes/:quizID/attempts/:attemptID/answers",
    ATTEMPTS: "attempts"
}

export async function fetchAttempts(status? : AttemptStatus){
    let url = ATTEMPT_ENDPOINTS.ATTEMPTS
    if (status != undefined){
        url += `?attemptStatus=${status}`
    }

    return await configureAxiosForQuizAPI(ATTEMPT_ENDPOINTS.ATTEMPTS).get<AttemptWithQuiz[]>(url)
}

export async function fetchAttempt(quizID : string, attemptID : string){
    let url = ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT
        .replace(":quizID", quizID)
        .replace(":attemptID", attemptID)

    return await configureAxiosForQuizAPI(ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT).get<GetAttemptResponseBody>(url)
}
export async function createAttempt(quizID : number){
    let url = ATTEMPT_ENDPOINTS.QUIZ_ATTEMPTS.replace(":quizID", String(quizID))
    return await configureAxiosForQuizAPI(ATTEMPT_ENDPOINTS.QUIZ_ATTEMPTS).post<Attempt>(url)
}

export async function updateAttempt(quizID : string, attemptID : string,  attempt : Attempt){
    let url = ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT
        .replace(":quizID", quizID)
        .replace(":attemptID", attemptID)

    return await configureAxiosForQuizAPI(ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT).put(url, attempt)
}

export async function createAttemptAnswer(quizID : string, attemptID : string,  answer : Answer){
    let url = ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT_ANSWERS
        .replace(":quizID", quizID)
        .replace(":attemptID", attemptID)

    const attemptAnswer : { answerID: number; questionID: number } = {
        questionID: answer.quizQuestionID,
        answerID: answer.ID
    }
    return await configureAxiosForQuizAPI(ATTEMPT_ENDPOINTS.QUIZ_ATTEMPT_ANSWERS).post(url, attemptAnswer)
}