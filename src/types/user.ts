interface User {
    ID: number,
    email: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean
    UUID: string,
    createdAt: string
}
interface LoginResponse {
    accessToken: string,
    user : User
}