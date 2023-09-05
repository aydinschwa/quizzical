import React from "react"
import Button from "./Button"
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Question(props) {
    const {question, correct_answer, incorrect_answers} = props.items
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    return array;
    }   
    
    const createAnswers = (correctAnswer, incorrectAnswers) => {
        const answerChoices = []
        for (const incorrectAnswer of incorrectAnswers) {
            answerChoices.push({answer: incorrectAnswer, 
                                isCorrect: false,
                                key: nanoid(),
                                id: nanoid(), 
                                selected: false})
        }
        answerChoices.push({answer: correct_answer,
                            isCorrect: true,
                            key: nanoid(), 
                            id: nanoid(),
                            selected: false})

        // randomly shuffle choices
        return shuffleArray(answerChoices)
    }
        
    const [answers, setAnswers] = React.useState(createAnswers(correct_answer, incorrect_answers))
    
    const toggleSelected = id => {
        setAnswers(oldAnswers => (
            oldAnswers.map(oldAnswer => {
                if (oldAnswer.id === id) {
                    return {...oldAnswer, selected: true}
                }
                else {
                    return {...oldAnswer, selected: false}
                }
            })
        ))
    }   
    
    const answersElements = answers.map(answer => {
    return (<Button 
                answer={answer.answer}
                isCorrect={answer.isCorrect}
                key={answer.key}
                id={answer.id}
                selected={answer.selected}
                toggle={toggleSelected}
            />
    )})
    
    return (
        <div className="question">
            <h1 className="question--header">{decode(question)}</h1>
            <div className="question--answers">
                {answersElements}
            </div>
            <div className="question--line"></div>
        </div>
    )
}