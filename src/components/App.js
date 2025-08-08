import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartPage from './StartPage';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishPage from './FinishPage';
import Timer from './Timer';
import Footer from './Footer';
import { useQuiz } from '../context/QuizContext';

export default function App() {

  const { status } = useQuiz()
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartPage />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer >
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishPage />
        )}
      </Main >
    </div>
  );
}


