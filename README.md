# Node API Task - Hackerbay

<strong>Description: </strong>A simple stateless microservice in node with <strong>Authentication</strong>, <strong>JSON patching</strong> and <strong>Image Thumbnail generation</strong>.

## Introduction

kindly follow the step below to run this project locally on your machine for development and testing processes.

#### Step 1

clone the repo or use the download option

```
git clone https://github.com/augustinebest/hackerbay-nodeAPI.git
```

#### Step 2

navigate to the root directory of the project and run

```
npm install
```

#### Step 3

create a .env file and add

```
AuthSecret = "<your desired secret key>"
```

#### Step 4 - Testing

run

```
npm test
```

#### Step 5 - Start application

run

```
npm start
```

## API Endpoints

#### Login authentication

- HTTP Request method: POST
- ENDPOINT - localhost:8000/api/login
- Note - this accepts <b>username</b> and <b>password</b> as requests and return a token which can be used for further authorization request.
- Example:

```
Request: {
    username: "Hackerbay",
    password: "1234"
}
Response: {
    "status": true,
    "user": "Hackerbay",
    "token": "Genereated token"
}
```


#### JSON Patch

- HTTP Request method: PATCH
- ENDPOINT - localhost:8000/api/jsonpatcher
- Note - the generated token is added as an Authorization in the headers
- Example

```
'headers': {
   'Authorization': 'Generated token'
 }
 Request: {
     "document": {
         { "name": "best", "gender": "male" }
     },
     "patch": [{ "op": "replace", "path": "/name", "value": "Augustine" }]
 }
 Response: {
     "status": true,
     "result": {
        "name": "Augustine",
        "gender": "male"
    }
 }
```

#### Generated Thumbnail
* HTTP Request method: GET
* ENDPOINT: localhost:8000/api/generateThumbnail?imageUrl=imagePath
* example of imagePath: https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
Note: this endpoint accepts a query as shown 
* Example
```
'headers': {
   'Authorization': 'Generated token'
 }
Request: localhost:8000/api/generateThumbnail?imageUrl=imagePath
Response: returns an image of size 50 x 50
```
<b>Note: </b> checkout the documentation hosted on [postman](https://documenter.getpostman.com/view/4565934/SzS2wTHD?version=latest)

### Docker
This project was dockerised on [docker hub](https://hub.docker.com/repository/docker/augustinebest/hackerbay-node-app), use the following command to run
```
docker pull augustinebest/hackerbay-node-api
docker run -p 127.0.0.1:3000:3000 --env secret=randomstring augustinebest/hackerbay-node-api 
```

### Packages used 
* [mocha](http://mochajs.org) - For automated tests.
* [jsonwebtoken](https://www.npmjs.com/package/mysql2) - Token generation and verification.
* [body-parser](https://www.npmjs.com/package/body-parser) - Allows incomming requests
* [express](https://www.npmjs.com/package/express) - small, robust tooling for HTTP servers
* [sharp](https://www.npmjs.com/package/sharp) - converts large image to smaller images of varying dimensions
* [eslint](https://www.npmjs.com/package/eslint) - a tool for identifying and reporting on patterns
* [should](https://www.npmjs.com/package/should) - Expressive assertion library.

### Author
* **Augustine Igwe** - [augustinebest](https://github.com/augustinebest)