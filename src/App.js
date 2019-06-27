import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components';

import Routes from './Routes';
import configureStore from './store/configureStore';

const store = configureStore()


const Container = styled.main`
 background-color: #F4F4F4;
  min-height: 100vh;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

function App () {
  return (
    <Provider store={store}>
      <Container>
        {/* <Router> */}
        <Route component={Routes} />
        {/* </Router> */}
      </Container>
    </Provider>
  );
}

export default App;
