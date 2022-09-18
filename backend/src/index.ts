import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import dotenv from "dotenv";
import { ChatResolver } from "./resolvers/chat";

dotenv.config();

const startApolloServer = async () => {
    const app = express();

    app.use(cors({ origin: ["http://localhost:3003", "https://studio.apollographql.com"], credentials: true }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ChatResolver],
            validate: false,
        })
    });

    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({
            app,
            cors: false,
        });

        app.listen(process.env.PORT, () => {
            console.log(
                `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
            );
        });
    });
};

startApolloServer().catch((err) => {
    console.log(err);
});