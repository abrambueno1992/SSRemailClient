import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { doneAction, fetchMessagesAction, fetchPersonAction } from '../actions/actions'
import Side from '../components/Side';
import App from '../components/App';
import './index.css'
import Head from 'next/head'

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
    static async getInitialProps({ Component, store }) {
        await store.dispatch(fetchMessagesAction(0, 20))
    }
    increaseIndex = () => {
        this.handleFetchPersons()
    }
    callActions = () => {
        this.props.fetchMessagesAction(this.state.start, this.state.index)
    }
    componentDidMount = () => {
        if (this.props.error !== null || this.props.messages.error) {
            if (this.props.messages === null && this.state.tryCounter < 5) {
                this.callActions();
                let current = this.state.tryCounter + 1;
                this.setState({ tryCounter: current })
            }
            if (this.props.messages.error !== null && this.state.tryCounter < 5) {
                this.callActions();
                let current = this.state.tryCounter + 1;
                this.setState({ tryCounter: current })
            }
        }
        if (this.props.messages && this.props.messages.error === undefined && this.props.error === null && this.props.persons.length === 0) {
            this.handleFetchPersons();
        }

    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.messages !== this.props.messages && this.props.messages.error === undefined && this.state.tryCounter2 < 5) {
            this.handleFetchPersons();
        }
        if (this.state.end === false && this.props.persons.length === this.props.messages.length) {
            this.setState({ end: true })
        }
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
        if (this.props.end === true && this.props.messages.error === undefined) {
            return (
                <div className="MainContainer" >
                    <Head>
                        <title>This page has a title 🤔</title>
                        <meta charSet='utf-8' />
                        <meta name="description" content="That's it!" />
                        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                        {/* <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86"></meta> */}
                    </Head>
                    <Side />
                    <App />

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
        doneAction: bindActionCreators(doneAction, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        nothing: state.nothing,
        persons: state.persons,
        error: state.error,
        end: state.ending
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Index)