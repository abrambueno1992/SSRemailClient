import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {fetchMessagesAction} from '../actions/actions'
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
        this.setState({index: index + 20})

    }
    callActions = (start, end) => {
        this.props.fetchMessagesAction(start, end)
    }
    render() {
        console.log('checking', this.props, this.state)
      return (
        <div>
          <h1>Hello, this is an email app.</h1>
          <button>Increase by 20</button>
        </div>
      )
    }
}
const mapDisPatchToProps = dispatch => {
    return {
        fetchMessagesAction: bindActionCreators(fetchMessagesAction, dispatch),
        // AddAction: bindActionCreators(AddAction, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        agencies: state.agencies,
        nothing: state.nothing
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Index)