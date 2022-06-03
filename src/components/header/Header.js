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
  left: 75px;
  top: 10px;
  z-index: 10;
`;

const Photo = styled.img`
  content: url("https://png.pngtree.com/png-clipart/20190520/original/pngtree-cartoon-black-spider-web-spider-web-easter-png-image_3775761.jpg");
  max-height: 2.5rem;
  max-width: 2.5rem;
  z-index: 10;
  position: fixed;
  border-radius: 5px;
  left: 26px;
  top: 30px;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  position: relative;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Background />
      <Logo>Spoodr</Logo>
      <Photo />
    </HeaderWrapper>
  );
}

export default Header;
