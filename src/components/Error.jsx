import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import error from './images/error.jpg'

import { resetErrors } from '../actions';

const Container = styled.div`
  width: 80vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-height: 113px;
  max-width: 112px;
`;

const H2 = styled.h2`
  text-align: center;
`
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

export const Error = ({ resetErrors, error_msg }) =>
  <Container>
    <Img src={error} alt="Error..." />
    <H2>Houve um erro inesperado ao processar essa solicitação.</H2>
    <Button onClick={() => resetErrors()}>
      Tentar novamente
    </Button>
    <p>{error_msg}</p>
  </Container>

function mapStateToProps (state) {
  return {
    error_msg: state.error_shots || state.error_shot
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ resetErrors }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error);