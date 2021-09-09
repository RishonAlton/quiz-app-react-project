import React from 'react'
import { useGlobalContext } from './context'


const Modal = () => {

    const { isModalOpen, closeModal, correct, questions } = useGlobalContext()

    return (
        <section className={isModalOpen ? "modal-container show" : "modal-container"}>
            <article className="modal">
                <h2 className="title">Congrats</h2>
                <p className="result">
                    You answered {((correct / questions.length) * 100).toFixed(0)}% of questions correctly 
                </p>
                <button className="button play-again" onClick={closeModal}>Play Again</button>
            </article>
        </section>
    )

}


export default Modal
