/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Contests/App/App';
import requireAuth from './util/requireAuth';

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
    require('./Contests/ContestWrapper');
    require('./Contests/pages/CreateContest');
    require('./Contests/pages/EditProblemPage');
    require('./Contests/pages/ContestHomePage');
    require('./Contests/pages/HomePage');
    require('./Contests/pages/EditContestPage');
    require('./Contests/pages/ProblemPage');
    require('./Contests/pages/ScoreboardPage');
    require('./Contests/pages/DisplayContests');
    require('./Contests/pages/JudgeSubmissionPage');
    require('./Contests/pages/SingleSubmissionPage');
    require('./Contests/pages/ParticipantSubmissionsPage');
    require('./Contests/pages/ParticipantSubmissionProblemPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' component={App}>
    <IndexRoute
        getComponent={(nextState, cb) => {
            require.ensure([], require => {
                cb(null, require('./Contests/pages/HomePage').default);
            });
        }}
    />
    <Route
        path='/profile'
        getComponent={(nextState, cb) => {
            require.ensure([], require => {
                cb(null, requireAuth(require('./Contests/pages/DisplayContests').default));
            });
        }}
    />
    <Route
        path='/create-contest'
        getComponent={(nextState, cb) => {
            require.ensure([], require => {
                cb(null, requireAuth(require('./Contests/pages/CreateContest').default));
            });
        }}
    />
    <Route
        path='/contest/:contestId'
        getComponent={(nextState, cb) => {
            require.ensure([], require => {
                cb(null, requireAuth(require('./Contests/ContestWrapper').default));
            });
        }}
    >
        <Route
            path='home'
            page='home'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/ContestHomePage').default));
                });
            }}
        />
        <Route
            path='edit'
            page='home'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/EditContestPage').default));
                });
            }}
        />
        <Route
            path='problems/add'
            page='problems'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./Contests/pages/EditProblemPage').default);
                });
            }}
        />
        <Route
            path='problems/:problemNum/edit'
            page='problems'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./Contests/pages/EditProblemPage').default);
                });
            }}
        />
        <Route
            path='problems/:teamId/:problemNum'
            page='problems'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/ProblemPage').default));
                });
            }}
        />
        <Route
            path='scoreboard(/:teamId)'
            page='scoreboard'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/ScoreboardPage').default));
                });
            }}
        />
        <Route
            path='submissions'
            page='submissions'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/JudgeSubmissionPage').default));
                });
            }}
        />
        <Route
            path='submissions/admin/:submissionId'
            page='submissions'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/SingleSubmissionPage').default));
                });
            }}
        />
        <Route
            path='submissions/:teamId'
            page='submissions'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/ParticipantSubmissionsPage').default));
                });
            }}
        />
        <Route
            path='submissions/:teamId/:submissionId'
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, requireAuth(require('./Contests/pages/ParticipantSubmissionProblemPage').default));
                });
            }}
        />

    </Route>
    </Route>
);
