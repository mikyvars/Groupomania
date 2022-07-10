import { StyledBackground, StyledModal } from './style.jsx'

function ModalNews({ closeModal }) {
    return (
        <>
            <StyledBackground></StyledBackground>
            <StyledModal>
                <div className="modal__header">
                    <p>Nouvelle actualité</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <form className="modal__content">
                    <input placeholder="Titre" />
                    <textarea
                        cols="30"
                        rows="10"
                        placeholder="Contenu"
                    ></textarea>
                    <button type="submit">Envoyer</button>
                </form>
            </StyledModal>
        </>
    )
}

export default ModalNews
