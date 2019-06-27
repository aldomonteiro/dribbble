import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from './components/Layout'
import Routes from './Routes';
import configureStore from './store/configureStore';

const store = configureStore()



function App () {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Route component={Routes} />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
