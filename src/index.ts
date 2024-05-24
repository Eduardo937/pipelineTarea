import Server from "./providers/Server";
import { PORT, NODE_ENV } from "./config";
import express from "express";
import PokemonController from "./controllers/PokemonController";

const server = new Server({
    port: PORT,
    env: NODE_ENV,
    middlewares: [
        express.json(),
        express.urlencoded({extended: true})
    ],
    controllers: [
        PokemonController.instance
    ]
});

server.init();