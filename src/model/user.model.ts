export class UserResponse {
    username: string
    name: string
    token?: string
}

export class RegisterUserRequest {
    username: string
    name: string
    password: string
}