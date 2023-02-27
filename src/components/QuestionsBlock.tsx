import React, { forwardRef } from 'react';
import { Content, Question } from '../../interfaces';
import QuestionBlock from './QuestionBlock';

const QuestionsBlock = (
    {
        quizItem,
        chosenAnswerItems,
        setChosenAnswerItems,
        unansweredQuestionIds,
        setUnansweredQuestionIds,
    }:
        {
            quizItem: Content,
            chosenAnswerItems: string[],
            setChosenAnswerItems: Function,
            unansweredQuestionIds: number[],
            setUnansweredQuestionIds: Function,
        },
    ref: React.LegacyRef<HTMLHeadingElement> | undefined) => {
    return (
        <div>
            <h2
                className='title-block'
                ref={ref}
            >{quizItem.text}
            </h2>

            <div className='questions-container'>
                {quizItem?.questions.map((question: Question, _index: number) => (
                    <QuestionBlock
                        key={_index}
                        question={question}
                        quizItemId={quizItem.id}
                        chosenAnswerItems={chosenAnswerItems}
                        setChosenAnswerItems={setChosenAnswerItems}
                        unansweredQuestionIds={unansweredQuestionIds}
                        setUnansweredQuestionIds={setUnansweredQuestionIds}
                    />
                ))}
            </div>
        </div>
    );
};

export default forwardRef(QuestionsBlock);
