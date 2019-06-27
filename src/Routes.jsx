import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Shots from './components/Shots';
import Shot from './components/Shot';

export function Routes ({ location, error }) {
  const [prevLocation, setPrevLocation] = useState(null);

  if (!prevLocation && !error) {
    setPrevLocation(location);
  }

  // código de segurança para não armazenar o location de um shot
  // inexistente.
  if (error && error.indexOf('404') > -1 && prevLocation)
    setPrevLocation(null);

  const { state = {} } = location;
  const { modal } = state;

  return (
    <div>
      <Switch location={modal ? prevLocation : location}>
        <Route exact path="/" component={Shots} />
        <Route path="/:id" component={Shot} />
      </Switch>
      {modal ? <Route path="/:id" component={Shot} /> : null}
    </div>
  );
}

function mapStateToProps (state) {
  return {
    error: state.error_shot,
  };
}

export default connect(
  mapStateToProps,
  null
)(Routes);
