# User Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "username": "wildan",
    "name": "wildan",
    "password": "rahasia"
}
```

Response Body  (Success):

```json
{
    "data": {
        "username": "wildan",
        "name": "wildan"
    }
}
```

Response Body (Error):

```json
{
    "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body:

```json
{
    "username": "wildan",
    "password": "rahasia"
}
```

Response Body (Success):

```json
{
    "data": {
        "username": "wildan",
        "name": "wildan",    
        "token": "token-will-be-generated"
    }
}
```

Response Body (Error):

```json
{
    "errors": "Username or Password invalid"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers:

- Authorization: token

Request Body:

```json
{
    "name": "wildan updated"  // Optional
    "password": "rahasia"     // Optional
}
```

Response Body (success):

```json
{
    "data": {
        "username": "wildan",
        "name": "wildan updated"
    }
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- Authorization: token

Response Body (success):

```json
{
    "data": {
        "username": "wildan",
        "name": "wildan updated"
    }
}
```

Response Body (error):

```json
{
    "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- Authorization: token

Response Body:

```json
{
    "data": true
}
```
