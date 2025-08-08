import { createContext, useContext, useEffect, useReducer } from "react"
const QuizContext = createContext()
const SECS_PER_QUESTION = 20
const initialState = {
    questions: [],
    // 'loading','error','ready','active','finished'
    status: 'lading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    timer: null
}
function reducer(state, action) {

    switch (action.type) {
        case 'dataReceived':
            return { ...state, questions: action.payload, status: 'ready' }
        case 'dataFailed':
            return { ...state, status: 'error' }
        case 'start':
            return { ...state, status: 'active', timer: state.questions.length * SECS_PER_QUESTION }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }
        case 'finish':
            return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }
        case 'restart':
            return { ...initialState, status: 'ready', questions: state.questions }
        case 'tick':
            return { ...state, timer: state.timer - 1, status: state.timer <= 0 ? "finished" : state.status }
        default:
            throw new Error('Action unknown')
    }
}

function QuizProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, timer }, dispatch] = useReducer(reducer, initialState)
    const numQuestions = questions.length
    const maxPoints = questions.reduce((sum, elem) => sum + elem.points, 0)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:8050/questions')
                const data = await res.json()
                dispatch({ type: 'dataReceived', payload: data })
            } catch {
                dispatch({ type: 'dataFailed' })
            }
        }
        fetchData()
    }, [])
    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            timer,
            numQuestions,
            maxPoints,
            dispatch
        }} >
            {children}
        </QuizContext.Provider>
    )

}

function useQuiz() {
    const context = useContext(QuizContext)
    if (context === undefined) throw new Error('QuizContext was used outside of the QuizProvider')

    return context
}

export { QuizProvider, useQuiz }