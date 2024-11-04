import express, { Application } from 'express';
import cors from 'cors';
import seedRoute from '../routes/seed.route';
import newsRoute from '../routes/news.route';

const app: Application = express();
const port = process.env.PORT || '8080';

const middlewares = () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.static('public'));
};

const routes = () => {
    app.use('/seed', seedRoute);
    app.use('/news', newsRoute);
};

export const main = async () => {
    middlewares();
    routes();
    await app.listen(port);
    console.log(`Server running on port: ${port}`);
};
