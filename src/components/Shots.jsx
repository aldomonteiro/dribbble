import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";

import styled from 'styled-components';

import { Card } from './Card';
import { fetchShots } from '../actions';
import Loading from './Loading';
import Error from './Error';
import Nothing from './Nothing';

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Shots = ({ fetchShots, shots, loading, error }) => {

  // Containers desse component, poderão receber um component de Erro,
  // Loading ou os dados que forem retornados do store.
  const wrapper = node => (
    <CardContainer>
      {node}
    </CardContainer>);

  if (error)
    return wrapper(<Error />);

  // somente busca os shots se não houver nenhum no store.
  if (!shots)
    fetchShots();

  if (!shots || loading)
    return wrapper(<LoadingContainer><Loading /></LoadingContainer>);

  if (shots.length === 0)
    return wrapper(<Nothing />);

  return wrapper(
    shots.map(shot => <div key={shot.id}>
      <Link to={{ pathname: shot.id, state: { modal: true } }}>
        <Card shot={shot} />
      </Link>
    </div>));
}

const mapStateToProps = (state) => ({
  shots: state.shots,
  loading: state.loading_shots,
  error: state.error_shots,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchShots }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shots);