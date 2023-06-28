import styled from "styled-components"
import School from "./icons/School";
import Personal from "./icons/Personal";
import Design from "./icons/Design";
import Groceries from "./icons/Groceries";
import DefaultCollection from "./icons/DefaultCollection";
import Birthday from "./icons/Birthday";

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
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .stats{
            display: flex;
            justify-content: space-between;
            
            span{
                font-size: 12px;
                color: var(--text-secondary);
            }
        }
    }
`;

const Collection = ({name, total, done}) => {

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
  
  return (
    <StyledCollection>
        <div className="icon"><Icon /></div>
        <div className="details">
            <div className="name">{name}</div>
            <div className="stats">
                {
                    (total == done) ? (<span>All {total} done!</span>) : (<span>{done}/{total} done</span>)
                }
                {/* <span>
                    <ProgressRing />
                </span> */}
            </div>
        </div>
    </StyledCollection>
  )
}

export default Collection