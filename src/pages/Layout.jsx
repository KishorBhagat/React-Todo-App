import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar";
import NavbarMobile from "../Components/NavbarMobile";
import { useState } from "react";
import FormModal from "../Components/FormModal";
import ProfileMenu from "../Components/ProfileMenu";

const StyledLayout = styled.section`
  display: flex;
  /* justify-content: center; */
  /* min-height: calc(100vh - 50px); */
  /* margin-top: 50px; */
  overflow: hidden;
`;

const Layout = ({children}) => {

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <>
      <FormModal isFormModalOpen={isFormModalOpen} setIsFormModalOpen={setIsFormModalOpen}/>
      <ProfileMenu />
      <Navbar isFormModalOpen={isFormModalOpen} setIsFormModalOpen={setIsFormModalOpen}/>
      <StyledLayout>
        <Sidebar />
            {children}
      </StyledLayout>
      <NavbarMobile setIsFormModalOpen={setIsFormModalOpen}/>
    </>
  )
}

export default Layout