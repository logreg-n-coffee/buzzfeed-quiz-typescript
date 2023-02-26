import React from 'react';
import { QuizData } from '../../interfaces';

const Title = (
    { title, subtitle }: {
        title: QuizData['title'],
        subtitle: QuizData['subtitle'],
    }
) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
};

export default Title;
