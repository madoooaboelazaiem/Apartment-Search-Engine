# Homelike Assignment

This repo contains the Payment Gateway Library built with node, express and mongodb

## Getting Started

folder structure is inspired by https://softwareontheroad.com/ideal-nodejs-project-structure/ with some modifications like adding controllers and dbm folder

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

## To run tests:

`npm run test`

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongodb](https://www.mongodb.com/) - Cloud Database
- [npm](https://www.npmjs.com/) - Dependency Management

## Authors

- **Mohamed Salama**
