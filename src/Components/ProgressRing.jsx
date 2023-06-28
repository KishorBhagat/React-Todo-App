import styled from "styled-components"

const StyledProgressRing = styled.div`
    .progress-check{
        height: 20px;
        width: 20px;
        background-color: #59595e;
        position: relative;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .progress-check-inner{
        height: 16px;
        width: 16px;
        background-color: #272836;
        border-radius: 50%;
    }
`;

const ProgressRing = ({height}) => {
  return (
    <StyledProgressRing>
        <div className="progress-check" 
            // style={{height: `${height}px`, width: `${height}px`,}}
        >
            <div className="progress-check-inner" 
                // style={{height: `${height}px`, width: `${height}px`,}}
            >
        </div>
        </div>
    </StyledProgressRing>
  )
}

export default ProgressRing