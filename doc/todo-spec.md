# ToDos Spec

## Create Todo

Endpoint : POST /api/todos

Headers :

- Authorization: token

Request Body:

```json
{
    "checklist": true,
    "todoname": "Masak ayam"
}
```

Response Body (success):

```json
{
    "data": {
        "id": 1,
        "checklist": true,
        "todoname": "Masak ayam"
    }
}
```

Response Body (error):

```json
{
    "errors": "Error create todo list"
}
```

## Get Todo

Endpoint : GET /api/todos

Headers :  

- Authentication: token

Response Body (success):

```json
{
    "data": [
        {
        "id": 1,
        "checklist": true,
        "todoname": "Masak ayam"
        },
        {
        "id": 2,
        "checklist": false,
        "todoname": "Tidur"
        }
    ]
}
```

Response Body (error):

```json
{
    "errors": "Can't get ToDo"
}
```

## Update Todo

Endpoint : PATCH /api/todos/:todoId

Headers: 

- Authentication: token

Request Body:

```json
{
    "id": 1,
    "checklist": false,       // Optional
    "todoname": "Masak ayam"  // Optional
}
```

Response Body (success):

```json
{
    "data": {
        "id": 1,
        "checklist": true,
        "todoname": "Masak ayam"
    }
}
```

Response Body (error):

```json
{
    "errors": "Can't update ToDo"
}
```

## Remove

Endpoint : DELETE /api/todos/:todoId

Headers:

- Authentication: token

Response Body (success):

```json
{
    "data": true
}
```

Response Body (error):

```json
{
    "errors": "Can't delete ToDo"
}
```
