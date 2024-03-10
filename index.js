const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { config } = require('dotenv');

config();
const MONGODB = process.env.MONGODB_URL;

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries / mutations

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB)
    .then(() => {
        console.log("Mongo DB connection successful");
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    })