export class TodoResponse {
    id: number
    checklist: boolean
    todoname: string
}

export class CreateTodoRequest {
    checklist?: boolean
    todoname: string
}