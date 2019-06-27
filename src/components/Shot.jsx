import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { fetchShot } from '../actions';
import Loading from './Loading';
import Error from './Error';

import tag from './images/tag.svg';
import pub_date from './images/pub-date.svg';
import ResponsiveImg from './ResponsiveImg';

// CSS para mostrar como uma página comum caso
// seja acessado diretamente pela URL ou um modal
// caso seja acessado pelo link
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
    background-color: rgba(0,0,0,0.5); /* Black w/ opacity */  `}
`;

// Component interno do container principal.
// Não ocupa a tela toda quando é modal.
const InternalContent = styled.div`
    margin: auto;
    background-color: #fefefe;
    ${({ modal }) => modal && `
      border-radius: 5px;
      width: 80%;
    `}
`;

const DataContainer = styled.div`
  height: auto;
`;

const SideInfoContainer = styled.div`
  color: #999;
  width: 25%;
  align-items: center;
`;

const TagsContainer = styled.div`
  align-items: center;
`;

const DateContainer = styled.div`
  align-items: center;
`;


const InfoContainer = styled.div`
  height: 40%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  height: 20%;
  padding: 20px;
  width: 60%;
  word-wrap: break-word;
`;

const CloseLink = styled(Link)`
  position: absolute;
  top: 5%;
  right: 5%;
  color: #eeeeee;
  font-size: 40px;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
  @media (max-width: 400px) {
    color: grey;
    right: 15%;
  }
`;

export const Shot = ({ match, location, fetchShot, shot, loading, error }) => {
  const { state = {} } = location;
  const { modal } = state;

  // Containers desse component, poderão receber um component de Erro,
  // Loading ou os dados que forem retornados do store.
  const wrapper = node =>
    <Container modal={!!modal}>
      <InternalContent modal={!!modal}>
        {modal && <CloseLink to="/">&times;</CloseLink>}
        {node}
      </InternalContent>
    </Container>

  if (error)
    return wrapper(<Error />);

  // somente busca um shot se o id for diferente do shot 
  // que está armazenado no store (ou se não há shot no store).
  if (!shot || shot.id != match.params.id)
    fetchShot(match.params.id)

  if (!shot || loading)
    return wrapper(<Loading />);

  const [weekDay, monthName, day, year] = new Date(shot.published_at).toDateString().split(' ');

  return wrapper(
    <DataContainer>
      <Text>
        <h2>{shot.id + ' - ' + shot.title}</h2>
      </Text>
      <ResponsiveImg shot={shot} />
      <InfoContainer>
        <Text dangerouslySetInnerHTML={{ __html: shot.description }} />
        <SideInfoContainer>
          <TagsContainer>
            <img src={tag} alt="Tags" />
            {shot.tags && shot.tags.map(tag => <p key={tag}>{tag}</p>)}
          </TagsContainer>
          <DateContainer>
            <img src={pub_date} alt="Published Date" />
            <p>{`${monthName} ${day}, ${year}`}</p>
          </DateContainer>
        </SideInfoContainer>
      </InfoContainer>
    </DataContainer>);
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchShot }, dispatch)
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