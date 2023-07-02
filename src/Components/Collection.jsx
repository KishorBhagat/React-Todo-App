import styled from "styled-components"
import School from "./icons/School";
import Personal from "./icons/Personal";
import Design from "./icons/Design";
import Groceries from "./icons/Groceries";
import DefaultCollection from "./icons/DefaultCollection";
import Birthday from "./icons/Birthday";
import ProgressRing from "./ProgressRing";
import { useNavigate } from "react-router-dom";

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

    const Icon = () => {
        switch (name.toLowerCase()) {
            case "school":
                return <School />;
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

    const handleRedirect = () => {
        navigate(`/collections/${name.toLowerCase()}`);
    }

    return (
        <StyledCollection onClick={handleRedirect} id={name.toLowerCase()}>
            <div className="icon"><Icon /></div>
            <div className="details">
                <div className="name">{name}</div>
                <div className="stats">
                    {
                        (total == done) ? (<span>All {total} done!</span>) : (<span>{done}/{total} done</span>)
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