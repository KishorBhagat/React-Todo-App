import { useSelector } from "react-redux";
import styled from "styled-components"
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CollectionContext } from "../Context/CollectionContext";
import selectCollectionIcon from "../utils/SelectCollectionIcon";

const StyledSidebar = styled.div`
    background-color: var(--background-secondary);
    height: calc(100vh - 50px);
    margin-top: 50px;
    border-top: 1px solid var(--background-primary);
    transition: all .2s ease-out;

    .sidebar-heading{
        /* background-color: inherit; */
        padding: 10px 20px;
        font-weight: 500;
        color: var(--text-secondary);
        padding-top: 20px;
    }
    ul{
        /* background-color: inherit; */
        height: calc(100vh - 100px);
        overflow-y: scroll;
        overflow-x: hidden;

        a{
            /* background-color: inherit; */
            text-decoration: none;

            /* transition: .2s ease; */
            &:hover{
                background-color: var(--hover-light);
            }
        }
        li{
            /* background-color: inherit; */
            padding: 15px 30px;
            color: var(--text-tertiary);
            list-style: none;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
            transition: .2s ease;
            svg{
                /* background-color: inherit; */
                height: 24px;
                margin-right: 10px;
            }
            /* a{
                text-decoration: none;
                color: var(--text-tertiary);
                display: flex;
                align-items: center;
                background-color: inherit;
            } */
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

    const {collections} = useContext(CollectionContext)


    /*When the sort() function compares two values, it sends the values to the compare function, and sorts the values according to the returned (negative, zero, positive) value.
    If the result is negative, a is sorted before b.
    If the result is positive, b is sorted before a.
    If the result is 0, no changes are done with the sort order of the two values.*/
    collections.sort((a, b) => {
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

    // const selectCollectionIcon = (collection_name) => {
    //     switch (collection_name.toLowerCase()) {
    //         case "school":
    //             return <School />
    //         case "personal":
    //             return <Personal />;
    //         case "design":
    //             return <Design />;
    //         case "groceries":
    //             return <Groceries />;
    //         case "birthday":
    //             return <Birthday />;
    //         default:
    //             return <DefaultCollection />;
    //     }
    // }

    const isToggleOn = useSelector((state) => {
        // console.log(state)
        return state.sidebar;
    })
    // console.log(isToggleOn)

    const listItem = useRef();

    const [selectedIndex, setSelectedIndex] = useState(0);

    const navigate = useNavigate();
    const handleClick = (idx) => {
        setSelectedIndex(idx)
        // navigate(`/collections/${collection_name.toLowerCase()}`);
    }

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    return (
        <StyledSidebar style={{ width: `${isToggleOn ? "250px" : "0"}`, }}>
            <h4 className="sidebar-heading">Collections</h4>
            <ul className="collection-list">
                {
                    // TODO: render collection list in sorted order of alphabets
                    collections.map(({ collection_name, _id }, idx) => {
                        return (
                            <Link to={`/collections/${collection_name.toLowerCase()}`} key={idx}>
                                <li onClick={() => handleClick(idx + 1)} ref={listItem}
                                    style={{
                                        backgroundColor: `${idx + 1 === selectedIndex ? "var(--hover)" : "inherit"}`
                                    }}
                                >
                                    {selectCollectionIcon(collection_name)}{capitalize(collection_name).slice(0, 14)}
                                    {collection_name.length > 14 && "..."}
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </StyledSidebar>
    )
}

export default Sidebar