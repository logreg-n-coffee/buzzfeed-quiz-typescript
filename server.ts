// necessary modules and environments
import express, { Request, Response, Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';
import { QuizData } from './interfaces';  // data types

// express settings 
const PORT = process.env.SERVER_PORT || 8888;
const app = express();

// environment variables
const TOKEN = process.env.X_CASSANDRA_TOKEN as string || '';
const URL = process.env.QUIZ_REQUEST_URL as string || '';
const QUIZID = process.env.QUIZ_DOCUMENT_ID as string || '';

// routes
const api: Router = express.Router();
app.use('/api', api);

api.get('/quiz-items', async (req: Request, res: Response) => { 
    try {
        // get all the quizes
        const response: AxiosResponse = await axios.get(URL, {
            headers: {
                'X-Cassandra-Token': TOKEN,
                Accept: 'application/json',
            },
        });

        if (response.status === 200) {
            const quizItem: QuizData = await response.data.data[QUIZID];
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(quizItem);
        }
    } catch (e: unknown) { 
        console.error(e);
    }
});

app.listen(PORT, () => { 
    console.log(`App listening on ${PORT}`);
});