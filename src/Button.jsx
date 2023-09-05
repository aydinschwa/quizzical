

export default function Button(props) {
    const {answer, questionId, answerId, selected, isCorrect, gameOver, toggle} = props

    let styles = {}
    if (!gameOver && selected) {
        styles = {backgroundColor: "#D6DBF5"}
    }
    else if (gameOver) {
        if (isCorrect) {
            styles =  {backgroundColor: "#94D7A2"}
        }
        else if (selected && !isCorrect) {
            styles = {backgroundColor: "#F8BCBC", opacity: 0.5}
        }
        else {
            styles = {opacity: 0.5}
        }
    }
    
    return (
        <button
         style={styles}
         onClick={() => toggle(questionId, answerId)}>{answer}</button>
    )
}