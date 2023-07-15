import styled from "styled-components";

const StyledUploadingSpinner = styled.div`
    display: flex;
    animation: spin 4s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); opacity: 0.4;}
        25% { transform: rotate(90deg); opacity: 1;}
        50% { transform: rotate(180deg); opacity: 0.4;}
        75% { transform: rotate(270deg); opacity: 1;}
        100% { transform: rotate(360deg); opacity: 0.4;}
    }
`

const UploadingSpinner = (props) => (
    <StyledUploadingSpinner>
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13 2a1 1 0 0 0-2 0v4.167a1 1 0 1 0 2 0V2ZM13 17.833a1 1 0 0 0-2 0V22a1 1 0 1 0 2 0v-4.167ZM16.834 12a1 1 0 0 1 1-1H22a1 1 0 0 1 0 2h-4.166a1 1 0 0 1-1-1ZM2 11a1 1 0 0 0 0 2h4.167a1 1 0 1 0 0-2H2ZM19.916 4.085a1 1 0 0 1 0 1.414l-2.917 2.917A1 1 0 1 1 15.585 7l2.917-2.916a1 1 0 0 1 1.414 0ZM8.415 16.999a1 1 0 0 0-1.414-1.414L4.084 18.5A1 1 0 1 0 5.5 19.916l2.916-2.917ZM15.585 15.585a1 1 0 0 1 1.414 0l2.917 2.916a1 1 0 1 1-1.414 1.415l-2.917-2.917a1 1 0 0 1 0-1.414ZM5.499 4.085a1 1 0 0 0-1.415 1.414l2.917 2.917A1 1 0 0 0 8.415 7L5.5 4.085Z" fill="currentColor"></path></g></svg>
    </StyledUploadingSpinner>
);

export default UploadingSpinner;

