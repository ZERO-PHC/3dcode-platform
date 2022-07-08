import React from "react";
import Link from "next/link";
import styled from "styled-components";

const NavbarNoAddress = () => {  
    return (
      <HeaderWrapper>
        <div>
          <Link href="/">
            <img src="/Logo.png" />
          </Link>
          <h2>SAMPLERS</h2>
        </div>
        <div></div>
      </HeaderWrapper>
    );
  };

export default NavbarNoAddress;

const HeaderWrapper = styled.header`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  width: 100%;
  color: white;
  z-index: 20;
  padding-left: 3rem;
  padding-right: 3rem;
  margin-bottom: 20px;

div {
  display: flex;
  align-items: center;
}

h2 {
  font-family: MonumentBold;
  color: white;
}
`;
