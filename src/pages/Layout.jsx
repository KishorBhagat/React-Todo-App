import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar";
import NavbarMobile from "../Components/NavbarMobile";
import { useState } from "react";
import FormModal from "../Components/FormModal";

const StyledLayout = styled.section`
  display: flex;
  /* justify-content: center; */
  /* min-height: calc(100vh - 50px); */
  /* margin-top: 50px; */
  overflow: hidden;
`;

const Layout = ({children}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <StyledLayout>
        <Sidebar />
            {children}
      </StyledLayout>
      <NavbarMobile setIsModalOpen={setIsModalOpen}/>
    </>
  )
}

export default Layout