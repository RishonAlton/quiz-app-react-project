import React from 'react'
import { useGlobalContext } from './context'


const Form = () => {

    const { quiz, error, handleChange, handleSubmit } = useGlobalContext()

    return (
        <section className="section form-section">
            <article>
                <h2 className="title">Setup Quiz</h2>
                <form className="quiz-form" onSubmit={handleSubmit}>
                    <div className="amount-form">
                        <label htmlFor="amount" className="label">
                            Number Of Questions
                        </label>
                        <input 
                            type="number" 
                            name="amount" 
                            id="amount" 
                            value={quiz.amount}
                            className="form-input"
                            min={1}
                            max={50}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="dropdown">
                        <label htmlFor="category" className="label">
                            Category
                        </label>
                        <select 
                            name="category" 
                            id="category"
                            className="form-input"
                            value={quiz.category}
                            onChange={handleChange}
                        >
                            <option value="sports">Sports</option>
                            <option value="history">History</option>
                            <option value="celebrities">Celebrities</option>
                            <option value="animals">Animals</option>
                            <option value="vehicles">Vehicles</option>
                        </select>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="difficulty" className="label">
                            Difficulty
                        </label>
                        <select 
                            name="difficulty" 
                            id="difficulty"
                            className="form-input"
                            value={quiz.difficulty}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {
                        error && <p className="error">Can't generate questions, please try different options</p>
                    }
                    <button className="button" type="submit">Start</button>
                </form>
            </article>
        </section>
    )

}


export default Form
