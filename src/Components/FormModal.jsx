import styled from "styled-components"
import Collection from "./icons/Collection"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const StyledFormModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);

    .new-collection-modal{
        background-color: white;
        padding: 20px;
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 2px;
        transform: translate(-50%, -50%);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        z-index: 100;

        .heading{
            color: var(--pink);
            margin-bottom: 20px;

        }

        .add-collection-form{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      
          input {
            height: 40px;
            width: 100%;
            /* padding: 0 14px; */
            background-color: inherit;
            font-size: 16px;
            border: none;
            /* color: var(--text-primary); */
            border-bottom: 2px solid #e756b5;
            /* border-bottom: 2px solid black; */
            /* border-radius: 10px; */
            :focus{
              outline: none;
              border-bottom: 3px solid #e756b5;
              caret-color: var(--pink);
            }
          }
      
          .buttons{
            display: flex;
            justify-content: end;
            width: 100%;
            gap: 5px;
            margin-top: 20px;
      
            button{
              border: none;
              padding: 5px 10px;
              color: var(--pink);
              font-weight: 500;
              background-color: inherit;
              cursor: pointer;
            }
          }
        }
    }

    .form-container{
        position: relative;
        width: 500px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--background-secondary);
        color: var(--text-primary);
        border-radius: 4px;
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
                padding: 0 5px;
                background-color: inherit;
                margin-top: 10px;
                margin-bottom: 20px;
                border: none;
                /* border: 3px solid var(--background-secondary); */
                color: var(--text-primary);
                border: none;
                border-bottom: 2px solid var(--text-secondary);
                /* border-radius: 10px; */
                :focus{
                    outline: none;
                    border-bottom: 2px solid #e756b5;
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
                    /* padding: 0 14px; */
                    /* border-radius: 10px; */
                    background-color: inherit;
                    color: var(--text-primary);
                    border: none;
                    border-bottom: 2px solid var(--text-secondary);
                    margin-right: 20px;
                    :focus{
                        outline: none;
                        border-bottom: 2px solid #e756b5;
                    }
                }
                svg{
                    fill: var(--text-primary);
                    background-color: inherit;
                    height: 24px;
                    width: 24px;
                    cursor: pointer;
                }
            }

            .buttons{
                display: flex;
                gap: 10px;
                background-color: inherit;
                margin-top: 20px;
                button{
                    height: 40px;
                    width: 50%;
                    border: none;
                    border: 2px solid #e756b5;
                    border-radius: 4px;
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

const FormModal = ({ isFormModalOpen, setIsFormModalOpen }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const { collection } = useParams();

    const collectionData = [
        {
            collection_name: "school",
            _id: "1"
        },
        {
            collection_name: "personal",
            _id: "2"
        },
        {
            collection_name: "design",
            _id: "3"
        },
        {
            collection_name: "groceries",
            _id: "4"
        },
        {
            collection_name: "birthday",
            _id: "5"
        },
        {
            collection_name: "default",
            _id: "6"
        },
    ];

    collectionData.sort((a, b) => {
        const nameA = a.collection_name.toLowerCase();
        const nameB = b.collection_name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const handleAddNewTask = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        formData[e.target[1].getAttribute("name")] = e.target[1].value;
        e.target[0].value = "";
        e.target[1].value = "default";
        console.log(formData)
        setIsFormModalOpen(false);
    }

    const handleAddNewCollection = (e) => {
        e.preventDefault();
        const formCollectionData = {};
        formCollectionData[e.target[0].getAttribute("name")] = e.target[0].value;
        // document.querySelector("#coll").value = e.target[0].value;
        e.target[0].value = "";
        setIsModalOpen(false);
    }

    const handleCancleBtn = () => {
        setIsFormModalOpen(false);
        document.querySelector("#coll").value = "default";
    }

    const handleModal = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        setCollectionName(collection);
    }, [collection]);

    if (collectionName) {
        document.querySelector("#coll").value = collectionName;
    }


    return (
        <StyledFormModal className="overlay" style={{ display: `${isFormModalOpen ? "block" : "none"}` }} onClick={() => { setIsFormModalOpen(false); setIsModalOpen(false) }}>
            {/* <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}> */}
            <div className="new-collection-modal" style={{ display: `${isModalOpen ? "block" : "none"}` }} onClick={e => e.stopPropagation()}>
                <div className="container">
                    <h2 className="heading">New Collection</h2>
                    <form className="add-collection-form" onSubmit={handleAddNewCollection}>
                        <input autoComplete="off" type="text" name="collection_name" placeholder="Enter collection name" required />
                        <div className="buttons">
                            <button type="button" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                            <button type="submit">ADD</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* </Modal> */}
            <div className="form-container" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Add new Task</h2>
                <form action="" onSubmit={handleAddNewTask}>
                    <label htmlFor="">What is to be done?</label>
                    <input type="text" name="task" autoComplete="off" placeholder="Enter task here" required />
                    <label htmlFor="">Add to Collection</label>
                    <div className="collection-options">
                        <select name="collection_name" id="coll">
                            <option value="default" >Default</option>
                            {
                                collectionData.map(({ collection_name, _id }, idx) => {
                                    if(collection_name !== "default"){
                                        return (<option value={collection_name} key={idx}>{capitalize(collection_name)}</option>)
                                    }
                                })
                            }
                            {/* <option value="default" >Default</option>
                            <option value="school">School</option>
                            <option value="personal">Personal</option>
                            <option value="design">Design</option>
                            <option value="groceries">Groceries</option>
                            <option value="birthday">Birthday</option> */}
                        </select>
                        <div onClick={handleModal}>

                            <Collection />
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="button" className="cancel" onClick={handleCancleBtn}>CANCEL</button>
                        <button type="submit" className="add">ADD</button>
                    </div>
                </form>
            </div>
        </StyledFormModal>
    )
}

export default FormModal