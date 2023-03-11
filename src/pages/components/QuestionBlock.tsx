import React from 'react';
import { Question } from '../../../interfaces';

const QuestionBlock = (
    {
        question,
        chosenAnswerItems,
        setChosenAnswerItems,
        unansweredQuestionIds,
        setUnansweredQuestionIds,
        quizItemId,
    }:
        {
            question: Question,
            chosenAnswerItems: string[],
            setChosenAnswerItems: Function,
            unansweredQuestionIds: number[],
            setUnansweredQuestionIds: Function,
            quizItemId: number,
        }
) => {
    // handle click event
    const handleClick = () => { 
        // if item is clicked, add the answer to the chosenAnswerItems state array
        setChosenAnswerItems((prevState: string[]) => [...prevState, question.text]);
        // if question is answered, remove it from unanswered list
        setUnansweredQuestionIds(unansweredQuestionIds.filter((id) => id !== quizItemId));
    };

    // valid pick
    const validPick: boolean =
        (!chosenAnswerItems.includes(question.text) &&
            !unansweredQuestionIds.includes(quizItemId) 
        );

    return (
        <button
            className='question-block'
            onClick={handleClick}
            disabled={validPick}
            type='button'
        >
            <img src={question.image} alt={question.alt} />
            <h3>{question.text}</h3>
            <div>
                <p>Photo by {question.credit} - Unsplash</p>
            </div>
        </button>
    );
};

export default QuestionBlock;
