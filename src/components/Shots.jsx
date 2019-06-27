import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";

import styled from 'styled-components';

import { Card } from './Card';
import { fetchShots } from '../actions';
import Loading from './Loading';
import Error from './Error';

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Shots = ({ fetchShots, shots = [], loading, error }) => {
  if (shots.length === 0 && !error)
    fetchShots();

  console.log(error);

  return loading ? <LoadingContainer><Loading /></LoadingContainer>
    : error ? <Error />
      : <CardContainer>
        {shots.map(shot => <div key={shot.id}>
          <Link to={{ pathname: shot.id, state: { modal: true } }}>
            <Card title={shot.title} images={shot.images} date={new Date(shot.published_at).toLocaleDateString()} />
          </Link>
        </div>)}
      </CardContainer>
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