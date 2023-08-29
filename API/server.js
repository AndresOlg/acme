import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/database/schema.js";
import resolvers from "./src/database/resolvers.js";
import configureRoutes from './routes/routeConfig.js';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    app.use(express.json());

    /*Configure the operations and
     *CRUD routes using the configure function
    */
    configureRoutes(app, server);

    server.applyMiddleware({ app });

    const PORT = 4000;

    app.listen(PORT, () =>
        console.log(`Servidor GraphQL en ejecución en http://localhost:${PORT}/graphql`)
    );
}

startServer();
