import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router, Route, IndexRoute, browserHistory,
  Redirect, applyRouterMiddleware
} from 'react-router';
import useScroll from 'react-router-scroll';
import IndexPage from './common/components/index-page';
import Categories from './categories/components/content';
import Account from './account/components/account';
import Analytics from './analytics/components/analytics';
import Transactions from './transactions/components/content';
import Layout from './common/components/layout';
import NotFound from './common/components/not-found';
import About from './meta/components/about';
import Contact from './meta/components/contact';
import Privacy from './meta/components/privacy';
import Terms from './meta/components/terms';
import SignIn from './meta/components/sign-in';
import store from './redux/store';
import generateRequireAuth from './common/services/require-auth';

const requireAuth = generateRequireAuth(store);

render((
  <Provider store={store}>
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="/transactions" component={Transactions} onEnter={requireAuth}/>
        <Route path="/categories" component={Categories} onEnter={requireAuth}/>
        <Route path="/analytics" component={Analytics} onEnter={requireAuth}/>
        <Route path="/account" component={Account} onEnter={requireAuth}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/privacy" component={Privacy}/>
        <Route path="/about" component={About}/>
        <Route path="/terms" component={Terms}/>
        <Route path="/login" component={SignIn}/>
        <Route path="/join" component={SignIn}/>
        <Redirect from="/dashboard" to="/"/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('.app-container'));
