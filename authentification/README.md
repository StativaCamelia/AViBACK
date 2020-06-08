# Authentification REST API Documentation
## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `success`: `true`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties:
    -   `success`: `false`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.
	
  ## /users/register
  ###  POST
  Creates a new user if the provided data is valid.
  
**Return codes**:

-   201 - Created
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5003/users/register
 Request Body
 ```JSON
 {
    "email"  : "exemplu123@gmail.com",
    "password" : "exemplu123",
    "username" : "Exemplu123"
}
```
 **Returned data example**:

```JSON
{
  "content": {
    "message": "Successfully registered! Please  confirm your email, sign in and set your profile!"
  }
}
```

  ## /users/login
  ###  POST
  Creates a new session for a user by providing him an authorization token.
  
**Return codes**:

-   201 - Created
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5003/users/login
 Request Body
 ```JSON
 {
    "email"  : "exemplu123@gmail.com",
    "username" : "Exemplu123"
}
```
 **Returned data example**:

```JSON
{
  "content": {
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ2NTdiOTM1MTY4ZTE5NjgwNDE2MDkiLCJpYXQiOjE1OTE1OTIzOTV9.SZbK9j8b4i1pSXVSLAtSGBgu7dYiAFeTk3zzrjDKZ1s"
  }
}
```
 ## /users/login
  ###  GET
  Verify if the user has a valid authorization token in the request header and change the content of the page according with his curent state.
  
**Return codes**:
-   200 - OK
-   400 - There was a problem fetching data
-   500 -  Internal Server Error

**Usage example**:  
  http://localhost:5003/users/login

**Returned data example**:

```JSON
{
  "content": {
          "id": "button",
          "value": "Profile",
          "href": "#",
  }
}
```
## users/authorization

  ### GET
   **Query parameters**:
  - token: the token we want to check
  Receives a token a verify if the token is associated with an admin account

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/authorization
    **Returned data example**:

  ```JSON
 {
  "content": {
    "success": true,
    "data": {
      "type": "admin",
      "_id": "5ed657b935168e1968041609",
      "email": "stativa_geo@gmail.com",
      "username": "Admiul",
      "password": "$2b$10$wciYae1dr7HAr77Q5lgLfOgOo4k2yuTTQKba1zMiTbSlWwMZJDNIq",
      "__v": 7
    }
  }
} {
    "content": null
  }
  ```
## users/send-email

  ### GET
   **Query parameters**:
  - topic : A topic that a user might be interested in
  Receives a topic and send an email to all the users that are have this criteria on their preferences list. The email will announce them that new data regarding the criteria had been added.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/send-email

## users/confirm

  ### GET
   **Query parameters**:
  - token : an email token send on email to the user who want to register 
  Receives an email token associated with an user account, and change the status of the account into a confirmed account, so the user can sign-in into the website.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/confirm

  **Returned data example**:

  ```JSON
  {
        "type": "user",
        "_id": "5edbe762600a0c482c334af6",
        "email": "stativa50@gmail.com",
        "username": "UserTest",
        "confirmed": true,
        "__v": 0
   }
  ```
  
# Admin

  ## /users

  ### DELETE

  `Delete all the users from the database.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users
    **Returned data example**:

  ```JSON
  {
    "content": null
  }
  ```

  ## /users
  ### GET

  Get all the users from the database.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users

  **Returned data example**:

  ```JSON
  {
    "content": [
      {
        "type": "admin",
        "_id": "5ed657b935168e1968041609",
        "email": "stativa_geo@gmail.com",
        "username": "Admiul",
        "__v": 7
      },
      {
        "type": "user",
        "_id": "5edbe762600a0c482c334af6",
        "email": "stativa50@gmail.com",
        "username": "UserTest",
        "confirmed": true,
        "__v": 0
      }
    ]
  }
  ```

  ## /users/{userId}
  ### PUT

  Update a user.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/5ede3a7d0ff94b173c4a92f0
   ```JSON
   {
      "type" : "admin"
  }
  ```
  **Returned data example**:

  ```JSON
  {
    "content": {
      "type": "admin",
      "_id": "5ede3a7d0ff94b173c4a92f0",
      "email": "stativa123@gmail.com",
      "username": "Stativa123",
      "password": "$2b$10$t7q6M8e3aDHSeXkJD1eK5OUtIoVwL7rIQ4y4whHSnHSHEsxEyDURG",
      "confirmed": false,
      "__v": 0
    }
  }
  ```

  ## /users/{userId}
  ### DELETE
  Delete an user.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/5ede3a7d0ff94b173c4a92f0

  **Returned data example**:
  ```JSON
  {
    "content": {
      "type": "admin",
      "_id": "5ede3a7d0ff94b173c4a92f0",
      "email": "stativa123@gmail.com",
      "username": "Stativa123",
      "password": "$2b$10$t7q6M8e3aDHSeXkJD1eK5OUtIoVwL7rIQ4y4whHSnHSHEsxEyDURG",
      "confirmed": false,
      "__v": 0
    }
  }
  ```
  
  ## /users
  ### POST

  Creates a new user.

  **Return codes**:
  -   201 - Created
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/5ede3a7d0ff94b173c4a92f0
    
  **Returned data example**:

  ```JSON
  {
    "content": {
      "email" : "user123@gmail.com",
      "username" : "User123",
      "password" : "parola123",
      "type" : "user"
  }
  }
  ```
  
   ## /users/{userId}
  ### GET

  Get an user by id.

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/5ede3a7d0ff94b173c4a92f0
    
  **Returned data example**:

  ```JSON
  {
  "content": {
      "type": "admin",
      "_id": "5ede3a7d0ff94b173c4a92f0",
      "email": "stativa123@gmail.com",
      "username": "Stativa123",
      "password": "$2b$10$t7q6M8e3aDHSeXkJD1eK5OUtIoVwL7rIQ4y4whHSnHSHEsxEyDURG",
      "confirmed": false,
      "__v": 0
    }
  }
  ```
  
  ## /users/{userId}
  ### GET

  Get an user by id.

  **Return codes**:
  -   201 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/5ede3a7d0ff94b173c4a92f0
    
  **Returned data example**:

  ```JSON
  {
  "content": {
      "type": "admin",
      "_id": "5ede3a7d0ff94b173c4a92f0",
      "email": "stativa123@gmail.com",
      "username": "Stativa123",
      "password": "$2b$10$t7q6M8e3aDHSeXkJD1eK5OUtIoVwL7rIQ4y4whHSnHSHEsxEyDURG",
      "confirmed": false,
      "__v": 0
    }
  }
  ```
  
    ## /users/general
  ### GET

  Get some general data about the actions made on the user database(new users, updated, deleted, etc)

  **Return codes**:
  -   200 - OK
  -   400 - There was a problem fetching data
  -   500 -  Internal Server Error

  **Usage example**:  
    http://localhost:5003/users/general
    
  **Returned data example**:

  ```JSON
{
  "content": {
    "usersNumber": 7,
    "newUsersNumber": 23,
    "deletedUsersNumber": 2,
    "updatedUsersNumber": 70
  }
}
  ```





