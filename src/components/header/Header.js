import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100px;
  background-color: #0B2027;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 5;
`;

const Logo = styled.h1`
  color: white;
  position: fixed;
  left: 50px;
  top: 10px;
  z-index: 10;
`;

function Header() {
  return (
    <div>
      <Background />
      <Logo>Spoodr</Logo>
    </div>
  );
}

export default Header;
