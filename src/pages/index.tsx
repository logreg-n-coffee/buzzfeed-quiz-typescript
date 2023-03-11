import React, { useState, useEffect, createRef } from 'react';
// components
import Title from './components/Title';
import QuestionsBlock from './components/QuestionsBlock';
import AnswerBlock from './components/AnswerBlock';
import HoveringResetButton from './components/HoveringResetButton';
// interfaces
import { QuizData, Content } from '../../interfaces';


const Home = () => {
    // quiz state
    const [quiz, setQuiz] = useState<QuizData | null>();

    // answer state
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[]>([]);
    const [showAnswerBlock, setShowAnswerBlock] = useState<boolean>(false);

    // img load state - prevent showing broken images in AnswerBlock
    const [imgLoaded, setImgLoaded] = useState<boolean>(true);

    // define the refs
    type ReduceType = {
        id?: {}
    }

    // get all refs for unanswered question ids
    const unansweredRefs = unansweredQuestionIds?.reduce<ReduceType | any>((acc, id) => {
        acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>();
        return acc;
    }, {});

    // get ref for answered questions
    const answerRef = createRef<HTMLDivElement | null>();

    // fetch data function
    const fetchData = async () => { 
        try {
            const response: Response = await fetch('api/quiz-items');
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

    useEffect(() => {
        if (chosenAnswerItems.length > 0 && unansweredQuestionIds) { 
            if (showAnswerBlock && answerRef.current) {
                answerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // if everything is finished, then show the answer block
        if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) { 
            setShowAnswerBlock(true);
        } else {
            // scrolling to the unanswered question
            const highestId = Math.min(...unansweredQuestionIds);
            unansweredRefs[highestId]?.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [unansweredQuestionIds, chosenAnswerItems.length, showAnswerBlock, unansweredRefs, answerRef]);
    
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
                {unansweredRefs && quiz?.content?.map(
                    (content: Content) => ( 
                        <QuestionsBlock
                            key={content.id}
                            quizItem={content}
                            chosenAnswerItems={chosenAnswerItems}
                            setChosenAnswerItems={setChosenAnswerItems}
                            unansweredQuestionIds={unansweredQuestionIds}
                            setUnansweredQuestionIds={setUnansweredQuestionIds}
                            ref={unansweredRefs[content.id]}
                        />
                    )
                )}
                {showAnswerBlock && 
                    <AnswerBlock
                    answerOptions={quiz?.answers}
                    chosenAnswerItems={chosenAnswerItems}
                    imgLoaded={imgLoaded}
                    setImgLoaded={setImgLoaded}
                    ref={answerRef}
                    />
                }
            </div>
        );
    } else {
        return <h1>Fetching Data...</h1>;
    }
};

export default Home;
