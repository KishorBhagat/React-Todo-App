import styled from "styled-components"

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);

    .modal-container{
        position: relative;
        width: fit-content;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    @media (max-width: 700px){
        padding: 0;
    }
`;

const Modal = ({ isModalOpen, setIsModalOpen, children, refInput, refInputValue }) => {

    const handleModalClose = () => {
        setIsModalOpen(false);
        if(refInput && refInputValue){
            // refInput.current.value = refInputValue;
            console.log(refInput.current.value)
            console.log(refInputValue)
        }
    }

    return (
        <StyledModal className="overlay" style={{ display: `${isModalOpen ? "block" : "none"}` }} onClick={handleModalClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </StyledModal>
    )
}

export default Modal