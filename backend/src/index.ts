import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/chat";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const startApolloServer = async () => {
    const app = express();
    const httpServer = createServer(app);

    app.use(cors({ origin: [`http://localhost:${process.env.PORT}`, "https://studio.apollographql.com"], credentials: true }));

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const schema = await buildSchema({
        resolvers: [ChatResolver],
        validate: false,
    })

    const serverCleanup = useServer({ schema }, wsServer);

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() { return { async drainServer() { await serverCleanup.dispose(); }, }; }, },
        ],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false});

    httpServer.listen(process.env.PORT, () => {
        console.log(
            `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
        );
    });
};

startApolloServer().catch((err) => {
    console.log(err);
});