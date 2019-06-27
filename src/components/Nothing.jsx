import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchShots } from '../actions';

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

const Nothing = ({ fetchShots }) =>
  <Container>
    <H2>Não há nenhum shot no seu perfil.</H2>
    <Button onClick={() => fetchShots()}>
      Recarregar...
    </Button>
  </Container>

function mapStateToProps (state) {
  return {
    error_msg: state.error_shots || state.error_shot
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchShots }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nothing);