import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';



class App {
    constructor() {
        this.server = express();

        mongoose.connect('mongodb+srv://joao:12345@cluster0.h6y0r.mongodb.net/projetox?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            //useFindAndModify: true,

        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

}

export default new App().server;