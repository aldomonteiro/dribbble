import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import Shots from './components/Shots';
import Shot from './components/Shot';

function Routes ({ location }) {
  const [prevLocation, setPrevLocation] = useState(null);

  if (!prevLocation)
    setPrevLocation(location);

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

export default Routes;
