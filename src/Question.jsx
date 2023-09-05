import React from "react"
import Button from "./Button"
import { nanoid } from "nanoid";


export default function Question(props) {
    const {question, answers, questionId, toggle, gameOver} = props

    const answersElements = answers.map(answer => {
    return (<Button 
                answer={answer.answer}
                selected={answer.selected}
                isCorrect={answer.isCorrect}
                toggle={toggle}
                questionId={questionId}
                answerId={answer.answerId}
                gameOver={gameOver}
                key={nanoid()}
            />
    )})

    return (
        <div className="question">
            <h1 className="question--header">{question}</h1>
            <div className="question--answers">
                {answersElements}
            </div>
            <div className="question--line"></div>
        </div>
    )
}