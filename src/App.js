import React from 'react'
import { useGlobalContext } from './context'
import Form from './Form'
import Loading from './Loading'
import Modal from './Modal'


const App = () => {

  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext()

  if(waiting) {
    return <Form />
  }

  if(loading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index]

  let answers = [...incorrect_answers]
  const randomIndex = Math.floor(Math.random() * 4)
  if(randomIndex === 3) {
    answers.push(correct_answer)
  }
  else {
    answers.push(answers[randomIndex])
    answers[randomIndex] = correct_answer
  }

  return (
    <main className="questions-section">
      <Modal />
      <section className="section quiz">
        <article>
          <p className="correct-answers">
            Correct Answers: {correct} / {index}
          </p>
          <div className="container">
            <h2 className="question" dangerouslySetInnerHTML={{__html: question}}></h2>
            <div className="choices">
              {
                answers.map((answer, index) => {
                  return (
                    <button 
                      key={index}
                      className="answer-button"
                      dangerouslySetInnerHTML={{__html: answer}}
                      onClick={() => checkAnswer(correct_answer === answer)}
                    />
                  )
                })
              }
            </div>
          </div>
          <button className="button next-question" onClick={nextQuestion}>Next Question</button>
        </article>
      </section>
    </main>
  )

}


export default App

