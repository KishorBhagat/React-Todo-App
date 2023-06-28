import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar";
import NavbarMobile from "../Components/NavbarMobile";

const StyledLayout = styled.section`
  display: flex;
  /* justify-content: center; */
  /* min-height: calc(100vh - 50px); */
  /* margin-top: 50px; */
  overflow: hidden;
`;

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <StyledLayout>
        <Sidebar />
            {children}
      </StyledLayout>
      <NavbarMobile />
    </>
  )
}

export default Layout