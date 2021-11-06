# Homelike Assignment

This repo contains the appartment search engine built with node, express and mongodb

## Getting Started

folder structure is inspired by https://softwareontheroad.com/ideal-nodejs-project-structure/ with some modifications like adding datasources, schema and resolvers folder

## For The Deployed Version Using Heroku App

```
https://appartment-task-backend.herokuapp.com
```

Press on `Query your server` Now you will be able to use the playground and see the queries/mutations and will be able to see the schema with the documentation

## For Local Version

### Prerequisites

in order to install this repo you need to make sure you have git, node installed on your machine along with nodemon and the dependencies

### Installing

A step by step series of examples that tell you how to get a development env running

clone this repo

open terminal and change directory to the project root

install project dependencies

```
npm install
```

create .env in project root directory and copy its data from env.example

```
cp env.example .env
```

fill out the .env file with the name for database you chose and also change the other env variable according the description provided in `env.example`

run the project

```
npm run start-dev
```

make sure to add the authorization key/value headers in graphql apollo server for the protected queries/mutations
example:

```
Headers: Authorization
Value: Bearer ${Token: retrieved from login}
```

## To run tests:

`npm run test`

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongodb](https://www.mongodb.com/) - Cloud Database
- [npm](https://www.npmjs.com/) - Dependency Management
- [GraphQL Apollo](https://www.apollographql.com/) - Data Query Language

## Folder Structure

```
Homealike/
┣ __tests__/
┃ ┣ __dbHandler.js
┃ ┣ user.test.js
┃ ┗ appartment.test.js
┣ api/
┃ ┗ routes/
┃   ┗ index.js
┣ config/
┃ ┗ index.js
┣ datasources/
┃ ┣ appartment.js
┃ ┣ index.js
┃ ┗ user.js
┣ loaders/
┃ ┣ express.js
┃ ┣ graphql.js
┃ ┣ index.js
┃ ┗ mongo.js
┣ models/
┃ ┣ appartment.js
┃ ┗ user.js
┣ resolvers/
┃ ┣ appartmentResolvers/
┃ ┃ ┣ addAppartmentToFavoritesMutation.js
┃ ┃ ┣ addAppatmentMutation.js
┃ ┃ ┣ getAppartmentsQuery.js
┃ ┃ ┣ getUsersAppartmentsQuery.js
┃ ┃ ┣ index.js
┃ ┃ ┣ removeAppartmentFromFavoritesMutation.js
┃ ┃ ┗ searchAndFilterAppartmentsQuery.js
┃ ┣ userResolvers/
┃ ┃ ┣ getUserDataByTokenQuery.js
┃ ┃ ┣ getUsersFavouritesQuery.js
┃ ┃ ┣ index.js
┃ ┃ ┣ userLoginMutation.js
┃ ┃ ┗ userRegisterMutation.js
┃ ┗ index.js
┣ schema/
┃ ┣ appartmentSchema/
┃ ┃ ┣ index.js
┃ ┃ ┣ mutations.js
┃ ┃ ┗ queries.js
┃ ┣ userSchema/
┃ ┃ ┣ index.js
┃ ┃ ┣ mutations.js
┃ ┃ ┗ queries.js
┃ ┗ index.js
┣ services/
┃ ┣ appartmentServices/
┃ ┃ ┣ addAppartmentToFavorites.js
┃ ┃ ┣ createAppartment.js
┃ ┃ ┣ fetchAppartments.js
┃ ┃ ┣ fetchUsersAppartments.js
┃ ┃ ┣ index.js
┃ ┃ ┣ removeAppartmentFromFavorites.js
┃ ┃ ┣ searchAndFilterAppartments.js
┃ ┃ ┗ searchForAppartments.js
┃ ┣ userServices/
┃ ┃ ┣ fetchUser.js
┃ ┃ ┣ fetchUsersFavorites.js
┃ ┃ ┣ index.js
┃ ┃ ┣ registerUser.js
┃ ┃ ┗ userLogin.js
┃ ┗ index.js
┣ subscribers/
┃ ┣ api.js
┃ ┗ events.js
┣ utils/
┃ ┣ array.js
┃ ┣ geocoder.js
┃ ┣ helper.js
┃ ┣ jwt.js
┃ ┣ mongo.js
┃ ┣ pagination.js
┃ ┣ password.js
┃ ┗ validation.js
┣ .env.example
┣ .eslintrc.json
┣ .gitignore
┣ .prettierignore
┣ .prettierrc.json
┣ README.md
┣ app.js
┣ jest.config.js
┣ package-lock.json
┗ package.json
```

## Authors

- **Mohamed Salama**
