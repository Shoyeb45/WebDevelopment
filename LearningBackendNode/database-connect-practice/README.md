## Data Modelling for backend

- We'll learn how to model database and store our data.
- We need to design our databse and schema. We'll work by using ER diagram.
- For defining the schema and columns, we'll use `mongoose`. 

- `mongoose` provides some in-built validations which can be helpful during data collection. 

Things to keep in mind : 
1. use `new` while creating `Schema`.
```js
    const productSchema = new mongoose.Schema({});
```

2. use `export` while making model and the name for the schema which we will provide here will be converted to lowercase and in plural in mongoDB.
Name for the schema in code should be same as name for the mongoDB. 
Ex.:

```js
export const User = mongoose.model("user", userSchema); 
```


This folder have examples of data modelling:

#### 1. [Todos-example](./models/todos/)

