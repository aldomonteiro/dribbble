import React from 'react';
import styled from 'styled-components';
import error from './error.jpg'

const Container = styled.div`
  display: flex;
  width: 80vw;
  height: 60vh;
  justify-content: center;
`;

const Error = () =>
  <Container>
    <img src={error} alt="Error..." />
    <h2>Houve um erro inesperado ao processar essa solicitação.</h2>
  </Container>

export default Error;