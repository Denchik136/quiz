import { useQuiz } from "../context/QuizContext"

function Answer({ question }) {
    const { dispatch, answer } = useQuiz()
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((option, i) =>
                <button
                    className={`btn btn-option
                         ${i === answer ? 'answer' : ''} 
                         ${hasAnswered ? i === question.correctOption ? 'correct' : 'wrong' : ''
                        } `}
                    onClick={() => dispatch({ type: 'newAnswer', payload: i })}
                    key={i}
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            )
            }
        </div >
    )
}

export default Answer
