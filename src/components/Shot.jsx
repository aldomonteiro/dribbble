import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { fetchShot } from '../actions';
import Loading from './Loading';
import Error from './Error';

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${({ modal }) => modal && `
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 5%; /* InternalContent */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 90%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  `}
`;

const InternalContent = styled.div`
    margin: auto;
    background-color: #fefefe;
    ${({ modal }) => modal && `
      border: 5px solid #888;
      width: 80%;`}
`;

const DataContainer = styled.div`
  height: auto;
`;

const Text = styled.div`
  height: 20%;
  padding: 20px;
`;

const Img = styled.img`
  padding: 1px;
  width: 100%;
  max-height: 100vh;
`;

const Shot = ({ match, location, fetchShot, shot, loading, error }) => {
  const { state = {} } = location;
  const { modal } = state;

  // somente busca um shot se o id for diferente do shot que está armazenado no store.
  if (!error && (!shot || shot.id != match.params.id))
    fetchShot(match.params.id)

  return (
    <Container modal={!!modal}>
      <InternalContent modal={!!modal}>
        {modal && <Link to="/">&times;</Link>}
        {error ? <Error />
          : !loading && shot ?
            <DataContainer>
              <Text>
                <h2>{shot.id + ' - ' + shot.title}</h2>
              </Text>
              <Img srcset={`${shot.images.one_x} 400w,
            ${shot.images.two_x} 800w`}
              sizes="(max-width: 400px) 400px,
                  800px"
              src={shot.images.two_x} alt={shot.title} />
              <Text dangerouslySetInnerHTML={{__html: shot.description}} />
              {/* <Text>
              {shot.description}
            </Text> */}
            </DataContainer> : <Loading />
        }
      </InternalContent>
    </Container>);
}
    
function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchShot}, dispatch)
}
      
function mapStateToProps (state) {
  return {
    loading: state.loading_shot,
    shot: state.shot,
    error: state.error_shot,
  };
}
    
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shot);