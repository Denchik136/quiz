import { useQuiz } from "../context/QuizContext"

function FinishPage() {
    const { points, maxPoints, highscore, dispatch } = useQuiz()
    const percentage = points / maxPoints * 100
    return (
        <>
            <p className="result">
                Your scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}> Restart Quiz</button>
        </>
    )
}

export default FinishPage
