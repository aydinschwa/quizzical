import React from "react"


export default function Intro({toggleStart}) {
    return (
        <div className="introPage">
        <h1 className="introPage--title">Quizzical</h1>
        <p className="introPage--description">It's a trivia game!</p>
        <button className="introPage--button"
                onClick={toggleStart}>Start Quiz
        </button>
        </div>
    )
}