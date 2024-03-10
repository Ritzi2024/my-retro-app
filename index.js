// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from "fs";
import bodyParser from 'body-parser';

import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import mongoose from "mongoose";
import { config } from 'dotenv';
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

config();
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URL;
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const httpServer = http.createServer(app);
// const typeDefs = gql(
//     readFileSync("schema.graphql", {
//       encoding: "utf-8",
//     })
//   );

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});



async function startServer() {
    await server.start();

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "src", "index.html"));
    // })
    app.use("/", express.static("frontend/dist/my-retro-app"));
    // app.get('*', function(req,res) {
    //     res.sendFile(path.resolve("frontend/dist/my-retro-app/index.html"));
    // });
    await new Promise((resolve) => httpServer.listen(PORT, resolve));
}

mongoose.connect(MONGODB)
    .then(() => {
        console.log("Mongo DB connection successful");
        startServer().then(() => console.log(`🚀 Server ready at http://localhost:${PORT}/`));

    })


