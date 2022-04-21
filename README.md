# E-Commerce Backend

Internet retail, also known as **e-commerce**, is the largest sector of the electronics industry, generating an estimated $29 trillion in 2019. E-commerce platforms like Shopify and WooCommerce provide a suite of services to businesses of all sizes. The goal of this project was to understand the fundamental architecture of these platforms.

The E-Commerce Backend is a REST API for an internet retail website. The API is built onto an Express.js server that uses [Sequelize](https://sequelize.org/master/) to interact with a MySQL database. Sequelize is a promise-based Node.js ORM(Object Relation Mapping) for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

This E-Commerce backend has the API routes that point to each of the standard [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations for each data group. The routes can be used to:

- Create categories, products, tags
- View categories, products, tags
- Establish associations between the different entities
- Update categories, products, & tags
- Delete entries from the database

All that's missing to make this a complete E-Commerce website is a simple front-end application that makes calls to the API routes that are already built-in. If that's too much, simply try making requests to the API routes from your browser to the see the raw data that's returned.

---

## **Table of contents**

- [E-Commerce Backend](#e-commerce-backend)
  - [**Table of contents**](#table-of-contents)
  - [**Installation**](#installation)
  - [**Usage**](#usage)
  - [**Built With**](#built-with)
  - [Demonstration video](#demonstration-video)
  - [**Contributing**](#contributing)
  - [**License**](#license)

---

## **Installation**

To install and set up the application, run:

```sh
npm init -y
npm i express
npm i
```

You will also need to place a .env file in the root directory of the project, in order to connect to your MySQL database. Here's an example:

file: .env

```
DB_NAME= "ecommerce_db"
DB_PASSWORD= " "
DB_USER= "root"
```

---

## **Usage**

<sub><sup>This section assumes you have installed the application, and created the .env file in the root directory.</sub></sup>

To finish the set-up the application, complete the following steps:

1. Create a MySQL database on your local machine using the *schema.sql* file located in the /db/ directory(From the MySQL CLI, source db/schema.sql)
2. Seed the database with sample data to be used for testing purposes(Run *npm run seed* from inside the root directory of the project)

Now you're ready to start the application! You can start the server by running:

```
npm start
```

The server is running, now you can make requests to it through your desired method. If you're new to the backend, I suggest trying out [Postman](postman.com)

---

## **Built With**

- [Node.js](https://nodejs.org/en/about/)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Express.js](https://www.npmjs.com/package/express)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Demonstration video

https://user-images.githubusercontent.com/67285232/164349033-c1336a60-8a23-4de5-aa6b-fb5b3719c40a.mp4

ration Video**

## **Contributing**

Phil loy

## **License**

This application is licensed under the MIT License, you can find the full license information [here](http://github.com/lukecp5/employee-tracker/LICENSE.txt)

---
