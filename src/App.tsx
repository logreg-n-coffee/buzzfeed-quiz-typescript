import React, { useState, useEffect } from 'react';
// components
import Title from './components/Title';
import QuestionsBlock from './components/QuestionsBlock';
// interfaces
import { QuizData, Content } from '../interfaces';


const App = () => {
    // quiz state
    const [quiz, setQuiz] = useState<QuizData | null>();

    // answer state
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[]>([]);

    // fetch data function
    const fetchData = async () => { 
        try {
            const response: Response = await fetch('http://localhost:8000/api/quiz-items');
            const data: QuizData = await response.json();
            setQuiz(data);
        } catch (e) {
            console.log(e);
        }
    };

    // useEffect to fetch the quiz data
    useEffect(() => { 
        fetchData();
    }, []);

    // populate questions to answer - unanswered ids
    useEffect(() => { 
        const unansweredIds = quiz?.content.map(({ id }: Content) => id) || [];
        setUnansweredQuestionIds(unansweredIds);
    }, [quiz]);
    
    // if the data can be fetched
    if (quiz) {
        return (
            <div className='app'>
                <Title
                    title={quiz?.title}
                    subtitle={quiz?.subtitle}
                />
                {quiz?.content?.map(
                    (content: Content, id: Content['id']) => ( 
                        <QuestionsBlock
                            key={id}
                            quizItem={content}
                            chosenAnswerItems={chosenAnswerItems}
                            setChosenAnswerItems={setChosenAnswerItems}
                            unansweredQuestionIds={unansweredQuestionIds}
                            setUnansweredQuestionIds={setUnansweredQuestionIds}
                        />
                    )
                )}
            </div>
    );
    } else {
        return <h1>Fetching Data...</h1>;
    }
};

export default App;
