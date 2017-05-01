# Programming Competition Management Platform

[![Build Status](https://travis-ci.org/rystecher/senior-design.svg?branch=master)](https://travis-ci.org/rystecher/senior-design)

# Project Summary

The annual Spring Programming Contest hosted by Bucknell University had a costly amount of manual work involved for judges and participants alike. The judges had to go through the timely process of downloading, compiling and testing every submission, and using email to communicate feedback. In addition, scoring was computed by hand and displayed on a whiteboard in the classroom. As a result, Bucknell was forced to limit the amount of teams that could participate. With this project, we were able to provide Bucknell with a convenient and well-designed web app that automates these tasks and allows the organizer to communicate with the participants. Now, judges will have an easier time running the contest and more teams will be able to participate.

This was a senior design project for 2016-17 CSCI 475/6. Our team, CrayHQ, consisted of four developers:

-   [Courtney Bolivar](https://github.com/courtneybolivar)
-   [Andrew Wheeler](https://github.com/2wheels4)
-   [Ryan Stecher](https://github.com/rystecher)
-   [Yash Bhutwala](https://github.com/yashbhutwala)

Special shoutouts to [Professor Lea Wittie](http://www.eg.bucknell.edu/~lwittie/) for presenting us with this project and for being a wonderful client, and to our professor/mentor for the course [Professor Brian King](http://www.eg.bucknell.edu/~brk009/).

# Getting Started

## Installing Dependencies

Since we are using the [npm JavaScript package manager](https://www.npmjs.com/) it’s easy to install all of our dependencies. Once you are in the root directory of our project simply run

    npm install

and that’s it! You can view all of the dependencies and their version numbers in the `./package.json` file.

## External APIs and Libraries

### The MERN Stack

Our site is built on top of the MERN stack using the [MERN boilerplate](http://mern.io/). The stack breaks down into the following:

-   [MongoDB](https://www.mongodb.com/) - A noSQL database
-   [ExpressJS](https://expressjs.com/) - Backend framework for routing and redirecting
-   [React](https://facebook.github.io/react/) - A frontend framework developed by Facebook which allows you to split up your interface into modular components that are only rendered when necessary
-   [Node.js](https://nodejs.org/en/) - Event-driven I/O server-side JavaScript environment. Run your server with JavaScript.

### APIs

You will need to generate a [HackerRank API Key](https://www.hackerrank.com/api/docs). Visit the website, sign up and create a new API key. Once that's done, you will need to store the key in an environment variable.

## Environment Variables

We use environment variables (key-value pairs stored on the system) in certain parts of our code to obscure sensitive data that only the server needs to know (i.e. API Keys). **If you are setting up a server for the first time, you will need to reconfigure these variables.** You can either create a .env file in the root directory of the project, or edit the server’s environment variables. If you want to perform the latter option, type the following in a shell:

    export key=value

**List of necessary environment variables**:

HR_API_KEY='YOUR_HACKERRANK_API'

NODE_ENV='development'

## Setting Up and Running the Server

Before running the server, please create the following directories in the main directory of the project:

    /input
    /output
    /pdfs
    /submission

### Developer Mode

When making changes to the project as a developer, run

    npm run start

This starts the development server and will bundle the project without any optimizations so that it recompiles faster after changes are made. Also developer mode features [hot reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html), which lets you make changes while the server is running, and you will see the browser immediately reflect these changes.

### Production Mode

Once you’re ready to deploy our project to production, just run

    npm run bs

This command will minify all of the files in our project for optimization and start serving the project.

### Additional Modes:

`npm run test` - starts the test runner

`npm run watch:test` - starts the test runner with watch mode

`npm run coverage` - generates test coverage report

`npm run lint` - runs linter to check for lint errors

## Configurations

We use [Webpack](https://webpack.github.io/), which allows us to make our code more modular. If you look at our directory structure, many of our components are split up into their own .js files, and each has their own .css file. When you run `npm run` Webpack compiles all of these individual files into a nice bundle that is easily served to the browser. There are Webpack configuration files for both development and production servers.

We also use [Travis-CI](https://travis-ci.org/) to run continuous integration testing. The `.travis.yml` contains all the configurations for Travis.
