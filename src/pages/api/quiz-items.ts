// app/api/quiz-items.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { QuizData } from '../../../interfaces';

// environment variables
const TOKEN = process.env.X_CASSANDRA_TOKEN as string || '';
const URL = process.env.QUIZ_REQUEST_URL as string || '';
const QUIZID = process.env.QUIZ_DOCUMENT_ID as string || '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') { 
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
                res.setHeader('Access-Control-Allow-Origin', 'https://buzzfeed-quiz-typescript.vercel.app');
                res.send(quizItem);
                res.status(200).end();
            }
        } catch (e: unknown) { 
            console.error(e);
            res.status(500).end('Internal Server Error');
        }
    } else {
        res.status(405).end('Method Not Allowed');
    }
};

export default handler;
