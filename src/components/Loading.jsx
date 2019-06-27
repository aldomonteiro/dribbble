import React from 'react';
import styled from 'styled-components';
import spinner from './loading-spinner.svg'

const Container = styled.div`
  display: flex;
  width: 80vw;
  height: 60vh;
  justify-content: center;
`;

const Loading = () =>
  <Container>
    <img src={spinner} alt="Loading..." />
  </Container>

export default Loading;