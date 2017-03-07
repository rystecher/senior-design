/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Contests/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./Contests/Create/Pages/CreateContestReview');
  require('./Contests/Home/Pages/HomePage');
  require('./Contests/Participate/Pages/Problem/pages/ProblemPage');
  require('./Contests/Pages/MyContests/MyContests');
  require('./Contests/Participate/Pages/Scoreboard/pages/ScoreboardPage');
  require('./Contests/Login/pages/RegisterPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
/*
 <Route
 path="/posts/:slug-:cuid"
 getComponent={(nextState, cb) => {
 require.ensure([], require => {
 cb(null, require('./modules/Home/Pages/PostDetailPage/PostDetailPage').default);
 });
 }}
 />
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Home/Pages/HomePage').default);
        });
      }}
    />
    <Route
      path="/create-contest"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Create/Pages/CreateContestReview').default);
        });
      }}
    />
    <Route
      path="/problem"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Participate/Pages/Problem/pages/ProblemPage').default);
        });
      }}
    />
    <Route
      path="/scoreboard"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Participate/Pages/Scoreboard/pages/ScoreboardPage').default);
        });
      }}
    />
    <Route
      path="/my"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Pages/MyContests/MyContests').default);
        });
      }}
    />
  <Route
      path="/register"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Contests/Login/pages/RegisterPage').default);
        });
      }}
    />
    </Route>
);
