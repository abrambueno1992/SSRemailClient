import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import { BrowserRouter as Router } from 'react-router-dom';
import reducer from '../reducers/reducers'
import { withRouter } from 'next/router'

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/

const makeStore = (initialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {

        // we can dispatch from here too

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        // console.log(ctx)
        console.log('props', pageProps)
        return { pageProps };

    }

    render() {
        const { Component, pageProps, store, router } = this.props;
        const { asPath, pathname, query } = router
    const url = {
      asPath,
      pathname,
      query
    }
        return (
            <Container>
                <Provider store={store}>
                    {/* <Router> */}
                        <Component {...pageProps} url={url} />
                    {/* </Router> */}
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);