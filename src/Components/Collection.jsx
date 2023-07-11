import styled from "styled-components"
import ProgressRing from "./ProgressRing";
import { useNavigate } from "react-router-dom";
import selectCollectionIcon from "../utils/SelectCollectionIcon";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

const StyledCollection = styled.div`
    background-color: var(--background-secondary);
    height: 150px;
    width: 150px;
    padding: 16px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    div, span{
        background-color: inherit;
    }

    .icon {
        svg{
            background-color: inherit;
            fill: #a1fccb;
            width: 40px;
            height: 40px;
        }
    }

    .details{
        .name{
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;

            .highlight{
                background-color: #d684b9;
            }
        }
        .stats{
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            span{
                font-size: 12px;
                color: var(--text-secondary);
            }
        }
    }
`;

const Collection = ({ name, total, done }) => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/collections/${name.toLowerCase()}`);
    }

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const { searchValue } = useContext(SearchContext);

    const highlightText = (text) => {
        const regex = new RegExp(searchValue, 'gi');
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    }

    return (
        <StyledCollection onClick={handleRedirect} id={name.toLowerCase()}>
            <div className="icon">{selectCollectionIcon(name)}</div>
            <div className="details">
                <div className="name" dangerouslySetInnerHTML={{ __html: highlightText(capitalize(name)) }}>
                    {/* {capitalize(name)} */}
                </div>
                <div className="stats">
                    {
                        total == 0 ? (<span>No task</span>) : (total == done) ? (<span>All {total} done!</span>) : (<span>{done}/{total} done</span>)
                    }
                    <span>
                        <ProgressRing name={name} total={total} done={done} />
                    </span>
                </div>
            </div>
        </StyledCollection>
    )
}

export default Collection