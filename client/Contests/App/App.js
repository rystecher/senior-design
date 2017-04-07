import React, { Component, PropTypes } from 'react';
import styles from './App.css';
import Helmet from 'react-helmet';

export class App extends Component {

    render() {
        return (
            <div>
                <div>
                    <Helmet
                        title='ACM Programming Contest'
                        titleTemplate='%s - Blog App'
                        meta={[{
                            charset: 'utf-8',
                        }, {
                            'http-equiv': 'X-UA-Compatible',
                            content: 'IE=edge',
                        }, {
                            name: 'viewport',
                            content: 'width=device-width, initial-scale=1',
                        },
                        ]}
                    />
                    <div className={styles.container}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
};

export default App;
