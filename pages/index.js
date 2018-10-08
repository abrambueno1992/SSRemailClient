import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { doneAction, fetchMessagesAction, fetchPersonAction, doneMessagesAction } from '../actions/actions'
import App from './app';
import './index.css'
import Head from 'next/head'
import PersonCompany from '../components/PersonCompany';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 20,
            start: 0,
            tryCounter: 0,
            tryCounter2: 0,
            end: false
        }
    }
    static async getInitialProps({ store, query, pathname }) {
        if (store.getState().messages === null) {
            await store.dispatch(fetchMessagesAction(0, 20))
        }
        
    }

    callActions = () => {
        this.props.fetchMessagesAction(this.state.start, this.state.index)
    }
    componentDidMount = () => {
        if (this.props.messages === null && this.props.fetchMessagesComplete === false && this.state.tryCounter < 5) {
            if (this.props.fetchMessagesComplete === false) {
                console.log('this is CDM cond 1', this.props.fetchMessagesComplete)
                this.callActions();
                let current = this.state.tryCounter + 1;
                this.setState({ tryCounter: current })
            }

        }
        if (this.props.messages && this.props.messages.error !== undefined && this.props.fetchMessagesComplete === false && this.state.tryCounter < 5) {
            if (this.props.fetchMessagesComplete === false) {
                console.log('this is CDM cond 2', this.props.fetchMessagesComplete)
                this.callActions();
                let current = this.state.tryCounter + 1;
                this.setState({ tryCounter: current })
            }

        }
        if (this.props.messages && this.props.messages.error === undefined && this.props.fetchMessagesComplete === false) {
            this.props.doneMessagesAction();
        }
        if (this.props.messages && this.props.fetchMessagesComplete === true && this.props.fetchPersonsComplete === false) {
            if (this.props.fetchPersonsComplete === false) {
                this.handleFetchPersons();
            }
        }

    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.fetchMessagesComplete !== this.props.fetchMessagesComplete && this.props.fetchMessagesComplete === true && this.state.tryCounter2 < 5) {
            if (this.props.fetchPersonsComplete === false) {
                this.handleFetchPersons();
            }
            
        }
        if (prevProps.messages !== this.props.messages && this.props.messages.error === undefined && this.props.fetchMessagesComplete === false) {
            this.props.doneMessagesAction();
        }
        if (prevProps.messages !== this.props.messages && this.props.messages.length === 1 && this.props.fetchMessagesComplete === false) {
            if (this.props.fetchMessagesComplete === false) {
                console.log('this is CWUP', this.props.fetchMessagesComplete)
                this.callActions();
            }

        }
        // if (this.state.end === false && this.props.persons.length === this.props.messages.length) {
        //     this.setState({ end: true })
        // }
        if (prevProps.persons !== this.props.persons && this.props.messages.length === this.props.persons.length) {
            this.props.doneAction()
        }
    }

    handleFetchPersons = async () => {
        await this.props.messages.map(async each => {
            this.props.fetchPersonAction(each.from)
        })

    }

    render() {

        if (this.props.fetchPersonsComplete === true) {
            return (
                <div className="MainContainer" >
                    <Head>
                        <title>This page has a title 🤔</title>
                        <meta charSet='utf-8' />
                        <meta name="description" content="That's it!" />
                        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                        {/* <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86"></meta> */}
                    </Head>
                    
                    <div className="SideComponent">
                    <PersonCompany />
                    </div>
                    
                    <div className="AppComponent">
                    <App />
                    </div>
                    

                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}
const mapDisPatchToProps = dispatch => {
    return {
        fetchMessagesAction: bindActionCreators(fetchMessagesAction, dispatch),
        fetchPersonAction: bindActionCreators(fetchPersonAction, dispatch),
        doneAction: bindActionCreators(doneAction, dispatch),
        doneMessagesAction: bindActionCreators(doneMessagesAction, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        nothing: state.nothing,
        persons: state.persons,
        error: state.error,
        fetchPersonsComplete: state.fetchPersonsComplete,
        organized: state.organized,
        fetchMessagesComplete: state.fetchMessagesComplete
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Index)