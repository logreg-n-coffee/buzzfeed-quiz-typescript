import React, { useState, useEffect } from 'react';
// components
import Title from './components/Title';
import QuestionsBlock from './components/QuestionsBlock';
import AnswerBlock from './components/AnswerBlock';
import HoveringResetButton from './components/HoveringResetButton';
// interfaces
import { QuizData, Content } from '../interfaces';


const App = () => {
    // quiz state
    const [quiz, setQuiz] = useState<QuizData | null>();

    // answer state
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[]>([]);
    const [showAnswerBlock, setShowAnswerBlock] = useState<boolean>(false);

    // img load state - prevent showing broken images in AnswerBlock
    const [imgLoaded, setImgLoaded] = useState<boolean>(true);

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

    // TODO: answer block to display answers
    // TODO: scrolling effects
    useEffect(() => {
        // if everything is finished, then show the answer block
        if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) { 
            setShowAnswerBlock(true);
            const answerBlock = document.getElementById('answer-block');
            answerBlock?.scrollIntoView({ behavior: 'smooth' });
        }

        // scrolling to the question
        if (unansweredQuestionIds) {
            const highestId = Math.min(...unansweredQuestionIds);
            const highestElement = document.getElementById(String(highestId));
            highestElement?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [unansweredQuestionIds, chosenAnswerItems]);
    
    // display the page if the data can be fetched
    if (quiz) {
        return (
            <div className='app'>
                <HoveringResetButton
                    quiz={quiz}
                    setChosenAnswerItems={setChosenAnswerItems}
                    setUnansweredQuestionIds={setUnansweredQuestionIds}
                    setImgLoaded={setImgLoaded}
                    setShowAnswerBlock={setShowAnswerBlock}
                />
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
                {showAnswerBlock && 
                    <AnswerBlock
                    answerOptions={quiz?.answers}
                    chosenAnswerItems={chosenAnswerItems}
                    imgLoaded={imgLoaded}
                    setImgLoaded={setImgLoaded}
                    />
                }
            </div>
        );
    } else {
        return <h1>Fetching Data...</h1>;
    }
};

export default App;
