

export default function Button(props) {
    const {answer, isCorrect, id, selected, toggle} = props
    const styles = selected ? {backgroundColor: "#94D7A2"}: {}
    return (
        <button
         style={styles}
         onClick={() => toggle(id)}>{answer}</button>
    )
}