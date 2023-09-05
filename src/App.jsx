import React from 'react'
import Intro from "./Intro"
import Question from "./Question"
import { nanoid } from 'nanoid'
import { decode } from "html-entities";

function App() {
  const [started, setStarted] = React.useState(false)
    const [guessesSubmitted, setGuessesSubmitted] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [questionData, setQuestionData] = React.useState([])
    const [triviaQuestions, setTriviaQuestions] = React.useState([])
    const [reset, setReset] = React.useState(0)

    // get trivia questions from API
    React.useEffect(() => { 
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(response => setQuestionData(response.results))
    }, [reset])

    // grab question and answer from questions
    const createAnswers = (correctAnswer, incorrectAnswers) => {

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }   
        const answerChoices = []
        for (const incorrectAnswer of incorrectAnswers) {
            answerChoices.push({answer: decode(incorrectAnswer), 
                                isCorrect: false,
                                answerId: nanoid(), 
                                selected: false})
        }
        answerChoices.push({answer: decode(correctAnswer),
                            isCorrect: true,
                            answerId: nanoid(),
                            selected: false})

        // randomly shuffle choices
        return shuffleArray(answerChoices)
    }

    // set trivia question state whenever question data changes
    React.useEffect(() => {
      const questionAnswers = []
      for (let question of questionData) {
        const answers = createAnswers(question.correct_answer, question.incorrect_answers)
        questionAnswers.push({
          question: decode(question.question),
          answers: answers,
          questionId: nanoid()
        })
      }
      setTriviaQuestions(Array.from(questionAnswers))
    }, [questionData])

    const toggleAnswer = (questionId, answerId)=> {
      setTriviaQuestions(oldTriviaQuestions => {
        const updatedTriviaQuestions = [...oldTriviaQuestions]
        for (let question of updatedTriviaQuestions) {
          if (questionId !== question.questionId) { continue }
          for (let answer of question.answers) {
            if (answer.answerId === answerId) {
              answer.selected = true;
            }
            else {
              answer.selected = false;
            }
          }
        }
      return updatedTriviaQuestions
      })
    } 

    const submitAnswers = () => {
      let score = 0
      for (let question of triviaQuestions) {
        for (let answer of question.answers) {
          if (answer.isCorrect && answer.selected) {
            score += 1
          }
        }
      }
      setScore(score)
      setGuessesSubmitted(true) 
    }

    const triviaQuestionsElements = triviaQuestions.map(question => {
        return ( 
            <Question 
              question={question.question}
              answers={question.answers}
              questionId={question.questionId}
              toggle={toggleAnswer}
              gameOver={guessesSubmitted}
              key={nanoid()}/>
        )})

      const resetGame = () => {
        setReset(oldReset => oldReset + 1)
        setGuessesSubmitted(false)
      }

    return ( 
        <div>
            {started ? triviaQuestionsElements 
                     : <Intro toggleStart={() => setStarted(true)}/>}
            {started && 
             (guessesSubmitted ? 
                      (<div className="gameOverText">
                       <p className="scoreText">{`You scored ${score}/5 correct answers`}</p>
                       <button className="playAgainButton"
                               onClick={resetGame}>Play again</button>
                       </div>)
                              : 
                      (<button className="checkAnswersButton"
                                onClick={submitAnswers}
                        >Check Answers</button>))
            }
        </div>
    )
}

export default App
