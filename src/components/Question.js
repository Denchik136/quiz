import Answer from "./Answer"

function Question({ question, dispatch, answer }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Answer answer={answer} dispatch={dispatch} question={question} />
        </div>
    )
}

export default Question
