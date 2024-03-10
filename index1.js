// const mongoose = require("mongoose");
// const { config } = require('dotenv');
// const express = require('express');
// const cors = require("cors");
// const path = require("path");
// const { ApolloServer } = require('apollo-server-express');

// config();
// const MONGODB = process.env.MONGODB_URL;
// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");

// const app = express();
// app.use(cors())
// app.use(express.static("./frontend/build"));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "src", "index.html"));
// })
// async function startServer() {
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//     });
//     await server.start();
//     server.applyMiddleware({ app });
// }

// startServer();

// mongoose.connect(MONGODB)
//     .then(() => {
//         console.log("Mongo DB connection successful");
//         return app.listen({ port: 5000 });
//     })
//     .then((res, err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(`Server is running at ${res.url}`);
//     })


// import express from 'express';
// import cors from 'cors';

// import gql from "graphql-tag";
// import { ApolloServer } from '@apollo/server';
// import { buildSubgraphSchema } from '@apollo/subgraph';
const { expressMiddleware } = require('@apollo/server/express4');

const mongoose = require("mongoose");
const { config } = require('dotenv');
const express = require('express');
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require('apollo-server-express');

//const { config } = require('dotenv');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
//import { readFileSync } from "fs";

config();
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URL;

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server),
    );
    app.use(express.static("./frontend/build"));
    //server.applyMiddleware({ app });
}

startServer();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
//server.start();
//highlight-end


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "src", "index.html"));
})
//app.use("/record", records);

// start the Express server
mongoose.connect(MONGODB)
    .then(() => {
        console.log("Mongo DB connection successful");
        //return app.listen({ port: 5000 });
        return app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    })
// .then((res, err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(`Server is running at ${res.url}`);
// })
// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });