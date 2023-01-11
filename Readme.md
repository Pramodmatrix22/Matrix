## MATRIX EXTENSION

This first version have small features like:

- It helps you to create CURD api on go with one command
- File upload is handled
- api token verification

It is written on top of express js, easy to use and can extend in any project.

## Installation

Clone the app and install dependencies.

```sh
cd matrix
npm i
npm link
npm start
```

## For creating api

- create the api using following command
  ```sh
  matrix create --api <name>
  ```
- Define your schema inside model file that was generated.

# Extending curd methods.

you can overide predefined curd method.

Example:

```sh
    const Core = require("../../../core");
     const exampleModel=require("../model/example");
     const exampleService=Core.CoreService(exampleModel);
     exampleService.find=(param)=>{
         //your logic
     }
     module.exports = exampleService;
```

- #### To extend services
  **Note**
  function return should be well format as shown below for better developer experience.
  `     return {statusCode: Number,
			message: String,
			data: any,
			};
    `
  - ##### Find:
    The param is an object contaning perPage,page,search.
    ```sh
    exampleService.find=async(param)=>{
         //your logic
    }
    ```
  - ##### FindOne:
    The Id is object id.
    ```sh
    exampleService.findOne=async(id)=>{
         //your logic
    }
    ```
  - ##### Update:
    The param is an object contaning id and update body
    ```sh
    exampleService.update=async(param)=>{
                //your logic
           }
    ```
  - ##### Create:
    The param is an object contaning body
    ```sh
    exampleService.create=async(param)=>{
                //your logic
           }
    ```
  - #### Delete
    ```sh
    exampleService.delete=async(id)=>{
                //your logic
           }
    ```
- #### To extend Controller
       **Note**
       Don't send user response form controller as there is response handler which will parse response for standard response and good developer experiense for front-end developer.
  - ##### Find:
    The param is an object contaning perPage,page,search.
    ```sh
    exampleController.find=async(req,res,next)=>{
         try{
             //your logic
         }catch(error){
             	res.response = {
    			statusCode: 500,
    			message: "Internal Server Error",
    			data: String(error),
    		};
         }finally{
             next();
         }
    }
    ```
  - ##### FindOne:
    The Id is object id.
    ```sh
     exampleController.findOne=async(req,res,next)=>{
         try{
             //your logic
         }catch(error){
             	res.response = {
    			statusCode: 500,
    			message: "Internal Server Error",
    			data: String(error),
    		};
         }finally{
             next();
         }
    }
    ```
  - ##### Update:
    The param is an object contaning id and update body
    ```sh
    exampleController.update=async(req,res,next)=>{
        try{
            //your logic
        }catch(error){
            	res.response = {
    			statusCode: 500,
    			message: "Internal Server Error",
    			data: String(error),
    		};
        }finally{
            next();
        }
    }
    ```
  - ##### Create:
    The param is an object contaning body
    ```sh
    exampleController.create=async(req,res,next)=>{
        try{
            //your logic
        }catch(error){
            	res.response = {
    			statusCode: 500,
    			message: "Internal Server Error",
    			data: String(error),
    		};
        }finally{
            next();
        }
    }
    ```
  - #### Delete
    ```sh
     exampleController.delete=async(req,res,next)=>{
        try{
            //your logic
        }catch(error){
            	res.response = {
    			statusCode: 500,
    			message: "Internal Server Error",
    			data: String(error),
    		};
        }finally{
            next();
        }
    }
    ```

## Contributions

This is first version, we can add some basic features such as:

- Image optmization
- Third party authentication
- support for mysql using sequlize
- Email and Otp generation
