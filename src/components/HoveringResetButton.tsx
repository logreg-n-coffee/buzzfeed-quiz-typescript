import React from 'react';
import { ArrowUturnRightIcon } from '@heroicons/react/24/solid';
import { Content, QuizData } from '../../interfaces';

const HoveringResetButton = (
    {
        quiz,
        setChosenAnswerItems,
        setUnansweredQuestionIds,
    }: {
        quiz: QuizData,
        setUnansweredQuestionIds: Function,
        setChosenAnswerItems: Function,
    }
) => {
    const handleClick = () => {
        setChosenAnswerItems([]);
        const unansweredIds = quiz?.content.map(({ id }: Content) => id) || [];
        setUnansweredQuestionIds(unansweredIds);
    };

    return (
        <div>
            <button className='reset-button' onClick={handleClick}>
                <ArrowUturnRightIcon />
                <p>Reset</p>
            </button>
        </div>
    );
};

export default HoveringResetButton;
