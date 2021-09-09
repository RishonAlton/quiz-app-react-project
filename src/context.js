import React, { useContext, useState } from "react"
import axios from "axios"


const API_ENDPOINT = "https://opentdb.com/api.php?"

const table = {
  sports: 21,
  history: 23,
  celebrities: 26,
  animals: 27,
  vehicles: 28,
}

const AppContext = React.createContext()


const AppProvider = ({children}) => {

    const [waiting, setWaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [error, setError] = useState(false)
    const [quiz, setQuiz] = useState({ amount: 10, category: "sports", difficulty: "easy" })
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchQuestions = async (url) => {
        setLoading(true)
        setWaiting(false)
        const response = await axios(url).catch(error => console.log(error))
        if(response) {
            const data = response.data.results
            if(data.length > 0) {
                setWaiting(false)
                setQuestions(data)
                setLoading(false)
                setError(false)
            }
            else {
                setWaiting(true)
                setError(true)
            }
        }
        else {
            setWaiting(false)
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setQuiz({ ...quiz, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { amount, category, difficulty } = quiz
        const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
        fetchQuestions(url)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setWaiting(true)
        setCorrect(0)
        setIsModalOpen(false)
    }

    const nextQuestion = () => {
        setIndex(oldIndex => {
            let index = oldIndex + 1
            if(index > questions.length - 1) {
                openModal()
                return 0
            }
            return index
        })
    }

    const checkAnswer = (value) => {
        if(value) {
            setCorrect(correct => correct + 1)
        }
        nextQuestion()
    }

    return (
        <AppContext.Provider
            value={{
                waiting,
                loading,
                questions,
                index,
                correct,
                error,
                quiz,
                isModalOpen,
                fetchQuestions,
                handleChange,
                handleSubmit,
                nextQuestion,
                checkAnswer,
                openModal,
                closeModal
            }}
        >
            {children}
        </AppContext.Provider>
    )

}


const useGlobalContext = () => {

    return useContext(AppContext)

}


export {
    AppProvider,
    useGlobalContext
}