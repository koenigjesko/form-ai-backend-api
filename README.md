# sgb (3D Souvenirs Generator backend server implementaton.)
Currently, it is possible to interact with a GET request to the root path and a POST request to the `/upload` path.

# Implemented API functionality
Currently, saving of images transmitted with a POST-request to a `./public/images/` for storing public images has been implemented. POST-requests accepts only `.jpg`, `.jpeg`, or `.png` extension.

|  Path   | Method | Any type of request data | Returns
|:-------:|:------:|:----------------------------------------------------------------------------:|:----:|
| `/` | **GET** | None. | `200 OK` code + `json`-dictionary about using the **POST** method in the correct way. |
| `/api/v1/generate-single` | **POST** | In the `body` block, the `image` key's value **must be a file**.| `200 OK` code if image provided and everything is ok. / `500 Bad Request` if something went wrong. |
| `/api/v1/generate-multiple` | **POST** | In the `body` block, the `images` key must be an array containing **1-5 files**.  | `200 OK` code image provided and everything is ok. / `500 Bad Request` if something went wrong. | 

In all cases, the response to the request will be a `JSON` dictionary that will **ALWAYS, WITHOUT EXCEPTION**, contain a `"message"` key (`{ "message": "..." }`) describing the request result. Even if something goes wrong and an unexpected exception occurs, the sender will be able to view the server message.

# Build and running
First of all make sure you have the [latest version of Node.js](https://nodejs.org/en) installed on your PC. If everything is like this, use the command in the root of project to install all dependencies:
```bat
npm i 
```

### The way to run directly is with TypeScript and `ts-node`:
Run server using `start` command:
```bat 
npm start
```

### To transpile source code to JavaScript and run it through Node.js:
```bat
npm run js
```

### To just transpile the source code to JavaScript, use:
```bash
npx tsc
```

###### Detailed documentation and code comments will be compiled later.
