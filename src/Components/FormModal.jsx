import styled from "styled-components"
import Collection from "./icons/Collection"

const StyledFormModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);

    .form-container{
        position: relative;
        width: 500px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--background-secondary);
        border-radius: 14px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        .heading{
            text-align: center;
            margin-bottom: 30px;
            background-color: inherit;

            /* padding: 20px 0; */
        }
        
        form{
            display: flex;
            flex-direction: column;
            background-color: inherit;

            label{
                background-color: inherit;                
            }
            input{
                height: 40px;
                padding: 0 14px;
                background-color: inherit;
                margin-top: 10px;
                margin-bottom: 20px;
                border: none;
                /* border: 3px solid var(--background-secondary); */
                border: 2px solid #e756b5;
                border-radius: 10px;
                :focus{
                    outline: none;
                    border: 2px solid #e756b5;
                }
            }
            .collection-options{
                display: flex;
                align-items: center;
                margin-top: 10px;
                margin-bottom: 20px;
                background-color: inherit;
                select {
                    width: 100%;
                    height: 40px;
                    padding: 0 14px;
                    border-radius: 10px;
                    background-color: inherit;
                    border: 2px solid #e756b5;
                    margin-right: 20px;
                    :focus{
                        outline: none;
                        border: 2px solid #e756b5;
                    }
                }
                svg{
                    fill: var(--text-primary);
                    background-color: inherit;
                    height: 30px;
                    width: 30px;
                    cursor: pointer;
                }
            }

            .buttons{
                display: flex;
                gap: 10px;
                background-color: inherit;
                button{
                    height: 40px;
                    width: 50%;
                    border: 2px solid #e756b5;
                    border-radius: 10px;
                    padding: 8px 20px;
                    cursor: pointer;
                    background-color: inherit;
                    color: white;
                    transition: .2s ease;
                    &:hover{
                        background-color: #e756b5;
                    }

                }
                .cancel{
                    color: #e756b5;
                    &:hover{
                        color: white;
                    }
                }
                .add{
                    background-color: #e756b5;
                }
            }
        }

    }

    @media (max-width: 700px){
        padding: 0;
        .form-container{
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
    }
    
`

const FormModal = ({ isModalOpen, setIsModalOpen }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        formData[e.target[1].getAttribute("name")] = e.target[1].value;
        e.target[0].value = "";
        e.target[1].value = "default";

        setIsModalOpen(false);
        console.log(formData)
    }

    const handleCancleBtn = () => {
        setIsModalOpen(false);
        document.querySelector("#coll").value = "default";
    }

    return (
        <StyledFormModal className="overlay" style={{ display: `${isModalOpen ? "block" : "none"}` }} onClick={() => setIsModalOpen(false)}>
            <div className="form-container" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Add new Task</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">What is to be done?</label>
                    <input type="text" name="task" autoComplete="off" placeholder="Enter task here" required/>
                    <label htmlFor="">Add to Collection</label>
                    <div className="collection-options">
                        <select name="collection_name" id="coll">
                            <option value="default" >Default</option>
                            <option value="personal">Personal</option>
                            <option value="school">School</option>
                        </select>
                        <Collection />
                    </div>
                    <div className="buttons">
                        <button type="button" className="cancel" onClick={handleCancleBtn }>Cancel</button>
                        <button type="submit" className="add">Add</button>
                    </div>
                </form>
            </div>
        </StyledFormModal>
    )
}

export default FormModal