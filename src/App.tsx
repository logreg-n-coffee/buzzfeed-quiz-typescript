import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import { QuizData } from '../interfaces';

const App = () => {
    // quiz state
    const [quiz, setQuiz] = useState<QuizData | null>();

    const fetchData = async () => { 
        try {
            const response: Response = await fetch('https://localhost:8080/api/quiz-items');
            const data: QuizData = await response.json();
            setQuiz(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { 
        fetchData();
    }, []);

    return (
        <div>
            <Title
            />
        </div>
    );
};

export default App;
