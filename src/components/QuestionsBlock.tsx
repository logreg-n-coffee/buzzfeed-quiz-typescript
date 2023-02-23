import React from 'react';
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
        }
) => {
    return (
        <div>
            <h2
                className='title-block'
                id={String(quizItem.id)}
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

export default QuestionsBlock;
