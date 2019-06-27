import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from './images/dribbble-logo.svg';
const NavBar = styled.div`
  top: 0;
  height: 40px;
  width: 100%;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin: auto;
  background-color: #F4F4F4;
`;

const Img = styled.img`
  padding: 10px;
  background-color: transparent;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <NavBar>
        <Link to="/">
          <Img alt="dribbble"
            src={logo} />
        </Link>
      </NavBar>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Layout;