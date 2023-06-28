import { useSelector } from "react-redux";
import styled from "styled-components"
import School from "./icons/School";
import Personal from "./icons/Personal";
import Design from "./icons/Design";
import Groceries from "./icons/Groceries";
import Birthday from "./icons/Birthday";
import DefaultCollection from "./icons/DefaultCollection";
import { useRef } from "react";

const StyledSidebar = styled.div`
    background-color: var(--background-secondary);
    height: calc(100vh - 50px);
    margin-top: 50px;
    border-top: 1px solid var(--background-primary);
    transition: all .2s ease-out;

    .sidebar-heading{
        background-color: inherit;
        padding: 10px 20px;
        font-weight: 500;
        color: var(--text-secondary);
        padding-top: 20px;
    }
    ul{
        background-color: inherit;
        height: calc(100vh - 100px);
        overflow-y: scroll;
        li{
            background-color: inherit;
            padding: 15px 30px;
            color: var(--text-tertiary);
            list-style: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: .2s ease;
            &:hover{
                background-color: var(--hover);
            }
            svg{
                background-color: inherit;
                height: 24px;
                margin-right: 10px;
            }
        }
        &::-webkit-scrollbar {
          width: 0px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: #9a9aa8;
        }
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

const Sidebar = () => {

    const collectionData = [
        {
            name: "School",
            _id: "1"
        },
        {
            name: "Personal",
            _id: "2"
        },
        {
            name: "Design",
            _id: "3"
        },
        {
            name: "Groceries",
            _id: "4"
        },
        {
            name: "Birthday",
            _id: "5"
        },
        {
            name: "Default",
            _id: "6"
        },
        {
            name: "School",
            _id: "1"
        },
        {
            name: "Personal",
            _id: "2"
        },
        {
            name: "Design",
            _id: "3"
        },
        {
            name: "Groceries",
            _id: "4"
        },
        {
            name: "Birthday",
            _id: "5"
        },
        {
            name: "Default",
            _id: "6"
        },
        {
            name: "School",
            _id: "1"
        },
        {
            name: "Personal",
            _id: "2"
        },
        {
            name: "Design",
            _id: "3"
        },
        {
            name: "Groceries",
            _id: "4"
        },
        {
            name: "Birthday",
            _id: "5"
        },
        {
            name: "Default",
            _id: "6"
        },
        {
            name: "School",
            _id: "1"
        },
        {
            name: "Personal",
            _id: "2"
        },
        {
            name: "Design",
            _id: "3"
        },
        {
            name: "Groceries",
            _id: "4"
        },
        {
            name: "Birthday",
            _id: "5"
        },
        {
            name: "Default",
            _id: "6"
        },
    ];

    const selectCollectionIcon = (name) => {
        switch (name.toLowerCase()) {
            case "school":
                return <School />
            case "personal":
                return <Personal />;
            case "design":
                return <Design />;
            case "groceries":
                return <Groceries />;
            case "birthday":
                return <Birthday />;
            default:
                return <DefaultCollection />;
        }
    }

    const isToggleOn = useSelector((state) => {
        // console.log(state)
        return state.sidebar;
    })
    // console.log(isToggleOn)

    const listItem = useRef();
    
    const handleClick = (e) => {
        
    }

    return (
        <StyledSidebar style={{ width: `${isToggleOn ? "250px" : "0"}`, }}>
            <h4 className="sidebar-heading">Collections</h4>
            <ul className="collection-list">
                {
                    collectionData.map(({ name, _id }, id) => {
                        return (
                            <li key={id} onClick={handleClick} ref={listItem}>{selectCollectionIcon(name)}{name}</li>
                        )
                    })
                }
            </ul>
        </StyledSidebar>
    )
}

export default Sidebar