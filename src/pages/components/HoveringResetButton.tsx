import React from 'react';
import { ArrowUturnRightIcon } from '@heroicons/react/24/solid';
import { Content, QuizData } from '../../../interfaces';

const HoveringResetButton = (
    {
        quiz,
        setChosenAnswerItems,
        setUnansweredQuestionIds,
        setImgLoaded,
        setShowAnswerBlock,
    }: {
            quiz: QuizData,
            setUnansweredQuestionIds: Function,
            setChosenAnswerItems: Function,
            setImgLoaded: Function,
            setShowAnswerBlock: Function,
    }
) => {
    const handleClick = () => {
        setChosenAnswerItems([]);
        const unansweredIds = quiz?.content.map(({ id }: Content) => id) || [];
        setUnansweredQuestionIds(unansweredIds);
        setImgLoaded(true);
        setShowAnswerBlock(false);
    };

    return (
        <div>
            <button className='reset-button' onClick={handleClick} type='button'>
                <ArrowUturnRightIcon />
                <p>Reset</p>
            </button>
        </div>
    );
};

export default HoveringResetButton;
