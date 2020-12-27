import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Search from './Search';
import Events from './Events';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Search}></Route>
      <Route exact path='/events/:artistname' component={Events}></Route>
    </Switch>
  );
}

export default Main;