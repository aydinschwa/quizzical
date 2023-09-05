import React from 'react'
import Intro from "./Intro"
import Question from "./Question"
import { nanoid } from 'nanoid'

function App() {
  const [started, setStarted] = React.useState(false)
    const [guessesSubmitted, setGuessesSubmitted] = React.useState(false)
    const [questionData, setQuestionData] = React.useState([])

    React.useEffect(() => { 
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(response => setQuestionData(response.results))
    }, [])
    
    const triviaQuestionsElements = questionData.map(question => {
        return ( 
            <Question items={{...question}} key={nanoid()}/>
        )})
    
    return ( 
        <div>
            {started ? triviaQuestionsElements 
                     : <Intro toggleStart={() => setStarted(true)}/>}
            {started && <button className="checkAnswersButton"
                    onClick={() => console.log('fix me')}
            >Check Answers</button>}
        </div>
    )
}

export default App
