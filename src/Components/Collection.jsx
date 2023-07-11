import styled from "styled-components"
import ProgressRing from "./ProgressRing";
import { useNavigate } from "react-router-dom";
import selectCollectionIcon from "../utils/SelectCollectionIcon";

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

    return (
        <StyledCollection onClick={handleRedirect} id={name.toLowerCase()}>
            <div className="icon">{selectCollectionIcon(name)}</div>
            <div className="details">
                <div className="name">{capitalize(name)}</div>
                <div className="stats">
                    {
                        total == 0 ? (<span>No tasks</span>) : (total == done) ? (<span>All {total} done!</span>) : (<span>{done}/{total} done</span>)
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