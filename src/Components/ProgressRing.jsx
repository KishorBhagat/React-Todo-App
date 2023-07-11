import styled from "styled-components"
import selectCollectionColor from "../utils/SelectCollectionColor";

const StyledProgressRing = styled.div`
    .pie {
        width: 18px;
        height: 18px;
        display: block;
        border-radius: 50%;
        /* background-color: red; */
        float: left;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .inner{
            content: "";
            position: absolute;
            height: 10px;
            width: 10px;
            /* background-color: var(--background-secondary); */
            border-radius: 50%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            .check{
                content: "";
                height: 4px;
                width: 8px;
                position: absolute;
                border-left: 2px solid white;
                border-bottom: 2px solid white;
                transform: rotate(-45deg);
                /* display: none; */
            }
        }
    }

`;

const ProgressRing = ({ name, total, done }) => {

    // console.log(name, total, done)
    return (
        <StyledProgressRing>
            <div className="pie"
                style={{
                    backgroundColor: `var(--background-secondary)`,
                    backgroundImage: `conic-gradient(${selectCollectionColor(name)} 0%, ${selectCollectionColor(name)} ${(done * 100) / total}%, var(--text-secondary) ${(done * 100) / total}%)`
                }}
            >
                <div className="inner"
                    style={{ backgroundColor: `${(total == done && total != 0) ? selectCollectionColor(name) : "var(--background-secondary)"}` }}
                >
                    <div className="check"
                        style={{ display: `${(total == done && total != 0) ? "block" : "none"}` }}
                    ></div>
                </div>
            </div>
        </StyledProgressRing>
    )
}

export default ProgressRing