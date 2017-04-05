import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FlashMessagesList from '../Login/components/FlashMessagesList';

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
                    <FlashMessagesList />
                    <div className={styles.container}>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
};

export default App;
