import { useQuiz } from "../context/QuizContext"
import Answer from "./Answer"

function Question() {
    const { questions, index } = useQuiz()
    const question = questions.at(index)
    return (
        <div>
            <h4>{question.question}</h4>
            <Answer question={question} />
        </div>
    )
}

export default Question
