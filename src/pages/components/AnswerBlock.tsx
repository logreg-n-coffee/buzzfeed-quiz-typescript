import React, { forwardRef, useEffect, useState } from 'react';
import { Answer } from '../../../interfaces';


const AnswerBlock = (
    {
        answerOptions,
        chosenAnswerItems,
        imgLoaded,
        setImgLoaded,
    }: {
            answerOptions: Answer[] | undefined,
            chosenAnswerItems: string[],
            imgLoaded: boolean,
            setImgLoaded: Function,
        },
    ref: HTMLHeadingElement | any
) => {
    // result state
    const [result, setResult] = useState<Answer | null>();

    // img load state - prevent showing broken images
    const handleImageError = () => setImgLoaded(false);

    // check if the chosen answers match the answer options available 
    useEffect(() => { 
        answerOptions?.forEach((answer: Answer) => { 
            if (
                chosenAnswerItems.includes(answer.combination[0]) &&
                chosenAnswerItems.includes(answer.combination[1]) &&
                chosenAnswerItems.includes(answer.combination[2])
            ) {
                setResult(answer);
            }
        });
    }, [answerOptions, chosenAnswerItems]);

    return (
        <div ref={ref} className='answer-block'>
            <h2>{result?.text}</h2>
            {imgLoaded &&
                <img
                src={result?.image}
                alt={result?.alt}
                onError={handleImageError}
                />
            }
        </div>
    );
};

export default forwardRef(AnswerBlock);
