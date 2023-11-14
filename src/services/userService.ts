import {configureAxiosForUserAPI} from "@api/api.ts";

const USER_ENDPOINTS = {
    PROFILE: "profile"
}

export async function fetchUserDetails(){

    return await configureAxiosForUserAPI(USER_ENDPOINTS.PROFILE).get<User>(USER_ENDPOINTS.PROFILE)
}