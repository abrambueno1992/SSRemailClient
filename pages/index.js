import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {fetchMessagesAction, fetchPersonAction} from '../actions/actions'
// import './index.css';
// import Card from './Card';

class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            index : 20,
            start: 0
        }
    }
    static async getInitialProps ({Component, store }) {
        console.log('component',Component)
        await store.dispatch(fetchMessagesAction(0, 20))

        // store.dispatch(AddAction())
    }
    increaseIndex = () => {
        // this.setState({start: this.state.index, index: this.state.index + 20})
        // this.callActions();
        this.handleFetchPersons()

    }
    callActions = (start, end) => {
        this.props.fetchMessagesAction(this.state.start, this.state.index)
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log('testing CSUP', this.props.messages)
      if (this.props.messages !== prevProps.messages) {
        this.handleFetchPersons()
      }
      if (this.props.messages.error !== null) {
        //   this.props.fetchMessagesAction()
        this.callActions();
      }
    }
    handleFetchPersons = () => {
        console.log('handle persons fired')
        this.props.messages.map(async each => {
            // console.log(each.from.toString())
            await this.props.fetchPersonAction(each.from)
        })
    }
    
    render() {
        console.log('checking', this.props, this.state)
      return (
        <div>
          <h1>Hello, this is an email app.</h1>
          <button onClick={this.increaseIndex}>Increase by 20</button>
        </div>
      )
    }
}
const mapDisPatchToProps = dispatch => {
    return {
        fetchMessagesAction: bindActionCreators(fetchMessagesAction, dispatch),
        fetchPersonAction: bindActionCreators(fetchPersonAction, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        nothing: state.nothing,
        persons: state.persons,
        error: state.error
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Index)